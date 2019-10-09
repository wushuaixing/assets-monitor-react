import React from 'react';

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
export const timeStandard = text => (text ? new Date(text * 1000).format('yyyy-MM-dd') : '--');

//	返回a标签，可点击链接
export const linkDom = (url, text, target, className) => React.createElement(
	'a',
	{
		href: url,
		className: className || 'click-link',
		rel: 'noopener noreferrer',
		target: target || '_blank',
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
	const pattern = `${arg}=([^&]*)`;
	const replaceText = `${arg}=${_argVal}`;
	if (url.match(pattern)) {
		let tmp = `/(${arg}=)([^&]*)/gi`;
		tmp = url.replace(eval(tmp), replaceText);
		return tmp;
	}
	if (url.match('[?]')) return `${url}&${replaceText}`;
	return `${url}?${replaceText}`;
};

// 将输入内容拼接到url上
export const generateUrlWithParams = (url, params) => {
	const urlParams = [];
	let urlList = url;
	// eslint-disable-next-line no-restricted-syntax
	for (const key in params) {
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
export const handleRule = (source) => {
	const res = {};
	source.forEach((item) => {
		switch (item.groupName) {
		case 'menu_sy':
			res.menu_sy = {
				id: 1,
				groupName: item.groupName,
				title: '首页',
				rule: item.rule,
			};
			break;
		case 'menu_jkxx':
			if (res.menu_jkxx) {
				res.menu_jkxx.children[item.rule] = item;
			} else {
				res.menu_jkxx = {
					id: 2,
					groupName: item.groupName,
					title: '监控信息',
					children: {
						[item.rule]: item,
					},
				};
			}
			break;
		case 'menu_gsgg':
			if (res.menu_jkxx) {
				res.menu_jkxx.children[item.rule] = item;
			} else {
				res.menu_jkxx = {
					id: 2,
					groupName: item.groupName,
					title: '监控信息',
					children: {
						[item.rule]: item,
					},
				};
			}
			break;
		case 'menu_ywgl':
			if (res.menu_ywgl) {
				res.menu_ywgl.children[item.rule] = item;
			} else {
				res.menu_ywgl = {
					id: 3,
					groupName: item.groupName,
					title: '业务管理',
					children: {
						[item.rule]: item,
					},
				};
			}
			break;
		case 'menu_qycx':
			res.menu_qycx = {
				id: 'menu_qycx',
				groupName: item.groupName,
				title: '企业查询',
				rule: item.rule,
			};
			break;
		case 'menu_xxss':
			if (res.menu_xxss) {
				res.menu_xxss.children[item.rule] = item;
			} else {
				res.menu_xxss = {
					id: 5,
					groupName: item.groupName,
					title: '信息查询',
					children: {
						[item.rule]: item,
					},
				};
			}
			break;
		case 'menu_jjgl':
			if (res.menu_jjgl) {
				res.menu_jjgl.children[item.rule] = item;
			} else {
				res.menu_jjgl = {
					id: 6,
					groupName: item.groupName,
					title: '机构管理',
					children: {
						[item.rule]: item,
					},
				};
			}
			break;
		default:
			if (res.else) {
				res.else.children[item.rule] = item;
			} else {
				res.else = {
					id: 7,
					title: '其他',
					children: {
						[item.rule]: item,
					},
				};
			}
		}
	});
	return res;
};

/**
 * 返回默认对应rule数据结构，包含二级三级
 * @param rule
 * @returns {Array}
 */
export const toGetRuleSource = (rule) => {
	/**
	 * 判断是否存在
	 * @param rules
	 * @param field [string || array]
	 * @returns {boolean}
	 */
	const toStatus = (rules, field) => {
		if (rules) {
			if (typeof field === 'string') {
				return Boolean(rules.children[field]);
			}
			let r = false;
			field.forEach((item) => {
				r = r || rules.children[item];
			});
			return Boolean(r);
		}
		return false;
	};

	const _RES = [];
	const base = [
		{
			id: 'YC01',
			name: '首页',
			url: '/',
			status: rule.menu_sy,
		},
		{
			id: 'YC02',
			name: '资产挖掘',
			url: '/monitor',
			status: rule.menu_jkxx,
			dot: false,
			children: [
				{
					id: 'YC0201',
					name: '资产拍卖',
					url: '/monitor',
					param: '?process=-1',
					status: toStatus(rule.menu_jkxx, 'jkxxzcpm'),
				},
				{
					id: 'YC0202',
					name: '代位权',
					url: '/monitor/subrogation',
					status: toStatus(rule.menu_jkxx, 'jkxxdwq'),
				},
				{
					id: 'YC0203',
					name: '土地数据',
					url: '/monitor/land',
					status: true,
				},
				{
					id: 'YC0204',
					name: '招标中标',
					url: '/monitor/tender',
					status: true,
				},
				{
					id: 'YC0205',
					name: '金融资产',
					url: '/monitor/financial',
					status: toStatus(rule.menu_jkxx, ['jkxxjrzcgsxm', 'jkxxjrzcjjxm']),
				},
				{
					id: 'YC0206',
					name: '动产抵押',
					url: '/monitor/mortgage',
					status: true,
				},
				// {
				// 	id: 'YC0201',
				// 	name: '涉诉监控',
				// 	url: '/monitor/lawsuits',
				// 	status: toStatus(rule.menu_jkxx, 'jkxxssjk'),
				// },
				// {
				// 	id: 'YC0201',
				// 	name: '企业破产重组',
				// 	url: '/monitor/bankruptcy',
				// 	status: toStatus(rule.menu_jkxx, 'jkxxpccz'),
				// },
				// {
				// 	id: 'YC0201',
				// 	name: '公示公告',
				// 	url: '/monitor/public',
				// 	status: toStatus(rule.menu_jkxx, ['gsgg_tendering', 'gsgg_tax', 'gsgg_epb']),
				// },
			],
		},
		{
			id: 'YC03',
			name: '风险监控',
			url: '/risk',
			status: true,
			children: [
				{
					id: 'YC0301',
					name: '涉诉监控',
					url: '/risk',
					status: true,
				},
				{
					id: 'YC0302',
					name: '企业破产重组',
					url: '/risk/bankruptcy',
					status: true,
				},
				{
					id: 'YC0303',
					name: '经营风险',
					url: '/risk/operate',
					status: true,
				},
			],
		},
		{
			id: 'YC04',
			name: '业务管理',
			url: '/business',
			status: rule.menu_ywgl,
			dot: false,
			children: [
				{
					id: 'YC0401',
					name: '业务视图',
					url: '/business',
					status: toStatus(rule.menu_ywgl, 'ywglywst'),
				},
				{
					id: 'YC0402',
					name: '债务人',
					url: '/business/debtor',
					status: toStatus(rule.menu_ywgl, 'ywglzwr'),
				},
			],
		},
		{
			id: 'YC04',
			name: '企业查询',
			url: '/company',
			status: false,
		},
		{
			id: 'YC05',
			name: '信息搜索',
			url: '/search',
			status: rule.menu_xxss,
		},
		{
			id: 'YC06',
			name: '机构管理',
			url: '/organization',
			status: rule.menu_jjgl,
			dot: false,
			children: [
				{
					id: 'YC0601',
					name: '推送设置',
					url: '/organization',
					status: toStatus(rule.menu_jjgl, 'jggltssz'),
				},
				{
					id: 'YC0602',
					name: '账户列表',
					url: '/organization/user',
					status: toStatus(rule.menu_jjgl, 'jgglzhlb'),
				},
			],
		},
		// { id: 7, name: '登录页面', url: '/login' },
	];
	base.forEach((item) => {
		if (item.status) {
			const _item = {
				id: item.id,
				name: item.name,
				url: item.url,
				status: true,
				dot: item.dot,
			};
			if (item.children) {
				_item.children = item.children.filter(it => it.status);
				_item.newUrl = `${_item.children[0].url}${_item.children[0].param || ''}`;
				// console.log(_item.newUrl, _item.url);
			}
			_RES.push(_item);
		}
	});
	return _RES;
};
