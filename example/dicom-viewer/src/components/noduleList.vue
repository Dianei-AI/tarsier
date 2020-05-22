<template>
	<section class="aside-list">
		<section class="nodule-list">
			<div class="listArea">
				<div class="caption">
					<el-checkbox class="checkbox" v-model="selectAll" @change="changeAllSelect"></el-checkbox>
					<!-- 帧 -->
					<span @click="numSort('totalIndex')" class="num">
						{{ $t('message.dicom.num') }}
						<span v-show="listSort.totalIndex" class="el-icon-caret-top"></span>
						<span v-show="!listSort.totalIndex" class="el-icon-caret-bottom"></span>
					</span>
					<!-- 大小 -->
					<span class="prop">
						{{ $t('message.dicom.prop') }}
					</span>
					<!-- 类型 -->
					<!-- 这边不用NoduleLists的原因是因为noduleLists可能为空 -->
					<el-select v-model="propValue" class="type" :placeholder="$t('message.dicom.noduleType')">
						<el-option
							v-for="item in propOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
					<!-- maligant or benign -->
					<!-- 风险 -->
					<span @click="numSort('maligant')" class="mali-beni">
						{{ $t('message.dicom.mali_beni') }}
						<span v-show="listSort.maligant" class="el-icon-caret-top"></span>
						<span v-show="!listSort.maligant" class="el-icon-caret-bottom"></span>
					</span>
					<!-- 浸润 -->
					<span class="ininvision_classify">
						<div>
							<span class="label">
								{{ $t('message.dicom.tryOut') }}
								<p class="notice">{{ $t('message.dicom.labelNotice') }}</p>
							</span>
							{{ $t('message.dicom.ininvision_classify') }}
						</div>
					</span>
				</div>
				<ul ref="noduleList" class="list">
					<div v-if="isFailure" class="failure-notice">
						<i class="icon-failure"></i>
						<span>{{ $t('checkFailure') }}</span>
					</div>
					<li
						:key="item.lesion_id + index"
						v-for="(item, index) in displayList"
						:class="{ active: currentNodule.lesion_id === item.lesion_id }"
						@click="seeLesionDetail(item)"
					>
						<el-checkbox
							@change="updateNoduleSelectedList($event, item.lesion_id)"
							v-model="item.checked"
							class="checkbox"
						></el-checkbox>
						<span class="num">{{ item.totalIndex && item.totalIndex + 1 }}</span>
						<span class="prop">
							<template v-if="!item.lesion.diameter">
								<span>/</span>
							</template>
							<template v-else>
								<span>{{ item.lesion.diameter_max }}</span>
								<span>/</span>
								<span>{{ item.lesion.diameter_min }}</span>
							</template>
						</span>
						<!-- 结节类型暂时隐藏 -->
						<span v-if="item.lesion.feature_label" class="type">{{
							item.lesion.feature_label | transferProp
						}}</span>
						<span class="mali-beni" v-if="item.lesion.maligant || item.lesion.maligant === 0"
						>{{ item.lesion.maligant | toPercent | toDecimal }}%</span
						>
						<span class="mali-beni" v-else>/</span>
						<span class="ininvision_classify">
							<span v-if="item.lesion.invision_classify === 'NA'" class="other-info">
								<span class="el-icon-warning-outline"></span>
								<span class="version-notice">当前版本可有效检出的浸润类型仅包含AIS/AAH/MIA/IA</span>
							</span>
							<span v-else>{{
								item.lesion.invision_classify ? item.lesion.invision_classify : '/'
							}}</span>
						</span>
					</li>
				</ul>
			</div>
		</section>
	</section>
</template>

