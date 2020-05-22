<template>
	<section class="net-viewer">
		<main class="main">
			<div class="dicom-info"  v-if="showInfo">
				<div style="display: flex; flex-direction: column;position: relative;z-index: 9999">
					<span>{{ $t("message.dicom.index") }}:{{ $refs.dicomViewer.currentImageIndex + 1 }}/{{ baseNames.length }}</span>
					<span>{{ $t("message.dicom.wl") }}:{{ $refs.dicomViewer.ww }}HU</span>
					<span>{{ $t("message.dicom.ww") }}:{{ $refs.dicomViewer.wl }}HU</span>
				</div>
			</div>
			<dicom-viewer
				ref="dicomViewer"
				class="dicom-viewer"
				:goToImageIndex="goToImageIndex"
				:lesionsByIndex="lesionsByIndex"
				:leftMouse.sync="leftMouse"
				:imageId="imageIds"
				dicomSource="network"
				:token="token"
				@viewerMounted="viewerMounted"
			></dicom-viewer>
		</main>
		<div class="listArea">
			<nodule-list
				ref="noduleList"
				:goToImageIndex.sync="goToImageIndex"
				:noduleList="noduleList"
				:backupList="backupList"
				:hideNoduleList="hideNoduleList"
				:currentNodule="currentNodule"
				@changeNodule="changeNodule"
			></nodule-list>
		</div>
	</section>
