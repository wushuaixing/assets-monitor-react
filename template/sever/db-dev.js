"use strict";

var fs = require('fs');

var dataSource = JSON.stringify(require('./data-db'));

const toBase64 = (file, size) => 'data:image/png;base64,' + new Buffer.alloc(size, file).toString('base64');

const bgImgData = toBase64(fs.readFileSync('./template/img/watermark.png'), 65 * 1024);
const deIconData = toBase64(fs.readFileSync('./template/img/debtor.png'), 2 * 1024);
const personData = toBase64(fs.readFileSync('./template/img/person.png'), 2 * 1024);
const businessData = toBase64(fs.readFileSync('./template/img/business.png'), 2 * 1024);
const disIconData = toBase64(fs.readFileSync('./template/img/icon_shixin.png'), 4 * 1024);
const disEdIconData = toBase64(fs.readFileSync('./template/img/icon_dishonest_ed.png'), 4 * 1024);
const accurateImgData = toBase64(fs.readFileSync('./template/img/icon-accurate.png'), 3 * 1024);

let htmlResultStr = fs.readFileSync('./template/src/detail/index.html', 'utf8');
let htmlCoverStr = fs.readFileSync('./template/src/content/cover.html', 'utf8');
let cssResult = fs.readFileSync('./template/src/detail/index.css', 'utf8');

let htmlResult = htmlResultStr.replace(/<link rel="stylesheet" type="text\/css" href="index.css">/g, `<style>${cssResult}</style>`);
htmlResult = htmlResult.replace("<body>", `<body style="max-width: 904px;margin:0 auto">`).replace(/\/usr\/share\/fonts\/zh_CN/g, "./fonts");

let htmlCover = htmlCoverStr.replace("<body>", `<body style="max-width: 904px;margin:0 auto">`);
htmlCover = htmlCover.replace(/\/usr\/share\/fonts\/zh_CN/g, "./fonts");

/* 导出画像模板-封面 */
function exportCover(source, exportType) {
	var d = JSON.parse(source) || {};
	var type = exportType || false; // default business(false); debtor(true)
	htmlCover = htmlCover.replace("../../img/watermark.png", bgImgData);
	var dataTime = new Date().getFullYear() + '年' + (new Date().getMonth() + 1) + "月" + new Date().getDate() + "日";
	htmlCover = htmlCover.replace(/{base.queryTime}/g, dataTime);
	var data = (type ? d.BA01 : d.BB01);
	var obj = (data.detail) || {};
	var userInfo = '';
	if (type) {
		htmlCover = htmlCover.replace(/{base.title}/, "债务人详情");
		userInfo = ("<div class='name'>" + obj.obligorName + (obj.obligorNumber ? ("(" + obj.obligorNumber + ")") : "") + "</div>");
	} else {
		htmlCover = htmlCover.replace(/{base.title}/, "业务详情");
		userInfo = ("<div class='name' style='margin-bottom: 30px'>业务编号：" + obj.caseNumber + "</div><div class='name'>借款人：" + obj.obligorName + "</div>");
	}
	htmlCover = htmlCover.replace(/{base.userInfo}/, userInfo);
	return htmlCover;
}

