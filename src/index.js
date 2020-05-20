// 导入所有组件
import DnDicomViewer from './components/dicom-viewer/dicomViewer';
import initLesionsByIndex from './utils/lesionsByIndex';
const components = {
	DnDicomViewer
};
const install = function(Vue) {
	Object.values(components).forEach((component) => {
		Vue.component(component.name, component);
	});
};

export default {
	install,
	initLesionsByIndex,
	...components
};
