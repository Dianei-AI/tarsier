import Vue from 'vue';
//多国语言支持
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
//引入简体中文语言包
import langZHCN from './zh_cn.js';
//引入简台湾繁体语言包
import langZHTW from './zh_tw.js';
//引入英文语言包
import langENUS from './en_us.js';
import { storageGet } from '../utils/storage';
import urlQueryString from '../utils/urlQueryString';
// 初始化语言  初始化语言可以从存储里拿出或者从url里拿到
let localLang = storageGet('lang') || urlQueryString('lang');
if (!localLang) {
	// 获取浏览器或系统语言，适应内外网情况
	var navLang = (navigator.language || navigator.browserLanguage).toLowerCase();
	if (navLang.indexOf('tw') >= 0 || navLang.indexOf('hk') >= 0) {
		// 假如浏览器语言是繁体
		localLang = 'zh-tw';
	} else if (navLang.indexOf('en') >= 0) {
		localLang = 'en-us';
	} else {
		// 假如浏览器语言是其它语言
		localLang = 'zh-cn';
	}
} else {
	// 有语言的情况如果不是这三个语言则设置默认中文
	if (['zh-tw', 'en-us', 'zh-cn'].indexOf(localLang) === -1) {
		localLang = 'zh-cn';
	}
}
export default new VueI18n({
	locale: localLang,
	messages: {
		'zh-cn': langZHCN,
		'zh-tw': langZHTW,
		'en-us': langENUS,
	},
	silentTranslationWarn: true,
});