/* 导出画像模板-内容 */
function exportTemplate(source, exportType, name) {
	var dd = {
		// overview: {
		// 	name: '概览',
		// 	about: '{overview.content}',
		// 	child: []
		// },
		assets: {
			name: '资产',
			about: '{assets.content}',
			status: 'BEP',
			child: [
				{id: 'A10101', title: '资产拍卖_精准匹配', status: 'BEP'},
				{id: 'A10102', title: '资产拍卖_模糊匹配', status: 'BEP'},
				{id: 'A10401', title: '无形资产_排污权', status: 'BE'},
				{id: 'A10402', title: '无形资产_矿业权', status: 'BE'},
				{id: 'A10403', title: '无形资产_商标专利', status: 'BE'},
				{id: 'A10404', title: '无形资产_建筑建造资质', status: 'BE'},
				{id: 'A10301', title: '土地信息_出让结果', status: 'BE'},
				{id: 'A10302', title: '土地信息_土地转让', status: 'BE'},
				{id: 'A10303', title: '土地信息_土地抵押', status: 'BE'},
				{id: 'A10201', title: '代位权_立案', status: 'BEP'},
				{id: 'A10202', title: '代位权_开庭', status: 'BEP'},
				{id: 'A10203', title: '代位权_裁判文书', status: 'BEP'},
				{id: 'A10501', title: '股权质押_股权出质', status: 'BE'},
				{id: 'A10502', title: '股权质押_股权质权', status: 'BE'},
				{id: 'A10601', title: '动产抵押_抵押', status: 'BE'},
				{id: 'A10602', title: '动产抵押_抵押权', status: 'BE'},
				{id: 'A10701', title: '招投标', status: 'BE'},
			]
		},
		risk: {
			name: '风险',
			about: '{risk.content}',
			status: 'BEP',
			child: [
				{id: 'R30201', title: '破产重组', status: 'BE'},
				{id: 'R20603', title: '涉诉文书', status: 'P'},
				// {id: 'R20401', title: '失信记录',desc: '列入', status: 'BEP'	},
				// {id: 'R20402', title: '失信记录',desc: '已移除',status: 'BEP'	},
				// {id: 'R20502', title: '限高记录', status: 'BEP'	},
				{id: 'R20601', title: '涉诉信息_立案', status: 'BE'},
				{id: 'R20602', title: '涉诉信息_开庭', status: 'BE'},
				{id: 'R20603', title: '涉诉信息_裁判文书', status: 'BE'},
				{id: 'R30301', title: '经营异常', status: 'BE'},
				{id: 'R30401', title: '严重违法', status: 'BE'},
				{id: 'R30501', title: '税收违法', status: 'BEP'},
				{id: 'R30601', title: '行政处罚', status: 'BE'},
				{id: 'R30701', title: '环保处罚', status: 'BE'},
			]
		},
		info: {
			name: '工商基本详情',
			about: '{info.content}',
			field: 'info',
			status: 'E',
			child: [
				{id: 'I50101', title: '基本信息', status: 'E', show: true, className: 'table-baseInfo'},
				{id: 'I50201', title: '主要人员', status: 'E'},
				{id: 'I50301', title: '股东信息', status: 'E'},
				{id: 'I50501', title: '分支机构', status: 'E'},
				{id: 'I50601', title: '对外投资', status: 'E'},
				{id: 'I50701', title: '工商变更', status: 'E', className: 'page-break-style'},
			]
		},
	};
	var _dataSource = JSON.parse(source);

	// 导出类型
	var TYPE = '';
	var Status = '';
	if (exportType === 'debtor') {
		TYPE = 'D';
		var debtorName = _dataSource['DB10101'].obligorName;
		Status = debtorName.length > 4 ? 'E' : 'P';
	} else {
		TYPE = 'B';
		Status = 'B';
	}
	var ET = Status;

	// public enumeration object
	var s = {
		identity: {
			0: "未知",
			1: "纳税人",
			2: "法定代表人",
			3: "财务",
			9: "其他"
		},
		// 案件类型 1：普通 2：破产 3：执行 4：终本
		caseType: {
			1: "普通案件",
			2: "破产案件",
			3: "执行案件",
			4: "终本案件",
			99: "执恢案件"
		},
		// （1-即将开始、3-正在进行、5-已成交、7-已流拍、9-中止、11-撤回）
		auction: {
			1: {t: '即将开始', dot: 'warning'},
			3: {t: '正在进行', dot: 'warning'},
			5: {t: '已成交', dot: 'success'},
			7: {t: '已流拍', dot: 'gary'},
			9: {t: '中止', dot: 'gary'},
			11: {t: '撤回', dot: 'gary'},
		},
		process: {
			0: {t: '未跟进', tag: ''},
			3: {t: '跟进中', tag: 'regStatus-orange'},
			6: {t: '跟进中', tag: 'regStatus-orange'},
			9: {t: '已完成', tag: 'regStatus-green'},
			12: {t: '已忽略', tag: 'regStatus-gray'},
			15: {t: '已放弃', tag: 'regStatus-gray'},
		},
		certificateType: {
			0: "未知",
			1: "采矿权",
			2: "探矿权",
		},
		rightsType: {
			0: "未知",
			1: "商标",
			2: "专利",
		}
	};
	// public function object
	var f = {
		time: function (date, formatStr, isSelf) {
			var _this = "";
			if (typeof date === 'string') return data;
			if (date === 0) _this = new Date(null);
			else if (date) _this = new Date((isSelf ? date : date * 1000));
			else _this = new Date();
			var format = "yyyy-MM-dd";
			if (formatStr === 'm') format = "yyyy-MM-dd hh:mm";
			if (formatStr === 's') format = "yyyy-MM-dd hh:mm:ss";
			var o = {
				'M+': _this.getMonth() + 1,// 月份
				'd+': _this.getDate(),// 日
				'h+': _this.getHours(),// 小时
				'm+': _this.getMinutes(),// 分
				's+': _this.getSeconds(),// 秒
				'q+': Math.floor((_this.getMonth() + 3) / 3),// 季度
				S: _this.getMilliseconds() // 毫秒
			};
			var fmt = format;
			if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (_this.getFullYear().toString()).substr(4 - RegExp.$1.length));
			Object.keys(o).forEach(function (k) {
				if (new RegExp("(" + k + ")").test(fmt)) {
					fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k].toString()).substr((o[k].toString()).length));
				}
			});
			return fmt;
		},
		replaceHtml: function (ary, option) {
			var field = (option || {}).field || '';
			var source = (option || {}).source || {};
			ary.forEach(function (i) {
				if (typeof i === 'object') htmlResult = htmlResult.replace(i.f, i.v);
				else if (typeof i === 'string') htmlResult = htmlResult.replace("{" + field + "." + i + "}", source[i]);
			})
		},
		urlDom: function (title, url, defaultWord) {
			var content = title || defaultWord || "-";
			return (url ? "<a href=\"" + url + "\" target=\"_blank\" class=\"t3\">" + content + "</a>"
				: ("<span class='t2'>" + content + "</span>"));
		},
		tag(value, className) {
			if (!value) return '';
			var _className = className ? ('tag ' + className) : 'tag';
			return "<span class=\"" + _className + "\">" + value + "</span>";
		},
		threeDigit: function (item, unit, num, defaultWord) {
			if (!item && item !== 0) return (defaultWord || '-');
			var type = parseFloat(item);
			if (isNaN(type)) return item;
			var num1 = type;
			if (num !== 'none') {
				var FixedNum = num !== undefined ? num : 2;
				num1 = type.toFixed(FixedNum);
			}
			var str = "".concat(num1);
			if (str.length <= 3) return str;

			var pointer = str.split('.')[1];
			var str1 = str.split('.')[0];
			var arr = str1.split('');
			var arr1 = arr.slice(0);
			var i = 1;
			for (var j = 0; j <= i; j += 1) {
				if (i * 3 < arr.length) {
					arr1.splice(arr.length - 3 * i, 0, ',');
					i += 1;
				}
			}
			if (pointer) {
				arr1.push('.');
				arr1.push(pointer);
			}
			return arr1.join('') + (unit || '');
		},
		normalList(list) {
			var result = '';
			var separator = '<div class=\"n-line\"></div>';
			var getDesc = function (item) {
				var dot = item.dot ? ("<i class=\"" + item.dot + "\"></i>") : '';
				return (dot + (item.t ? ("<u>" + item.t + "</u>") : '') + (item.cot || '-'));
			};
			list.forEach(function (i) {
				if (!i) result += '';
				else {
					if (i.length !== undefined) {
						result += "<li>";
						i.forEach(function (childItem) {
							result += (separator + getDesc(childItem));
						});
						result += "</li>";
					} else {
						result += ("<li>" + getDesc(i) + "</li>")
					}
				}
			});
			return result;
		},
		partiesList(data, inline, ignore) {
			var res = inline ? '<li>' : '';
			if (data.length && typeof data === 'object') {
				(data || []).forEach(function (item) {
					if (item.role !== ignore) {
						res += ((inline ? '<div class=\"n-line\"></div>' : "<li>") + ("<u>" + item.role + "</u>"));
						var childStr = [];
						item.child.forEach(function (i) {
							if (i.birthday || i.gender) {
								var result = [];
								if (i.gender === 1) result.push('男');
								if (i.gender === 2) result.push('女');
								if (i.birthday) result.push(i.birthday);
								childStr.push(i.name + "(" + result.join(" ") + ")");
							} else {
								childStr.push(i.name)
							}
						});
						res += (childStr.join('、') + (inline ? "" : "</li>"));
					}
				})
			}
			res += inline ? '</li>' : '';
			return res;
		},
		handleParties: function (data) {
			if (!data) return '--';
			var source = [];
			data.forEach(function (i) {
				if (source.length === 0) {
					source.push({
						index: source.length,
						role: i.role,
						roleType: i.roleType,
						child: [i]
					});
				} else {
					var _result = source.filter(function (item) {
						return item.role === i.role;
					})[0];
					if (_result) {
						source[_result.index].child.push(i);
					} else {
						source.push({
							index: source.length,
							role: i.role,
							roleType: i.roleType,
							child: [i]
						});
					}
				}
			});
			source.sort(function (a, b) {
				return a.roleType - b.roleType
			});
			return source;
		},
		disStatus: function (value) {
			var dishonestStatus = '';
			if (value === 1) dishonestStatus = "<div class='img-icon'><span class=\"img-icon-dishonest img-icon-dishonest\"></span></div>";
			if (value === 2) dishonestStatus = "<div class='img-icon'><span class=\"img-icon-dishonest img-icon-dishonest-ed\"></span></div>>";
			return dishonestStatus;
		},
		toRegStatus: function (val) {
			if (val) {
				if (val.match(/(存续|在业)/)) return 'regStatus-green';
				if (val.match(/(迁出|其他)/)) return 'regStatus-orange';
				if (val.match(/(撤销|吊销|清算|停业|注销)/)) return 'regStatus-red';
				return "";
			}
			return '';
		},
	};
	var w = function (value, o) {
		var option = o || {};
		return value ? ((option.prefix || '') + value + (option.unit || '')) : (option.defaultWord || '-');
	};

	var taxParties = function (data) {
		var res = {
			length: (data || []).length,
			fill: "",
			appendDom: "",
		};
		if (res.length) {
			data.forEach(function (i, index) {
				var text = w(i.name) + (i.idNumber ? ("(" + w(i.idNumber) + ")") : "");
				if (index === 0) res.fill = "<td style='padding-right: 0'>" + s.identity[i.identityType || 0] + "：</td><td style='padding-left: 0'>" + text + "</td>";
				else res.appendDom += "<tr><td style='padding-right: 0'>" + s.identity[i.identityType || 0] + "：</td><td style='padding-left: 0'>" + text + "</td></tr>"
			});
		} else {
			res.fill = "<td>-</td><td></td>";
		}
		return res;
	};

	var matchReason = function (data) {
		var reason = data.reason;
		var pushType = data.pushType;
		if (reason) {
			var matchReasonStr = '';
			try {
				var _reason = JSON.parse(reason);
				_reason.forEach(function (item) {
					if (item.used_name) {
						if ((item.hl || []).length) matchReasonStr += item.hl.join("、");
					} else if (item.birth) {
						matchReasonStr += (item.desc || '-');
					} else {
						// 全文匹配
						if (pushType === 1 && /<em/.test(JSON.stringify(item.hl))) matchReasonStr += '';
						else {
							if ((item.hl || []).length) matchReasonStr += item.hl.join("、");
						}
					}
				})
			} catch (e) {
			}
			return matchReasonStr || '-';
		}
		return "-";
	};
	var map = function (ary, field) {
		var array = ary || [];
		return array.map(function (i) {
			return field ? i[field] : i
		})
	};

	f.replaceHtml([
		{f: "../../img/watermark.png", v: bgImgData},
		{f: "../../img/debtor.png", v: deIconData},
		{f: "../../img/person.png", v: personData},
		{f: "../../img/business.png", v: businessData},
		{f: "../../img/icon_dishonest_ed.png", v: disEdIconData},
		{f: "../../img/icon_shixin.png", v: disIconData},
		{f: "../../img/icon-accurate.png", v: accurateImgData},
		{f: "{base.queryTime}", v: f.time()}]);

	/* draw normal table */
	var drawTable = function (data, option) {
		var thStr = "<tr>";
		var trArray = [];
		option.forEach(function (i) {
			trArray.push(i.f);
			thStr += "<th " + (i.w ? ("style=\"width:" + i.w + "px\"") : '') + ">" + i.t + "</th>"
		});
		thStr += "</tr>";
		var trStr = '';

		data.forEach(function (i, index) {
			trStr += '<tr>';
			trArray.forEach(function (f) {
				var value = f === 'index' ? index + 1 : i[f];
				trStr += ('<td>' + (value || '-') + '</td>')
			});
			trStr += '</tr>';
		});
		return thStr + trStr;
	};

	/* return taxon html */
	var drawContent = function methods(option, data) {
		var taxon = option.id;
		var tableClass = (option.className || '') + (/I/.test(option.id) ? ' table-border' : '') + (/[AR]/.test(option.id) ? ' table-td-s-30' : '');
		var list = '';
		var dot = true;
		switch (taxon) {
			case 'DB10102': {
				list = drawTable(data.list, [
					{t: '业务编号', f: 'caseNumber'},
					{t: '债务人角色', f: 'role'},
					{t: '负责人/机构', f: 'orgName'},
				]);
				break;
			}
			case 'A10101':
			case 'A10102': {
				data.list.forEach(function (i) {
					var process = i.process !== 0 ? (s.process[i.process] || {}) : {};
					var auction = s.auction[i.status] || {};
					list += "<tr><td>"
						+ f.urlDom(i.title, i.url)
						+ f.tag(process.t, process.tag)
						+ f.normalList([
							{t: '匹配原因', cot: matchReason(i), dot},
							{t: '审核备注', cot: i.remark},
						])
						+ "</td><td>"
						+ f.normalList([
							{cot: auction.t, dot: auction.dot},
							{t: '成交价', cot: w(f.threeDigit(i.currentPrice), {unit: '元'})},
							{t: '评估价', cot: w(f.threeDigit(i.consultPrice), {unit: '元'})},
							{t: '拍卖时间', cot: f.time(i.start)},
							{t: '处置单位', cot: i.court},
						]) + "</td></tr>";
				});
				break;
			}
			case 'A10201': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.caseNumber, i.url)
						+ f.tag(s.caseType[i.caseType], 'case-tag')
						+ f.normalList([
							{t: '立案日期', cot: i.gmtRegister},
						])
						+ f.partiesList(f.handleParties(i.parties))
						+ "</td><td>" + f.normalList([
							{t: '审理法院', cot: i.court}
						]) + "</td></tr>";
				});
				break;
			}
			case 'A10202': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.caseNumber, i.url)
						+ f.tag(i.caseReason)
						+ f.normalList([
							{t: '开庭日期', cot: i.gmtTrial},
						])
						+ f.partiesList(f.handleParties(i.parties))
						+ "</td><td>" + f.normalList([
							{t: '审理法院', cot: i.court}
						]) + "</td></tr>";
				});
				break;
			}
			case 'A10203': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.title, i.url)
						+ f.tag(i.caseType, 'case-tag')
						+ f.tag(i.caseReason)
						+ f.normalList([
							[{t: '判决日期', cot: i.gmtJudgment}, {t: '发布日期', cot: i.gmtPublish}],
						])
						+ f.partiesList(f.handleParties(i.parties))
						+ "</td><td>" + f.normalList([
							{cot: i.caseNumber, dot},
							{t: '审理法院', cot: i.court}
						]) + "</td></tr>";
				});
				break;
			}
			case 'A10301': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.projectName, i.url)
						+ f.tag(i.landUse)
						+ f.normalList([
							{cot: (w(i.administrativeRegion) + ' ' + w(i.landAddress))},
							{t: '土地使用权人', cot: i.obligorName, ET},
							[
								{t: '签订日期', cot: i.singedTime},
								{t: '面积', cot: w(i.landArea, {unit: '公顷'})},
								{t: '使用年限', cot: w(i.transferTerm, {unit: '年'})},
							]
						])
						+ f.partiesList(f.handleParties(i.parties))
						+ "</td><td>" + f.normalList([
							{cot: w(i.finalPrice, {unit: '万元', prefix: '成交价格：'}), dot: 'success'},
							{t: '批准单位', cot: i.approver},
							{t: '供地方式', cot: i.supplyWay},
						]) + "</td></tr>";
				});
				break;
			}
			case 'A10302': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.landAddress, i.url)
						+ f.tag(i.landUse)
						+ f.normalList([{cot: w(i.administrativeRegion)}])
						+ f.partiesList(f.handleParties(i.parties))
						+ f.normalList([
							[
								{t: '成交日期', cot: i.dealingTime,},
								{t: '面积', cot: w(i.landArea, {unit: '公顷'})},
								{t: '使用年限', cot: w(i.transferTerm, {unit: '年'})}
							]
						])
						+ "</td><td>" + f.normalList([
							{cot: w(i.transferPrice, {unit: '万元', prefix: '转让价格：'}), dot: 'success'},
							{t: '转让方式', cot: i.transferMode},
						]) + "</td></tr>";
				});
				break;
			}
			case 'A10303': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.landAddress, i.url)
						+ f.tag(i.landUse)
						+ f.normalList([{cot: w(i.administrativeRegion)}])
						+ f.partiesList(f.handleParties(i.parties))
						+ f.normalList([
							[
								{t: '登记日期', cot: f.time(i.startTime)},
								{t: '面积', cot: w(i.landArea, {unit: '公顷'})},
								{t: '评估金额', cot: w(i.consultPrice, {unit: '万元'})},
							],
							{t: '土地使用权证号', cot: w(i.landUseCertificateNumber)}
						])
						+ "</td><td>" + f.normalList([
							{cot: w(i.mortgageAmount, {unit: "万元", prefix: '抵押金额：'}), dot: 'success'},
							{t: '抵押面积', cot: w(i.mortgageArea, {unit: '公顷'})},
							{t: '土地他项权证号', cot: w(i.transferTerm)},
							{t: '登记结束日期', cot: f.time(i.endTime)},
						]) + "</td></tr>";
				});
				break;
			}
			case 'A10401': {
				data.list.forEach(function (i) {
					var gmtValidityPeriod = (i.gmtValidityPeriodEnd && i.gmtValidityPeriodStart)
						? (i.gmtValidityPeriodStart + ' 至 ' + i.gmtValidityPeriodEnd) : '-';
					var statusInfo = i.status === '正常' ? [{cot: '正常', dot: 'success'}] : [
						{cot: i.status, dot},
						{t: (i.status + '原因'), cot: i.reason},
						{t: (i.status + '时间'), cot: i.gmtIssueTime},
					];
					list += "<tr><td>"
						+ f.urlDom(i.licenseNumber, i.url)
						+ f.normalList([
							{cot: i.industry},
							[
								{t: '持证单位', cot: i.companyName, ET},
								{t: '发证日期', cot: i.gmtPublishTime},
								{t: '有效期', cot: gmtValidityPeriod}
							]
						])
						+ "</td><td>" + f.normalList(statusInfo) + "</td></tr>";
				});
				break;
			}
			case 'A10402': {
				data.list.forEach(function (i) {
					var gmtValidityPeriod = (i.gmtValidityPeriodEnd && i.gmtValidityPeriodStart)
						? (i.gmtValidityPeriodStart + ' 至 ' + i.gmtValidityPeriodEnd) : '-';
					list += "<tr><td>"
						+ f.urlDom(i.licenseNumber, i.url)
						+ f.tag(s.certificateType[i.certificateType])
						+ f.normalList([
							{cot: (w(i.mineralSpecies) + ' ' + w(i.projectName))},
							[
								{t: '探/采矿权人', cot: i.rightsHolder, ET},
								{t: '发布日期', cot: i.gmtPublishTime},
								{t: '有效期', cot: gmtValidityPeriod},
								{t: '面积', cot: i.area ? f.threeDigit(i.area, '平方米') : '-'},
							]
						])
						+ "</td></tr>";
				});
				break;
			}
			case 'A10403': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.rightsName, i.url)
						+ f.tag(s.rightsType[i.rightsType])
						+ f.normalList([{t: '申请人/权利人', cot: i.obligorName, ET},])
						+ "</td><td>" + f.normalList([{t: '公告日期', cot: i.noticeTime}]) + "</td></tr>";
				});
				break;
			}
			case 'A10404': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.qualificationName, i.url)
						+ f.normalList([
							{cot: (w(i.qualificationType) + ' ' + w(i.qualificationLevel))},
							[
								{t: '持证单位', cot: i.obligorName, ET},
								{t: '发布日期', cot: i.issueTime},
								{t: '有效期', cot: i.validityPeriod},
								{t: '证书编号', cot: i.certificateNumber},
							]
						])
						+ "</td></tr>";
				});
				break;
			}
			case 'A10501': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom('股权标的企业 ' + i.companyName || '-')
						+ f.normalList([
							{t: '登记日期', cot: f.time(i.regDate)},
							[
								{t: '出质人', cot: (i.pledgorList ? map(i.pledgorList, 'pledgor').join('、') : '-'), ET},
								{t: '质权人', cot: (i.pledgeeList ? map(i.pledgeeList, 'pledgee').join('、') : '-')},
								{t: '出质股权数额', cot: w(i.consultPrice, {unit: '万人民币'})},
							],
						])
						+ "</td><td>" + f.normalList([
							{
								cot: w((i.state === 0 ? '有效' : '无效'), {unit: (i.state === 0 ? '（<u>匹配日期:</u>****）' : '')}),
								dot: i.state === 0 ? 'success' : 'dot'
							},
							{t: '登记编号', cot: w(i.regNumber)},
						]) + "</td></tr>";
				});
				break;
			}
			case 'A10502': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom('股权标的企业 ' + i.companyName || '-')
						+ f.normalList([
							{t: '登记日期', cot: f.time(i.regDate)},
							[
								{t: '质权人', cot: (i.pledgeeList ? map(i.pledgeeList, 'pledgee').join('、') : '-'), ET},
								{t: '出质人', cot: (i.pledgorList ? map(i.pledgorList, 'pledgor').join('、') : '-')},
								{t: '出质股权数额', cot: w(i.consultPrice, {unit: '万人民币'})},
							],
						])
						+ "</td><td>" + f.normalList([
							{
								cot: w((i.state === 0 ? '有效' : '无效'), {unit: (i.state === 0 ? '（<u>匹配日期:</u>****）' : '')}),
								dot: i.state === 0 ? 'success' : 'dot'
							},
							{t: '登记编号', cot: w(i.regNumber)},
						]) + "</td></tr>";
				});
				break;
			}
			case 'A10601': {
				data.list.forEach(function (i) {
					var statusInfo = i.status ? [
						{cot: w('有效', {unit: '（<u>匹配日期:</u>****）'}), dot: 'success'},
						{t: '登记编号', cot: i.regNum},
					] : [
						{cot: '无效', dot},
						{t: '注销时间', cot: i.reason},
						{t: '注销原因', cot: i.gmtIssueTime},
						{t: '登记编号', cot: i.regNum},
					];
					list += "<tr><td>"
						+ f.urlDom('抵押物 ' + i.pawnName || '-')
						+ f.normalList([
							{t: '登记日期', cot: f.time(i.regDate)},
							[
								{t: '抵押物所有人', cot: i.owner, ET},
								{t: '抵押权人', cot: i.people},
							],
							[
								{t: '担保债权数额', cot: w(i.amount, {unit: '元'})},
								{t: '债务人履行债务的期限', cot: w(i.term)},
							]
						])
						+ "</td><td>" + f.normalList(statusInfo) + "</td></tr>";
				});
				break;
			}
			case 'A10602': {
				data.list.forEach(function (i) {
					var statusInfo = i.status ? [
						{cot: w('有效', {unit: '（<u>匹配日期:</u>****）'}), dot: 'success'},
						{t: '登记编号', cot: i.regNum},
					] : [
						{cot: '无效', dot},
						{t: '注销时间', cot: i.reason},
						{t: '注销原因', cot: i.gmtIssueTime},
						{t: '登记编号', cot: i.regNum},
					];
					list += "<tr><td>"
						+ f.urlDom('抵押物 ' + i.pawnName || '-')
						+ f.normalList([
							{t: '登记日期', cot: f.time(i.regDate)},
							[
								{t: '抵押权人', cot: i.people, ET},
								{t: '抵押物所有人', cot: i.owner},
							],
							[
								{t: '担保债权数额', cot: w(i.amount, {unit: '元'})},
								{t: '债务人履行债务的期限', cot: w(i.term)},
							]
						])
						+ "</td><td>" + f.normalList(statusInfo) + "</td></tr>";
				});
				break;
			}
			case 'A10701': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.title, i.url)
						+ f.normalList([{t: '相关单位', cot: i.obName, ET},])
						+ "</td><td>" + f.normalList([{t: '发布日期', cot: f.time(i.publishTime)}]) + "</td></tr>";
				});
				break;
			}
			case 'I50101': {
				list = "<tr><td>法定代表人</td><td>{legalPerson}</td><td>组织机构代码</td><td>{orgNumber}</td></tr><tr><td>统一社会信用代码</td><td>{creditCode}</td><td>纳税人识别号</td><td>{taxNumber}</td></tr><tr><td>成立日期</td><td>{establishTime}</td><td>营业期限</td><td>{timeLimit}</td></tr><tr><td>注册资本</td><td>{regCapital}</td><td>实缴资本</td><td>{actualCapital}</td></tr><tr><td>经营状态</td><td>{regStatus}</td><td>登记机关</td><td>{regInstitute}</td></tr><tr><td>企业类型</td><td>{companyOrgType}</td><td>核准日期</td><td>{approvedTime}</td></tr><tr><td>所属行业</td><td>{industry}</td><td>工商注册号</td><td>{regNumber}</td></tr><tr><td>人员规模</td><td>{scale}</td><td>参保人数</td><td>{insuranceNum}</td></tr><tr><td>英文名</td><td>{englishName}</td><td>注册地址</td><td>{regLocation}</td></tr><tr><td>经营范围</td><td colspan='3'>{businessScope}</td></tr>";
				["display", "legalPersonName", "regStatus", "regCapital", "establishTime", "regLocation", "display", "legalPerson", "orgNumber", "creditCode", "taxNumber", "establishTime", "regCapital", "actualCapital", "regStatus", "regInstitute", "companyOrgType", "approvedTime", "industry", "regNumber", "scale", "insuranceNum", "englishName", "businessScope", "regLocation"].forEach(function (item) {
					list = list.replace("{" + item + "}", data[item] || '-')
				});
				var timeLimit = (source.fromTime && source.toTime) ? ("自 " + (source.fromTime || '-') + " 至 " + (source.toTime || '-')) : "-";
				list = list.replace("{timeLimit}", timeLimit);
				break;
			}
			case 'I50201': {
				list = drawTable(data, [
					{t: '序号', f: 'index', w: '40'},
					{t: '姓名', f: 'name'},
					{t: '职务', f: 'job'}
				]);
				break;
			}
			case 'I50301': {
				list = drawTable(data, [
					{t: '序号', f: 'index', w: 40},
					{t: '股东基本信息', f: 'name'},
					{t: '出资比例', f: 'rate'},
					{t: '认缴出资额', f: 'amount'},
				]);
				break;
			}
			case 'I50501': {
				list = drawTable(data.list, [
					{t: '序号', f: 'index', w: 40},
					{t: '机构名称', f: 'companyName'},
					{t: '法定代表人', f: 'legalName'},
					{t: '注册资本', f: 'regCapital'},
					{t: '注册时间', f: 'regTime'},
					{t: '经营状态', f: 'regStatus'}
				]);
				break;
			}
			case 'I50601': {
				list = drawTable(data.list, [
					{t: '序号', f: 'index', w: 40},
					{t: '对外投资企业名称', f: 'companyName'},
					{t: '法定代表人', f: 'legalName'},
					{t: '注册资本', f: 'regCapital'},
					{t: '投资占比', f: 'rate'},
					{t: '注册时间', f: 'regTime'},
					{t: '经营状态', f: 'regStatus'}
				]);
				break;
			}
			case 'I50701': {
				list = drawTable(data.list, [
					{t: '序号', f: 'index', w: 30},
					{t: '变更日期', f: 'changeTime', w: 90},
					{t: '变更事项', f: 'changItem', w: 70},
					{t: '变更前内容', f: 'contentBefore'},
					{t: '变更后内容', f: 'contentAfter'}
				]);
				break;
			}
			default : {
			}
		}
		return tableClass ? ("<table class='" + tableClass + "'>" + list + "</table>") : ("<table>" + list + "</table>");
	};

	/* creat child Container  */
	var childContainer = function (option, source) {
		var count = typeof source === 'object' ? (source.total || source.length || 0) : 0;
		if (count !== 0 || option.show) {
			var title = option.title + (count ? '  ' + count : '');
			return "<div><div class=\"title\"><div class=\"t2\">" + title + "</div>" +
				"</div><div class=\"content\">" + drawContent(option, source) + "</div></div>"
		}
		return ''
	};

	/* main logic entry */
	var aboutList = function (title, source, option) {
		return "<div><div class=\"title\"><div class=\"t2\">" + title + "</div>" +
			"</div><div class=\"content\">" + drawContent(option, source) + "</div></div>"
	};

	var item = _dataSource[TYPE + 'B10101'] || {};
	// 基本信息
	if (TYPE === 'B') {
		f.replaceHtml([
			{f: '{base.logo}', v: item.logoUrl || ''},
			{f: '{base.logo-icon}', v: 'business-img'},
			{f: '{base.content-type}', v: 'content-max'},
			{
				f: '{base.content}', v: (
					f.urlDom(item.obligorName) +
					f.tag(item.pushState ? '当前推送状态：开启' : '当前推送状态：关闭', !item.pushState ? 'regStatus-gray' : '') +
					f.normalList([
						[
							{t: '借款人', cot: item.legalPersonName},
							{t: '证件号/统一社会信用代码', cot: w(item.regCapital, {unit: '万人民币'})},
							{t: '借款人推送状态', cot: w(item.establishTime)},
						],
						[
							{t: '负责人/机构', cot: item.legalPersonName},
							{t: '上传时间', cot: item.legalPersonName},
						],
					])
				)
			}]);
	}
	if (TYPE === 'D') {
		if (Status === 'E') {
			f.replaceHtml([
				{f: '{base.logo}', v: item.logoUrl || ''},
				{f: '{base.logo-icon}', v: 'debtor-img'},
				{f: '{base.content-type}', v: 'content-max'},
				{
					f: '{base.content}', v: (
						f.urlDom(item.obligorName) +
						f.disStatus(item.dishonestStatus) +
						f.tag(item.regStatus, f.toRegStatus(item.regStatus)) +
						f.tag(!item.limitConsumption ? '已限高' : '', 'regStatus-orange') +
						f.tag(!item.bankruptcy ? '破产/重整风险' : '', 'regStatus-red') +
						f.tag(item.pushState ? '当前推送状态：开启' : '当前推送状态：关闭', !item.pushState ? 'regStatus-gray' : '') +
						f.normalList([
							[
								{t: '法定代表人', cot: item.legalPersonName},
								{t: '注册资本', cot: w(item.regCapital, {unit: '万人民币'})},
								{t: '成立日期', cot: w(item.establishTime)},
							],
							(item.usedName || []).length ? {t: '曾用名', cot: (item.usedName.join('、'))} : null])
					)
				}
			]);
		} else {
			f.replaceHtml([
				{f: '{base.logo}', v: ''},
				{f: '{base.logo-icon}', v: 'person-img'},
				{f: '{base.content-type}', v: 'content-min'},
				{
					f: '{base.content}', v: (
						f.urlDom(item.obligorName) +
						f.disStatus(item.dishonestStatus) +
						f.tag(item.limitConsumption ? '已限高' : '', 'regStatus-orange') +
						f.tag(item.pushState ? '当前推送状态：开启' : '当前推送状态：关闭', !item.pushState ? 'regStatus-gray' : '') +
						f.normalList([{t: '证件号', cot: item.obligorNumber}])
					)
				}
			]);
		}
		// 关联业务列表
		f.replaceHtml([{
			f: '{about.list}', v: aboutList(
				(Status === 'E' ? '关联业务列表' : '相关业务列表'),
				{list: _dataSource["DB10102"]},
				{id: 'DB10102', className: 'table-border', show: true}
			)
		}]);
	}

	Object.keys(dd).forEach(function (field) {
		var item = dd[field];
		var child = '';
		if (new RegExp(Status).test(item.status)) {
			item.child.forEach(function (i) {
				child += childContainer(i, _dataSource[TYPE + i.id])
			});
		}
		var wrapper = child ? ("<div><div class=\"t1 b-b\">" + item.name + "</div><div class=\"wrapper\">" + child + "</div></div>") : '';
		f.replaceHtml([{f: item.about, v: wrapper}]);
	});

	return htmlResult;
}

var str = (exportType) => exportTemplate(dataSource, exportType);
fs.writeFile("./template/result/demo-db.html", str('debtor'), (error) => {
	error && console.log('error');
});

module.exports = {
	exportCover,
	exportTemplate,
	bgImgData,
	deIconData,
	disIconData,
	disEdIconData,
	accurateImgData,
	htmlResultStr,
	htmlCoverStr,
	cssResult
};
