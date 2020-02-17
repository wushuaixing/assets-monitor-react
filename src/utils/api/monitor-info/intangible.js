import s from '@/utils/service';

const addAttribute = (value, field) => {
	if (typeof value === 'object') {
		return Object.assign(value, { field: field || 'intangible' });
	}
	return value;
};

/* 所有无形资产的子接口，按类别分好写入对象中 */
const intangible = {
	name: '无形资产',
	id: 'YC0207',
};

export default intangible;
