import React from 'react';
import ruleMethods from './rule';

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

// 获得输入框中字符长度
export const getByteLength = (val) => {
	const str = String(val);
	let bytesCount = 0;
	for (let i = 0, n = str.length; i < n; i += 1) {
		const c = str.charCodeAt(i);
		if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
			bytesCount += 1;
		} else {
			bytesCount += 2;
		}
	}
	return bytesCount;
};

/**
 * 截取前N个字节的字符串
 * @param str
 * @param len
 * @param suffix
 * @returns {*}
 */
export const toCutString = (str, len, suffix) => {
	if (!str) return '';
	if (len <= 0) return '';
	const _suffix = suffix || '';
	let template = 0;
	for (let i = 0; i < str.length; i += 1) {
		if (str.charCodeAt(i) > 255) {
			template += 2;
		} else {
			template += 1;
		}
		if (template === len) {
			return str.substring(0, i + 1) + _suffix;
		} if (template > len) {
			return str.substring(0, i) + _suffix;
		}
	}
	return str;
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

/**
 * 去除对象中空值
 * @param obj
 * @returns {*}
 */
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
export const timeStandard = (text, mark) => {
	if (typeof text === 'number') return (text ? new Date(text * 1000).format('yyyy-MM-dd') : mark || '--');
	return text;
};

//	返回a标签，可点击链接
export const linkDom = (url, text, target, className, style) => React.createElement(
	'a',
	{
		href: url,
		className: `click-link${className ? ` ${className}` : ''}`,
		rel: 'noopener noreferrer',
		target: target || '_blank',
		style,
	},
	text,
);
//	返回a标签，可点击链接 => 债务人详情
export const linkDetail = (id, text, target, className, style) => React.createElement(
	'a',
	{
		href: `#/business/debtor/detail?id=${id}`,
		className: `click-link${className ? ` ${className}` : ''}`,
		rel: 'noopener noreferrer',
		target: target || '_blank',
		style,
	},
	text,
);
//	返回a标签，可点击链接 => 业务详情
export const linkBusiness = (id, text, target, className, style) => React.createElement(
	'a',
	{
		href: `#/business/detail?id=${id}`,
		className: `click-link${className ? ` ${className}` : ''}`,
		rel: 'noopener noreferrer',
		target: target || '_blank',
		style,
	},
	text,
);

/**
 * 拼接修改url后的get参数
 * @param url
 * @param arg [参数名]
 * @param _argVal
 * @returns {*}
 */
export const changeURLArg = function method(url, arg, _argVal) {
	const replaceText = _argVal ? `${arg}=${_argVal}` : '';
	const argMatchRes = url.match(`${arg}=([^&]*)`);
	if (argMatchRes) {
		const regExp = replaceText ? `(${arg}=)([^&]*)` : `[&|?](${arg}=)([^&]*)`;
		return url.replace(new RegExp(regExp, 'gi'), replaceText);
	}
	const mark = url.match('[?]') ? '&' : '?';
	return replaceText ? `${url}${mark}${replaceText}` : url;
};

// 将输入内容拼接到url上
export const generateUrlWithParams = (url, params) => {
	const urlParams = [];
	let urlList = url;
	// console.log(Object.keys(params).length, 3);

	for (let i = 0; i < Object.keys(params).length; i += 1) {
		const key = Object.keys(params)[i];

		if (params[key]) {
			urlParams.push(`${key}=${params[key]}`);
		}
	}
	if (urlParams.length > 0) {
		urlList += `?${urlParams.join('&')}`;
	}
	return urlList;
};

// 判断对象内属性是否为空
export const objectKeyIsEmpty = (obj) => {
	let empty;
	// key === 'type'  限制涉诉信息中的信息类型切换
	// eslint-disable-next-line no-restricted-syntax
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			if (obj[key] === undefined || obj[key] === '' || key === 'type') {
				empty = true;
			} else {
				empty = false;
				break;
			}
		}
	}
	return empty;
};

/**
 * 处理路由数据,对默认数据转换为可以使用的数据对象
 * @param source
 */
export const handleRule = source => ruleMethods.handleRule(source);

/**
 * 返回默认对应rule数据结构，包含二级三级
 * @param rule
 * @param moduleID
 * @returns {Array}
 */
export const { toGetRuleSource } = ruleMethods;

export const toEmpty = (data) => {
	if (data) {
		if (typeof data === 'string') return data.trim();
		if (typeof data === 'number') return data.toString().trim();
		return JSON.toString(data);
	}
	return '';
};

/* 案件类型 */
export const getCaseType = (caseType) => {
	if (caseType === 1) return '普通案件';
	if (caseType === 2) return '破产案件';
	if (caseType === 3) return '执行案件';
	if (caseType === 4) return '终本案件';
	return '';
};

/* 去除小数点后，非正规数值 */
export const reviseNum = (value) => {
	if (value) {
		const RegStr = new RegExp(/\.[\d,]+(?=[^\d,]|)/g);
		const e = (value.match(RegStr) || [])[0];
		if (e) {
			let replaceStr = '';
			if (/,/.test(e)) {
				const _e = e.replace(',', '');
				replaceStr = _e * 1 === 0 ? '' : (_e * 1).toString().slice(1);
			} else {
				replaceStr = e * 1 === 0 ? '' : (e * 1).toString().slice(1);
			}
			return value.replace(RegStr, replaceStr);
		}
		return value;
	}
	return value;
};
