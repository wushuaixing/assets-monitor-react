/**
 * @Description: 这里处理 路由相关的方法
 * @author async
 * @date 2019-10-10
*/
export default {
	/**
	 * 处理路由数据,对默认数据转换为可以使用的数据对象
	 * @param source
	 */
	handleRule: (source) => {
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
	},

	/**
	 * 返回默认对应rule数据结构，包含二级三级
	 * @param rule
	 * @param moduleID
	 * @returns {Array}
	 */
	toGetRuleSource: (rule, moduleID) => {
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
						child: [
							{ id: 'YC020201', name: '立案信息', status: true },
							{ id: 'YC020202', name: '开庭公告', status: true },
							{ id: 'YC020203', name: '裁判文书', status: true },
						],
					},
					{
						id: 'YC0203',
						name: '土地数据',
						url: '/monitor/land',
						status: true,
						child: [
							{ id: 'YC020301', name: '出让结果', status: true },
							// { id: 'YC020302', name: '开庭公告', status: false },
						],
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
					  child: [
							{ id: 'YC020503', name: '股权质押', status: true },
							{ id: 'YC020501', name: '竞价项目', status: toStatus(rule.menu_jkxx, 'jkxxjrzcjjxm') },
							{ id: 'YC020502', name: '公示项目', status: toStatus(rule.menu_jkxx, 'jkxxjrzcgsxm') },
					  ],
					},
					{
						id: 'YC0206',
						name: '动产抵押',
						url: '/monitor/mortgage',
						status: true,
					},
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
						child: [
							{ id: 'YC030101', name: '立案信息', status: true },
							{ id: 'YC030102', name: '开庭公告', status: true },
							{ id: 'YC030103', name: '裁判文书', status: true },
						],
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
		const type = typeof moduleID;
		if (type === 'string') {
			return moduleID ? _RES.filter(item => item.id === moduleID)[0] : _RES;
		} if (type === 'object') {
			return _RES.filter((item) => {
				let res = false;
				moduleID.forEach((i) => {
					if (i === item.id)res = true;
				});
				return res;
			});
		}
		return _RES;
	},
};
