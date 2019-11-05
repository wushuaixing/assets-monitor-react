import service from '@/utils/service';

const a = 1;
const inquiryList = params => service.get('/yc/search/portrait/company/list', { params })
	.then(res => res.data);

export { inquiryList, a };
