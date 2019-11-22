// 转时间戳方法
const add0 = m => (m < 10 ? `0${m}` : m);

const format = (shijianchuo) => {
	if (shijianchuo) {
		const time = new Date(shijianchuo);
		const y = time.getFullYear();
		const m = time.getMonth() + 1;
		const d = time.getDate();
		// const h = time.getHours();
		// const mm = time.getMinutes();
		// const s = time.getSeconds();
		return `${y}-${add0(m)}-${add0(d)}`;
	}

	return null;
};

// 标准时间转年月日
const formatDateTime = (date, onlyYear) => {
	if (!date) return '-';
	const data = new Date(date && date * 1000);
	const y = data.getFullYear();
	let m = data.getMonth() + 1;
	m = m < 10 ? (`0${m}`) : m;
	let d = data.getDate();
	d = d < 10 ? (`0${d}`) : d;
	let h = data.getHours();
	h = h < 10 ? (`0${h}`) : h;
	let minute = data.getMinutes();
	minute = minute < 10 ? (`0${minute}`) : minute;
	return onlyYear ? `${y}-${m}-${d}` : `${y}-${m}-${d} ${h}:${minute}`;
	// return `${y}-${m}-${d}`;
};

// 金额三位添加小数点
const toThousands = (value) => {
	const number = Number(value);
	const data2 = number.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
	return data2;
};

// 转JSON
const strToJson = str => JSON.parse(str);

export {
	format, toThousands, formatDateTime, strToJson,
};
