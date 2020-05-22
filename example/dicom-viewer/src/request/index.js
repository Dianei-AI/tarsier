import axios from 'axios';
import store from '../store';
import api from './api';
import { Message } from 'element-ui';
axios.defaults.headers.post['Content-Type'] = 'application/json';
// 请求拦截
axios.interceptors.request.use(
	(config) => {
		const token = store.state.token;
		if (token) {
			config.headers['DN-Token'] = token;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// 返回拦截
axios.interceptors.response.use(
	(res) => {
		return res.data;
	},
	(error) => {
		Message.error(error.message ? error.message : 'network error');
		return error;
	}
);

export function getImageNameList(token, imageId) {
	return axios.get(api.image(token, imageId));
}
