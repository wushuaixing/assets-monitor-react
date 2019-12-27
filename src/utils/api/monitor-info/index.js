import service from '@/utils/service';


// 机构未读数量统计总览
export const unReadCount = () => {
	if (global.REQ_STATUS) return Promise.reject(new Error(null));
	return service.get('/yc/monitor/count/unreadCount', {})
		.then(res => res.data);
};


export const ignoreExportError = undefined;
