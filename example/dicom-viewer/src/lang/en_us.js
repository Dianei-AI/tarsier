// eslint-disable-next-line no-undef
module.exports = {
	// 常用语与组件无关
	toolEventName: {
		brightness: 'bright',
		move : 'move',
		zoom: 'zoom'
	},
	normal: {
		cancel: 'cancel',
		confirm: 'confirm',
		offline: '检测到网络连接中断，请检查本地网络状况！', // new add
	},
	checkFailure: 'fail',
	checkStatus: {
		running: 'detecting',
		success: 'successful',
		failure: 'fail',
		unknown: 'unknown',
	},
	message: {
		dicom: {
			pulmonary_lobe: '肺叶', //  new add
			coordZ: '中心帧', //  new add
			feature_label: '类型', //  new add
			middle: 'middle',
			lower: 'lower',
			upper: 'upper',
			rightLung: 'right lung',
			leftLung: 'left lung',
			lobe: 'lobe: ',
			lung: 'lung: ',
			segment: '肺段', // new add
			ApicalJianduan: '尖段', // new add
			PosteriorHouduan: '後段', // new add
			AnteriorQianduan: '前段', // new add
			LateralWaiduan: '外側段', // new add
			MedialNeiduan: '內側段', // new add
			SuperiorJianduan: '背段', // new add
			MedialNeididuan: '內基底段', // new add
			AnteriorQiandiduan: '前基底段', // new add
			LateralWaididuan: '外基底段', // new add
			PosteriorHoudiduan: '後基底段', // new add
			ApicalPosteriorJianhouduan: '尖後段', // new add
			LingulaSuperiorShangsheduan: '上舌段', // new add
			LingulaInferiorXiasheduan: '下舌段', // new add
			AnteriorMedialQianNeididuan: '前内基底段', // new add
			ww: 'Window Width',
			wl: 'Window Level',
			name: "Patient's Name：",
			id: 'Patient ID：',
			sex: 'Gender：',
			age: 'Age：',
			date: 'Study time：',
			mpr: 'Create MPR',
			back_main: 'Return the main view',
			index: 'Current Frame：',
			length: 'Total Frames：',
			probability: 'Nodule Probability：',
			diameter: 'Nodule Diameter：',
			nodule_size: 'Nodule Volume：',
			diameter_xyz: 'Nodule Location：',
			diameter_norm: 'Nominal Diameter：',
			maligant: 'Malignant %：',
			invision_classify: 'Possible Diagnosis：',
			hidden_nodes: '隐藏结节', // new add
			restore_nodes: '还原结节', // new add
			delete_nodes: '删除结节', // new add
			modification_record: '修改记录', // new add
			ntype: 'Nodule Type：',
			cal: 'Calcified(Y/N)：',
			center_hu: 'Mean density：',
			mean_hu: 'Average Density：',
			max_hu: 'Maximal attenuation：',
			min_hu: 'Minimal attenuation：',
			list: 'List of Nodules',
			number: 'Total：',
			num: 'Frame',
			prop: 'Size',
			mali_beni: 'Malignant',
			ininvision_classify: 'Invasiveness',
			view_tool: 'Browsing Tools',
			label_tool: 'Labelling Tools',
			del_title: 'Delete',
			del_p: 'Delete the checked nodules?',
			del_cancel: 'Cancel',
			del_confirm: 'Confirm',
			send_title: 'Send Report',
			send_desc: 'Description',
			senf_diag: 'Diagnosis',
			image_suggest: '影像学建议', // new add
			save_report: 'Save',
			send_report: 'Submit',
			report: 'Report',
			report_time: 'Submission Time',
			report_save_success: 'Save Successfully',
			sendReportSuccess: 'Send Successfully',
			reportMessage: {
				title: 'Confirm',
				content: "Patient will receive report, when sended,it can't be revised",
			},
			deleteNodules: {
				title: '提示',
				content: '此操作将删除该结节, 是否继续?', //new add
			},
			//JS
			position: 'Select the location of the nodules.',
			type: 'Select the nodules type.',
			maliBe: 'Select the location of the nodules.',
			maliType: 'Select the possible diagnosis.',
			isLeaf: 'Select multiple pages.',
			isPad: "Determine whether there's burr.",
			desc: 'Input the description of imaging.',
			diag: 'Input the diagnosis of imaging.',
			popUpNotice: 'The report has been submitted, please check the related report.',
			// 结节类型
			noduleType: 'Type',
			propAll: 'All Types',
			propGlass: 'Ground Glass',
			propLungSolid: 'Pulmonary Solid',
			propPartSolid: 'Partially Solid',
			propLungCal: 'Intrapulmonary Calcification',
			propChestSolid: 'Pleural Solid',
			propChestCal: 'Pleural Calcification',
			calType: 'Calcified Nodules',
			noncalType: 'Non-calcified Nodules',
			MESSAGE_NOT_LOADED: 'Please wait a moment. Current frame has not been loaded yet.',
			MESSAGE_TO_LAST: 'This is the last frame',
			MESSAGE_TO_FIRST: 'This is the first frame',
			selectNodule: 'Select at least one nodule',
			deleteNodule: 'The number of nodules you checked is zero',
			heatmap: 'Imaging omics',
			noduleNum: "The total nodules are less than 2,that can't creat features and Imaging omics",
			// 结节标注切换
			hideLabel: 'hide nodule label',
			showLabel: 'show nodule label',
			hideBorder: '隐藏边框', // new add
			showBorder: '显示边框', // new add
			hideStroke: '隐藏像素描边', // new add
			showStroke: '显示像素描边', // new add
			loadAll: '加载全部', // new add
			statement_nodule_precondition: '当前AI版本可更有效检出3CM以内的结节', // new add
			statement_disclaimer: 'AI结果仅供参考，最终结果以临床医生诊断为准', // new add
			loadFirstImgError: '加载第一张影像失败，请刷新页面重试！', // new add
			reloadMsg: '该帧影像未成功加载，正在重新加载..', // new add
			reloadError: '该帧影像暂时无法加载，请检查网络刷新页面重试！', // new add
			loading: '影像加载中，请稍后操作', // new add
			markNoduleSuccess: '标记结节成功！', // new add
			markNoduleFail: '标记结节失败，请重试！', // new add
			markProhibited: '检测失败数据无法标注结节！', // new add
			manualMarked: '手动标注', // new add
			toolsProhibited: '自动播放中...请点击暂停按钮暂停播放！', // new add
			patientReport: '患者报告', // new add
			lesionEdit: '病灶编辑', // new add
			submit: 'submit', // new add
			remarks: '请输入备注信息...', // new add
			customSuggestion: '自定义', // new add
			tip: '点击蓝色文字可下拉选择；点击绿色文字可直接编辑', // new add
			quickSelection: '快速选择', // new add
			manualAdjustment: '手动调整', // new add
			lungWindow: '肺窗', // new add
			chestWindow: '纵隔窗', // new add
			boneWindow: '骨窗', // new add
			browserCompatibility:
				'使用谷歌浏览器查看影像时会造成大量内存消耗并导致卡顿，请更换火狐浏览器获取更佳用户体验！', // new add
			networkTimeout: '检测到网络状况不佳，加载第{index}帧影像超时！', // new add
			latestAiVersionTip: '系统检测当前算法版本有更新，是否更新后导出报告？', // new add
			descriptionOfFailedData: '数据检测失败。', //  new add
			diagnosisOfFailedData: '数据检测失败，无法给出建议。', // new add
			edit: '编辑', //  new add
			preview: '预览', // new add
			saveAndUse: '保存并使用', // new add
			reset: '重置', // new add
			newAdd: '新建', // new add
			noReportName: '请填写报告名称！', // new add
			choseTemplate: '请选择一个模版！', // new add
			Using: '使用中', // new add
			overTempQuota: '最多可添加5个自定义模版', // new add
			needSystemField: '请确保含有至少一项系统设置的字段', // new add
			deleteUsingTemp: '正在使用的模版无法删除', // new add
			confirmSaveAndUse: '是否确认保存对当前模板的修改', // new add
			duplicatedName: '模版名称已存在！', // new add
			diameterEdit: '確定將結節大小更改為{diameter}嗎？', // new add
			ruler: '尺子', // new add
			rectangleTool: '矩形工具', // new add
			circleTool: '圆形工具', // new add
			polylineTool: '折线工具', // new add
			deleteMark: '删除标记', // new add
			close: '关闭', // new add
			tryOut: '试用', // new add
			labelNotice: '仅适用于临床建议高风险结节', // new add
			resetStatus: '复位', // new add
		},
		heat: {
			heatmap: 'Create Imaging omics',
			csv: 'Download CSV',
			back: 'Back',
			feature: 'Feature',
			nodule: 'Nodule',
			index: 'Current Frame',
			heatTitle: 'Heatmap',
			// JS
			less: "the selected feature can't be less than 2",
			more: "the selected feature can't be more than 18",
		},
		list: {
			title: 'List Of Patients',
			date: 'Study Date：',
			date_start: 'From',
			date_end: 'To',
			thickOption: 'Gap：',
			thickFrom: 'From',
			thickTo: 'To',
			name: "Patient's Name",
			id: 'Patient ID',
			dataStatus: '数据状态', // new add
			numOfNodules: '结节数量', // new add
			number: 'Accession Number',
			short_id: 'Dicom Number',
			export: 'Export',
			search: 'Search',
			reset: 'Reset',
			signatureConf: '电子签名设置', // new add
			setSignature: '设置电子签名', // new add
			deleteSignature: '删除电子签名', // new add
			confirmDelSign: '确定要删除该电子签名吗？', // new add
			signTip: '注：请先在空白纸张上用黑色碳素笔书写签名，拍照后保存至电脑桌面。', // new add
			store_id: 'Store Id',
			accession_number: 'Accession Number',
			study_date: 'Study Date',
			add_date: 'Parsing Date',
			patient_id: 'Patients ID',
			patient_name: "Patient's Name",
			patient_birthday: 'Birthday',
			instance_number: 'Frames',
			slice_thickness: 'Thickness',
			modality: 'Equipment',
			status: 'Parsing State',
			noduleNum: 'Number Of Nodules',
			badNoduleNum: 'Number Of Maligtnant Nodules',
			evaluateStatus: 'evaluate Status', // new add
			editStatue: 'Editing Status',
			dicomNum: 'DICOM Code',
			version: 'AI Version',
			exportResult: 'Results Of Detection',
			exportAll: 'Overall',
			exportNull: 'please select at least one item',
			parseResult: '{num} series have been parsed',
			//JS
			edited: 'edited',
			unedit: 'unedited',
			warn_time: 'wrong time',
			warn_nodule: 'wrong range',
			goToCTViewer0: 'status',
			goToCTViewer1: 'Error',
			DataCorrelation: 'Data correlation:',
			clearData: 'Data management',
			enter: 'Enter', // new add
			min_thickness: '最小层厚', // new add
			max_thickness: '最大层厚', // new add
			selectThickness: '请选择层厚', // new add
			thicknessSelectError: '请确保最小层厚不大于最大层厚', // new add
			cleanUp: '清理', // new add
			selectDeletions: '请选择你想要清理的数据', // new add
			releaseSpaceMessage: '此次删除释放的空间：', // new add
			inputMessage: '请输入账户密码', // new add
			confirmDeletion: '确认清理', // new add
			enterPassword: '请输入密码', //  new add
			clearSuccess: '清理成功！', // new add
			redetect: '重算', // new add
			checking: '数据正在检测，请稍后重试', // new add
			existLastestData: '勾选的数据中存在通过最新版本AI检测成功的数据，因此该部分数据未进行重算', // new add
			selectRedetection: '请选择你想要重算的数据', // new add
			existCheckingData: '勾选的数据中存在检测中的数据！', // new add
			desensitizationConfirm: '您下载的文件会做脱敏处理，是否继续？', // new add
			all: '全部', // new add
			manualUpload: '本地上传', // new add
			clientUpload: 'C端上传', // new add
			pacsPush: 'PACS自动推拉', // new add
			pacsFetch: 'PACS手动拉取', // new add
			lastDay: '最近一天', // new add
			lastThreeDays: '最近三天', // new add
			lastWeek: '最近一周', // new add
			dicomProtocolOnly: '请确保未勾选第三方来源数据！', // new add
			withNodule: '有结节', //new add
			withoutNodule: '无结节', //new add
			malignantNodule: '疑似恶性结节', //new add
			searchAnswer: '搜索答案', //new add
			readDicomHtml: '阅片界面', //new add
			otherFeatures: '其他功能', //new add
			getData: '数据拉取', //new add
			alreadyChooseDicom: '已选中影像', //new add
			readDicom: '阅片', //new add
			followUp: '随访', //new add
			liquidation: '清理', //new add
			recompute: '重算', //new add
			isRemove: {
				// new add
				title: '提示', // new add
				content: '确定要移除选中的数据？', // new add
				confirm: '确定', // new add
				cancel: '取消', // new add
			},
			overSixTip: '您选择的影像已超过6套，请在当前列表进行操作', // new add
		},
		regist: {
			invite: 'Invitation code',
			name: 'Name',
			tel: 'Phone number',
			pass: 'Password',
			captcha: 'Captcha',
			againPass: 'Please confirm your password again',
			register: 'Regist Now',
			//JS
			validatePass2_again: 'Please confirm your password again:',
			validatePass2_diff: 'The password and confirmation password are different',
			captchaM: "The captcha can't be empty",
			inviteM: "The invitation code can't be empty",
			nameM: "The name can't be empty",
			telM: "The phone number can't be empty",
			passM: "The password can't be empty",
			passRequire: 'password must contain lower and upper case letters, and no shorter than 8 characters',
			backToSign: 'sign',
			sendSms: 'send captcha',
			telRequire: 'wrong phone number',
		},
		sign: {
			title: 'DianNei Intelligent Identification System',
			username: 'Username',
			password: 'Password',
			signIn: 'Login',
			notice: 'No account?',
			register: 'Register',
			lang: 'Language',
			//JS
			rules_username: "The name can't be empty",
			rules_password: "The password can't be empty",
		},
		top: {
			imgDirectionDisplay: 'Image sorting',
			imgDirectionFromTop: 'from top of the lung',
			imgDirectionFromBottom: 'from bottom of the lung',
			show_tip:
				'Note: The system displays the images in order from the top to the bottom of the lungs by default. After modification, the sorting display will be changed. Please modify it carefully.',
			probability: 'Shown Nodules>=',
			cancel: 'Cancel',
			confirm: 'Confirm',
			data_acquisition: '数据获取', // new add
			data_pull: 'Data pull', // new add
			local_upload: 'Upload',
			compare: 'Comparison',
			history: 'History',
			export: 'Export',
			set: 'Setting',
			guide: 'Guide',
			info: 'Edit Infomation',
			reportSetting: 'Set up report templates',
			displaySetting: 'Display Setting',
			pass: 'Edit Password',
			logout: ' Log Out',
			reviseInfo: 'Edit Infomation',
			name: 'Name：',
			changeName: 'Change username',
			nameP: 'New Name',
			tel: 'Phone：',
			changeTel: 'Change phone number',
			telP: 'New phone',
			code: 'Captcha',
			codeP: 'Received Captcha',
			sendCode: 'Send',
			second1: 'Remain',
			second2: 's',
			passTitle: 'Edit Password',
			passWord: 'Old：',
			passWordP: 'Old Password',
			newPass: 'New：',
			newPassP: 'New Password',
			newAgainPass: 'Confirm：',
			newAgainPassP: 'Confirm New Password',
			select_probability: 'Select',
			// JS
			validatePass2_again: 'Input your password again',
			validatePass2_diff: 'The password and confirmation password are different',
			validateOne: 'Enter at least one infomation',
			phoneM: "Phone number can't be empty",
			captchaM: "Captcha can't be empty",
			passM: "Old password can't be empty",
			newPassM: "New password can't be empty",
			loading: 'calculate the size of uploading files',
			checkDetect: 'The file you just uploaded has been detected, will you jump to scan it now?',
			jump: 'jump',
			noticeDevelop: 'More functions are still in the development.',
			exportMessage1: {
				content: '当前勾选结节数过多请确认列表信息无异议', // new add
				title: '提示', // new add
			},
			exportMessage2: '当前未勾选结节，确定要导出吗？', // new add
			loadingData: '數據加載中，請稍後再試！', //new add
			fontSize: 'fontsize：', // new add
			normal: 'normal', // new add
			bigger: 'bigger', // new add
			biggest: 'biggest', // new add
			exportReport: 'Export Report', // new add
			baseInfo: '基本信息', // new add
			imageInfo: '影像信息', // new add
			imageShow: '影像所见', // new add
			imageSuggest: '影像建議', // new add
			hospitalInfo: '醫院信息', // new add
			save: '保存編輯', // new add
			selectTemplate: '选择模板', //new add
			editTemplate: '編輯模板', // new add
			exportPDF: '保存并导出', // new add
			back: 'back', // new add
			noNodule: '系統當前未檢測到結節信息', // new add
			CT: '胸部CT', // new add
			pdfTips: '双击左侧影像所见和影像建议区域可对其进行编辑', // new add
			folderUploadTips: '拖拽或点击选择内含DICOM的文件夹到此处，上传并检测', // new add
			zipUploadTips: '拖拽或点击选择内含DICOM的ZIP压缩包到此处，上传并检测', // new add
			overSize: '检测到当前文件夹大小超过400MB，该上传方式伴有系统崩溃风险，请确认是否继续', // new add
			notZip: '请确保上传的文件为ZIP压缩包！', // new add
			isRAR: '检测到当前格式为RAR，可能出现检测失败的情况，请确认是否继续', // new add
			confirmZIP: '请确保拖拽至此区域的为ZIP压缩包！', // new add
			batchUpload: '批量上传', // new add
			remainingRoom: '剩余容量', // new add
			usedQuota: '使用次数', // new add
			rechargeWarning: '系统使用额度仅剩余{remainingQuota}次，请尽快联系我们，避免影响后续使用。', // new add
			rechargeInfo: '如需充值，请联系我们的客服人员：\n客服电话：400-085-9718\n工作时间：9:00-18:00', // new add
			recharge: '充值', // new add
			insufficientQuota: '系统使用额度不足，请进行充值后再尝试该操作！', // new add
			fileApiNotReadable: '系统没有读取该文件的权限，请重启浏览器后重试！', // new add
			fileApiError: '计算文件大小出错，请重启浏览器后重试！', // new add
		},
		btn: {
			confirm: 'confirm',
			cancel: 'cancel',
		},
		follow: {
			link: 'Match',
			unlink: 'Unmatch',
			linknodule: 'Match nodules',
			index: 'Frame',
			size: 'Diameter(mm)',
			volume: 'Volume(mm³)',
			type: 'Nodule type',
			loading: 'Comparative calculating',
			compare: 'Comparative change',
			diameter: 'Nominal diameter：',
			vol: 'Nodule volume：',
			ct: 'Average density：',
			doubleTime: 'Doubling time：',
			// JS

			check: 'Please check 2 nodules from each t0 and t1 list',
			cant: "The two nodules you choose can't be matched",
			success: 'Match successfully',
			uncheck: 'Please select at least one matched group of nodules for matching',
			unlsuccess: 'Unmatch successfully',
			manual: '手动', // new add
		},
		report: {
			check_delete: {
				title: '提示',
				content: '确定删除该模板吗？',
				confirm: '确定',
				cancel: '取消',
			}, // new add
			check_show: '勾选显示', // new add
			upload: 'Upload',
			logo_upload: "hospital's Logo",
			logo_tip: '机构LOGO', // new add
			logo_show: '图片大小1M以内', // new add
			report_form: 'Report form',
			report_image: 'Graphic report',
			report_normal: 'Regular report',
			report_name: "Template's name",
			rtemplete_name: "Please input the template's name",
			isDefault: 'Set dafault',
			hospital_name: "Report's title",
			p_hospital_name: "Please input the Report's title",
			exinform: "Report's subtitle",
			p_exinform: "Please input the Report's subtitle",
			patientInfo: "Patient's information",
			patient_item: {
				patient_name: 'Name',
				patient_sex: 'Sex',
				patient_age: 'Age',
				patient_birthday: 'Birthday',
				patient_id: 'patient_id', //new add
			},
			checkInfo: 'Detection information',
			check_item: {
				study_date: 'Detection date',
				modality: 'Detection equipment',
				detection_project: 'Detection project',
			},
			noduleInfo: 'Nodule information',
			nodule_item: {
				coordZ: 'Image frame',
				lung_lobe: 'Lung',
				pulmonary_lobe: 'Lobe',
				segment: '肺段', // new add
				diameter: 'Diameter',
				nodule_size: 'Volume',
				feature_label: 'Diagnosis',
				probability: 'Nodule Probability',
				diameter_norm: 'Nominal Diameter',
				maligant: 'Malignant',
				invision_classify: 'Degree of tumor',
				feature_label_g: 'Calcified(Y/N)',
				center_hu: 'Mean density',
				mean_hu: 'Average Density',
				max_hu: 'Maximal attenuation',
				min_hu: 'Minimal attenuation',
			},
			tips1: 'This can be empty,If the signature is wrotten by hand',
			tips2:
				'Example: If you need to display information such as "The conclusion of this report is only for clinician reference"',
			tips3: '(if not checked, the information will not be displayed when the report is exported)',
			tips4: 'Other information display',
			doctor_autograph: "Docter's signature",
			p_doctor_autograph: "Please input the docter's signature",
			use_electronic_signature: '使用电子签名', // new add
			statement: 'Declaration information',
			p_statement: 'Please input the Declaration information',
			hospital_address: "Hospital's address",
			p_hospital_address: "Please inout the hospital's address",
			department_phone: "Department's phone",
			p_department_phone: "Please input the department's phone",
			department_name: "Department's name",
			p_department_name: "Please input the department's name",
			zip_code: 'Postal code',
			p_zip_code: 'Please input postal code',
			report_analysis: '报告解读', // new add
			p_report_analysis: '请输入报告解读', // new add
			use_report_analysis: '使用该条文字，字数不超过12个', // new add
			use_tel_info: '使用该条文字，不超过30个字符', // new add
			show_QR_code: '显示二维码',
			del: 'Delete',
			save: 'Save',
			show: 'Display',
			all_check: 'Choose all',
			patient_inform: "Patient's information",
			show_sort: 'Sort of display',
			new_report: 'Add new report template',
			default_report: 'Default report template',
			diannei_report: "Diannei's report template",
			del_success: 'Delete successfully',
			save_success: 'Save successfully',
			tab_tip1: 'You already has',
			tab_tip2: 'report templates, please create after deleting',

			// JS
			MESSAGE: '请检查“患者信息”“检查信息”“结节信息”显示设置，最少勾选一项，勾选后必须填写顺序，且顺序不能重复',
			alert: '模板名称不能为空',
			alert_confirm: '删除后不可恢复，请确定是否要删除',
			confirm: '确定',
			reportPreview: '报告预览', // new add
			doctor: '诊断医生', // new add
			dicomImg: '结节影像', // new add
			zoomImg: '放大影像', //new add
			address: 'address', // new add
			tel: 'tel', // new add
			postal: 'postal', // new add
			declaration: 'declaration', // new add
			info: 'Please make sure the range of numbers entered is:：', // new add
			reportTitleTip: '报告标题不能为空！', // new add
			notCheckedDescTip: '影像所见内容为空，请完善后导出。', //new add
			notCheckedDiagTip: '影像建议内容为空，请完善后导出。', // new add
			notCheckedDesc: '请输入影像所见，内容不可为空......', //new add
			notCheckedDiag: '请输入影像建议，内容不可为空......', //new add
			doctorName: '医生签名不可为空！', // new add
			switchPicBtn: '点击切换签名图片', //new add
			staySame: '保持与图片签名一致', //new add
			signatureTip: {
				//new add
				title: '提示',
				head: '电子签名为',
				middle: '图文签名为',
				end: '与当前签名不一致，是否统一两处签名为',
			},
			stayCheckSame: '该签名与图文签名不一致', //new add
			signatureJudge: '图片上传为空', //new add
			editSave: '电子签名与图文签名不一致，请修改后保存', //new add
			defaultDeleteTip: '默认报告模板不可删除', //new add
			deleteNowSignature: {
				title: '提示',
				confirm: '确定',
				cancel: '取消',
				content: '您确定删除当前图文签名吗？',
			}, //new add
			isSaveCurrentTemp: {
				title: '提示',
				content: '是否保存当前模板内容',
				cancel: '取消',
				confirm: '确定',
			}, //new add
			dragTip: '可拖动调整顺序', // new add
			statementContent: '该报告仅作为咨讯建议，并不具备诊疗依据，平台对该等报告不承担任何法律责任。', // new add
			reportSet: '报告设置', // new add
			rtempNameTip: '您的模板名称超过12个字符，请重新输入', //new add
		},
	},
	notice: {
		tranfering: 'transfering',
	},
	error: {
		notThick: '当前上传的影像层厚超过3mm，超过3mm会影响AI和医生阅片的准确性，建议上传小于等于3mm的薄层影像。',
		internalServerError: '系统未知错误，请将问题反馈至service@dianei-ai.com，或拨打客服电话400-0859-718', // new add
	},
	el: {
		colorpicker: {
			confirm: 'OK',
			clear: 'Clear',
		},
		datepicker: {
			now: 'Now',
			today: 'Today',
			cancel: 'Cancel',
			clear: 'Clear',
			confirm: 'OK',
			selectDate: 'Select date',
			selectTime: 'Select time',
			startDate: 'Start Date',
			startTime: 'Start Time',
			endDate: 'End Date',
			endTime: 'End Time',
			prevYear: 'Previous Year',
			nextYear: 'Next Year',
			prevMonth: 'Previous Month',
			nextMonth: 'Next Month',
			year: '',
			month1: 'January',
			month2: 'February',
			month3: 'March',
			month4: 'April',
			month5: 'May',
			month6: 'June',
			month7: 'July',
			month8: 'August',
			month9: 'September',
			month10: 'October',
			month11: 'November',
			month12: 'December',
			// week: 'week',
			weeks: {
				sun: 'Sun',
				mon: 'Mon',
				tue: 'Tue',
				wed: 'Wed',
				thu: 'Thu',
				fri: 'Fri',
				sat: 'Sat',
			},
			months: {
				jan: 'Jan',
				feb: 'Feb',
				mar: 'Mar',
				apr: 'Apr',
				may: 'May',
				jun: 'Jun',
				jul: 'Jul',
				aug: 'Aug',
				sep: 'Sep',
				oct: 'Oct',
				nov: 'Nov',
				dec: 'Dec',
			},
		},
		select: {
			loading: 'Loading',
			noMatch: 'No matching data',
			noData: 'No data',
			placeholder: 'Select',
		},
		cascader: {
			noMatch: 'No matching data',
			loading: 'Loading',
			placeholder: 'Select',
		},
		pagination: {
			goto: 'Go to',
			pagesize: '/page',
			total: 'Total {total}',
			pageClassifier: '',
		},
		messagebox: {
			title: 'Message',
			confirm: 'OK',
			cancel: 'Cancel',
			error: 'Illegal input',
		},
		upload: {
			deleteTip: 'press delete to remove',
			delete: 'Delete',
			preview: 'Preview',
			continue: 'Continue',
		},
		table: {
			emptyText: 'No Data',
			confirmFilter: 'Confirm',
			resetFilter: 'Reset',
			clearFilter: 'All',
			sumText: 'Sum',
		},
		tree: {
			emptyText: 'No Data',
		},
		transfer: {
			noMatch: 'No matching data',
			noData: 'No data',
			titles: ['List 1', 'List 2'], // to be translated
			filterPlaceholder: 'Enter keyword', // to be translated
			noCheckedFormat: '{total} items', // to be translated
			hasCheckedFormat: '{checked}/{total} checked', // to be translated
		},
	},
};
