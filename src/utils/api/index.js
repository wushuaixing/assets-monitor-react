// 所有网络请求的api都放到这里封装
import service from '../service';
// export const baseUrl = 'http://172.18.255.121:8080';
// export const baseUrl = 'http://172.18.255.74:8080'; // 赛神
// export const baseUrl = 'http://172.18.255.32:8080'; // 胡歆
export const baseUrl = 'http://172.18.255.251:18080';

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

// push infor  登陆
export const mainInfor = async (url, params) => {
	const response = await service.post(`${baseUrl + url}`, params);
	return response.data;
};
// 请求验证码
export const getValidateCode = async (params) => {
	const response = await service.post(`${baseUrl}/user/index/getCode`, params);
	return response.data;
};
// 获取业务负责人列表
export const getPrincipals = async () => {
	const response = await service.post(`${baseUrl}/business/business/getCharger`);
	return response.data;
};

// /business/business/add
// 保存单个业务
export const addBusiness = async (params) => {
	const response = await service.post(`${baseUrl}/business/business/add`, params);
	return response.data;
};

// 侧边栏列表
export const leftListBusiness = async (params) => {
	const response = await service.post(`${baseUrl}/business/left/list`, params);
	return response.data;
};

// 侧边栏详情
export const leftDetailBusiness = async (params) => {
	const response = await service.post(`${baseUrl}/business/left/detail`, params);
	return response.data;
};

// 侧边栏详情
export const leftChoiceBusiness = async (params) => {
	const response = await service.post(`${baseUrl}/business/left/getTree`, params);
	return response.data;
};
// 机构人员信息
export const getBusinessMember = async (params) => {
	const response = await service.post(`${baseUrl}/business/left/getMember`, params);
	return response.data;
};
// 个人信息详情
export const centerDetail = async (params) => {
	const response = await service.post(`${baseUrl}/user/v1/getInfo`, params);
	return response.data;
};
// 首次修改个人密码
export const centerFirstPassword = async (params) => {
	const response = await service.post(`${baseUrl}/user/v1/firstChangePassword`, params);
	return response.data;
};
// 修改个人密码
export const centerChangePassword = async (params) => {
	const response = await service.post(`${baseUrl}/user/v1/changePassword`, params);
	return response.data;
};

// 修改邮件地址
export const centerChangeEmail = async (params) => {
	const response = await service.post(`${baseUrl}/user/v1/changeEmail`, params);
	return response.data;
};

// 获取工商基本信息
export const getCompanyBase = async (params) => {
	const response = await service.post(`${baseUrl}/yc/business/companyBase`, params);
	return response.data;
};

// 获取工商其他相关信息
export const getCompanyInfos = async (params) => {
	const response = await service.post(`${baseUrl}/yc/business/companyInfoList`, params);
	return response.data;
};


// 获取下一步节点
export const getNextNodeList = async (nodeCode) => {
	const response = await service.get(`${baseUrl}/yc/node/common/getNextNodeList?nodeCode=${nodeCode}`);
	return response.data;
};

// 获取节点的跟踪信息列表
export const getNodeProcessList = async (businessId, nodeType) => {
	const response = await service.get(`${baseUrl}/yc/node/detail/getNodeProcessList?businessId=${businessId}&nodeType=${nodeType}`);
	return response.data;
};

/**
 * 获取详情的步骤信息
 * @param businessId
 * @param nodeType
 * @returns {Promise<*>}
 */
export const getNodeStepInfo = async (businessId, nodeType) => {
	const response = await service.get(`${baseUrl}/yc/node/detail/getNodeStepInfo?businessId=${businessId}&nodeType=${nodeType}`);
	return response.data;
};

// 常规卡片详情
export const routineDetail = async () => {
	const response = await service.get(`${baseUrl}/yc/routine/routineDetail`);
	return response.data;
};
// 司法确权卡片详情
export const judicialConfirmation = async () => {
	const response = await service.get(`${baseUrl}/yc/process/justice/judicialConfirmation`);
	return response.data;
};

// 仲裁卡片列表页
export const arbitration = async () => {
	const response = await service.get(`${baseUrl}/yc/process/arbitration/cardList`);
	return response.data;
};
// 赋强公证卡片列表页
export const notarization = async () => {
	const response = await service.get(`${baseUrl}/yc/process/notarization/cardList`);
	return response.data;
};

// 破产卡片列表页
export const enforce = async () => {
	const response = await service.get(`${baseUrl}/yc/process/enforce/cardList`);
	return response.data;
};

// 已完成卡片列表页
export const done = async () => {
	const response = await service.get(`${baseUrl}/yc/process/done/cardList`);
	return response.data;
};

