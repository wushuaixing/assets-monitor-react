import service from '../service';
import { baseUrl } from './index';


export const allGet = (url, params, method = 'get') => service[method](`${baseUrl}${url}`, { params }).then(res => ({ ...res.data })).catch((error) => {
	console.log('error:', error);
});

export const allGet2 = (url, params) => service.get(`${baseUrl}${url}`, { params }).then(res => ({ res })).catch((error) => {
	console.log('error:', error);
});
