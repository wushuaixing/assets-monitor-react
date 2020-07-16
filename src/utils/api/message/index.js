import { service } from '@/utils/service';


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
