/**
 *
 * @param data 结节列表
 * @param cb 根据图像的顺序，返回结节的index，因为该函数在业务逻辑中很常用,因此作为回调函数传入。
 * sort分为从肺尖到肺底以及肺底到肺尖，以下回调函数的示例
 * function cb(index) {
	let imgSort = 'top', baseNames = [1,2,3];
	if (imgSort === 'top') {
		index = baseNames.length - index - 1;
	}
	return index;
}
 */
function initLesionsByIndex(data,cb) {
	// 构造lesionByIndex 用于在canvas上绘制图形 结节信息按照所在层数Index排列，{1:[{},{}],20:[]}
	// key代表帧数，如果当前帧数上有超过一个结节，则此数组上添加个indexofCurrentZ属性
	// 代表这一帧当前高亮显示的结节,默认显示这个值
	let lesionsByIndex = {};
	for (let i = 0; i < data.length; i++) {
		let totalIndex = data[i].totalIndex;
		// 当前结节的信息
		let noduleInfo = data[i];
		// 当前结节跨多层的情况下在所在层要添加结节
		let rois = data[i].lesion.rois;
		let pileStart;
		let pileEnd;
		if (rois) {
			let keys = Object.keys(rois);
			let maxIndex = Math.max(...keys);
			let minIndex = Math.min(...keys);
			pileStart = cb(minIndex);
			pileEnd = cb(maxIndex);
			if (pileStart > pileEnd) {
				[pileStart, pileEnd] = [pileEnd, pileStart];
			}
		} else {
			// 没有多帧显示
			pileStart = pileEnd = totalIndex;
		}
		// 预防算法出错
		{
			if (totalIndex < pileStart) {
				pileStart = totalIndex;
			}
			if (totalIndex > pileEnd) {
				pileEnd = totalIndex;
			}
		}
		data[i].startIndex = pileStart;
		data[i].endIndex = pileEnd;
		for (let i = pileStart; i <= pileEnd; i++) {
			// 构造lesionByIndex
			if (lesionsByIndex[i]) {
				lesionsByIndex[i].push(noduleInfo);
			} else {
				lesionsByIndex[i] = [noduleInfo];
			}
			if (lesionsByIndex[i].length > 1) {
				lesionsByIndex[i].indexofCurrentZ = 0;
			}
		}
	}
	return lesionsByIndex
}

export { initLesionsByIndex }
