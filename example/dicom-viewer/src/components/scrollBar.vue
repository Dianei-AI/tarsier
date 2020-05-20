<template>
	<div class="scrollBar">
		<vue-slider
			v-model="index"
			:marks="marks"
			:min="0"
			:max="max"
			:hide-label="true"
			tooltip="none"
		></vue-slider>
	</div>
</template>

<script>
import vueSlider from 'vue-slider-component';
export default {
	name: 'scrollBar',
	props: {
		value: {
			type: Number
		},
		noduleList: {
			type: Array
		},
		max: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {};
	},
	computed: {
		index: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('input', val);
			}
		},
		marks() {
			return [...new Set(this.noduleList.map((val) => val.totalIndex))];
		}
	},
	components: {
		vueSlider
	}
};
</script>

<style lang="scss">
.scrollBar {
	position: absolute;
	bottom: 400px;
	right: 0;
	width: calc(100% - 20px);
	height: 0.6rem;
	.vue-slider {
		height: 0.3rem !important;
		padding: 0 !important;
		width: 100% !important;
		.vue-slider-rail {
			background-color: rgba(14, 43, 64, 1);
			border-radius: 15px;
			.vue-slider-process {
				width: 0.3rem ;
				background-color: rgba(14, 100, 216, 1);
				border-radius: 15px;
			}
			.vue-slider-dot {
				background-color: rgba(14, 100, 216, 1);
				height: 30px !important;
				border: 1px solid rgba(107, 146, 244, 1);
				cursor: pointer;
				z-index: 6;
			}
			.vue-slider-marks {
				width: 100% !important;
				.vue-slider-mark {
					background-color: #d4572a;
					z-index: 5;
					height: 0.4rem !important;
					cursor: pointer;
					margin: 0 auto;
				}
			}
		}
	}
}
</style>
