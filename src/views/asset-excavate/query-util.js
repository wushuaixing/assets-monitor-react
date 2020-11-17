export default function getUrlParams(url, startTime, endTime) {
	const defaultParam = {};
	const str = url.split('?')[1]; // substr()方法返回从参数值开始到结束的字符串；
	const strs = str.split('&');
	for (let i = 0; i < strs.length; i += 1) {
		// eslint-disable-next-line prefer-destructuring
		defaultParam[strs[i].split('=')[0]] = (strs[i].split('=')[1]);
	}
	const dParams = {};
	if (Number(defaultParam.timeHorizon) === 1) {
		const day1 = new Date();
		day1.setTime(day1.getTime());
		const s1 = `${day1.getFullYear()}-${day1.getMonth() + 1}-${day1.getDate()}`;
		const day2 = new Date();
		day2.setTime(day2.getTime() - 6 * 24 * 60 * 60 * 1000);
		dParams[startTime] = `${day2.getFullYear()}-${day2.getMonth() + 1}-${day2.getDate()}`;
		dParams[endTime] = s1;
	}
	if (Number(defaultParam.timeHorizon) === 2) {
		const day1 = new Date();
		day1.setTime(day1.getTime());
		const s1 = `${day1.getFullYear()}-${day1.getMonth() + 1}-${day1.getDate()}`;
		const day2 = new Date();
		day2.setTime(day2.getTime() - 29 * 24 * 60 * 60 * 1000);
		dParams[startTime] = `${day2.getFullYear()}-${day2.getMonth() + 1}-${day2.getDate()}`;
		dParams[endTime] = s1;
	}
	return dParams;
}
