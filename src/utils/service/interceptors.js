import { defaultRequestMethods, defaultResponseMethods } from './default_config';
import { specialRequestMethods, specialResponseMethods } from './special_config';

const interceptorsConfig = (type) => {
	let methods = {};

	if (window.location.href.indexOf('localhost') < 0) {
		methods = {
			request: defaultRequestMethods,
			response: defaultResponseMethods,
		};
	} else {
		methods = {
			request: specialRequestMethods,
			response: specialResponseMethods,
		};
	}
	if (type === 'request') {
		return methods.request;
	}
	return methods.response;
};

export default interceptorsConfig;
