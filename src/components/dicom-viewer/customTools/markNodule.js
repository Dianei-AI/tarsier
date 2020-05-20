// 标注工具相关代码
import cornerstone from 'cornerstone-core';
export const noduleMark = {
	data() {
		return {
			markNoduleOn: false,
			markNoduleInfo: {
				lesion: {}
			},
			mousePosition: {
				x: 0,
				y: 0
			},
			isMousedown: false,
			showMarkDialog: false,
			markNoduleColor: '#fb6800',
			// 结节类型
			propType: {
				// todo
				'000': '全部类型',
				'100': '肺内实性',
				'200': '部分实性',
				'300': '磨玻璃',
				'400': '肺内钙化',
				'500': '胸膜实性',
				'600': '胸膜钙化'
			}
		};
	},
	computed: {
		markDialogStyle() {
			// 弹框出现的位置需要计算一下
			let mainWidth = document.querySelector('.dicom-viewer-main').offsetWidth;
			let mainHeight = document.querySelector('.dicom-viewer-main').offsetHeight;
			let canvasWidth = document.querySelector('.dicom-canvas-box').offsetWidth;
			let canvasHeight = document.querySelector('.dicom-canvas-box').offsetHeight;
			let offsetWidth = (mainWidth - canvasWidth) / 2;
			let offsetHeight = (mainHeight - canvasHeight) / 2;
			let left = this.mousePosition.x - offsetWidth;
			let top = this.mousePosition.y - offsetHeight;
			return {
				position: 'fixed',
				left: `${left}px`,
				top: `${top - 20}px`
			};
		}
	},
	methods: {
		handleMarkNodule(e) {
			const x = e.detail.currentPoints.image.x;
			const y = e.detail.currentPoints.image.y;
			if (e.type === 'cornerstonetoolsmousedown') {
				// cornerstonetoolsmouseup事件在点击的时候不触发，
				// 因此添加一个标识位来做点击和拖动的区分;
				if (this.isMousedown) {
					this.resetStatus();
					return;
				}
				!this.showMarkDialog && (this.isMousedown = !this.isMousedown);
				// 有弹出框时判断鼠标位置进行图像拖动操作，无弹出框时进行画图操作
				if (this.showMarkDialog) {
					// 判断鼠标位置是否在绘制的矩形内
					// 区分X从左往右，从右往左; Y从上到下，从下到上的情况
					let beginX = Math.min(this.markNoduleInfo.beginX, this.markNoduleInfo.endX);
					let endX = Math.max(this.markNoduleInfo.beginX, this.markNoduleInfo.endX);
					let startY = Math.min(this.markNoduleInfo.beginY, this.markNoduleInfo.endY);
					let endY = Math.max(this.markNoduleInfo.beginY, this.markNoduleInfo.endY);
					if (!(x > beginX && x < endX && y > startY && y < endY)) {
						return;
					}
					this.$refs.dicomImage.style.cursor = 'move';
					this.markNoduleInfo.moveBeginX = x;
					this.markNoduleInfo.moveBeginY = y;
				} else {
					// 绘制
					this.markNoduleInfo.beginX = x;
					this.markNoduleInfo.beginY = y;
				}
				cornerstone.enable(this.element);
				this.element.addEventListener('cornerstonetoolsmousemove', this.moveListener);
			} else if (e.type === 'cornerstonetoolsmouseup') {
				this.resetStatus();
			}
		},
		resetStatus() {
			this.$refs.dicomImage.style.cursor = 'crosshair';
			this.isMousedown = false;
			this.element.removeEventListener('cornerstonetoolsmousemove', this.moveListener);
			this.showMarkDialog = true;
		},
		moveListener(e) {
			this.event = e;
			// 每次拖动、绘制都重置画布上的canvas，画图在imageRendered方法中执行
			cornerstone.updateImage(this.element, true);
		},
		draw(e) {
			if (!e) return;
			if (this.showMarkDialog && this.markNoduleInfo.moveBeginX) {
				// 拖动矩形的情况
				let offsetX = e.detail.currentPoints.image.x - this.markNoduleInfo.moveBeginX;
				let offsetY = e.detail.currentPoints.image.y - this.markNoduleInfo.moveBeginY;
				// 矩形平移
				this.markNoduleInfo.beginX += offsetX;
				this.markNoduleInfo.beginY += offsetY;
				this.markNoduleInfo.endX += offsetX;
				this.markNoduleInfo.endY += offsetY;
				// 弹框的平移
				this.mousePosition.x =
					this.markNoduleInfo.endX - this.markNoduleInfo.moveBeginX + e.detail.currentPoints.client.x;
				this.mousePosition.y =
					this.markNoduleInfo.endY - this.markNoduleInfo.moveBeginY + e.detail.currentPoints.client.y;
				// 更新鼠标位置信息
				this.markNoduleInfo.moveBeginX += offsetX;
				this.markNoduleInfo.moveBeginY += offsetY;
			} else {
				// 绘制矩形的情况
				this.markNoduleInfo.endX = e.detail.currentPoints.image.x;
				this.markNoduleInfo.endY = e.detail.currentPoints.image.y;
				this.mousePosition.x = e.detail.currentPoints.client.x;
				this.mousePosition.y = e.detail.currentPoints.client.y;
			}
			const width = this.markNoduleInfo.endX - this.markNoduleInfo.beginX;
			const height = this.markNoduleInfo.endY - this.markNoduleInfo.beginY;
			let canvas = this.$refs.dicomImage.children[0];
			let ctx = canvas.getContext('2d');
			ctx.save();
			ctx.beginPath();
			ctx.strokeStyle = this.markNoduleColor;
			ctx.lineWidth = 1;
			ctx.strokeRect(this.markNoduleInfo.beginX, this.markNoduleInfo.beginY, width, height);
			ctx.restore();
		},
		cancelAddLesion() {
			this.event = '';
			this.showMarkDialog = false;
			cornerstone.updateImage(this.element, true);
		},
		// canvas生成图片
		canvasToImage(canvas) {
			let image = new Image();
			image.src = canvas.toDataURL('image/png');
			return image.src;
		},
		// canvas图片生成Blob对象
		dataURLToBlob(dataurl) {
			var arr = dataurl.split(',');
			var mime = arr[0].match(/:(.*?);/)[1];
			var bstr = atob(arr[1]);
			var n = bstr.length;
			var u8arr = new Uint8Array(n);
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}
			return new Blob([u8arr], { type: mime });
		},
		confirmAddLesion() {
			// 未选择结节类型
			if (!this.markNoduleInfo.lesion.feature_label) {
				this.$message.warning('请选择结节类型');
				return;
			}
			// 计算并添加一些必要的字段
			// coordX, coordY为中心点的坐标；diameter_x, diameter_y分别为x, y一半的边长
			this.markNoduleInfo.basename = this.baseNames[this.currentImageIndex];
			this.markNoduleInfo.lesion.coordX =
				this.markNoduleInfo.beginX + (this.markNoduleInfo.endX - this.markNoduleInfo.beginX) / 2;
			this.markNoduleInfo.lesion.coordY =
				this.markNoduleInfo.beginY + (this.markNoduleInfo.endY - this.markNoduleInfo.beginY) / 2;
			this.markNoduleInfo.lesion.diameter_x = Math.abs(
				(this.markNoduleInfo.endX - this.markNoduleInfo.beginX) / 2
			);
			this.markNoduleInfo.lesion.diameter_y = Math.abs(
				(this.markNoduleInfo.endY - this.markNoduleInfo.beginY) / 2
			);
			this.markNoduleInfo.index = this.noduleList.length;
			this.markNoduleInfo.totalIndex = this.currentImageIndex;
			// todo
			this.markNoduleInfo.lesion_id = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				let r = (Math.random() * 16) | 0;
				let v = c === 'x' ? r : (r & 0x3) | 0x8;
				return v.toString(16);
			});
			this.markNoduleInfo.status = 'create';
			// todo
			this.markNoduleInfo.lesion.coordZ = this.currentImageIndex;
			this.$emit('updateNoduleList', { type: 'localAdd', data: this.markNoduleInfo });
			this.showMarkDialog = false;
			this.$emit('update:leftMouse', 'Wwwc');
		}
	}
};
