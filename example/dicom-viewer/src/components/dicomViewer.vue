<template>
	<section class="dn-pkg-dicom-viewer">
		<div
			class="dicom-viewer-main"
			@wheel="scroll($event)"
			@contextmenu="contextmenu($event)"
			@click="closeContextMenu"
		>
			<div class="canvasContainer">
				<div id="canvas" class="canvas dicom-canvas-box" ref="dicomImage"></div>
				<!--右键菜单栏-->
				<div class="contextmenu" ref="contextmenu">
					<ul>
						<!-- $t('message.dicom.list') -->
						<template>
							<li @click="hideLabel('isLabel')">
								{{ isLabel ? '隐藏标注' : '显示标注' }}
							</li>
						</template>
					</ul>
				</div>
				<!--加载进度条-->
				<div class="progress-container" v-if="dicomSource === 'network' && percentage !== 100">
					<el-progress class="progress" type="dashboard" :percentage="percentage"></el-progress>
					<div class="text">影像加载中</div>
				</div>
			</div>
			<!--滚动条-->
			<scroll-bar
				v-model="currentImageIndex"
				:noduleList="noduleList"
				:max="baseNames.length - 1"
				style="margin-right: 10px;"
			></scroll-bar>
		</div>
	</section>
</template>

<script>
	import scrollBar from './scrollBar.vue';
	import * as cornerstone from 'cornerstone-core';
	import * as cornerstoneMath from 'cornerstone-math';
	import * as cornerstoneDicomLoader from 'cornerstone-wado-image-loader';
	import dicomParser from 'dicom-parser';
	import Hammer from 'hammerjs';
	let cornerstoneTools = window.cornerstoneTools;
	let webWorkerManagerInited = false;
	const keyCode = {
		UP: 38,
		DOWN: 40,
		CTRL: 17
	};
	export default {
		name: 'DnDicomViewer',
		props: {
			roiBorderColor: {
				type: String,
				default: 'red'
			},
			rangeOfWWWl: {
				type: Object,
				default: () => ({})
			},
			dicomSource: {
				type: String,
				default: 'local'
			},
			token: {
				type: String
			},
			imageId: {
				type: Array,
				default: () => [],
			},
			baseNames: {
				type: Array,
				default: () => {},
				required: true
			},
			fileList: {
				type: Array,
				default: () => []
			},
			noduleList: {
				type: Array,
				default: () => []
			},
			lesionsByIndex: {
				type: Object,
				default: () => ({})
			},
			leftMouse: {
				type: String,
				default: 'Wwwc'
			},
			imgSort: {
				type: String,
				default: 'top'
			},
			tools: {
				type: Array,
				default: () => {
					return [
						'LengthTool',
						'MagnifyTool',
						'EllipticalRoiTool',
						'RectangleRoiTool',
						'FreehandMouseTool',
						'EraserTool',
						'ZoomMouseWheelTool',
						'PanTool',
						'WwwcTool',
						'ZoomTouchPinchTool'
					];
				}
			},
			ww: {
				type: Number
			},
			wl: {
				type: Number
			},
			windowSetting: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				element: '',
				currentImageIndex: 0,
				currentNodule: {},
				markNoduleInfo: {
					lesion: {}
				},
				wheelState: 'scroll',
				zoomScale: 1,
				keyStatus: 1,
				mouseClick: '',
				lastTool: '',
				isCornerstoneDrawing: false,
				isLabel: true,
				requestList: '',
				loadedNum: 0,
				loadErrorFrame: {},
				imageIds: []
			};
		},
		computed: {
			percentage() {
				return parseInt((this.loadedNum / this.baseNames.length).toFixed(2) * 100);
			}
		},
		watch: {
			wheelState(newVal) {
				if (newVal === 'zoom') {
					cornerstoneTools.setToolActive('ZoomMouseWheel', { mouseButtonMask: 1 });
				}
				if (newVal === 'scroll') {
					cornerstoneTools.setToolEnabled('ZoomMouseWheel');
				}
			},
			leftMouse: {
				handler(val, old) {
					if (val === 'markNodule') {
						this.$refs.dicomImage.style.cursor = 'crosshair';
						this.$emit('update:leftMouse', 'markNodule');
						this.markNoduleOn = true;
						this.element.addEventListener('cornerstonetoolsmousedown', this.handleMarkNodule);
						this.element.addEventListener('cornerstonetoolsmouseup', this.handleMarkNodule);
					}
					if (old === 'markNodule') {
						this.$refs.dicomImage.style.cursor = 'default';
						this.element.removeEventListener('cornerstonetoolsmousedown', this.handleMarkNodule);
						this.element.removeEventListener('cornerstonetoolsmouseup', this.handleMarkNodule);
					}
					old && cornerstoneTools.setToolEnabled(old);
					cornerstoneTools.setToolActive(val, { mouseButtonMask: 1 });
				}
			},
			currentImageIndex(val) {
				if (this.loadErrorFrame[this.imageIds[this.currentImageIndex]] === 'loadError') {
					this.$message.error(`第${this.currentImageIndex + 1}帧图像未成功加载，请查看其他帧数图像！`);
				}
				if (val > this.baseNames.length - 1) {
					this.currentImageIndex = 0;
					return false;
				}
				if (val < 0) {
					this.currentImageIndex = this.baseNames.length - 1;
					return false;
				}
				// todo 未成功加载的帧数重新加载
				// if (this.loadErrorFrame[this.imageIds[newVal]]) {
				//     this.reloadFrame(newVal, old);
				//     return;
				// }
				if (this.isCached(val) || this.dicomSource === 'local') {
					this.renderImage(val); //渲染图片
					this.updateCurrentLesionInfo(val);
				}
				this.$emit('changImageIndex', val);
			}
		},
		methods: {
			updateNoduleList(params) {
				this.$emit('updateNoduleList', params);
			},
			// 更新当前结节信息,如果当前index里没有结节则赋值空的,如果没有加载完则不更新
			updateCurrentLesionInfo(totalIndex) {
				if (this.lesionsByIndex[totalIndex]) {
					let lesions = this.lesionsByIndex[totalIndex];
					let nodule = {};
					// 代表有当前帧数上有两个结节
					if (lesions.length > 1) {
						// indexofCurrentZ 是数组的属性
						nodule = lesions[lesions.indexofCurrentZ];
					} else {
						nodule = lesions[0];
					}
					this.currentNodule = nodule;
				} else {
					this.currentNodule = {};
				}
			},
			changeCurrentNodule(item, type) {
				this.currentNodule = item;
				if (type === 'noduleCLick') {
					let lesions = this.lesionsByIndex[item.totalIndex];
					if (lesions && lesions.length > 1) {
						// 设置indexofCurrentZ是为了考虑一帧图有多个结节的情况
						lesions.indexofCurrentZ = lesions.findIndex((val) => val.lesion_id === item.lesion_id);
					}
					if (this.currentImageIndex === item.totalIndex) {
						this.renderFromSameImage();
					} else {
						this.currentImageIndex = item.totalIndex;
					}
				}
			},
			renderFromSameImage() {
				let lesions = this.lesionsByIndex[this.currentNodule.totalIndex];
				lesions.indexofCurrentZ = lesions.findIndex((item) => {
					return item.lesion_id === this.currentNodule.lesion_id;
				});
				this.renderImage(this.currentImageIndex);
			},
			isCached(indexOfbaseNames) {
				let cachedImage = cornerstone.imageCache.imageCache,
					imageId = this.imageIds[indexOfbaseNames];
				if (cachedImage[imageId] && cachedImage[imageId].loaded) {
					return true;
				}
				return false;
			},
			getLesionIndexByCoordZ(index) {
				if (this.imgSort === 'top') {
					index = this.baseNames.length - index - 1;
				}
				return index;
			},
			initImageIds() {
				if (this.dicomSource === 'local') {
					for (let i = 0; i < this.fileList.length; i++) {
						this.imageIds.push(cornerstoneDicomLoader.wadouri.fileManager.add(this.fileList[i]));
					}
				} else {
					this.imageIds = this.imageId;
				}
			},
			renderFirstImage() {
				let FIRST_NODULE_INDEX;
				if (this.noduleList.length === 0) {
					FIRST_NODULE_INDEX = 0;
				} else {
					FIRST_NODULE_INDEX = this.noduleList[0].totalIndex;
				}
				this.currentImageIndex = FIRST_NODULE_INDEX;
				this.renderImage(FIRST_NODULE_INDEX)
					.catch(() => {
						this.loadErrorFrame[this.imageIds[FIRST_NODULE_INDEX]] = 'loadError';
						this.$message.error(`第${this.currentImageIndex + 1}帧图像未成功加载，请查看其他帧数图像！`);
					})
					.finally(() => {
						if (this.dicomSource === 'network') {
							this.initRequestList();
							this.loadImageRequests();
						}
					});
			},
			cornerstoneConfig() {
				cornerstoneDicomLoader.external.cornerstone = cornerstone;
				cornerstoneDicomLoader.external.dicomParser = dicomParser;
				cornerstoneTools.external.cornerstone = cornerstone;
				cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
				cornerstoneTools.external.Hammer = Hammer;
				cornerstoneTools.init();
				// 网络请求头信息
				if (this.dicomSource === 'network' && this.token) {
					cornerstoneDicomLoader.configure({
						beforeSend: (xhr) => {
							xhr.setRequestHeader('DN-Token', this.token);
						}
					});
				}
				// webWorkerManager init
				if (!webWorkerManagerInited) {
					cornerstoneDicomLoader.webWorkerManager.initialize({
						maxWebWorkers: window.navigator.hardwareConcurrency || 4,
						webWorkerPath: '/cornerstone/cornerstoneWebWorker.min.js',
						taskConfiguration: {
							decodeTask: {
								codecsPath: '/cornerstone/cornerstoneLoaderCodecs.min.js'
							}
						}
					});
					webWorkerManagerInited = true;
				}
				cornerstone.enable(this.element);
				// 添加工具
				this.tools.forEach((val) => {
					cornerstoneTools.addTool(cornerstoneTools[val]);
				});
				cornerstoneTools.setToolActive(this.leftMouse, { mouseButtonMask: 1 });
				const { EVENTS } = cornerstoneTools;
				this.element.addEventListener('cornerstoneimagerendered', this.imageRendered);
				this.element.addEventListener(EVENTS.MEASUREMENT_ADDED, this.measurementAdd);
				this.element.addEventListener(EVENTS.MEASUREMENT_COMPLETED, this.measurementCompleted);
				this.element.addEventListener(EVENTS.MOUSE_CLICK, this.handleCanvasClick);
			},
			measurementAdd() {
				this.isCornerstoneDrawing = true;
			},
			measurementCompleted() {
				this.isCornerstoneDrawing = false;
			},
			handleCanvasClick(e) {
				if (this.dicomSource === 'network') return;
				if (e.detail.event && e.detail.event.which === 3) {
					this.contextmenu(null, e);
				}
			},
			renderImage(index) {

				if (this.dicomSource === 'source') {
					return this.renderLocalImage(index);
				} else {
					return this.renderNetImage(index);
				}
			},
			renderLocalImage(index) {
				return cornerstone.loadImage(this.imageIds[index]).then((image) => {
					let viewport = cornerstone.getViewport(this.element);
					cornerstone.displayImage(this.element, image, viewport);
					if (this.windowSetting) {
						this.setWindow(this.ww, this.wl);
					}
				});
			},
			renderNetImage(index) {
				let imageIndex = index || this.currentImageIndex;
				return cornerstone.loadAndCacheImage(this.imageIds[imageIndex]).then((image) => {
					let viewport = cornerstone.getViewport(this.element);
					cornerstone.displayImage(this.element, image, viewport);
					if (this.windowSetting) {
						this.setWindow(this.ww, this.wl);
					}
				});
			},
			setWindow(ww, wl) {
				let viewport = cornerstone.getViewport(this.element);
				viewport.voi.windowWidth = ww;
				viewport.voi.windowCenter = wl;
				cornerstone.setViewport(this.element, viewport);
			},
			initRequestList() {
				// set避免重复结节
				let renderSet = new Set();
				if (this.noduleList.length === 0) {
					for (let i = 1; i < this.frame + 1; i++) {
						renderSet.add(this.imageIds[i]);
					}
				} else {
					// 优先加载结节所在帧数的影像
					for (let i = 1; i < this.noduleList.length; i++) {
						let index = this.getLesionIndex(this.noduleList[i].basename);
						renderSet.add(this.imageIds[index]);
					}
					// 其次加载所有结节上下5帧
					this.noduleList.forEach((val) => {
						let index = this.getLesionIndex(val.basename),
							pre = index - 1,
							next = index + 1;
						for (let i = 0; i < this.frame; i++) {
							this.imageIds[pre] && renderSet.add(this.imageIds[pre]);
							this.imageIds[next] && renderSet.add(this.imageIds[next]);
							pre--;
							next++;
						}
					});
				}
				// 加载完结节所在帧数和上下5帧后，开始加载其他的
				for (let i = 0; i < this.imageIds.length; i++) {
					renderSet.add(this.imageIds[i]);
				}
				this.requestList = renderSet;
			},
			loadImageRequests(firstCall = true) {

				// http1.1限制浏览器最多同时处理6个请求
				// 为了方便医生在加载图像时进行其他异步操作，因此最多同时处理5个影像请求
				let count = 0;
				let ids = [];
				if (firstCall) {
					for (let i of this.requestList) {
						count += 1;
						ids.push(i);
						if (count === 5) {
							break;
						}
					}
				} else {
					ids = [this.requestList.values().next().value];
				}
				this.getImages(ids);
			},
			getImages(ids) {
				for (let i of ids) {
					this.requestList.delete(i);
					cornerstone
						.loadAndCacheImage(i)
						.then(() => {})
						.catch(() => {
							this.loadErrorFrame[i] = 'loadError';
						})
						.finally(() => {
							this.loadedNum = this.loadedNum + 1;
							if (this.requestList.size) {
								this.loadImageRequests(false);
							}
						});
				}
			},
			contextmenu(e, customEvent) {
				// 在使用freehand工具时，因为此工具可以随便画一个闭合的区域
				// 然后可以用一种特定的方法在未绘制完成时点出带有删除标记的菜单
				// 这时如果删除了，会导致cornerstoneTools内部报错，其他工具都无法使用。
				// 2020/3/26：
				// 注意一点，绘制的时候是会触发cornerstone的modify和complete事件
				// 但是绘制完成后对图像进行拖动操作只会触发modify事件，不会触发complete事件
				e && e.preventDefault();
				if (this.isCornerstoneDrawing) return;
				if (customEvent) {
					let style = this.$refs.contextmenu.style;
					style.display = 'block';
					style.top = customEvent.detail.currentPoints.canvas.y + 'px';
					style.left = customEvent.detail.currentPoints.canvas.x + 'px';
					customEvent.preventDefault();
				}
				return false;
			},
			hideLabel(type, e) {
				e && e.stopPropagation();
				this[type] = !this[type];
				if (type !== 'isLabel') {
					this.isLabel = !(!this.showBorder && !this.showStroke);
				} else {
					this.showBorder = this.isLabel;
					this.showStroke = this.isLabel;
				}
				this.closeContextMenu();
				this.renderFromSameImage(this.currentImageIndex);
			},
			closeContextMenu() {
				this.$refs.contextmenu.style.display = 'none';
				this.toolData = {
					name: '',
					data: ''
				};
			},
			// 滚动事件，用于滚动切换图像
			scroll: (function() {
				let allowScroll = true;
				let timer;
				return function(e) {
					// 用来滚动图片的时候控制下速度，不然滚的太快了
					if (!timer) {
						timer = setTimeout(() => {
							timer = null;
							allowScroll = true;
						}, 200);
					}
					e.stopPropagation();
					e.preventDefault();
					if (this.wheelState !== 'scroll') {
						return false;
					} else if (allowScroll) {
						allowScroll = false;
						let direct = e.deltaY > 0 ? 'up' : 'down';
						if (direct === 'up') {
							this.currentImageIndex = this.currentImageIndex + 1;
						}
						if (direct === 'down') {
							this.currentImageIndex = this.currentImageIndex - 1;
						}
					}
				};
			})(),
			imageRendered(e) {
				if (this.markNoduleOn) {
					this.draw(this.event);
				}
				var viewport = cornerstone.getViewport(e.target);
				let ww = Math.round(viewport.voi.windowWidth);
				let wl = Math.round(viewport.voi.windowCenter);
				// 设置窗宽窗位最大最小值
				if (this.rangeOfWWWl.ww && this.rangeOfWWWl.wl) {
					if (ww > this.rangeOfWWWl.ww.max) {
						viewport.voi.windowWidth = this.rangeOfWWWl.ww.max;
					} else if (ww < this.rangeOfWWWl.ww.min) {
						viewport.voi.windowWidth = this.rangeOfWWWl.ww.min;
					} else if (wl > this.rangeOfWWWl.wl.max) {
						viewport.voi.windowCenter = this.rangeOfWWWl.wl.max;
					} else if (wl < this.rangeOfWWWl.wl.min) {
						viewport.voi.windowCenter = this.rangeOfWWWl.wl.min;
					}
				}
				this.$emit('update:ww', Math.round(viewport.voi.windowWidth));
				this.$emit('update:wl', Math.round(viewport.voi.windowCenter));
				this.zoomScale = viewport.scale;
				let lesions = this.lesionsByIndex[this.currentImageIndex];
				if (lesions) {
					this.paintRoi(e.detail.canvasContext, lesions);
					this.paintRectAndSetMouseClick(e.detail.canvasContext, lesions, this.currentImageIndex);
				}
			},
			paintRoi(ctx, arrs) {
				if (!this.isLabel) return;
				ctx.save();
				ctx.beginPath();
				ctx.strokeStyle = this.roiBorderColor;
				ctx.lineWidth = 0.5;
				for (let i = 0; i < arrs.length; i++) {
					if (arrs[i].status !== 'create') {
						let index = this.getLesionIndexByCoordZ(this.currentImageIndex);
						let roi = arrs[i].lesion.rois[index];
						let coords = roi.contour_coords;
						for (let j = 0; j < coords.length; j++) {
							if (j === 0) {
								ctx.moveTo(Math.ceil(coords[j][1]), Math.ceil(coords[j][0]));
							} else {
								ctx.lineTo(Math.ceil(coords[j][1]), Math.ceil(coords[j][0]));
							}
						}
						ctx.closePath();
						ctx.stroke();
					}
				}
				ctx.restore();
			},
			paintRectAndSetMouseClick(ctx, arrs, currentImageIndex) {
				if (!this.isLabel) return;
				let currentIndex = arrs.indexofCurrentZ; //indexofCurrentZ只有当前结节列表大于1的时候才有值
				const LINE_WIDTH = 1;
				const RADIUS_MIN = 8;
				const HIGHLIGHT_BORDER_COLOR = 'yellow';
				const BORDER_COLOR = '#fff';
				let mouseClick = [];
				ctx.save();
				ctx.beginPath();
				ctx.strokeStyle = BORDER_COLOR;
				ctx.lineWidth = LINE_WIDTH;
				for (let i = 0; i < arrs.length; i++) {
					let x = arrs[i].lesion.coordX;
					let y = arrs[i].lesion.coordY;
					let width = Math.max(arrs[i].lesion.diameter_x, RADIUS_MIN);
					let height = Math.max(arrs[i].lesion.diameter_y, RADIUS_MIN);
					// 当前高亮的那个用黄颜色绘制
					if (i === currentIndex) {
						ctx.save();
						ctx.beginPath();
						ctx.strokeStyle = HIGHLIGHT_BORDER_COLOR;
						ctx.lineWidth = LINE_WIDTH;
						ctx.strokeRect(x - width, y - height, width * 2, height * 2);
						ctx.restore();
					} else if (arrs[i].status === 'create') {
						ctx.strokeStyle = this.markNoduleColor;
						ctx.strokeRect(x - width, y - height, width * 2, height * 2);
					} else {
						ctx.strokeRect(x - width, y - height, width * 2, height * 2);
					}
					// 如果是多于一个结节的话则设置当前帧数里的indexofCurrentZ,以及坐标方便计算鼠标能不能点到
					if (arrs.length > 1) {
						mouseClick.push({
							indexofCurrentZ: i,
							currentImageIndex,
							x,
							y,
							width,
							height
						});
					}
				}
				this.mouseClick = mouseClick;
				ctx.restore();
			},
			handleKeyDown(e) {
				if (e.keyCode === keyCode.CTRL && !this.lastTool) {
					this.lastTool = this.leftMouse;
					this.$emit('update:leftMouse', 'Pan');
					this.wheelState = 'zoom';
				}
			},
			handleKeyUp(e) {
				switch (e.keyCode) {
					case keyCode.UP: //上键
						if (this.keyStatus === 1) {
							this.currentImageIndex -= 1;
						}
						break;
					case keyCode.DOWN: //下键
						if (this.keyStatus === 1) {
							this.currentImageIndex += 1;
						}
						break;
					case keyCode.CTRL:
						// ctrl弹起后，重新设置ctrl+鼠标左键是控制窗宽床位，滚轮变成翻页功能
						if (e.keyCode === keyCode.CTRL) {
							this.$emit('update:leftMouse', this.lastTool);
							this.wheelState = 'scroll';
							this.lastTool = '';
						}
						break;
					default:
						break;
				}
			}
		},
		mounted: function () {
			this.$emit('viewerMounted');
			this.element = this.$refs.dicomImage;
			this.initImageIds();
			this.cornerstoneConfig();
			this.renderFirstImage();
			window.addEventListener('keyup', this.handleKeyUp);
			window.addEventListener('keydown', this.handleKeyDown);
		},
		beforeDestroy() {
			cornerstoneDicomLoader.webWorkerManager.terminate();
			cornerstone.imageCache.purgeCache();
			window.removeEventListener('keyup', this.handleKeyUp);
			window.removeEventListener('keydown', this.handleKeyDown);
		},
		components: {
			scrollBar
		}
	};
</script>

<style lang="scss" src="./dicomViewer.scss"></style>
