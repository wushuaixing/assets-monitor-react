import service from '@/utils/service';

// [V2.3] 监控日报详情 => 统计头信息数据[youyu]
export const headerInfo = async (params) => {
	const response = await service.get('/yc/report/daily/statistics/title', { params });
	return response.data;
};

// [V2.3] 监控日报详情 => 资产拍卖已读[youyu]
export const markRead = async (params) => {
	const response = await service.get('/yc/report/daily/auction/markRead', { params });
	return response.data;
};

// [V2.3] 监控日报详情 => 资产拍卖标记收藏[youyu]
export const followSingle = params => service.post('/yc/report/daily/auction/follow', params)
	.then(res => res.data);

// [V2.3] 监控日报详情 => 资产拍卖取消收藏[youyu]
export const unFollowSingle = params => service.post('/yc/report/daily/auction/unFollow', params)
	.then(res => res.data);


// [V2.3] 监控日报详情 => 各类数据统计[youyu]
export const dataCount = async (params) => {
	const response = await service.get('/yc/report/daily/statistics/dataCount', { params });
	return Object.assign(response.data, {
		data: {
			categoryCount: [
				...response.data.data.categoryCount,
				{
					dataType: 11701,
					dataCount: 898,
					typeName: '在建工程-建设单位',
				},
				{
					dataType: 11702,
					dataCount: 22,
					typeName: '在建工程-中标单位',
				},
				{
					dataType: 11703,
					dataCount: 12,
					typeName: '在建工程-施工单位',
				},
			],
		},
	});
	// return response.data;
};