// 破产卡片列表页
export const bankruptcy = async () => {
	const response = await service.get(`${baseUrl}/yc/process/bankruptcy/cardList`);
	return response.data;
};


// 待首次催收详情
export const getFirstRush = async (businessId) => {
	const response = await service.post(`${baseUrl}/yc/process/rush/firstRushDetail/${businessId}`);
	return response.data;
};

// 待首次催收详情页提交
export const saveFirstRush = async (params) => {
	const response = await service.post(`${baseUrl}/yc/process/rush/firstRush/${params.businessId}`, params);
	return response.data;
};

// 后续催收详情
export const getAgainRush = async (businessId) => {
	const response = await service.post(`${baseUrl}/yc/process/rush/againRushDetail/${businessId}`);
	return response.data;
};

// 后续催收收详情页提交
export const saveAgainRush = async (params) => {
	const response = await service.post(`${baseUrl}/yc/process/rush/secondRush/${params.businessId}`, params);
	return response.data;
};
/**
 * 常规催收-待收款提交
 * @param params
 * @param id
 * @returns {Promise<*>}
 */
export const saveRepay = async (params, id) => {
	const response = await service.post(`${baseUrl}/yc/process/rush/repay/${id}`, params);
	return response.data;
};

// 获取详情的基本信息
export const getNodeBaseInfo = async (businessId, nodeType) => {
	const response = await service.get(`${baseUrl}/yc/node/detail/getNodeBaseInfo?businessId=${businessId}&nodeType=${nodeType}`);
	return response.data;
};

// 获取执行业务详情
export const getNodeEnforceDetailInfo = async (params) => {
	const response = await service.post(`${baseUrl}/yc/node/detail/getEnforceDetailInfo`, params);
	return response.data;
};

// 获取破产业务详情
export const getNodeBankruptcyDetailInfo = async (businessId, caseNumber) => {
	const response = await service.get(`${baseUrl}/yc/node/detail/getNodeBankruptcyDetailInfo?businessId=${businessId}&caseNumberBankruptcy=${caseNumber}`);
	return response.data;
};
// 获取破产业务详情 2
export const getSimpleBankruptcyInfo = async (businessId, businessObligorId) => {
	const params = {
		businessId,
		businessObligorId,
	};
	const response = await service.post(`${baseUrl}/yc/node/detail/getSimpleBankruptcyInfo`, params);
	return response.data;
};

/**
 * 获取债务人下拉列表
 * @param businessId
 * @returns {Promise<*>}
 */
export const getObligorList = async (businessId) => {
	const response = await service.get(`${baseUrl}/yc/node/detail/getObligorList?businessId=${businessId}`);
	return response.data;
};

export const getObligorListByNode = async (businessId, nodeCode) => {
	const params = {
		businessId,
		nodeCode,
	};
	const response = await service.post(`${baseUrl}/yc/node/detail/getObligorListByNode`, params);
	return response.data;
};

// 业务基本信息列表
export const userInfoList = async (params) => {
	const response = await service.get(`${baseUrl}/yc/user/userInfoList?loanTypeConst=${params.loanTypeConst}&obligorNameOrNumber=${params.obligorNameOrNumber}&page=${params.page}&num=${params.num}`);
	return response.data;
};

// 债务人基本信息列表
export const obligorInfoList = async (params) => {
	const response = await service.get(`${baseUrl}/yc/user/obligorInfoList?dishonestStatus=${params.dishonestStatus}&num=10&obligorName=${params.obligorName}&page=${params.page}`);
	return response.data;
};

// 担保人列表
export const guaranteeInfoList = async (businessId) => {
	const response = await service.get(`${baseUrl}/yc/user/guaranteeInfoList?businessId=${businessId}`);
	return response.data;
};

// 债务人相关业务列表
export const relatedBusinessInfoList = async (obligorId) => {
	const response = await service.get(`${baseUrl}/yc/user/relatedBusinessInfoList?obligorId=${obligorId}`);
	return response.data;
};

// 处置进度
export const getDisposalSchedule = async (businessID) => {
	const response = await service.get(`${baseUrl}/yc/node/detail/getDisposalSchedule?businessId=${businessID}`);
	return response.data;
};

// 我负责的卡片页统计数字
export const getMainCount = async () => {
	const response = await service.get(`${baseUrl}/yc/process/main/count`);
	return response.data;
};

