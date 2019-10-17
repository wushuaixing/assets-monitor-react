import service from '@/utils/service';
import { Court, Trial, Judgment } from './subrogation';
import { Court as lCourt, Trial as lTrial, Judgment as lJudgment } from '../risk-monitor/lawsuit';
import {
	attentionFollowListCount, // 关注列表土地数据出让结果数量
} from './public';
import {
	attentionFollowBidCount, // 竞价项目 数量统计
	attentionFollowPubCount, // 公示项目 数量统计
	attentionFollowResultCount, // 股权质押 数量统计
} from './finance';
// 我的关注

// /* 金融资产 - btn 数量 */
// const _params = { params: { isAttention: 1,		page: 1, num: 10 } };
// // 竞价项目 数量统计
// const Bid = () => service.get('/yc/monitor/auctionBidding/attentionList', _params);
// // 公示项目 数量统计
// const Pub = () => service.get('/yc/monitor/finance/attentionList', _params);

// export const assCount = () => {
// 	const result = {};
// 	return Pub().then((res) => {
// 		result.pub = res.data.data;
// 		return Bid();
// 	}).then((res) => {
// 		result.bid = res.data.data;
// 		return result;
// 	});
// };

/* 代位权 - 关注列表 - 数量统计 */
export const subrogationCount = () => {
	const result = {};
	return Court.followListCount()
		.then((res) => {
			if (res.code === 200) result.Court = res.data;
			return Trial.followListCount();
		}).then((res) => {
			if (res.code === 200) result.Trial = res.data;
			return Judgment.followListCount();
		}).then((res) => {
			if (res.code === 200) result.Judgment = res.data;
			return result;
		})
		.catch(() => {
			// 异常处理
		});
};

/* 涉诉监控 - 关注列表 - 数量统计 */
export const lawsuitCount = () => {
	const result = {};
	return lCourt.followListCount()
		.then((res) => {
			if (res.code === 200) result.Court = res.data;
			return lTrial.followListCount();
		}).then((res) => {
			if (res.code === 200) result.Trial = res.data;
			return lJudgment.followListCount();
		}).then((res) => {
			if (res.code === 200) result.Judgment = res.data;
			return result;
		})
		.catch(() => {
			// 异常处理
		});
};

/* 土地数据 - 关注列表 - 数量统计 */
export const landCount = () => {
	const result = {};
	return attentionFollowListCount()
		.then((res) => {
			if (res.code === 200) result.Land = res.data;
			return result;
		})
		.catch(() => {
			// 异常处理
		});
};

/* 金融资产 - 关注列表 - 数量统计 */
export const financeCount = () => {
	const result = {};
	return attentionFollowBidCount()
		.then((res) => {
			if (res.code === 200) result.Bid = res.data;
			return attentionFollowPubCount();
		}).then((res) => {
			if (res.code === 200) result.Pub = res.data;
			return attentionFollowResultCount();
		}).then((res) => {
			if (res.code === 200) result.Result = res.data;
			return result;
		})
		.catch(() => {
			// 异常处理
		});
};

/* 涉诉监控 - btn 数量 */
export const lawCount = () => service
	.get('/yc/monitor/focus/attentionCount', { params: { type: 0 } })
	.then(res => res.data);

/* 公示公告 - btn 数量 */
export const pubCount = () => service
	.get('/yc/bulletin/focus/countList', { params: { } })
	.then(res => res.data);
