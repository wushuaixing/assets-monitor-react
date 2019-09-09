import service from '@/utils/service';
import { baseUrl } from '@/utils/api/index';

// 我的关注


/* 代位权 - btn 数量 */
export const subCount = () => service
	.get(`${baseUrl}/yc/monitor/focus/attentionCount`, { params: { type: 1 } })
	.then(res => res.data);

/* 金融资产 - btn 数量 */
const _params = { params: { isAttention: 1,		page: 1, num: 10 } };

// 竞价项目 数量统计
const Bid = () => service.get(`${baseUrl}/yc/monitor/auctionBidding/attentionList`, _params);
// 公示项目 数量统计
const Pub = () => service.get(`${baseUrl}/yc/monitor/finance/attentionList`, _params);

export const assCount = () => {
	const result = {};
	return Pub().then((res) => {
		result.pub = res.data.data;
		return Bid();
	}).then((res) => {
		result.bid = res.data.data;
		return result;
	});
};

/* 涉诉监控 - btn 数量 */
export const lawCount = () => service
	.get(`${baseUrl}/yc/monitor/focus/attentionCount`, { params: { type: 0 } })
	.then(res => res.data);

/* 公示公告 - btn 数量 */
export const pubCount = () => service
	.get(`${baseUrl}/yc/bulletin/focus/countList`, { params: { } })
	.then(res => res.data);
