import service from '@/utils/service';

// 添加下级机构 [youyu]
export const addNextOrg = async (params) => {
	const response = await service.post('/yc/agent/addNextOrg', params);
	return response.data;
};

// 编辑机构
export const editOrg = async (params) => {
	const response = await service.post('/yc/agent/editOrg', params);
	// return response.data;
	return {
		code: 200,
		data: true,
		message: '编辑失败',
	};
};

// 删除机构
export const deleteOrg = async (params) => {
	const response = await service.post('/yc/agent/deleteOrg', params);
	// return response.data;
	return {
		code: 200,
		data: true,
		message: '未成功删除',
	};
};

// 获取机构树
export const orgTree = async (params) => {
	const response = await service.get('/yc/agent/orgTree', params);
	return response.data;
};

// 获取机构数
export const getOrgTree = async (params) => {
	const response = await service.get('/yc/agent/orgTree', params);
	return response.data;

};

// 添加新账号
export const addUser = async (params) => {
	const response = await service.post('/yc/agent/user/addUser', params);
	// return response.data;
	return {
		code: 200,
		data: true,
		message: '账号已存在',
	};
};

// 重置密码
export const resetPassword = async (params) => {
	const response = await service.post('/yc/agent/user/changePassword', params);
	// return response.data;
	return {
		code: 200,
		data: true,
		message: '未成功删除',
	};
};

// 删除账号
export const deleteUser = async (params) => {
	const response = await service.post('/yc/agent/user/deleteUser', params);
	return response.data;
};

// 获取当前机构账户列表
export const getUserList = async (params) => {
	const response = await service.get('/yc/agent/orgUser', { params });
	return response.data;
};

// 编辑账号
export const modifyUser = async (params) => {
	const response = await service.post('/yc/agent/user/modifyUser', params);
	// return response.data;
	return {
		code: 200,
		data: true,
		message: '账号已存在',
	};
};
