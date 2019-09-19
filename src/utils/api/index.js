// 所有网络请求的api都放到这里封装
import service from '../service';
// export const baseUrl = 'http://172.18.255.121:8080';
// export const baseUrl = 'http://172.18.255.74:8080'; // 赛神
// export const baseUrl = 'http://172.18.255.32:8080'; // 胡歆
// export const baseUrl = 'http://172.18.255.141';
// export const baseUrl = 'http://172.18.255.25:8011';

// export const baseUrl = '';

export const baseUrl = 'http://172.18.255.251:8588';
// export const baseUrl = 'http://172.18.255.251:18080';
// export const baseUrl = 'http://172.18.255.251:8588'; // 上传地址
// export const baseUrl = 'http://172.18.255.111:8088'; // ie8 自己电脑开发接口
// export const baseUrl = 'http://172.18.255.251:8286'; // 开发接口
// export const baseUrl = 'http://172.18.255.251:8280'; // 开发接口
// export const baseUrl = 'http://172.18.255.251:8096'; // 开发接口
// export const secUrl = 'http://172.18.255.251:8283';
export const secUrl = 'http://www.dev.ycywgl.com';

// let baseUrl = "http://172.18.255.32:8081/java_asset_case_war_exploded";
// const baseUrl2 = 'http://172.18.255.32:8081/java_asset_case_war_exploded/about/test2';
// let baseUrl = "http://172.18.255.32:8081/java_asset_case_war_exploded";
// http://localhost:8081/java_asset_case_war_exploded/about/test2
// api 登陆

// export let login = async (params) => {
//   let response = await service.post(`http://172.18.255.32:8081/java_asset_case_war_exploded/about/test2`, JSON.stringify(params));
//   return response.data;
// };
export const login = params => service.post(`${baseUrl}/yc/open/login`, params);
// 权限列表
export const getOrgSystemKeys = async () => {
	const response = await service.post(`${baseUrl}/index/v1/getOrgSystemKeys`);
	return response.data;
};

// 机构树
export const orgTree = async () => {
	const response = await service.get(`${baseUrl}/yc/organization/orgTree`);
	console.log(response, 11);

	return response.data;
};

// authRule
export const authRule = params => service.get(`${baseUrl}/api/auth/authRule`, { params })
	.then(res => res.data);
