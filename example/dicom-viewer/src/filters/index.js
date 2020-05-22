import Vue from 'vue';
import i18n from '../lang/';

var message = i18n.messages[i18n.locale].message;
Vue.filter('toDecimal', function (val, deci) {
	// 判断如果有小数点则四舍五入，没有小数点则保留
	if (/\./.test(val)) {
		return deci !== undefined ? Number(val.toFixed(deci)) : Number(val.toFixed(0));
	} else {
		return Number(val);
	}
});
Vue.filter('toPercent', function (val) {
	let num = Number(val);
	return num * 100;
});
// 将结节分类数字转化为对应类型
Vue.filter('transferProp', function (val) {
	let result = '';
	switch (val) {
		case '000':
			result = message.dicom.propAll;
			break;
		case '100':
			result = message.dicom.propLungSolid;
			break;
		case '200':
			result = message.dicom.propPartSolid;
			break;
		case '300':
			result = message.dicom.propGlass;
			break;
		case '400':
			result = message.dicom.propLungCal;
			break;
		case '500':
			result = message.dicom.propChestSolid;
			break;
		case '600':
			result = message.dicom.propChestCal;
			break;
		default:
			break;
	}
	return result;
});
// 将结节分类数字转化为钙化情况
Vue.filter('transferToCal', function (val) {
	let result = '';
	switch (val) {
		case '400':
			result = message.dicom.calType;
			break;
		case '600':
			result = message.dicom.calType;
			break;
		default:
			result = message.dicom.noncalType;
	}
	return result;
});
// 因为后端给的lobe字段包含肺位置以及上下中叶
Vue.filter('lung', function (val) {
	let result = '';
	switch (val) {
		case 'RUL':
		case 'RLL':
		case 'RML':
			result = message.dicom.rightLung;
			break;
		case 'LUL':
		case 'LLL':
			result = message.dicom.leftLung;
			break;
		default:
			result = 'NA';
	}
	return result;
});
Vue.filter('lobe', function (val) {
	let result = '';
	switch (val) {
		case 'RUL':
		case 'LUL':
			result = message.dicom.upper;
			break;
		case 'RLL':
		case 'LLL':
			result = message.dicom.lower;
			break;
		case 'RML':
			result = message.dicom.middle;
			break;
		default:
			result = 'NA';
			break;
	}
	return result;
});

Vue.filter('segment', function (val) {
	return message.dicom[val];
});
Vue.filter('lungLobe', function (val) {
	let result = '';
	switch (val) {
		case 'RUL':
			result = message.dicom.rightLung + message.dicom.upper;
			break;
		case 'LUL':
			result = message.dicom.leftLung + message.dicom.upper;
			break;
		case 'RLL':
			result = message.dicom.rightLung + message.dicom.lower;
			break;
		case 'LLL':
			result = message.dicom.leftLung + message.dicom.lower;
			break;
		case 'RML':
			result = message.dicom.rightLung + message.dicom.middle;
			break;
		default:
			break;
	}
	return result;
});