<script>
	import { propType } from './constants';
	import perfectScrollBar from 'perfect-scrollbar';
	// import { getEditTemplate, showOrhide } from '@/request/service';
	export default {
		name: 'noduleList',
		props: {
			noduleList: {
				type: Array,
				default: () => [],
			},
			backupList: {
				type: Array,
				default: () => [],
			},
			hideNoduleList: {
				type: Array,
				default: () => [],
			},
			isFailure: {
				type: Boolean,
				default: false,
			},
			goToImageIndex: {
				type: Number,
				default: 0,
			},
			currentNodule: {
				type: Object,
				default: () => {},
			},
		},
		data() {
			return {
				showFilterArea: true,
				statusCheckedByAI: ['normal', 'modify'],
				// 父组件中会改变下面两个变量
				showMarkedNodule: true,
				diameter_range: [0, 30],
				marks: {
					6: '6mm',
					30: '30mm',
				},
				selectAll: true,
				// 结节列表排序状态
				listSort: {
					totalIndex: true, //true 从小到大
					probability: true, //结节概率
					prop: true,
					maligant: true,
				},
				propValue: '',
				// 结节类型
				propType,
				tabStatus: 'patientReport',
				showNoduleDes: false,
				editTemplate: '',
				lesionSelectedId: '',
				listType: 'display',
			};
		},
		computed: {
			displayList: {
				get(){
					let list;
					if (this.listType === 'display') {
						list = this.noduleList;
					} else {
						list = this.hideNoduleList;
					}
					if (this.propValue && this.propValue !== '000') {
						list = list.filter((item) => {
							return item.lesion.feature_label === this.propValue;
						});
					}
					return list;
				},
				set(){

				}
			},
			numberOfNodules() {
				let num = 0;
				for (let item of this.noduleList) {
					if (item.status !== 'delete') {
						num++;
					}
				}
				return num;
			},
			numberOfAiNodules() {
				return this.noduleList.filter((val) => {
					return (
						this.statusCheckedByAI.includes(val.status) &&
						val.lesion.diameter_norm >= this.diameter_range[0] &&
						val.lesion.diameter_norm <= this.diameter_range[1]
					);
				}).length;
			},
			numberOfMarkedNodules() {
				return this.backupList.filter((val) => {
					return val.status === 'create';
				}).length;
			},
			// 结节类型属性
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
		},
		watch: {
			// 结节列表的全选和反选
			selectAll(newVal,oldVal) {
				let index = this.displayList.findIndex((item) => item.checked === false);
				if(oldVal === true && newVal === false && index === -1) {
					this.displayList = this.displayList.map((item) => item.checked = false)
				}
				else if(newVal === true) {
					this.displayList = this.displayList.map((item) => item.checked = true)
				}
			},
			// 结节列表中单条数据的是否勾选，决定全选按钮状态
			displayList: {
				deep: true,
				handler() {
					let index = this.displayList.findIndex((item) => !item.checked);
					if (index === -1 && !this.selectAll) {
						this.selectAll = true;
					} else if (index !== -1 && this.selectAll) {
						this.selectAll = false;
					}
				},
			},
		},
		methods: {
			// getEditTemplate() {
			// 	getEditTemplate().then((res) => {
			// 		this.editTemplate = res;
			// 		this.showNoduleDes = true;
			// 	});
			// },
			changeAllSelect() {
				// this.$store.commit('updateNoduleSelected', {
				// 	bool: val,
				// 	isSelectAll: true,
				// 	id: this.noduleList.map((val) => val.lesion_id),
				// });
			},
			updateNoduleSelectedList() {
				// this.$store.commit('updateNoduleSelected', {
				// 	id: lesionId,
				// 	bool: e,
				// });
			},
			// 对列表进行各种排序
			numSort(changeNum) {
				let preLists = this.noduleList;
				let newArr = [];
				if (changeNum === 'totalIndex') {
					if (this.listSort[changeNum]) {
						newArr = preLists.sort(function (a, b) {
							return b[changeNum] - a[changeNum];
						});
						this.listSort[changeNum] = !this.listSort[changeNum];
					} else {
						newArr = preLists.sort(function (a, b) {
							return a[changeNum] - b[changeNum];
						});
						this.listSort[changeNum] = !this.listSort[changeNum];
					}
				} else {
					if (this.listSort[changeNum]) {
						newArr = preLists.sort(function (a, b) {
							return a['lesion'][changeNum] - b['lesion'][changeNum];
						});
						this.listSort[changeNum] = !this.listSort[changeNum];
					} else {
						newArr = preLists.sort(function (a, b) {
							return b['lesion'][changeNum] - a['lesion'][changeNum];
						});
						this.listSort[changeNum] = !this.listSort[changeNum];
					}
				}
				this.noduleList = newArr;
			},
			changeFilterCondition(flag) {
				if (flag) {
					this.showMarkedNodule = !this.showMarkedNodule;
				}
				this.$emit('changeFilterCondition', {
					min_diameter: this.diameter_range[0],
					max_diameter: this.diameter_range[1],
					showMarkedNodule: this.showMarkedNodule,
				});
			},
			seeLesionDetail(item) {
				this.$emit('changeNodule', item, 'noduleCLick', item.totalIndex === this.goToImageIndex);
			},
			ListenActive() {},
			switchList() {
				this.listType = this.listType === 'display' ? 'hidden' : 'display';
				this.$emit('resetLesionByIndex', this.listType);
			},
			noduleOperation() {
				let params = [];
				let type = this.listType === 'display' ? 'hidden' : 'display';
				for (let i = 0; i < this.displayList.length; i++) {
					if (this.displayList[i].checked) {
						params.push({
							lesion_id: this.displayList[i].lesion_id,
							display_status: type,
						});
					}
				}
				if (params.length === 0) {
					this.$message.error(this.$t('message.dicom.deleteNodule'));
					return false;
				}
				// showOrhide(this.detectId, {
				// 	selected_lesions: params,
				// }).then(() => {
				// 	this.$emit('resetList', this.listType);
				// });
			},
		},
		created() {
			// this.getEditTemplate();
		},
		mounted() {
			this.$nextTick(() => {
				new perfectScrollBar(this.$refs.noduleList);
			})
		},
	};
