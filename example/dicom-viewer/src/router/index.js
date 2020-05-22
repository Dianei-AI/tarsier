import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'local',
		// component: () => import('../views/netDicomViewer.vue')
		// component: () => import('../views/localDicomViewer.vue')
		component: () => import('../../example/netExample.vue')   //测试网络实例
		// component: () => import('../../example/example.vue')         //测试本地实例
	},
];

const router = new VueRouter({
	routes
});

export default router;
