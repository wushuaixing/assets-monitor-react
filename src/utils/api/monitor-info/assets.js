import service from '@/utils/service';
import { baseUrl } from '@/utils/api/index';

/*   监控信息=>司法拍卖监控[C.H Wong] */

// 列表
export const infoList = params => service.get(`${baseUrl}/yc/monitor/auction/list`, { params })
	.then(res => res.data);
// 已读
export const readStatus = params => service.post(`${baseUrl}/yc/monitor/auction/read`, params)
	.then(res => res.data);

// 关注 [批量]
export const follow = params => service.post(`${baseUrl}/yc/monitor/auction/followBatch`, params)
	.then(res => res.data);

// 关注 [单个]
export const followSingle = params => service.post(`${baseUrl}/yc/monitor/auction/follow`, params)
	.then(res => res.data);

// 取消关注 [单个]
export const unFollowSingle = params => service.post(`${baseUrl}/yc/monitor/auction/unfollow`, params)
	.then(res => res.data);

// 关注列表
export const attentionList = params => service.get(`${baseUrl}/yc/monitor/auction/attentionList`, { params })
	.then(res => res.data);
// 导出
export const exportList = `${baseUrl}/yc/monitor/auction/exportExcel`;

// 司法拍卖监控搜索统计数字
export const infoCount = params => service.get(`${baseUrl}/yc/monitor/auction/processCount`, { params })
	.then(res => res.data);
