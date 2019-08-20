import service from '@/utils/service';
import { baseUrl } from '@/utils/api/index';

/*  监控信息 => 代位权/涉诉监控 */
// 关注/取消关注
export const attention = (params, star) => service.post(`${baseUrl}/yc/monitor/early/warning/attention?star=${star}`, params)
	.then(res => res.data);

// 导出
export const exportList = `${baseUrl}/yc/monitor/early/warning/export`;

// 统计
export const infoCount = params => service.get(`${baseUrl}/yc/monitor/early/warning/infoCount`, { params })
	.then(res => res.data);

// 代位权/涉诉监控列表
export const infoList = params => service.get(`${baseUrl}/yc/monitor/early/warning/infoList`, { params })
	.then(res => res.data);

// 标记已读
export const readStatus = params => service.post(`${baseUrl}/yc/monitor/early/warning/read`, params)
	.then(res => res.data);

// 案件详情
export const caseDetail = params => service.get(`${baseUrl}/yc/monitor/early/warning/caseDetail`, { params })
	.then(res => res.data);
