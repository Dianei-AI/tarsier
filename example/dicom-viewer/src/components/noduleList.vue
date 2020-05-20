<template>
	<section class="nodule-list">
		<div class="bar">
			<span class="misJjudgement">误判</span>
			<span class="index">中心帧</span>
			<span class="size">大小</span>
			<span class="type">类型</span>
			<span class="risk">风险</span>
		</div>
		<div class="list">
			<ul ref="listArea" class="list-area">
				<li
					v-for="item in noduleList"
					:key="item.lesion_id"
					:class="{ active: currentNodule.lesion_id === item.lesion_id }"
					@click="seeLesionDetail(item)"
				>
					<span @click.stop="() => {}" class="misJjudgement">
						<el-checkbox v-model="item.misjudgment"></el-checkbox>
					</span>
					<span class="index">{{ item.totalIndex && item.totalIndex + 1 }}</span>
					<span class="size">
						<template v-if="!item.lesion.diameter">
							<span>/</span>
						</template>
						<template v-else>
							<span>{{ item.lesion.diameter }}</span>
						</template>
					</span>
					<span class="type">{{ item.lesion.feature_label }}</span>
					<span class="risk">{{ item.lesion.invision_classify ? item.lesion.invision_classify : '/' }}</span>
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
import perfectScrollBar from 'perfect-scrollbar';
export default {
	name: 'noduleList',
	props: {
		noduleList: {
			type: Array,
			default: () => []
		},
		currentNodule: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {};
	},
	filters: {
		transferProp(val) {
			let result = '';
			switch (val) {
				case '000':
					result = '全部类型';
					break;
				case '100':
					result = '肺内实性';
					break;
				case '200':
					result = '部分实性';
					break;
				case '300':
					result = '磨玻璃';
					break;
				case '400':
					result = '肺内钙化';
					break;
				case '500':
					result = '胸膜实性';
					break;
				case '600':
					result = '胸膜钙化';
					break;
				default:
					break;
			}
			return result;
		}
	},
	methods: {
		seeLesionDetail(item) {
			this.$emit('changeCurrentNodule', item, 'noduleCLick');
		}
	},
	mounted() {
		new perfectScrollBar(this.$refs.listArea);
	}
};
</script>

<style scoped lang="scss">
.nodule-list {
	width: 400px;
	height: 100%;
	padding-top: 2px;
	display: flex;
	flex-direction: column;
	.misJjudgement,
	.index {
		display: inline-block;
		width: 45px;
	}
	.size {
		display: inline-block;
		width: 150px;
	}
	.type,
	.risk {
		flex: 1;
	}
	.bar span {
		line-height: 40px;
		color: #fff;
		text-align: center;
		font-size: 14px;
	}
	.bar {
		display: flex;
		width: 100%;
		height: 40px;
		background: rgba(14, 43, 64, 1);
	}
	.list {
		flex: 1;
		width: 100%;
		margin-top: 2px;
		background: rgba(14, 43, 64, 1);
		.list-area {
			position: relative;
			height: 100%;
			overflow: hidden !important;
			overflow-anchor: none;
			touch-action: auto;
			li {
				display: flex;
				padding: 6px 1px;
				cursor: pointer;
				&:hover {
					background: #000;
					border: 1px solid #0e64d8;
					padding: 5px 0;
				}
				span {
					text-align: center;
					font-size: 14px;
					color: #fff;
				}
			}
			.active {
				background: #000;
				border: 1px solid #0e64d8;
				padding: 5px 0;
			}
		}
	}
}
</style>
