import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles/reset.scss';
import './assets/styles/iconfont.scss';
import 'lib-flexible/flexible.js'
import './filters'
import i18n from './lang';
Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
	router,
	store,
	i18n,
	render: (h) => h(App)
}).$mount('#app');
