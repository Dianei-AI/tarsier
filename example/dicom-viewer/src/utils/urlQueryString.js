const urlQueryString = function (name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var urlSearch = window.location.href.indexOf('?');
	var r = window.location.href.substr(urlSearch, window.location.href.length).substr(1).match(reg);
	if (r !== null) {
		return unescape(r[2]);
	}
	return null;
};
export default urlQueryString;
