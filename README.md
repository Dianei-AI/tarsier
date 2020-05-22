### 使用步骤

```
npm install dn-tarsier
```

在 main.js文件中
import DnTarsier from 'dn-tarsier';
import 'dn-tarsier/lib/css/style.css';
VUe.use(DnTarsier);

导入dicomView

```
import dicomViewer from 'xxxxx';
```

传参属性详情见Wiki

### 关于dicomView组件

##### 一：初始化cornerston

1cornerstone相关配置

```
cornerstoneDicomLoader.external.cornerstone = cornerstone;
cornerstoneDicomLoader.external.dicomParser = dicomParser;
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.init();
```

除了以上配置之外 还有如工具激活 窗口大小设置 引入解析文件



2 通过dicomSource判断是本地上传dicom文件还是网络请求的dicom（不传值默认是local）

a：本地上传文件，他的imageIds(数组类型)就是所有上传文件的cornerstoneDicomLoader.wadouri.fileManager.add(this.fileList[i])

b: 网络请求文件，他的imageIds（数组类型）就是以wadouri开头拼接的url

如：wadouri:http://172.16.5.7:/api/store/b1ac9b42900611ea8dda0242ac140007/download?chunk=1.2.840.113619.2.416.3376184735625088667251921131489050371.237.dcm



3 加载本地和网络dicom文件

a:加载本地文件。上面2获取到了imageIds，通过cornerstone.loadImage加载文件，设置视口，element就是canvas的容器。

```
cornerstone.loadImage(this.imageIds[index]).then((image) => {
	let viewport = cornerstone.getViewport(this.element);
	cornerstone.displayImage(this.element, image, viewport);
```



b: 加载网络文件。上面2获取到了imageIds，通过cornerstone.loadAndCacheImage加载文件,可以控制imageID顺序来控制影片加载顺序，在给的example中做了去重优先加载结节上下5帧的操作，同时http1.1限制浏览器最多同时处理6个请求，为了方便医生在加载图像时进行其他异步操作，因此最多同时处理5个影像请求。

```
cornerstone.loadAndCacheImage(this.imageIds[imageIndex]).then((image) => {
		let viewport = cornerstone.getViewport(this.element);
		cornerstone.displayImage(this.element, image, viewport);
```



### 使用案例

在example文件夹有引用这个dicom库的vue项目实例ai-dicom-viewer,项目页面在ai-dicom-viewer/example文件夹下example.vue 是本地上传dicom例子，netExample是网络请求dicom例子，在router文件中更改一下路由显示进行切换。

