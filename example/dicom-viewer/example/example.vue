<template>
	<div class="example">
		<span class="text">第一个实例是本地上传实例 点击上传影片</span>
		<input
			type="file"
			id="fileUpload"
			@change="selectFolder($event.target.files)"
			webkitdirectory
		/>
		<main class="main" v-if="isLocal">
			<div class="dicom-info" v-if="showInfo1">
				<div style="display: flex; flex-direction: column;color: white;z-index: 99999;position: relative">
					<span>帧数:{{ $refs.dicomViewer.currentImageIndex + 1 }}/{{ fileList.length }}</span>
					<span>窗宽:{{ $refs.dicomViewer.ww }}HU</span>
					<span>窗位:{{ $refs.dicomViewer.wl }}HU</span>
				</div>
			</div>
			<dicom-viewer
				class="dicom-viewer"
				:leftMouse.sync="leftMouse"
				:noduleList="noduleList"
				:fileList="fileList"
				:lesionsByIndex="lesionsByIndex"
				:imgSort="imgSort"
				@updateNoduleList="updateNoduleList"
				@viewerMounted="viewerMounted1"
				ref="dicomViewer"
			></dicom-viewer>
		</main>
	</div>
</template>
<script>
	import dicomViewer from '../../../src/components/dicom-viewer/dicomViewer.vue';
	import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
	import {token, baseNames} from '../src/views/data.js';
	import api from '../src/request/api';
	export default {
		name: 'netViewer',
		components: {
			dicomViewer
		},
		data() {
			return {
				token,
				baseName: baseNames.chunks,
				isLocal:false,
				JSONData: {},
				fileList: [],
				fileReader: '',
				noduleList: [],
				imageIds: [],
				baseNames: [],
				lesionsByIndex: {},
				showViewer: false,
				showInfo: false,
				showInfo1: false,
				imgSort: 'bottom',
				leftMouse: 'Wwwc',
				folderName: '',
				storeId: '6574bf94756b11ea88b10242ac140009'
			};
		},
		created() {
			var initImageIds = (storeId, imgs) => {
				this.baseNames = imgs;
				for (let i = 0; i < imgs.length; i++) {
					let str = 'wadouri:' + api.singleImgUrl(storeId, imgs[i]);
					this.imageIds.push(str);
				}
			};
			initImageIds(this.storeId, this.baseName);
		},
		methods: {
			netRequest() {
			this.isLocal = false;
				// document.getElementById('fileUpload').value = null;
			},
			viewerMounted() {
				this.showInfo = true;
			},
			viewerMounted1() {
				this.showInfo1 = true;
			},
			selectFolder(files) {
				this.isLocal = true;
				this.showInfo = false;
				if (files.length === 0) return;
				this.folderName = files[0].webkitRelativePath.split('/')[0];
				this.showViewer = false;
				this.showInfo = false;
				this.fileList = Object.values(files);
				// eslint-disable-next-line no-debugger
				debugger
				let DSStoreIndex = this.fileList.findIndex((item) => {
					return item.name.indexOf('DS_Store') !== -1;
				});
				this.fileList.splice(DSStoreIndex, 1);
				let jsonDataIndex = this.fileList.findIndex((item) => {
					return item.type === 'application/json';
				});
				this.fileList.splice(jsonDataIndex, 1);
				// 获取到的文件列表是无序的
				this.fileList.sort((a, b) => {
					let num1 = a.name.replace(/[^0-9]/gi, '');
					let num2 = b.name.replace(/[^0-9]/gi, '');
					// 防止数字过长
					if (num1.length > 8 || num2.length > 8) {
						num1 = num1.slice(-8);
						num2 = num2.slice(-8);
					}
					return parseInt(num1) - parseInt(num2);
				});
				// 初始化imageId和baseName
				this.imageIds = [];
				this.baseNames = [];
				for (let i = 0; i < this.fileList.length; i++) {
					this.baseNames.push(this.fileList[i].name);
					this.imageIds.push(cornerstoneWADOImageLoader.wadouri.fileManager.add(this.fileList[i]));
				}
				this.noduleList = this.JSONData[this.folderName] || [];

				this.$nextTick(() => {
					this.showViewer = true;
				})
			},
			updateNoduleList(params) {
				if (params.type === 'localAdd') {
					this.noduleList.push(params.data);
					this.setList();
				}
				this.isLocal = true;
			},
			setList() {
				let data = this.noduleList;
				for (let i = 0; i < data.length; i++) {
					// 获得每个结节中心帧数在总体中的index，并且为每个结节加上一个totalIndex属性
					let totalIndex;
					if (!data[i].totalIndex) {
						totalIndex = this.getLesionIndex(data[i].basename);
						this.$set(data[i], 'totalIndex', totalIndex);
					}
				}
				data.sort(function(a, b) {
					return a.totalIndex - b.totalIndex;
				});
				this.initLesionsByIndex();
			},
			initLesionsByIndex() {
				// 构造lesionByIndex 用于在canvas上绘制图形 结节信息按照所在层数Index排列，{1:[{},{}],20:[]}
				// key代表帧数，如果当前帧数上有超过一个结节，则此数组上添加个indexofCurrentZ属性
				// 代表这一帧当前高亮显示的结节,默认显示这个值
				let data = this.noduleList;
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
						pileStart = this.getLesionIndexByCoordZ(minIndex);
						pileEnd = this.getLesionIndexByCoordZ(maxIndex);
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
			getLesionIndexByCoordZ(index) {
				if (this.imgSort === 'top') {
					index = this.baseNames.length - index - 1;
				}
				return index;
			},
		}
	}
</script>
<style scoped lang="scss">
	.canvasContainer{
		top: 30% !important;
	}
	.scrollBar{
		bottom: 70px!important;
	}
	.example{
		height: 100%;
		width: 100%;
		background: #000;
	}
	.text ,.upload{
		color: white;
	}

	.main {
		height: calc(100% - 40px);
		width: 100%;
		position: relative;

		.dicom-info {
			position: absolute;
			color: #fff;
		}
	}
	.canvasNet{
		height: calc(100% - 40px);
		width: 100%;
	}
</style>
