const SIGN_REGEXP = /([yMdhsm])(\1*)/g;
const DEFAULT_PATTERN = 'yyyy-MM-dd';

function padding(s, len) {
	const lens = len - (`${s}`).length;
	for (let i = 0; i < lens; i += 1) {
		s = `0${s}`;
	}
	return s;
}
// 时间戳格式替换
Date.prototype.format = function fun(format) {
	const o = {
		'M+': this.getMonth() + 1, // 月份
		'd+': this.getDate(), // 日
		'h+': this.getHours(), // 小时
		'm+': this.getMinutes(), // 分
		's+': this.getSeconds(), // 秒
		'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
		S: this.getMilliseconds(), // 毫秒
	};
	let fmt = format;
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length));
	for (const k in o) if (new RegExp(`(${k})`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
	return fmt;
};

export default {
	formatDate: {
		format(date, pattern) {
			pattern = pattern || DEFAULT_PATTERN;
			return pattern.replace(SIGN_REGEXP, ($0) => {
				switch ($0.charAt(0)) {
				case 'y':
					return padding(date.getFullYear(), $0.length);
				case 'M':
					return padding(date.getMonth() + 1, $0.length);
				case 'd':
					return padding(date.getDate(), $0.length);
				case 'w':
					return date.getDay() + 1;
				case 'h':
					return padding(date.getHours(), $0.length);
				case 'm':
					return padding(date.getMinutes(), $0.length);
				case 's':
					return padding(date.getSeconds(), $0.length);
				}
			});
		},
		parse(dateString, pattern) {
			const matchs1 = pattern.match(SIGN_REGEXP);
			const matchs2 = dateString.match(/(\d)+/g);
			if (matchs1.length == matchs2.length) {
				const _date = new Date(1970, 0, 1);
				for (let i = 0; i < matchs1.length; i++) {
					const _int = parseInt(matchs2[i]);
					const sign = matchs1[i];
					switch (sign.charAt(0)) {
					case 'y':
						_date.setFullYear(_int);
						break;
					case 'M':
						_date.setMonth(_int - 1);
						break;
					case 'd':
						_date.setDate(_int);
						break;
					case 'h':
						_date.setHours(_int);
						break;
					case 'm':
						_date.setMinutes(_int);
						break;
					case 's':
						_date.setSeconds(_int);
						break;
					}
				}
				return _date;
			}
			return null;
		},
	},
	thousandBitSeparator(num) {
		if (typeof (num) === 'number') {
			num = num.toString().split('.'); // 分隔小数点
			const arr = num[0].split('').reverse(); // 转换成字符数组并且倒序排列
			let res = [];
			for (let i = 0, len = arr.length; i < len; i++) {
				if (i % 3 === 0 && i !== 0) {
					res.push(','); // 添加分隔符
				}
				res.push(arr[i]);
			}
			res.reverse(); // 再次倒序成为正确的顺序
			if (num[1]) { // 如果有小数的话添加小数部分
				res = res.join('').concat(`.${num[1]}`);
			} else {
				res = res.join('');
			}
			return `${res}元`;
		}
		return num;
	},
	/*  */
	// 校验名称，最多不超过10个字符
	rule_checkName: (rule, value, callback) => {
		if (!value) {
			callback(new Error('名称不能为空'));
		} else if (value.length > 10) {
			callback(new Error('名称长度不能超过10个字符'));
		} else {
			callback();
		}
	},
	// 手机号码校验
	rule_checkMobile: (rule, value, callback) => {
		const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
		if (!value) {
			callback(new Error('账号不能为空'));
		} else if (reg.test(value)) {
			callback();
		} else {
			callback(new Error('请输入正确的手机号'));
		}
	},
	// 密码校验 长度6 - 20位
	rule_checkPassword: (rule, value, callback) => {
		if (!value) {
			callback(new Error('密码不能为空'));
		} else if (value.length < 6 || value.length > 20) {
			callback(new Error('密码长度为 6 - 20 个字符'));
		} else {
			callback();
		}
	},
	// 小写字母校验
	rule_checkLowerCase: (rule, value, callback) => {
		const reg = /^[a-z]*$/;
		if (!value) {
			callback(new Error('字符不能为空'));
		} else if (reg.test(value)) {
			callback();
		} else {
			callback(new Error('只能输入小写字母'));
		}
	},
	// 默认时间格式转换
	newDate: (data, type) => {
		if (data) {
			// console.log(data)
			if (type) {
				return new Date(data * 1000).format('yyyy-MM-dd');
			}
			return new Date(data * 1000).format('yyyy-MM-dd hh:mm:ss');
		}
		return '--';
	},
	newDateD: (data, type) => {
		if (data) {
			// console.log(data)
			if (type) {
				return new Date(data).format('yyyy-MM-dd');
			}
			return new Date(data).format('yyyy-MM-dd hh:mm:ss');
		}
		return '--';
	},


};

// 打开新的标签页
export const openInNewTab = (url) => {
	const w = window.open('about:blank');
	w.location.href = url;
};

/**
 * 截取 url 里面 ？后面的参数
 * @param url
 */
export const parseQuery = (url) => {
	const queryObj = {};
	const reg = /[?&]([^=&#]+)=([^&#]*)/g;
	const querys = url.match(reg);
	if (querys) {
		for (let i = 0; i < querys.length; i += 1) {
			const query = querys[i].split('=');
			const key = query[0].substr(1);
			const value = query[1];
			if (queryObj[key]) {
				queryObj[key] = [].concat(queryObj[key], window.decodeURI(value));
			} else {
				queryObj[key] = window.decodeURI(value);
			}
		}
	}
	return queryObj;
};

/**
 * 截取 url 里面 指定的参数
 * @param url
 * @param name
 * @returns {null}
 */
export const getQueryByName = (url, name) => {
	const reg = new RegExp(`[?&]${name}=([^&#]+)`);
	const query = url.match(reg);
	return query ? window.decodeURI(query[1]) : null;
};

/**
 * 对象里面有需要过滤的属性的时候调用
 * @param obj
 * @param predicate 需要排除属性的条件函数
 */
export const keyFilter = (obj, predicate) => {
	const result = {};
	Object.keys(obj).forEach((key) => {
		if (Object.prototype.hasOwnProperty.call(obj, key) && !predicate(obj[key])) {
			result[key] = obj[key];
		}
	});
	return result;
};

export const isIE = () => {
	if (window.navigator.userAgent.toLowerCase().indexOf('msie') >= 1) return true;
	return false;
};
