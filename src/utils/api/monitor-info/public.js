import service from '@/utils/service';
import { baseUrl } from '@/utils/api/index';

/*  监控信息 => 公示公告 */

/* 招标中标 */
// 列表
export const infoListBid = params => service.get(`${baseUrl}/yc/monitor/bulletin/bidding/list`, { params })
	.then(res => res.data);
// 已读
export const readStatusBid = params => service.post(`${baseUrl}/yc/monitor/bulletin/bidding/read`, params)
	.then(res => res.data);
// 关注/取消关注
export const attentionBid = (params, isAttention) => service
	.post(`${baseUrl}/yc/monitor/bulletin/bidding/attention?isAttention=${isAttention}`, params)
	.then(res => res.data);
// 导出
export const exportListBid = `${baseUrl}/yc/monitor/bulletin/bidding/exportExcel`;

/* 重大税收违法 */
// 列表
export const infoListIllegal = params => service.get(`${baseUrl}/yc/monitor/bulletin/tax/list`, { params })
	.then(res => res.data);
// 已读
export const readStatusIllegal = params => service.post(`${baseUrl}/yc/monitor/bulletin/tax/read`, params)
	.then(res => res.data);
// 关注/取消关注
export const attentionIllegal = (params, isAttention) => service
	.post(`${baseUrl}/yc/monitor/bulletin/tax/attention?isAttention=${isAttention}`, params)
	.then(res => res.data);
// 导出
export const exportListIllegal = `${baseUrl}/yc/monitor/bulletin/tax/exportExcel`;

/* 环境行政处罚 */
// 列表
export const infoListPunish = params => service.get(`${baseUrl}/yc/monitor/bulletin/epb/list`, { params })
	.then(res => res.data);
// 已读
export const readStatusPunish = params => service.post(`${baseUrl}/yc/monitor/bulletin/epb/read`, params)
	.then(res => res.data);
// 关注/取消关注
export const attentionPunish = (params, isAttention) => service
	.post(`${baseUrl}/yc/monitor/bulletin/epb/attention?isAttention=${isAttention}`, params)
	.then(res => res.data);
// 导出
export const exportListPunish = `${baseUrl}/yc/monitor/bulletin/epb/exportExcel`;

// 统计
export const infoCount = params => service.get(`${baseUrl}/yc/monitor/bulletin/unreadCountList`, { params })
	.then(res => res.data);


export default {
	infoListBid,
	readStatusBid,
	attentionBid,
	exportListBid,
	infoListIllegal,
	readStatusIllegal,
	attentionIllegal,
	exportListIllegal,
	infoListPunish,
	readStatusPunish,
	attentionPunish,
	exportListPunish,
	infoCount,
};
