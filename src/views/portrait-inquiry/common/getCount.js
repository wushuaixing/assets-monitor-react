// 获取echart返回数据总数
const getCount = (array) => {
	let total = 0;
	if (array && array.length > 0) {
		for (let i = 0; i < array.length; i += 1) {
			total += array[i].count;
		}
	}
	return total;
};
export default getCount;