</script>

<style lang="scss">
	.aside-list {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		.nodule-list {
			color: #fff;
			width: 100%;
			height: 100%;
			.listArea {
				height: 100%;
				min-height: 100px;
				display: flex;
				flex-direction: column;
				background-color: rgba(14,43,64,1);
				.ps__rail-y{
					position: absolute;
					height: 250px;
					right: 0;
					width: 10px;
				}
				.list,
				.caption {
					span {
						text-align: center;
					}
					.prop {
						width: 20%;
					}
					.type {
						width: 20%;
					}
					.num,
					.mali-beni,
					.ininvision_classify {
						width: 20%;

					}
				}
				.caption {
					display: flex;
					align-items: center;
					height: 30px;
					padding: 1px 11px;
					background: rgba(14,43,64,1);
					font-size: 12px;
					box-shadow: 0 2px 2px -1px rgba(107,146,244,1);
					margin-bottom: 2px;
					.num{
						margin-left: -23px;
					}
					span {
						color:rgba(111,172,255,1);
						cursor: pointer;
					}

					.type {
						.el-input__inner {
							background-color: transparent;
							font-size: 12px;
							color: #c4c4c4;
							padding: 0;
							line-height: 1;
							text-align: center;
							border: none;
							color: rgba(111,172,255,1);
							&::placeholder {
								color: rgba(111,172,255,1);
							}
						}

						.el-input__icon {
							float: right;
							width: 10px;
							margin-right: 10px;
							display: flex;
							align-items: center;
						}

						.el-input__suffix-inner {
							height: 100%;
							.el-select__caret {
								color:rgba(111,172,255,1);
							}
						}
					}

					.ininvision_classify {
						& > div {
							display: inline-block;
							position: relative;

							.label {
								width: 26px;
								box-sizing: content-box;
								font-size: 12px;
								transform: scale(0.8);
								background: rgba(111,172,255,1);
								color: #fff;
								padding: 1px 2px;
								border-radius: 6px;
								position: absolute;
								top: 0;
								right: 0;
								margin-right: -26px;
								margin-top: -8px;

								.notice {
									position: absolute;
									width: 120px;
									top: 12px;
									margin-left: -76px;
									display: none;
									color: #000;
									background: #d7cda0;
									padding: 0 2px;
								}

								&:hover {
									.notice {
										display: inline-block;
									}
								}
							}
						}

						.other-info {
							.version-notice {
								display: none;
								color: #000;
								background: #d7cda0;
								font-size: 12px;
								position: absolute;
								right: 1rem;
								width: 30px;
								word-break: break-all;
							}

							&:hover {
								.version-notice {
									display: inline-block;
								}
							}
						}
					}
				}
				.list {
					height: 95%;
					overflow: hidden !important;
					background: rgba(14,43,64,1);
					position: relative;
					li {
						position: relative;
						display: flex;
						justify-content: space-between;
						align-items: center;
						height: 35px;
						padding: 1px 11px;
						color: #c4c4c4;
						cursor: default;
						font-size: 12px;

						.num{
							margin-left: -25px;
						}
						&.active,
						&:hover {
							border: 1px solid rgba(107,146,244,1);
							background: #000;
							padding: 0 10px;
						}
					}

					.other-info {
						.version-notice {
							display: none;
							color: #000;
							background: #d7cda0;
							font-size: 16px;
							position: absolute;
							right: 1rem;
							width: 6.5rem;
							word-break: break-all;
						}

						&:hover {
							.version-notice {
								display: inline-block;
							}
						}
					}
				}
			}
		}
		.image-info {
			padding-top: 6px;
			flex: 1;
			display: flex;
			flex-direction: column;
			.tabs {
				width: 100%;
				height: 16px;
				margin-bottom: 1px;
				display: flex;
				font-size: 7px;
				.tab:not(.el-icon-warning-outline) {
					flex: 1;
					margin-right: 1px;
				}

				.tab {
					line-height: 16px;
					background-color: rgba(14,43,64,1);
					color: #fff;
					text-align: center;
					cursor: pointer;
					position: relative;
				}

				.el-icon-warning-outline {
					width: 1.3rem;
				}

				.active {
					background: #000;
					border: 1px solid rgba(107, 146, 244, 1);
				}
			}
			.reportArea {
				flex: 1;
				display: flex;
				flex-direction: column;

				& > section {
					flex: 1;
					display: flex;
					flex-direction: column;
					width: 100%;
				}
			}
		}
	}
</style>
