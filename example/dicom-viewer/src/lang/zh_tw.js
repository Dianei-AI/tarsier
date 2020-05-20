// eslint-disable-next-line no-undef
module.exports = {
	// 常用语与组件无关
	toolEventName: {
		brightness: '亮度',
		move : '移動',
		zoom: '縮放'
	},
	normal: {
		cancel: '取消',
		confirm: '確定',
		offline: '檢測到網絡連接中斷，請檢查本地網絡狀況！！', // new add
	},
	checkFailure: '檢測失敗',
	checkStatus: {
		running: '檢測中',
		success: '檢測成功',
		failure: '檢測失敗',
		unknown: '未知狀態',
	},
	message: {
		dicom: {
			pulmonary_lobe: '肺葉', // new add
			coordZ: '中心幀', // new add
			feature_label: '類型', // new add
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
			AnteriorMedialQianNeididuan: '前内基底段', //  new add
			ww: 'window width',
			wl: 'window level',
			name: '姓名：',
			id: '患者編號：',
			sex: '性別：',
			age: '年齡：',
			date: '檢查時間：',
			mpr: '生成MPR',
			back_main: '回到主視圖',
			index: '當前張數：',
			length: '總張數：',
			probability: '結節概率：',
			diameter: '結節大小：',
			nodule_size: '結節體積：',
			diameter_xyz: '結節位置：',
			diameter_norm: '最長直徑：',
			maligant: '癌症機率：',
			invision_classify: '疑似類型：',
			hidden_nodes: '隐藏结节', // new add
			restore_nodes: '还原结节', // new add
			delete_nodes: '删除结节', // new add
			modification_record: '修改记录', // new add
			ntype: '結節類型：',
			cal: '鈣化情況：',
			center_hu: 'Central attenuation：',
			mean_hu: 'Mean density：',
			max_hu: 'Maximal attenuation：',
			min_hu: 'Minimal attenuation：',
			list: '結節列表',
			number: '結節個數：',
			num: '第幾張',
			prop: '大小',
			mali_beni: '風險',
			ininvision_classify: '病理預測',
			view_tool: '瀏覽工具',
			label_tool: '標註工具',
			del_title: '刪除結節',
			del_p: '確認刪除勾選中的結節嗎？',
			del_cancel: '取消',
			del_confirm: '確認',
			send_title: '報告回傳',
			send_desc: '影像學表現',
			senf_diag: '影像學診斷',
			image_suggest: '影像學建議', // new add
			save_report: '保存',
			report: '診斷報告',
			send_report: '發送報告',
			report_time: '報告日期',
			report_save_success: '報告保存成功',
			sendReportSuccess: '發送成功',
			reportMessage: {
				title: '確認提示',
				content: '患者將受到診斷報告，報告發送後，不可修改。請確認是否發送報告？',
			},
			deleteNodules: {
				title: '提示',
				content: '此操作将删除该结节, 是否继续?', //new add
			},
			//JS
			position: '請選擇結節位置',
			type: '請選擇結節類型',
			maliBe: '請選擇結節位置',
			maliType: '請選擇疑似類型',
			isLeaf: '請選擇是否分葉',
			isPad: '請選擇是否有毛刺',
			desc: '請輸入影像學表現',
			diag: '請輸入影像學診斷',
			popUpNotice: '報告已提交，請查看相關報告',

			// 結節類型
			noduleType: '類型',
			propAll: 'All Types',
			propGlass: 'Ground Glass',
			propLungSolid: 'Pulmonary Solid',
			propPartSolid: 'Partially Solid',
			propLungCal: 'Intrapulmonary Calcification',
			propChestSolid: 'Pleural Solid',
			propChestCal: 'Pleural Calcification',
			calType: '鈣化結節',
			noncalType: '非鈣化結節',

			MESSAGE_NOT_LOADED: '即將查看的CT尚未加載完成，請稍候',
			MESSAGE_TO_LAST: '已經是序列的最後一張了',
			MESSAGE_TO_FIRST: '已經是序列的第一張了',
			selectNodule: '請至少填入一個值',
			deleteNodule: '您勾選的結節數量為0',
			heatmap: '影像組學',
			noduleNum: '當前結節少於2個，無法生成特徵值並進行影像組學運算',
			// 結節標註切換
			hideLabel: '隱藏結節標註',
			showLabel: '顯示結節標註',
			hideBorder: '隱藏邊框', // new add
			showBorder: '顯示邊框', // new add
			hideStroke: '隱藏像素描邊', // new add
			showStroke: '顯示像素描邊', // new add
			mprGuide:
				'從原始的橫軸位圖像經過處理獲得人體組織器官任意視圖，有效獲取病灶具體位置。 1、冠狀位視圖 2、矢狀位視圖 3、軸狀位視圖',
			statement_nodule_precondition: '當前AI版本可更有效檢出3CM以內的結節', // new add
			statement_disclaimer: 'AI結果僅供參考，最終結果以臨床醫生診斷為準', // new add
			loadAll: '加載全部', // new add
			loadFirstImgError: '加載第一張影像失敗，請刷新頁面重試！', // new add
			reloadMsg: '該幀影像未成功加載，正在重新加載..', // new add
			reloadError: '該幀影像暫時無法加載，請檢查網絡刷新頁面重試！', // new add
			loading: '影像加載中，請稍後操作', // new add
			markNoduleSuccess: '標記結節成功！', // new add
			markNoduleFail: '標記結節失敗，請重試！', // new add
			markProhibited: '檢測失敗數據無法標註結節！', // new add
			manualMarked: '手動標註', // new add
			toolsProhibited: '自動播放中...請點擊暫停按鈕暫停播放！', // new add
			patientReport: '患者報告', // new add
			lesionEdit: '病灶編輯', //  new add
			submit: '提交', // new add
			remarks: '請輸入備註信息...', // new add
			customSuggestion: '自定義', // new add
			tip: '點擊藍色文字可下拉選擇；點擊綠色文字可直接編輯', // new add
			quickSelection: '快速選擇', // new add
			manualAdjustment: '手動調整', // new add
			lungWindow: '肺窗', // new add
			chestWindow: '縱隔窗', // new add
			boneWindow: '骨窗', // new add
			browserCompatibility: '使用谷歌瀏覽器查看影像時會造成大量內存消耗並卡頓，請更換火狐瀏覽器獲取更佳用戶體驗', // new add
			networkTimeout: '檢測到網絡狀況不佳，加載第{index}幀影像超時！', // new add
			latestAiVersionTip: '系統檢測當前AI版本有更新，是否更新後導出報告？', // new add
			descriptionOfFailedData: '數據檢測失敗。', // new add
			diagnosisOfFailedData: '數據檢測失敗，無法給出建議。', // new add
			edit: '編輯', // new add
			preview: '預覽', // new add
			saveAndUse: '保存並使用', // new add
			reset: '重置', // new add
			newAdd: '新建', // new add
			noReportName: '請填寫報告名稱！', // new add
			choseTemplate: '請選擇一個模板！', // new add
			Using: '使用中', // new add
			overTempQuota: '最多可添加5個自定義模板', // new add
			needSystemField: '請確保含有至少一項系統設置惡字段', // new add
			deleteUsingTemp: '正在使用的模板無法刪除', // new add
			confirmSaveAndUse: '是否確認對當前模板的修改', // new add
			duplicatedName: '模板名稱已存在！', // new add
			diameterEdit: '確定將結節大小更改為{diameter}嗎？', // new add
			ruler: '尺子', // new add
			rectangleTool: '矩形工具', // new add
			circleTool: '圓形工具', // new add
			polylineTool: '折線工具', // new add
			deleteMark: '刪除標記', // new add
			close: '關閉', // new add'
			tryOut: '試用', // new add
			labelNotice: '僅適用於臨床建議高風險結節', // new add
			resetStatus: '復位', // new add
		},
		heat: {
			heatmap: '生成影像組學(熱力圖)',
			csv: '導出CSV至本地',
			back: '返回',
			feature: '特徵值',
			nodule: '結節',
			index: '當前張數',
			heatTitle: '像素熱力圖',
			// JS
			less: '所選特徵值不能少於2個',
			more: '所選特徵值不能多於18個',
		},
		list: {
			title: '受檢者列表',
			date: '檢查日期：',
			date_start: '開始日期',
			date_end: '結束日期',
			thickOption: 'Gap：',
			select: '請選擇',
			thickFrom: '起始層厚',
			thickTo: '終點層厚',
			name: '受檢者姓名',
			id: '受檢者ID',
			dataStatus: '數據狀態', // new add
			numOfNodules: '結節數量', // new add
			number: '檢查序號',
			short_id: '影像號',
			export: '分析結果',
			search: '搜尋',
			reset: '重置',
			signatureConf: '電子簽名設置', // new add
			setSignature: '設置電子簽名', // new add
			deleteSignature: '刪除電子簽名', // new add
			confirmDelSign: '確定要刪除該電子簽名嗎？', // new add
			signTip: '注：請現在空白紙張上用黑色碳素筆書寫簽名，拍照後保存至電腦桌面。', // new add
			store_id: '序號',
			accession_number: '檢查序號',
			study_date: '檢查日期',
			add_date: '解析時間',
			patient_id: '受檢者ID',
			patient_name: '姓名',
			patient_birthday: '受檢者生日',
			instance_number: 'CT總張數',
			slice_thickness: '層厚',
			modality: '設備類型',
			status: '解析狀態',
			noduleNum: '結節個數',
			badNoduleNum: '疑似惡性結節數',
			evaluateStatus: '評估狀態', // new add
			editStatue: '編輯狀態',
			dicomNum: '影像號',
			version: 'AI 版本',
			exportResult: '檢測結果',
			exportAll: '全部',
			exportNull: '請至少選擇一項導出',
			parseResult: '分析出{num}個DICOM序列',
			//JS
			edited: '已編輯',
			unedit: '未編輯',
			warn_time: '日期時間範圍錯誤',
			warn_nodule: '層厚範圍錯誤',
			goToCTViewer0: '狀態為',
			goToCTViewer1: '，不可查看',
			DataCorrelation: '數據管理：',
			clearData: '數據管理',
			selectDeletions: '請選擇你想要清理的數據',
			next: '下一步',
			confirmDeletion: '確認清理',
			choseDate: '日期',
			releaseSpaceMessage: '此次删除释放的空间：',
			inputMessage: '請輸入帳戶密碼',
			deleteDesc: '注：刪除數據後將不可恢復！',
			searchGuide:
				'數據搜索區域<br/>' + '以檢查日期、層厚、受檢者信息數據相關為篩選條件<br/>' + '重置：清空篩選條件',
			enter: '輸入', // new add
			min_thickness: '最小層厚', // new add
			max_thickness: '最大層厚', // new add
			selectThickness: '請選擇層厚', // new add
			thicknessSelectError: '請確保最小層厚不大於最大層厚', // new add
			cleanUp: '清理', // new add
			enterPassword: '請輸入密碼', //  new add
			clearSuccess: '清理成功！', // new add
			redetect: '重算', // new add
			checking: '數據正在檢測，請稍後重試', // new add
			existLastestData: '勾選的數據中存在通過最新版本AI檢測成功的數據，因此該部分數據未進行重算', // new add
			selectRedetection: '請選擇你想要重算的數據', // new add
			existCheckingData: '勾選的數據中存在檢測中的數據！', // new add
			desensitizationConfirm: '您下載的文件會做脫敏處理，是否繼續？', // new add
			all: '全部', // new add
			manualUpload: '本地上傳', // new add
			clientUpload: 'C端上傳', // new add
			pacsPush: 'PACS自動推拉', // new add
			pacsFetch: 'PACS手動拉取', // new add
			lastDay: '最近一天', // new add
			lastThreeDays: '最近三天', // new add
			lastWeek: '最近一週', // new add
			dicomProtocolOnly: '請確保未勾選第三方來源數據！', // new add
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
			invite: '請輸入邀請碼',
			name: '請輸入姓名',
			tel: '請輸入電話',
			pass: '請輸入密碼',
			captcha: '請輸入驗證碼',
			againPass: '請再次輸入密碼',
			register: '註冊',
			//JS
			validatePass2_again: '請再次輸入密碼',
			captchaM: '驗證碼不能為空',
			validatePass2_diff: '兩次輸入密碼不一致!',
			inviteM: '邀請碼不能為空',
			nameM: '用戶名稱不能為空',
			telM: '電話號碼不能為空',
			passM: '密碼不能為空',
			passRequire: '密碼必須包含大小寫字母，且長度8位~16位',
			backToSign: '已有帳號',
			sendSms: '發送驗證碼',
			telRequire: '手機號碼格式不正確',
		},
		sign: {
			title: '點內智慧辨識系統',
			username: '請輸入帳號',
			password: '請輸入密碼',
			signIn: '登錄',
			notice: '還沒有帳號？',
			register: '立即註冊',
			lang: '語言',
			//JS
			rules_username: '用戶名稱不能為空',
			rules_password: '密碼不能為空',
		},
		top: {
			imgDirectionDisplay: '影像排序顯示',
			imgDirectionFromTop: '肺尖到肺底',
			imgDirectionFromBottom: '肺底到肺尖',
			show_tip: '註：系統默認按照肺尖到肺底順序顯示影像，修改後將改變排序顯示，請謹慎修改。',
			probability: '結節顯示概率：',
			cancel: '取消',
			confirm: '確認',
			data_acquisition: '数据获取', // new add
			data_pull: '系統拉取', // new add
			local_upload: '上傳',
			compare: '回診對比',
			history: '過去的檢查',
			export: '導出報告',
			set: '設置',
			guide: '操作指南',
			info: '修改個人信息',
			reportSetting: '報告模板設置',
			displaySetting: '顯示設置',
			pass: '修改密碼',
			logout: '退出',
			reviseInfo: '修改個人信息',
			name: '姓名',
			changeName: '更改用戶名稱',
			nameP: '請輸入姓名',
			tel: '手機號碼碼',
			changeTel: '更改手機號碼',
			telP: '請輸入手機號碼碼',
			code: '驗證碼',
			codeP: '請輸入驗證碼',
			sendCode: '發送驗證碼',
			second1: '剩餘',
			second2: '秒',
			passTitle: '修改密碼',
			passWord: '舊密碼',
			passWordP: '請輸入舊密碼',
			newPass: '新密碼',
			newPassP: '請輸入新密碼',
			newAgainPass: '重複密碼',
			newAgainPassP: '請輸入重複密碼',
			select_probability: '請選擇',
			// JS
			validatePass2_again: '請再次輸入密碼',
			validatePass2_diff: '兩次輸入密碼不一致!',
			validateOne: '姓名手機至少需要輸入一個',
			phoneM: '手機號碼碼不能為空',
			captchaM: '驗證碼不能為空',
			passM: '密碼不能為空',
			newPassM: '新密碼不能為空',
			loading: '計算上傳文件大小',
			checkDetect: '您剛上傳的檢測完成，是否要跳轉查看',
			jump: '跳轉',
			noticeDevelop: '功能開發中',
			exportMessage1: {
				content: '當前勾選結節數超過10個,請確認列表信息無異議', // new add
				title: '提示', // new add
			},
			exportMessage2: '當前未勾選結節，確定要導出嗎？', // new add
			loadingData: '數據加載中，請稍後再試！', //new add
			fontSize: '字體大小：', // new add
			normal: '標準', // new add
			bigger: '較大', // new add
			biggest: '最大', // new add
			exportReport: '導出報告', // new add
			baseInfo: '基本信息', // new add
			imageInfo: '影像信息', // new add
			imageShow: '影像所見', // new add
			imageSuggest: '影像建議', // new add
			hospitalInfo: '醫院信息', // new add
			save: '保存編輯', // new add
			selectTemplate: '選擇模板', //new add
			editTemplate: '編輯模板', // new add
			exportPDF: '保存并导出', // new add
			back: '返回', //new add
			noNodule: '系統當前未檢測到結節信息', // new add
			CT: '胸部CT', // new add
			pdfTips: '雙擊左側影像所見和影像建議區域可對其進行編輯', // new add
			folderUploadTips: '拖拽或點擊選擇內含DICOM的文件夾到此處，上傳並檢測', // new add
			zipUploadTips: '拖拽或點擊選擇內含DICOM的ZIP壓縮包到此處，上傳並檢測', // new add
			overSize: '檢測到當前文件夾大小超過400MB，該上傳方式伴有系統崩潰風險，請確認是否繼續', // new add
			notZip: '請確保上傳的文件為ZIP壓縮包！', // new add
			isRAR: '檢測到當前文件格式為RAR，可能會出現檢測失敗的情況，請確認是否繼續', // new add
			confirmZIP: '請確保拖拽至此區域的為ZIP壓縮包！', // new add
			batchUpload: '批量上传', // new add
			remainingRoom: '剩餘容量', // new add
			usedQuota: '使用次數', // new add
			rechargeWarning: '系統使用額度僅剩餘{remainingQuota}次，請盡快聯繫我們，避免影響後續使用。', // new add
			rechargeInfo: '如需充值，請聯繫我們的客服人員：\n客服電話：400-085-9718\n工作時間：9:00-18:00', // new add
			recharge: '充值', // new add
			insufficientQuota: '系統使用額度不足，請進行充值後再嘗試該操作！', // new add
			fileApiNotReadable: '系統沒有讀取該文件的權限，請重啓瀏覽器後重試！', // new add
			fileApiError: '計算文件大小出錯，請重啓瀏覽器後重試！', // new add
		},
		btn: {
			confirm: '確認',
			cancel: '取消',
		},
		follow: {
			link: '匹配',
			unlink: '解除匹配',
			linknodule: '匹配結節',
			index: '張',
			size: '大小(mm)',
			volume: '體積(mm³)',
			type: '結節類型',
			loading: '回診對比計算中',
			compare: '對比變化',
			diameter: '標準直徑：',
			vol: '結節體積：',
			ct: '平均CT值：',
			doubleTime: '倍增時間：',
			// JS

			check: '請在 t0 和 t1 結節列表裏各自勾選一個結節',
			cant: '您所選的兩個結節無法匹配',
			success: '匹配成功',
			uncheck: '請從匹配結節中選擇至少一組結節解除匹配',
			unlsuccess: '解除匹配成功',
			declaration: 'AI結果僅供參考，最終結果以臨床醫生診斷為準',
			followGuide:
				'匹配：自動展示匹配成功的結節小組<br/>' +
				'也可手動添加匹配結節<br/>' +
				'解開匹配：用戶可自定義 匹配幀序列的關聯狀態。展示信息包含：1、幀序號 2、大小 3、體積 4、形態類型',
			manual: '手動', // new add
		},
		report: {
			check_delete: {
				title: '提示',
				content: '确定删除该模板吗？',
				confirm: '确定',
				cancel: '取消',
			}, // new add
			check_show: '勾选显示', // new add
			upload: '上傳',
			logo_upload: '醫院LOGO',
			logo_tip: '机构LOGO', // new add
			logo_show: '图片大小1M以内', // new add
			report_form: '報告形式',
			report_image: '圖文報告',
			report_normal: '常規報告',
			report_name: '模板名稱',
			rtemplete_name: '請輸入模板名稱',
			isDefault: '設為默認',
			hospital_name: '報告標題',
			p_hospital_name: '請輸入報告標題',
			exinform: '報告副標題',
			p_exinform: '請輸入報告副標題',
			patientInfo: '患者資料',
			patient_item: {
				patient_name: '姓名',
				patient_sex: '性别',
				patient_age: '年齡',
				patient_birthday: '出生日期',
				patient_id: 'patient_id', //new add
			},
			checkInfo: '檢查資訊',
			check_item: {
				study_date: '檢查日期',
				modality: '檢查設備',
				detection_project: '檢查項目',
			},
			noduleInfo: '結節信息',
			nodule_item: {
				coordZ: '影像層',
				lung_lobe: '肺',
				pulmonary_lobe: '肺葉',
				segment: '肺段', // new add
				diameter: '大小',
				nodule_size: '體積',
				feature_label: '結節類型',
				probability: '結節概率',
				diameter_norm: '標準直徑',
				maligant: '惡性風險',
				invision_classify: '浸潤程度',
				feature_label_g: '鈣化情況',
				center_hu: '中心密度',
				mean_hu: '平均密度',
				max_hu: '最大密度',
				min_hu: '最小密度',
			},
			tips1: '如簽名手寫，可以不填',
			tips2: '例：”本報告結論僅供臨床醫生參考”',
			tips3: '其他資訊顯示（如不勾選，導出報告時則不顯示該項資訊',
			tips4: '其他資訊顯示',
			doctor_autograph: '醫生簽名',
			use_electronic_signature: '使用電子簽名', // new add
			p_doctor_autograph: '請輸入醫生簽名',
			statement: '聲明',
			p_statement: '請輸入聲明',
			hospital_address: '醫院地址',
			p_hospital_address: '請輸入醫院地址',
			department_phone: '科室電話',
			p_department_phone: '請輸入科室電話',
			department_name: '科室名稱',
			p_department_name: '請輸入科室名稱',
			zip_code: '郵遞區號',
			p_zip_code: '請輸入郵遞區號',
			report_analysis: '報告解讀', // new add
			p_report_analysis: '請輸入報告解讀', // new add
			use_report_analysis: '使用該條文字，字數不超過12個', // new add
			use_tel_info: '使用該條文字，不超過16個字符', // new add
			show_QR_code: '顯示二維碼', // new add
			del: '刪除',
			save: '保存',
			show: '顯示',
			all_check: '全選',
			patient_inform: '患者信息',
			show_sort: '顯示順序',
			new_report: '新增報告模板',
			default_report: '默認報告模板',
			diannei_report: '點內模板',
			del_success: '刪除成功',
			save_success: '保存成功',
			tab_tip1: '您的報告模板已經有',
			tab_tip2: '個了，請刪除後再創建',

			// JS
			MESSAGE: '請檢查“患者信息”“檢查信息”“結節信息”顯示設置，最少勾選一項，勾選後必須填寫順序，且順序不能重復',
			alert: '模板名稱不能為空',
			alert_confirm: '刪除後不可恢復，請確定是否要刪除',
			confirm: '確定',
			reportPreview: '報告預覽', // new add
			doctor: '诊断医生', // new add
			dicomImg: '結節影像', // new add
			zoomImg: '放大影像', // new add
			address: '醫院地址', // new add
			tel: '科室電話', // new add
			postal: '郵政編碼', // new add
			declaration: '免責聲明', // new add
			info: '請確保輸入的數字範圍為：', // new add
			reportTitleTip: '報告標題不能為空！', // new add
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
		tranfering: '數據傳輸中',
	},
	error: {
		notThick: '當前上傳的影像層厚超過3mm，超過3mm會影響AI和醫生閱片的準確性，建議上傳小於等於3mm的薄層影像。',
		internalServerError: '系統未知錯誤，請將問題反饋至service@dianei-ai.com，或撥打客服電話400-0859-718', // new add
	},
	el: {
		colorpicker: {
			confirm: '確定',
			clear: '清空',
		},
		datepicker: {
			now: '此刻',
			today: '今天',
			cancel: '取消',
			clear: '清空',
			confirm: '確定',
			selectDate: '選擇日期',
			selectTime: '選擇時間',
			startDate: '開始日期',
			startTime: '開始時間',
			endDate: '結束日期',
			endTime: '結束時間',
			prevYear: '前一年',
			nextYear: '後一年',
			prevMonth: '上個月',
			nextMonth: '下個月',
			year: '年',
			month1: '1 月',
			month2: '2 月',
			month3: '3 月',
			month4: '4 月',
			month5: '5 月',
			month6: '6 月',
			month7: '7 月',
			month8: '8 月',
			month9: '9 月',
			month10: '10 月',
			month11: '11 月',
			month12: '12 月',
			// week: '周次',
			weeks: {
				sun: '日',
				mon: '一',
				tue: '二',
				wed: '三',
				thu: '四',
				fri: '五',
				sat: '六',
			},
			months: {
				jan: '一月',
				feb: '二月',
				mar: '三月',
				apr: '四月',
				may: '五月',
				jun: '六月',
				jul: '七月',
				aug: '八月',
				sep: '九月',
				oct: '十月',
				nov: '十一月',
				dec: '十二月',
			},
		},
		select: {
			loading: '加載中',
			noMatch: '無匹配數據',
			noData: '無數據',
			placeholder: '請選擇',
		},
		cascader: {
			noMatch: '無匹配數據',
			loading: '加載中',
			placeholder: '請選擇',
		},
		pagination: {
			goto: '前往第',
			pagesize: '條/頁',
			total: '共 {total} 個',
			pageClassifier: '頁',
		},
		messagebox: {
			title: '提示',
			confirm: '確定',
			cancel: '取消',
			error: '輸入的數據不合法!',
		},
		upload: {
			deleteTip: '按 delete 鍵可刪除',
			delete: '刪除',
			preview: '查看圖片',
			continue: '繼續上傳',
		},
		table: {
			emptyText: '暫無數據',
			confirmFilter: '篩選',
			resetFilter: '重置',
			clearFilter: '全部',
			sumText: '合計',
		},
		tree: {
			emptyText: '暫無數據',
		},
		transfer: {
			noMatch: '無匹配數據',
			noData: '無數據',
			titles: ['列表 1', '列表 2'],
			filterPlaceholder: '請輸入搜索內容',
			noCheckedFormat: '共 {total} 項',
			hasCheckedFormat: '已選 {checked}/{total} 項',
		},
	},
};
