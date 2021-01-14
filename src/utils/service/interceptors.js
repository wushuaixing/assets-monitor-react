// import { defaultRequestMethods, defaultResponseMethods } from './default_config';
// import { specialRequestMethods, specialResponseMethods } from './special_config';
//
// const interceptorsConfig = (type) => {
// 	let methods = {};
// 	console.log('interceptors  global.IS_SPECIAL_LINE === ', global.IS_SPECIAL_LINE);
// 	if (global.IS_SPECIAL_LINE) {
// 		methods = {
// 			request: specialRequestMethods,
// 			response: specialResponseMethods,
// 		};
// 	} else {
// 		methods = {
// 			request: defaultRequestMethods,
// 			response: defaultResponseMethods,
// 		};
// 	}
// 	if (type === 'request') {
// 		return methods.request;
// 	}
// 	return methods.response;
// };
//
// export default interceptorsConfig;
