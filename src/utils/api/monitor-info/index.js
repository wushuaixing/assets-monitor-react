import service from '@/utils/service';
import { baseUrl } from '@/utils/api/index';


// 机构未读数量统计总览
export const unReadCount = () => service.get(`${baseUrl}/yc/monitor/count/unreadCount`, {})
	.then(res => res.data);

export const ignoreExportError = undefined;
