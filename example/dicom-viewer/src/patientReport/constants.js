import i18n from '../lang';
var message = i18n.messages[i18n.locale].message;
export const featureOption = {
	'100': message.dicom.propLungSolid,
	'200': message.dicom.propPartSolid,
	'300': message.dicom.propGlass,
	'400': message.dicom.propLungCal,
	'500': message.dicom.propChestSolid,
	'600': message.dicom.propChestCal,
	// 'NULL': '-'
};

export const propType = {
	'000': message.dicom.propAll,
	...featureOption,
};
