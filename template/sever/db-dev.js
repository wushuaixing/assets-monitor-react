"use strict";

var fs = require('fs');

var dataSource = JSON.stringify(require('./data-db'));

const toBase64 = (file, size) => 'data:image/png;base64,' + new Buffer.alloc(size, file).toString('base64');

const bgImgData = toBase64(fs.readFileSync('./template/img/watermark.png'), 65 * 1024);
const deIconData = toBase64(fs.readFileSync('./template/img/debtor.png'), 2 * 1024);
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
		overview: {
			name: '概览',
			about: '{overview.content}',
			child: []
		},
		assets: {
			name: '资产',
			about: '{assets.content}',
			child: [
				{id: 'A10101', title: '资产拍卖_精准匹配', status: 'bep'},
				{id: 'A10102', title: '资产拍卖_模糊匹配', status: 'bep'},
				{id: 'A10401', title: '无形资产_排污权', status: 'be'},
				{id: 'A10402', title: '无形资产_矿业权', status: 'be'},
				{id: 'A10403', title: '无形资产_商标专利', status: 'be'},
				{id: 'A10404', title: '无形资产_建筑建造资质', status: 'be'},
				{id: 'A10301', title: '土地信息_出让结果', status: 'be'},
				{id: 'A10302', title: '土地信息_土地转让', status: 'be'},
				{id: 'A10303', title: '土地信息_土地抵押', status: 'be'},
				{id: 'A10201', title: '代位权_立案', status: 'bep'},
				{id: 'A10202', title: '代位权_开庭', status: 'bep'},
				{id: 'A10203', title: '代位权_裁判文书', status: 'bep'},
				{id: 'A10501', title: '股权质押_股权出质', status: 'be'},
				{id: 'A10502', title: '股权质押_股权质权', status: 'be'},
				{id: 'A10601', title: '动产抵押_抵押', status: 'be'},
				{id: 'A10602', title: '动产抵押_抵押权', status: 'be'},
				{id: 'A10701', title: '招投标', status: 'be'},
			]
		},
		risk: {
			name: '风险',
			about: '{risk.content}',
			child: [
				{id: 'R30201', title: '破产重组', status: 'be'},
				{id: 'R20603', title: '涉诉文书', status: 'p'},
				// {id: 'R20401', title: '失信记录',desc: '列入', status: 'bep'},
				// {id: 'R20402', title: '失信记录',desc: '已移除',status: 'bep'},
				// {id: 'R20502', title: '限高记录', status: 'bep'},
				{id: 'R20601', title: '涉诉信息_立案', status: 'be'},
				{id: 'R20602', title: '涉诉信息_开庭', status: 'be'},
				{id: 'R20603', title: '涉诉信息_裁判文书', status: 'be'},
				{id: 'R30301', title: '经营异常', status: 'be'},
				{id: 'R30401', title: '严重违法', status: 'be'},
				{id: 'R30501', title: '税收违法', status: 'bep'},
				{id: 'R30601', title: '行政处罚', status: 'be'},
				{id: 'R30701', title: '环保处罚', status: 'be'},
			]
		},
		info: {
			name: '工商基本详情',
			about: '{info.content}',
			child: [
				{id: 'I50101', title: '基本信息', status: 'e', show: true, className: 'table-baseInfo'},
				{id: 'I50201', title: '主要人员', status: 'e'},
				{id: 'I50301', title: '股东信息', status: 'e'},
				{id: 'I50501', title: '分支机构', status: 'e'},
				{id: 'I50601', title: '对外投资', status: 'e'},
				{id: 'I50701', title: '工商变更', status: 'e', className: 'page-break-style'},
			]
		},
	};
	var _dataSource = JSON.parse(source);
	var field = "BB";
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
			1: "即将开始",
			3: "正在进行",
			5: "已成交",
			7: "已流拍",
			9: "中止",
			11: "撤回",
		}
	};
	// public function object
	var f = {
		format: function (date, formatStr, isSelf) {
			var _this = "";
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
			var dW = defaultWord || "-";
			return (url ? "<a href=\"" + url + "\" target=\"_blank\" class=\"base-b fw-bold\">" + (title || dW) + "</a>" : (title || dW));
		},
		textDesc: function (text, desc, colon, width) {
			var _colon = colon || "：";
			return "<li class=\"mg8-0\"><div class=\"nAndI\">" +
				(desc ? ("<span class=\"n-title " + (width ? "po" : "") + "\">" + (desc + _colon) + "</span>") : '') +
				"<span class=\"n-desc\" " + (width ? ("style='margin-left:" + width + "px';") : "") + ">" + text + "</span></div></li>";
		},
		infoList: function (source, width) {
			var res = '';
			source.forEach(function (i) {
				res += f.textDesc(i.t, i.d, i.colon, i.width || width)
			});
			return res;
		},
		floatFormat: function (item, unit, include, defaultWord) {
			if (include && !item) return (defaultWord || '-');
			else if (!item && item !== 0) return (defaultWord || '-');
			var type = parseFloat(item);
			if (isNaN(type)) return item;
			var num1 = type.toFixed(2);
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
		handleParties: function (data) {
			if (!data) return '--';
			var source = [];
			data.forEach(function (i) {
				if (source.length === 0) {
					source.push({
						index: source.length,
						role: i.role,
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
							child: [i]
						});
					}
				}
			});
			return source;
		},
		disStatus: function (value) {
			var dishonestStatus = '';
			if (value === 1) dishonestStatus = "<span class=\"img-icon-size-dishonest img-icon-dishonest icon-dishonest\"></span>";
			if (value === 2) dishonestStatus = "<span class=\"img-icon-size-dishonest-ed img-icon-dishonest-ed icon-dishonest\"></span>";
			return dishonestStatus;
		},
	};
	var w = function (value, defaultWord) {
		return value ? value : (defaultWord || '-');
	};

	var parties = function (data) {
		var res = {
			length: (data || []).length,
			fill: "",
			appendDom: "",
		};
		if (res.length) {
			var result = f.handleParties(data);
			res.length = result.length;
			result.forEach(function (i, index) {
				var childStr = [];
				i.child.forEach(function (item) {
					if (item.birthday || item.gender) {
						var result = [];
						if (item.gender === 1) result.push('男');
						if (item.gender === 2) result.push('女');
						if (item.birthday) result.push((typeof item.birthday === "number" ? f.format(item.birthday) : item.birthday));
						childStr.push(item.name + "(" + result.join(" ") + ")");
					} else {
						childStr.push(item.name)
					}
				});
				if (index === 0) res.fill = "<td style='padding-right: 3px;min-width:60px;'>" + i.role + "：</td><td style='padding-left: 0;width: 200px'>" + (childStr.join('、')) + "</td>";
				else res.appendDom += "<tr><td style='padding-right: 0;'>" + i.role + "：</td><td style='padding-left: 0'>" + (childStr.join('、')) + "</td></tr>"
			});

		} else {
			res.fill = "<td>-</td><td></td>";
		}
		return res;
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
		if (reason || data.remark) {
			var matchReasonStr = '';
			if (data.remark) {
				matchReasonStr += "<li class=\"mg8-0\">● 审核备注 | " + f.format(data.approveTime, "m") + "</li><li class=\"mg8-0\">" + w(data.remark) + "</li>";
			}
			try {
				var _reason = JSON.parse(reason);
				_reason.forEach(function (item) {
					if (item.used_name) {
						matchReasonStr += "<li class=\"mg8-0\">● 根据曾用名\"" + item.used_name + "\"匹配</li>";
						if ((item.hl || []).length) matchReasonStr += ("<li class=\"mg8-0\">" + item.hl.join("</li><li class=\"mg8-0\">") + "</li>");
						else matchReasonStr += "<li class=\"mg8-0\">--</li>";
					} else if (item.birth) {
						matchReasonStr += "<li class=\"mg8-0\">● 根据\"" + item.birth + "\"匹配</li>";
						matchReasonStr += "<li class=\"mg8-0\">" + (item.desc || '--') + "</li>";
					} else {
						matchReasonStr += "<li class=\"mg8-0\">● 根据\"" + (item.name || item.number) + "\"匹配</li>";
						if ((item.hl || []).length) matchReasonStr += ("<li class=\"mg8-0\">" + item.hl.join("</li><li class=\"mg8-0\">") + "</li>");
						else matchReasonStr += "<li class=\"mg8-0\">--</li>";
					}
				})
			} catch (e) {
			}
			return matchReasonStr;
		}
		return "--";
	};

	f.replaceHtml([
		{f: "../../img/watermark.png", v: bgImgData},
		{f: "../../img/debtor.png", v: deIconData},
		{f: "../../img/icon_dishonest_ed.png", v: disEdIconData},
		{f: "../../img/icon_shixin.png", v: disIconData},
		{f: "../../img/icon-accurate.png", v: accurateImgData},
		{f: "{base.queryTime}", v: f.format()}]);
	/* baseInfo -- fill */
	var baseInfo = function method(data, status) {
		var list = ((data || {}).businessList) || ((data || {}).obligorList) || [];
		var obj = (data.detail) || {};
		var userInfo = '';
		if (status) {
			var usedLengthFlag = Boolean((obj.usedName || []).length);
			userInfo = ("<div class='name'>" + obj.obligorName + (obj.obligorNumber ? ("(" + obj.obligorNumber + ")") : "") + "</div>");
			f.replaceHtml([
				{f: "{business.display}", v: "display-none"},
				{f: "{base.title}", v: "债务人详情"},
				{f: "{about.title}", v: "相关业务列表"},
				{f: "{base.userInfo}", v: userInfo},
				{f: "{debtor.obligorName}", v: w(obj.obligorName)},
				{f: "{debtor.obligorNumber}", v: w(obj.obligorNumber)},
				{f: "{debtor.dishonest}", v: f.disStatus(obj.dishonestStatus)},
				{f: "{debtor.formerNames}", v: (usedLengthFlag ? obj.usedName.join('、') : '-')}]);
		} else {
			userInfo = ("<div class='name' style='margin-bottom: 30px'>业务编号：" + obj.id + "</div><div class='name'>借款人：" + obj.obligorName + "</div>");
			f.replaceHtml([
				{f: "{debtor.display}", v: "display-none"},
				{f: "{base.title}", v: "业务详情"},
				{f: "{about.title}", v: "业务相关人列表"},
				{f: "{base.userInfo}", v: userInfo}]);
			f.replaceHtml(["caseNumber", "obligorName", "obligorNumber", "orgName"], {
				field: "business",
				source: obj
			});
		}
		var listDom = status ? "<tr><th>业务编号</th><th>角色</th><th>机构名称</th></tr>" : "<tr><th>相关人名称</th><th>身份证号/统一社会信用代码</th><th>角色</th></tr>";
		if (list.length) {
			list.forEach(function (item) {
				listDom += (status ? ("<tr><td>" + w(item.caseNumber) + "</td><td>" + w(item.roleText) + "</td><td>" + w(item.orgName) + "</td></tr>")
					: ("<tr><td><span class='pr pl'>" + w(item.obligorName) + f.disStatus(item.dishonestStatus) + "</span></td><td>" + (item.obligorNumber || '-') + "</td><td>" + w(item.roleText) + "</td></tr>"));
			});
			f.replaceHtml([{f: "{about.list}", v: listDom}, {f: "{about.total}", v: list.length}]);
		} else {
			f.replaceHtml([{
				f: "{about.list}",
				v: (listDom + "<tr><td colspan='3' style='text-align: center;'>暂无数据</td></tr>")
			}, {f: "{about.total}", v: ""}]);
		}
	};
	// baseInfo((type ? d.BA01 : d.BB01), type);

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
		var tableClass = (option.className || '') + (/I/.test(option.id) ? ' table-border' : '');
		var list = '';
		switch (taxon) {
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
				list = "<tr><th style=\"width: 40px\">序号</th><th>姓名</th><th>职务</th></tr>";
				data.forEach(function (i, index) {
					list += ("<tr><td>" + (index + 1) + "</td><td>" + (i.name || '--') + "</td><td>" + (i.job || '--') + "</td></tr>");
				});
				break;
			}
			case 'I50501': {
				list = "<tr><th style=\"width: 40px\">序号</th><th>姓名</th><th>职务</th></tr>";
				data.list.forEach(function (i, index) {
					list += ("<tr><td>" + (index + 1) + "</td><td>" + (i.name || '--') + "</td><td>" + (i.job || '--') + "</td></tr>");
				});
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
	Object.keys(dd).forEach(function (field) {
		var item = dd[field];
		var child = '';
		item.child.forEach(function (i) {
			child += childContainer(i, _dataSource[i.id])
		});
		var wrapper = child ? ("<div><div class=\"t1 b-b\">" + item.name + "</div><div class=\"wrapper\">" + child + "</div></div>") : '';
		f.replaceHtml([{f: item.about, v: wrapper}]);
	});

	return htmlResult;
}

var str = (flag) => exportTemplate(dataSource, flag);
fs.writeFile("./template/result/demo-db.html", str(false), (error) => {
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