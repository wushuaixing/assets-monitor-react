import service from '@/utils/service';

const inquiryList = params => service.get('/yc/search/portrait/company/list', { params })
	.then(res => res.data);

const companyInfo = params => service.get('/yc/search/portrait/company/info', { params })
	.then(res => res.data);

const dishonestStatus = params => service.get('/yc/search/portrait/company/dishonest-status', { params })
	.then(res => res.data);

export { inquiryList, companyInfo, dishonestStatus };
