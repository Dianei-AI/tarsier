# ai-dicom-viewer移动端 2020/5/11

## 项目说明

暂时是为了检测主要的阅片功能是否能在手机端展示，能否通过在手机端的手势操作去操控cornerstoneTool，
目前阅片的dcm文件是写死的，token也是写死的，如果遇到token失效的情况，需要去主阅片上面更新token。

### 样式部分
主要采用rem布局，UI设计是使用的iPone6的，（iphone6: 375px*667px  实际像素：750px*1334px），通过引入flexible.js改变不同尺寸html根元素的fontSize,
为了方便计算不想手动把px转为rem，引入postcss-px2rem, 在项目中只要写px，编译会自动转化（1rem=75px），如在设计图上有一个75px的
物体 即（width：75px），编译完显示（width：1rem）

### cornerstone工具介绍
在netDicomViewer中this.leftMouse进行工具激活，常用工具有
1 'Wwwc'  亮度调节
2 'Pan'   视图的移动
3 'ZoomTouchPinch' 移动端2指缩放操作。两指距离变远，视图放大。两指距离变近，视图缩小。

通过调研发现移动端Hammer.js 对手势操作监控很好用，具体操作请百度

#### 开发
`npm run serve`启用本地开发环境，比如启动是在 8888 端口时
