<template>
	<section class="net-viewer">
		<div class="navbar">
			<div :class="{ active: activeNum === 1 }" @click="usingTool('亮度')">
				<i class="el-icon-magic-stick"></i>
				<i>{{ $t("toolEventName.brightness") }}</i>
			</div>
			<div :class="{ active: activeNum === 2 }" @click="usingTool('移动')">
				<i class="el-icon-position"></i>
				<i>{{ $t("toolEventName.move") }}</i>
			</div>
			<div :class="{ active: activeNum === 3 }" @click="usingTool('放大')">
				<i class="el-icon-search"></i>
				<i>{{ $t("toolEventName.zoom") }}</i>
			</div>
			<el-select
				@change="langChange"
				class="lang"
				v-model="lang"
				:placeholder="$t('message.sign.lang')"
			>
				<el-option
					v-for="item in langs"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				>
				</el-option>
			</el-select>
		</div>
		<main class="main">
			<div class="dicom-info" v-if="showInfo">
				<div style="display: flex; flex-direction: column">
					<span>{{ $t("message.dicom.index") }}:{{ $refs.dicomViewer.currentImageIndex + 1 }}/{{ baseNames.length }}</span>
					<span>{{ $t("message.dicom.wl") }}:{{ $refs.dicomViewer.ww }}HU</span>
					<span>{{ $t("message.dicom.ww") }}:{{ $refs.dicomViewer.wl }}HU</span>
				</div>
			</div>
			<dicom-viewer
				ref="dicomViewer"
				class="dicom-viewer"
				:leftMouse.sync="leftMouse"
				:baseNames="baseNames"
				:imageId="imageIds"
				dicomSource="network"
				:token="token"
				@viewerMounted="viewerMounted"
			></dicom-viewer>
		</main>
	</section>
</template>
<script>
	import {token, baseNames} from './data';
	import dicomViewer from '../../../../src/components/dicom-viewer/dicomViewer.vue';
	import api from '../request/api';

	export default {
		name: 'netViewer',
		components: {
			dicomViewer
		},
		data() {
			return {
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
			this.lang = localStorage.getItem('lang');
			window.addEventListener(
				'orientationchange',
				function () {

					// Announce the new orientation number

				}, false);
		},
		methods: {
			langChange(type){
				this.lang = type;
					localStorage.setItem('lang',type);
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
	};
</script>
<style scoped lang="scss">
	.lang{
		width: 100px !important;
		margin-left: 400px;
	}
	.net-viewer {
		height: 100%;

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
			width: 100%;

			.dicom-info {
				position: absolute;
				left: 20px;
				top: 50px;
				color: #fff;
			}
		}
	}
</style>
