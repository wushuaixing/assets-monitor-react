import service from '@/utils/service';
import { baseUrl } from '@/utils/api/index';

/*  债务人详情页推送结果相关接口[C.H Wong] 11 */

// 司法监控列表
export const auctionList = (params, obligorId) => service
	.get(`${baseUrl}/yc/obligor/monitor/auctionList/${obligorId}`, { params })
	.then(res => res.data);

// 金融资产竞价项目
export const auctionBiddingList = (params, obligorId) => service
	.get(`${baseUrl}/yc/obligor/monitor/auctionBiddingList/${obligorId}`, { params })
	.then(res => res.data);

// 金融资产公示项目列表
export const financeList = (params, obligorId) => service
	.get(`${baseUrl}/yc/obligor/monitor/financeList/${obligorId}`, { params })
	.then(res => res.data);

// 代位权-开庭列表
export const courtSessionListD = (params, obligorId) => service
	.get(`${baseUrl}/yc/obligor/monitor/courtSessionList/${obligorId}`, { params })
	.then(res => res.data);

// 代位权-立案列表
export const trialListD = (params, obligorId) => service
	.get(`${baseUrl}/yc/obligor/monitor/trialList/${obligorId}`, { params })
	.then(res => res.data);

// 涉诉-开庭列表
export const courtSessionListS = (params, obligorId) => service
	.get(`${baseUrl}/yc/obligor/monitor/courtSessionList/${obligorId}`, { params })
	.then(res => res.data);

// 涉诉-立案列表
export const trialListS = (params, obligorId) => service
	.get(`${baseUrl}/yc/obligor/monitor/trialList/${obligorId}`, { params })
	.then(res => res.data);

// 破产列表
export const bankruptcyList = (params, obligorId) => service
	.get(`${baseUrl}/yc/obligor/monitor/bankruptcyList/${obligorId}`, { params })
	.then(res => res.data);

// 失信记录列表
export const dishonestList = (params, obligorId) => service
	.get(`${baseUrl}/yc/obligor/monitor/dishonestList/${obligorId}`, { params })
	.then(res => res.data);

// 公示公告招标总标列表
export const biddingList = (params, obligorId) => service
	.get(`${baseUrl}/yc/obligor/monitor/biddingList/${obligorId}`, { params })
	.then(res => res.data);

// 公示公告环境处罚列表
export const epbList = (params, obligorId) => service
	.get(`${baseUrl}/yc/obligor/monitor/epbList/${obligorId}`, { params })
	.then(res => res.data);


// 公示公告税收违法列表
export const taxList = (params, obligorId) => service
	.get(`${baseUrl}/yc/obligor/monitor/taxList/${obligorId}`, { params })
	.then(res => res.data);

// 数量统计
export const viewCount = (params, obligorId) => service
	.get(`${baseUrl}/yc/obligor/monitor/overview/${obligorId}`, { params })
	.then(res => res.data);
