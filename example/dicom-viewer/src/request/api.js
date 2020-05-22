import axios from 'axios';
let base = window.API_HOST
	? `${window.API_PROTOCOL}://${window.API_HOST}:${window.API_PORT}/${window.API_SUFFIX ? window.API_SUFFIX + '/' : ''}`
	: '';
axios.defaults.baseURL = base;

export default {
	singleImgUrl: (storeId, chunk) => `${base}store/${storeId}/download?chunk=${chunk}`,
	image: (token, imageId) => `images/${imageId}?token=${token}`
};
