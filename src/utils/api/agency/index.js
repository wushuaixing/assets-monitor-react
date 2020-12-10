import service from '@/utils/service';

// 添加下级机构 [youyu]
export const addNextOrg = async (params) => {
	const response = await service.post('/yc/agent/addNextOrg', { params });
	return response.data;
};

// 编辑机构
export const editOrg = async (params) => {
	const response = await service.post('/yc/agent/editOrg', params);
	return response.data;
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

// 获取下级机构列表
export const getNextOrgList = async (params) => {
	const response = await service.get('/yc/agent/nextOrgList', params);
	// return response.data;
	return {
		code: 200,
		data: [
			{
				allMonitorNumber: 1000,
				allSearchNumber: 2000,
				id: 2233,
				level: '一级',
				monitorNumber: 22,
				orgName: '资产保全部',
				searchNumber: 289,
			},
			{
				allMonitorNumber: 1000,
				allSearchNumber: 2000,
				id: 2233,
				level: '一级',
				monitorNumber: 22,
				orgName: '风险监控部',
				searchNumber: 289,
			},
			{
				allMonitorNumber: 1000,
				allSearchNumber: 2000,
				id: 2233,
				level: '二级',
				monitorNumber: 22,
				orgName: '授信评审部',
				searchNumber: 289,
			},
			{
				allMonitorNumber: 1000,
				allSearchNumber: 2000,
				id: 2233,
				level: '二级',
				monitorNumber: 22,
				orgName: '风险部-吴胜耀团队',
				searchNumber: 289,
			},
			{
				allMonitorNumber: 1000,
				allSearchNumber: 2000,
				id: 2233,
				level: '二级',
				monitorNumber: 223,
				orgName: '风险部-张司机组',
				searchNumber: 289,
			},
		],
	};
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
	// return response.data;
	return {
		code: 200,
		data: [
			{
				id: 2323,
				lastLoginDateTime: '2020-02-18',
				mobile: '17822993333',
				name: '张三',
			},
			{
				id: 4433,
				lastLoginDateTime: '2020-05-18',
				mobile: '17822992223',
				name: '李六',
			},
			{
				id: 2244,
				lastLoginDateTime: '2020-07-14',
				mobile: '15422335566',
				name: '王五',
			},
			{
				id: 6644,
				lastLoginDateTime: '2020-09-18',
				mobile: '12266778899',
				name: '刘丽',
			},
		],
	};
};

// 编辑账号
export const modifyUser = async (params) => {
	const response = await service.post('/yc/agent/user/modifyUser', params);
	return response.data;
};