</template>
<script>
	import dicomViewer from '../../../src/components/dicom-viewer/dicomViewer.vue';
	// import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
	import {token, baseNames} from '../src/views/data.js';
	import api from '../src/request/api';
	import {getLesions} from '../src/request/index';
	import noduleList from '../src/components/noduleList'
	// import { initLesionsByIndex } from '../../../src/utils/lesionsByIndex'
	export default {
		name: 'netViewer',
		components: {
			dicomViewer,
			noduleList,
		},
		data() {
			return {
				lesionsByIndex: {},
				noduleList: [],
				currentNodule: {},
				goToImageIndex: 0,
				hideNoduleList: [],
				backupList: [],
				sortNodeList: [],
				selectAll: true,
				propType: {
					'000': this.$t('message.dicom.propAll'),
					'100': this.$t('message.dicom.propLungSolid'),
					'200': this.$t('message.dicom.propPartSolid'),
					'300': this.$t('message.dicom.propGlass'),
					'400': this.$t('message.dicom.propLungCal'),
					'500': this.$t('message.dicom.propChestSolid'),
					'600': this.$t('message.dicom.propChestCal'),
				},
				propValue: '',
				listSort: {
					totalIndex: true, //true 从小到大
					probability: true, //结节概率
					prop: true,
					maligant: true,
				},
				lang: 'zh-cn',
				langs: [
					{
						value: 'zh-cn',
						label: '简体版',
					},
					{
						value: 'zh-tw',
						label: '繁體版',
					},
					{
						value: 'en-us',
						label: 'English',
					},
				],
				activeNum: 1,
				token,
				baseNames: baseNames.chunks,
				imageIds: [],
				showInfo: false,
				//	leftMouse: 'ZoomTouchPinch', Pan ,ZoomMouseWheel
				leftMouse: 'Wwwc',
				storeId: '72604f6a2dd211ea9f840242ac140012'
			};
		},
		mounted: function () {
			this.setLessions();
			this.lang = localStorage.getItem('lang');
		},
		methods: {
			changeNodule(nodule, type) {
				this.currentNodule = nodule;
				if (type === 'noduleCLick') {
					let lesions = this.lesionsByIndex[nodule.totalIndex];
					if (lesions && lesions.length > 1) {
						// 设置indexofCurrentZ是为了考虑一帧图有多个结节的情况
						lesions.indexofCurrentZ = lesions.findIndex((val) => val.lesion_id === nodule.lesion_id);
					}
					this.goToImageIndex = nodule.totalIndex;
				}
				// 从列表那儿点击有多结节的帧数触发的方法，此时index不变，需要手动触发更新视图
				// if (renderFromSameIndex) {
				// 	this.$nextTick(() => {
				// 		this.$refs.dicomViewer.renderFromSamePage();
				// 	});
				// }
			},
			setDiffentList(data) {
				for (let i = 0; i < data.length; i++) {
					let totalIndex;
					if (!data[i].totalIndex) {
						totalIndex = this.baseNames.indexOf(data[i].basename);
						this.$set(data[i], 'totalIndex', totalIndex);
					}
				}
				let filteredNodules = data.sort(function (a, b) {
					return a.totalIndex - b.totalIndex;
				});
				let addNodules = [];
				filteredNodules = filteredNodules.filter((item) => {
					if (item.status === 'create') {
						addNodules.push(item);
					}
					if (item.lesion.diameter) {
						let diameter = item.lesion.diameter.split('*').map((item) => {
							return parseFloat(item.replace(/mm/g, ''));
						});
						// 以防万一顺序错误
						diameter.sort((a, b) => b - a);
						this.$set(item.lesion, 'diameter_max', diameter[0]);
						this.$set(item.lesion, 'diameter_min', diameter[1]);
					}
					return item.status !== 'create' && item.basename;
				});
				this.hideNoduleList = [...addNodules, ...filteredNodules].filter((item) => {
					return item.display_status === 'hidden' && item.lesion;
				});
				this.noduleList = [...addNodules, ...filteredNodules].filter((item) => {
					if (item.display_status === 'display' && item.lesion) {
						this.$set(item, 'checked', true);
						this.backupList.push(item);
						return true;
					} else {
						return false;
					}
				});
				// let currentNodule = this.noduleList.length > 0 ? this.noduleList[0] : {};
				// this.$nextTick(() => {
				// 	this.$refs.dicomViewer.renderFirstImage();
				// });
				// this.changeNodule(currentNodule,'noduleCLick');
				this.filterNoduleList();
				// this.initLesionsByIndex(this.noduleList);
			},
			filterNoduleList(needRender = true) {
				let data = this.backupList;
				let max_diameter, min_diameter, showMarkedNodule;
				let conditions = JSON.parse(localStorage.getItem('filterNoduleCondition'));
				if (!conditions) {
					min_diameter = this.$refs.noduleList.diameter_range[0];
					max_diameter = this.$refs.noduleList.diameter_range[1];
					showMarkedNodule = this.$refs.noduleList.showMarkedNodule;
				} else {
					max_diameter = conditions.max_diameter;
					min_diameter = conditions.min_diameter;
					showMarkedNodule = conditions.showMarkedNodule;
					this.$refs.noduleList.diameter_range = [min_diameter, max_diameter];
					this.$refs.noduleList.showMarkedNodule = showMarkedNodule;
				}
				this.noduleList = data.filter((val) => {
					// 返回直径在设定范围内的以及是否显示手动标注
					// 选择范围时如果是手动标注的结节就不用过滤，手动标注的只有在点击手动标注按钮的时候才会过滤
					let flag =
						(val.status === 'create' ||
							(val.lesion.diameter_norm >= min_diameter && val.lesion.diameter_norm <= max_diameter)) &&
						(showMarkedNodule || this.statusCheckedByAI.includes(val.status));
					if (!flag) {
						this.$set(val, 'checked', false);
					}
					return flag;
				});
				if (needRender) {
					// 过滤列表后后要重新构造lesionByIndex，并且重置画布
					this.$nextTick(() => {
						// this.lesionsByIndex = initLesionsByIndex(this.noduleList,this.cd());
						this.initLesionsByIndex();
						this.$refs.dicomViewer.renderImage();
					});
				}
			},
			cd(index){
				return this.$refs.dicomViewer.getLesionIndexByCoordZ(index);
			},
			initLesionsByIndex(type) {
				// 构造lesionByIndex 用于在canvas上绘制图形 结节信息按照所在层数Index排列，{1:[{},{}],20:[]}
				// key代表帧数，如果当前帧数上有超过一个结节，则此数组上添加个indexofCurrentZ属性
				// 代表这一帧当前高亮显示的结节,默认显示这个值
				let data = type === 'hidden' ? this.hideNoduleList : this.noduleList;

				let lesionsByIndex = {};
				for (let i = 0; i < data.length; i++) {
					let totalIndex = data[i].totalIndex;
					// 当前结节的信息
					let noduleInfo = data[i];
					// 当前结节跨多层的情况下在所在层要添加结节
					let rois = data[i].lesion.rois;
					let pileStart;
					let pileEnd;
					if (rois) {
						let keys = Object.keys(rois);
						let maxIndex = Math.max(...keys);
						let minIndex = Math.min(...keys);
						pileStart = this.$refs.dicomViewer.getLesionIndexByCoordZ(minIndex);
						pileEnd = this.$refs.dicomViewer.getLesionIndexByCoordZ(maxIndex);
						if (pileStart > pileEnd) {
							[pileStart, pileEnd] = [pileEnd, pileStart];
						}
					} else {
						// 没有多帧显示
						pileStart = pileEnd = totalIndex;
					}
					// 预防算法出错
					{
						if (totalIndex < pileStart) {
							pileStart = totalIndex;
						}
						if (totalIndex > pileEnd) {
							pileEnd = totalIndex;
						}
					}
					data[i].startIndex = pileStart;
					data[i].endIndex = pileEnd;
					for (let i = pileStart; i <= pileEnd; i++) {
						// 构造lesionByIndex
						if (lesionsByIndex[i]) {
							lesionsByIndex[i].push(noduleInfo);
						} else {
							lesionsByIndex[i] = [noduleInfo];
						}
						if (lesionsByIndex[i].length > 1) {
							lesionsByIndex[i].indexofCurrentZ = 0;
						}
					}
				}
				this.lesionsByIndex = lesionsByIndex;
			},
			setLessions() {
				getLesions('cc7bbf7a7fcb11eaaafb0242ac140009').then((data) => {
					this.setDiffentList(data)
				})
			},
			propOptions() {
				let arr = [];
				let keys = Object.keys(this.propType);
				// Object.keys不能保证按顺序输出
				let index = keys.indexOf('000');
				if (index !== 0) {
					keys.splice(index, 1);
					keys.unshift('000');
				}
				for (let item of keys) {
					let obj = {};
					obj.value = item;
					obj.label = this.propType[item];
					arr.push(obj);
				}
				return arr;
			},
			langChange(type) {
				this.lang = type;
				localStorage.setItem('lang', type);
				this.$i18n.local = type;
				window.location.reload();
			},
			usingTool(val) {
				switch (val) {
					case '亮度':
						this.leftMouse = 'Wwwc';
						this.activeNum = 1;
						break;
					case '移动':
						this.leftMouse = 'Pan';
						this.activeNum = 2;
						break;
					case '放大':
						this.leftMouse = 'ZoomTouchPinch';
						this.activeNum = 3;
						break;
					default:
						this.leftMouse = 'Wwwc';
						this.activeNum = 1;
						break;
				}
			},
			zoomDicom() {
				this.leftMouse = 'ZoomTouchPinch';
			},
			viewerMounted() {
				this.showInfo = true;
			}
		},
		created() {
			var initImageIds = (storeId, imgs) => {
				this.baseNames = imgs;
				for (let i = 0; i < imgs.length; i++) {
					let str = 'wadouri:' + api.singleImgUrl(storeId, imgs[i]);
					this.imageIds.push(str);
				}
			};
			initImageIds(this.storeId, this.baseNames);
		}
	}
	;
</script>
<style scoped lang="scss">
	.lang {
		width: 100px !important;
		margin-left: 400px;
	}

	.net-viewer {
		height: 100%;
		display: flex;

		.navbar {
			height: 40px;

			& > div {
				display: flex;
				flex-direction: column;
				width: 70px;

				i:first-child {
					padding-left: 20px;
				}

				i:last-child {
					font-size: 15px;
					padding-left: 10px;
				}
			}
		}

		.navbar {
			width: 100%;
			background: rgba(14, 43, 64, 1);
			color: #fff;
			font-size: 20px;
			display: flex;
			align-items: center;

			.active {
				color: yellow;
			}
		}

		.main {
			height: calc(100% - 40px);
			width: 70%;

			.dicom-info {
				position: absolute;
				left: 20px;
				top: 50px;
				color: #fff;
			}
		}
	}

	.listArea {
		width: 30%;
		height: calc(100% - 40px);
		background-color: #000;
		font-size: 16px;
		color: #6facff;

		.caption {
			& > span {
				margin-left: 70px;
			}

			& > span:nth-child(2) {
				margin-left: 5px !important;
			}
		}
	}

</style>
