export default {
	thousandBitSeparator(val) {
		let num = val;
		if (typeof (num) === 'number') {
			num = num.toString().split('.'); // 分隔小数点
			const arr = num[0].split('').reverse(); // 转换成字符数组并且倒序排列
			let res = [];
			for (let i = 0, len = arr.length; i < len; i += 1) {
				if (i % 3 === 0 && i !== 0) {
					res.push(','); // 添加分隔符
				}
				res.push(arr[i]);
			}
			res.reverse(); // 再次倒序成为正确的顺序
			// 如果有小数的话添加小数部分
			res = num[1] ? res.join('').concat(`.${num[1]}`) : res.join('');
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
		const reg = /^1[34578][0-9]\d{8}$/;
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
	// 截取 url 里面 ？后面的参数
	parseQuery: (url) => {
		const queryObj = {};
		const reg = /[?&]([^=&#]+)=([^&#]*)/g;
		const _query = url.match(reg);
		if (_query) {
			for (let i = 0; i < _query.length; i += 1) {
				const query = _query[i].split('=');
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
	},

};

export const parseQuery = (url) => {
	const queryObj = {};
	const reg = /[?&]([^=&#]+)=([^&#]*)/g;
	const _query = url.match(reg);
	if (_query) {
		for (let i = 0; i < _query.length; i += 1) {
			const query = _query[i].split('=');
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

/**
 * param 将要转为URL参数字符串的对象
 * key URL参数字符串的前缀
 * encode true/false 是否进行URL编码,默认为true
 *
 * return URL参数字符串
 */
export const urlEncode = (param, key, encode) => {
	if (param == null) return '';
	let paramStr = '';
	const t = typeof (param);
	if (t === 'string' || t === 'number' || t === 'boolean') {
		paramStr += `&${key}=${(encode == null || encode) ? encodeURIComponent(param) : param}`;
	} else {
		Object.keys(param).forEach((i) => {
			const k = key == null ? i : key + (param instanceof Array ? '' : `.${i}`);
			paramStr += urlEncode(param[i], k, encode);
		});
	}
	return paramStr;
};


export const clearEmpty = (obj) => {
	if (typeof obj === 'object') {
		const l = Object.keys(obj);
		const _obj = Object.assign({}, obj);
		l.forEach((item) => {
			if (_obj[item] === '' || _obj[item] === undefined) delete _obj[item];
			else if (typeof _obj[item] === 'string')_obj[item] = _obj[item].replace(/^\s+|\s+$/g, '');
		});
		return _obj;
	}
	return obj;
};

// 去除头尾空格
if (!String.prototype.trim) {
	String.prototype.trim = function trim(val) {
		return val.replace(/^\s+|\s+$/g, '');
	};
}

// 时间戳格式替换
Date.prototype.format = function method(format) {
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
	Object.keys(o).forEach((k) => {
		if (new RegExp(`(${k})`).test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)
				? (o[k])
				: ((`00${o[k]}`).substr((`${o[k]}`).length)));
		}
	});
	return fmt;
};
