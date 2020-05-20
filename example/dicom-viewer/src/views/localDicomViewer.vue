<template>
	<div class="home">
		<div class="navbar">
			<label class="upload" for="selectFile">
				<span class="iconfont add-file">&#xe642;</span>
			</label>
			<input
				style="display: none"
				type="file"
				id="selectFile"
				@change="selectFolder($event.target.files)"
				webkitdirectory
			/>
			<label class="upload" for="selectJSON">
				<span class="iconfont add-file">&#xe66e;</span>
			</label>
			<input
				style="display: none"
				type="file"
				id="selectJSON"
				@change="selectJSON($event.target.files)"
				webkitdirectory
			/>
			<span
				class="tool icon-magnify "
				@click="selectTool('Magnify')"
				:class="{ active: leftMouse === 'Magnify' }"
			></span>
			<!--			<span-->
			<!--				class="tool icon-length "-->
			<!--				@click="selectTool('Length')"-->
			<!--				:class="{ active: leftMouse === 'Length' }"-->
			<!--			></span>-->
			<!--			<span-->
			<!--				class="tool icon-eraser "-->
			<!--				@click="selectTool('Eraser')"-->
			<!--				:class="{ active: leftMouse === 'Eraser' }"-->
			<!--			></span>-->
			<span
				class="tool icon-markNodule "
				@click="selectTool('markNodule')"
				:class="{ active: leftMouse === 'markNodule' }"
			></span>
			<span class="tool icon-export" @click="exportJson('markNodule')"></span>
		</div>
		<main class="main" v-if="showViewer">
			<div class="dicom-info" v-if="showInfo">
				<div style="display: flex; flex-direction: column">
					<span>帧数:{{ $refs.dicomViewer.currentImageIndex + 1 }}/{{ fileList.length }}</span>
					<span>窗宽:{{ $refs.dicomViewer.ww }}HU</span>
					<span>窗位:{{ $refs.dicomViewer.wl }}HU</span>
				</div>
			</div>
			<dicom-viewer
				class="dicom-viewer"
				:leftMouse.sync="leftMouse"
				:baseNames="baseNames"
				:noduleList="noduleList"
				:fileList="fileList"
				:lesionsByIndex="lesionsByIndex"
				:imgSort="imgSort"
				@updateNoduleList="updateNoduleList"
				@viewerMounted="viewerMounted"
				ref="dicomViewer"
			></dicom-viewer>
		</main>
	</div>
</template>

<script>
import dicomViewer from '../../../../src/components/dicom-viewer/dicomViewer.vue';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
// import Hammer from 'hammerjs';
export default {
	name: 'Home',
	data() {
		return {
			JSONData: {},
			fileList: '',
			fileReader: '',
			noduleList: [],
			imageIds: [],
			baseNames: [],
			lesionsByIndex: {},
			showViewer: false,
			showInfo: false,
			imgSort: 'bottom',
			leftMouse: 'Wwwc',
			folderName: ''
		};
	},
	watch: {
		showViewer(val) {
			if (val) {
				this.setList();
			}
		}
	},
	mounted: function () {
	},
	methods: {
		viewerMounted() {
			this.showInfo = true;
		},
		updateNoduleList(params) {
			if (params.type === 'localAdd') {
				this.noduleList.push(params.data);
				this.setList();
			}
		},
		exportJson() {
			if (this.noduleList.length === 0) {
				return;
			}
			let data = this.noduleList.map((item) => {
				if (item.misjudgment) {
					item.lesion.misjudgment = item.misjudgment;
				}
				if (item.status === 'create') {
					item.lesion.status = item.status;
				}
				return item.lesion;
			});
			let json = {
				data: {
					nodule_info: data
				}
			};
			let link = document.createElement('a');
			link.download = `${this.folderName}.json`;
			link.href = 'data:text/plain,' + JSON.stringify(json);
			link.click();
		},
		selectTool(tool) {
			if (!this.showViewer) return;
			if (this.leftMouse === tool) {
				this.leftMouse = 'Wwwc';
			} else {
				this.leftMouse = tool;
			}
		},
		// 获得结节的在所有ct片里的index
		getLesionIndex(baseName) {
			return this.baseNames.indexOf(baseName);
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
		getLesionIndexByCoordZ(index) {
			if (this.imgSort === 'top') {
				index = this.baseNames.length - index - 1;
			}
			return index;
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
		selectJSON(files) {
			files = Object.values(files);
			let DSStoreIndex = files.findIndex((item) => {
				return item.name.indexOf('DS_Store') !== -1;
			});
			files.splice(DSStoreIndex, 1);
			this.JSONData = {};
			let num = 0;
			for (let i = 0; i < files.length; i++) {
				if (files[i].type !== 'application/json') {
					this.$message.warning('请确保文件夹内的文件为JSON格式！');
					this.JSONData = {};
					return;
				}
				let key = files[i].name.replace('.json', '');
				let fileReader = new FileReader();
				fileReader.onload = (e) => {
					this.JSONData[key] = JSON.parse(e.target.result).data.nodule_info.map((item) => {
						return {
							status: item.status,
							misjudgment: item.misjudgment,
							lesion_id:
								item.lesion_id ||
								'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
									let r = (Math.random() * 16) | 0;
									let v = c === 'x' ? r : (r & 0x3) | 0x8;
									return v.toString(16);
								}),
							lesion: item,
							totalIndex: item.coordZ
						};
					});
					num += 1;
					if (num === files.length) {
						this.$message.success('JSON数据加载完毕！');
						if (this.folderName) {
							this.noduleList = this.JSONData[this.folderName]
						}
					}
				};
				fileReader.readAsText(files[i]);
			}
		},

		selectFolder(files) {
			// eslint-disable-next-line no-debugger
			if (files.length === 0) return;
			this.folderName = files[0].webkitRelativePath.split('/')[0];
			this.showViewer = false;
			this.showInfo = false;
			this.fileList = Object.values(files);
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
		}
	},
	components: {
		dicomViewer
	}
};
</script>
<style lang="scss" scoped>
	div{
		margin-top: 10px;
	}
.home {
	height: 100%;
	width: 100%;
	background: #000;
	.navbar {
		height: 40px;
		width: 100%;
		background: rgba(14, 43, 64, 1);
		color: #fff;
		font-size: 16px;
		.upload {
			cursor: pointer;
			margin-left: 20px;
			span {
				font-size: 24px;
				line-height: 40px;
			}
		}
		.tool {
			font-size: 24px;
			margin-left: 20px;
			cursor: pointer;
		}
		.active {
			color: #0e64d8;
		}
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
	.icon-magnify {
		&:after {
			content: '\e8b0';
		}
	}
	.icon-length {
		&:after {
			content: '\e61b';
		}
	}
	.icon-markNodule {
		&:after {
			content: '\e604';
		}
	}
	.icon-eraser {
		&:after {
			content: '\e67a';
		}
	}
	.icon-export {
		&:after {
			content: '\e664';
		}
	}
}
</style>