/**
 * 获取消息列表
 * @param typeId "1": "数据匹配","2": "我负责的","3": "审批消息","4": "我关注的"
 * @param messageType
 * "1": "开庭提醒","2": "续封提醒","3": "开庭排期提醒","4": "还款提醒","5": "催收提醒","6": "续聘律师提醒","7": "退费提醒","8": "申请执行提醒"
 * "asset": "资产拍卖","bankruptcy": "破产重组","biddin": "招标中标","chattelMortgate": "动产抵押","companyChange": "工商变更","courtNotices": "开庭公告","dishonest": "失信记录","epb": "环境行政处罚","equityPledged": "股权出质","filing": "立案信息","financialBidding": "金融资产-竞价项目","financialPublic": "金融资产-公示项目","judgment": "裁判文书","limit": "限高","tax": "重大税收违法"
 * @param num  每页条数
 * @param page  页数，1 开始
 * @returns {Promise<*>}
 */
export const getMessages = async (typeId, messageType, num, page) => {
	const response = await service.get(`${baseUrl}/yc/message/messageList/${typeId}/${messageType}?num=${num}&page=${page}`);
	return response.data;
};

// 标记为已读
export const readMessages = async (typeId, ids) => {
	const response = await service.post(`${baseUrl}/yc/message/batchRead/${typeId}`, ids);
	return response.data;
};

// 删除所选项
export const deleteMessages = async (typeId, ids) => {
	const response = await service.post(`${baseUrl}/yc/message/batchDelete/${typeId}`, ids);
	return response.data;
};

/**
 * 获取业务跟进过程记录
 * @param businessId
 * @param obligorId 债务人Id
 * @returns {Promise<*>}
 */
export const getFollowUpProcess = async (businessId, obligorId) => {
	const response = await service.get(`${baseUrl}/yc/node/detail/getFollowUpProcess?businessId=${businessId}${obligorId ? `&businessObligorId=${obligorId}` : ''}`);
	return response.data;
};

/**
 * 获取日程管理列表
 * @param startTime
 * @param endTime
 */
export const getCalendarList = (startTime, endTime) => service.get(`${baseUrl}/yc/calendar/getCalendarList`, {
	params: {
		startTime,
		endTime,
	},
}).then(res => res.data);

// 押品列表
export const getMortgageList = async ({
	businessNoOrOwnerNameOrMortgageName, mortgageType, disposalSchedule, stopSeal, itemType, page, num,
}) => {
	const response = await service.get(`${baseUrl}/yc/user/mortgageList?businessNoOrOwnerNameOrMortgageName=${businessNoOrOwnerNameOrMortgageName}&mortgageType=${mortgageType}&disposalSchedule=${disposalSchedule ? Number(disposalSchedule) : ''}&stopSeal=${stopSeal}&itemType=${itemType}&page=${page}&num=${num}`);
	return response.data;
};

// 押品详情
export const getMortgageDetail = async (mortgageId, itemType) => {
	const response = await service.get(`${baseUrl}/yc/user/mortgageDetail?mortgageId=${mortgageId}&itemType=${itemType}`);
	return response.data;
};

// 删除押品
export const deleteMortgage = async (mortgageId) => {
	const response = await service.get(`${baseUrl}/yc/user/deleteMortgage?mortgageId=${mortgageId}`);
	return response.data;
};

// 保存押品信息
export const saveMortgage = async (data) => {
	const response = await service.post(`${baseUrl}/yc/user/saveMortgage`, data);
	return response.data;
};

// 导出押品信息
export const exportMortgage = async ({
	businessNoOrOwnerNameOrMortgageName, mortgageType, disposalSchedule, stopSeal,
}) => {
	const response = await service.post(`${baseUrl}/yc/user/exportMortgage?businessNoOrOwnerNameOrMortgageName=${businessNoOrOwnerNameOrMortgageName}&disposalSchedule=${disposalSchedule ? Number(disposalSchedule) : ''}&mortgageType=${mortgageType}&stopSeal=${stopSeal}`);
	return response.data;
};
// 债务人信息
export const getUserObligorInfo = async () => {
	const response = await service.get(`${baseUrl}/yc/user/getUserObligorInfo`);
	return response.data;
};

// 导出pdf
export const projectExport = async (data) => {
	const response = await service.post(`${baseUrl}/yc/user/projectExport`, data);
	return response.data;
};
// 业务编号信息
export const getBusinessNoList = async ({ userObligorId }) => {
	const response = await service.get(`${baseUrl}/yc/user/getBusinessNoList?userObligorId=${userObligorId}`);
	return response.data;
};

/* 律师库 系列  - start */

/**
 * @returns {Promise<*>} 获取律所列表
 */
export const getLawyerFirm = async () => service.get(`${baseUrl}/yc/lawyer/lawyerFirm`).then(res => res.data);

/**
 * 获取律所对应律师列表
 * @param lawyerFirm
 * @returns {Promise<Function | any | Q.Promise<any> | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>>}
 */
export const getLawyers = async lawyerFirm => service.get(`${baseUrl}/yc/lawyer/lawyers`, {
	params: { lawyerFirm },
}).then(res => res.data);

/* - end */
