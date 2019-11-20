import service from '@/utils/service';


// 机构未读数量统计总览
export const unReadCount = () => service.get('/yc/monitor/count/unreadCount', {})
	.then(res => res.data);

export const ignoreExportError = undefined;
