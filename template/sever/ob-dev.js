"use strict";

var fs = require('fs');

var dataSource = JSON.stringify(require('./data-ob'));

const toBase64 = (file, size) => 'data:image/png;base64,' + new Buffer.alloc(size, file).toString('base64');

const bgImgData = toBase64(fs.readFileSync('./template/img/watermark.png'), 60 * 1024);
const deIconData = toBase64(fs.readFileSync('./template/img/debtor.png'), 2 * 1024);
const disIconData = toBase64(fs.readFileSync('./template/img/icon_shixin.png'), 4 * 1024);
const disEdIconData = toBase64(fs.readFileSync('./template/img/icon_dishonest_ed.png'), 4 * 1024);
const accurateImgData = toBase64(fs.readFileSync('./template/img/icon-accurate.png'), 4 * 1024);

let htmlResultStr = fs.readFileSync('./template/src/content/debtor.html', 'utf8');
const cssResult = fs.readFileSync('./template/src/content/index.css', 'utf8');
let htmlResult = htmlResultStr.replace(/<link rel="stylesheet" type="text\/css" href="index.css">/g, `<style>${cssResult}</style>`);
htmlResult = htmlResult.replace("<body>", `<body style="max-width: 904px">`);

function exportTemplate(source, exportType) {
	var d = JSON.parse(source);
	var type = exportType || false; // default business(false); debtor(true)
	var field = type ? "BA" : "BB";
	var s = { // public enumeration object
		identity: {
			0: "未知",
			1: "纳税人",
			2: "法定代表人",
			3: "财务",
			9: "其他"
		},
		// 案件类型 1：普通 2：破产 3：执行 4：终本
		caseType:{
			1:"普通案件",
			2:"破产案件",
			3:"执行案件",
			4:"终本案件",
			99:"执恢案件"
		},
		// （1-即将开始、3-正在进行、5-已成交、7-已流拍、9-中止、11-撤回）
		auction:{
			1: "即将开始",
			3: "正在进行",
			5: "已成交",
			7: "已流拍",
			9: "中止",
			11: "撤回",
		}
	};
	var f = {	// public function object
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
		infoList: function (source,width) {
			var res = '';
			source.forEach(function (i) {
				res += f.textDesc(i.t, i.d,i.colon, i.width || width)
			});
			return res;
		},
		floatFormat: function (item,unit) {
			if (!item && item !== 0) return '-';
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
			return arr1.join('') + (unit||'');
		}
	};
	var w = function (value, defaultWord) {
		return value ? value : (defaultWord || '-');
	};
	f.replaceHtml([
		{f: "../../img/watermark.png", v: bgImgData},
		{f: "../../img/debtor.png", v: deIconData},
		{f: "../../img/icon_dishonest_ed.png", v: disIconData},
		{f: "../../img/icon_shixin.png", v: disEdIconData},
		{f: "../../img/icon-accurate.png", v: accurateImgData},
		{f: "{base.queryTime}", v: f.format()}]);

	var baseInfo = function method(data, status) {
		var list = (data.businessList) ||(data.obligorList)|| [];
		var obj = (data.detail) || {};
		if (status) {
			var usedLengthFlag = Boolean((obj.usedName || []).length);
			var dishonestStatus = '';
			if (obj.dishonestStatus === 1) dishonestStatus = "<span class=\"img-icon-dishonest\"></span>";
			if (obj.dishonestStatus === 2) dishonestStatus = "<span class=\"img-icon-dishonest-ed\"></span>";
			f.replaceHtml([
				{f: "{business.display}", v: "display-none"},
				{f: "{base.title}", v: "债务人详情"},
				{f: "{about.title}", v: "相关业务列表"},
				{f: "{base.name}", v: obj.obligorName},
				{f: "{debtor.obligorName}", v: obj.obligorName},
				{f: "{debtor.obligorNumber}", v: obj.obligorNumber},
				{f: "{debtor.dishonest}", v: dishonestStatus},
				{f: "{debtor.formerNames}", v: (usedLengthFlag ? obj.usedName.join('、') : '-')}]);
		} else {
			f.replaceHtml([
				{f: "{debtor.display}", v: "display-none"},
				{f: "{base.title}", v: "业务详情"},
				{f: "{about.title}", v: "业务相关人列表"},
				{f: "{base.name}", v: obj.obligorName}]);
			f.replaceHtml(["caseNumber", "obligorName", "obligorNumber", "orgName", "guaranteeString"], {
				field: "business",
				source: obj
			});
		}
		if (list.length) {
			var listDom = status ? "<tr><th>业务编号</th><th>角色</th><th>机构名称</th></tr>" : "<tr><th>相关人名称</th><th>身份证号/统一社会信用代码</th><th>角色</th></tr>";
			list.forEach(function (item) {
				listDom += (status ? ("<tr><td>" + item.caseNumber + "</td><td>" + item.roleText + "</td><td>" + item.orgName + "</td></tr>")
					: ("<tr><td>" + item.obligorName + "</td><td>" + (item.obligorNumber || '-') + "</td><td>" + item.roleText + "</td></tr>"));
			});
			f.replaceHtml([{f: "{about.list}", v: listDom}, {f: "{about.total}", v: list.length}]);
		} else {
			f.replaceHtml([{
				f: "{about.list}",
				v: "<tr><td colspan='3' style='text-align: center;'>暂无数据</td></tr>"
			}, {f: "{about.total}", v: ""}]);
		}
	};
	baseInfo((type ? d.BA01 : d.BB01), type);

	var taxParties = function (data) {
		var res = {
			length: (data || []).length,
			fill: "",
			appendDom: "",
		};
		if (res.length) {
			data.forEach(function (i, index) {
				var text = w(i.name)+(i.idNumber?("("+w(i.idNumber)+")"):"");
				if (index === 0) res.fill = "<td style='padding-right: 0'>" + s.identity[i.identityType||0] + "：</td><td style='padding-left: 0'>" + text + "</td>";
				else res.appendDom += "<tr><td style='padding-right: 0'>" + s.identity[i.identityType||0] + "：</td><td style='padding-left: 0'>" + text + "</td></tr>"
			});
		} else {
			res.fill = "<td>-</td><td></td>";
		}
		return res;
	};
	var parties =function (data) {
		var res = {
			length: (data || []).length,
			fill: "",
			appendDom: "",
		};
		if(res.length){
			var ro = {};
			data.forEach(function (i) {
				// 1：原告 2：被告 3：第三人 0：其他
				if (i.roleType === 1) {
					if (ro.a) ro.a.desc += (i.name ? ("、" + i.name) : '');
					else ro.a = {type: "原告", desc: i.name};
				} else if (i.roleType === 2) {
					if (ro.b) ro.b.desc += (i.name ? ("、" + i.name) : '');
					else ro.b = {type: "被告", desc: i.name};
				} else if (i.roleType === 3) {
					if (ro.c) ro.c.desc += (i.name ? ("、" + i.name) : '');
					else ro.c = {type: "第三人", desc: i.name};
				} else {
					if (ro.d) ro.d.desc += (i.name ? ("、" + i.name) : '');
					else ro.d = {type: "其他", desc: i.name};
				}
			});
			var roleList =[];
			["a", "b", "c", "d"].forEach(function (i) {
				if (ro[i]) roleList.push(ro[i]);
			});
			roleList.forEach(function (i, index) {
				if (index === 0) res.fill = "<td style='padding-right: 0;width:50px '>" + i.type + "：</td><td style='padding-left: 0;width: 200px'>" + i.desc + "</td>";
				else res.appendDom += "<tr><td style='padding-right: 0'>" + i.type + "：</td><td style='padding-left: 0'>" + i.desc + "</td></tr>"
			});
			res.length=roleList.length;
		}else{
			res.fill = "<td>-</td><td></td>";
		}
		return res;
	};
	var matchReason = function (data) {
		var reason = data.reason;
		if (reason || data.remark) {
			var matchReasonStr = '';
			if (data.remark) {
				matchReasonStr += "<li class=\"mg8-0\">● 审核备注 | " + f.format(i.approveTime, "m") + "</li><li class=\"mg8-0\">" + w(i.remark) + "</li>";
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
			} catch (e) {}
			return matchReasonStr;
		}
		return "--";
	};

	var drawList = function methods(data, taxon) {
		if(data){
			if ((data.list || []).length) {
				var tableList = "";
				switch (taxon) {
					case "assetsBidding":
					case "asset": {
						data.list.forEach(function (i) {
							var auctionStatus = "<font class='auctionStatus-" + i.status + "'>" + (s.auction[i.status] || '未知') + "</font>";
							var signPrice = {t: f.floatFormat(i.currentPrice, " 元"), d: "当前价"};
							if (i.status === 1) {
								signPrice.t = "<font class='auctionStatus-error'>" + signPrice.t + "</font>";
								signPrice.d = "起拍价";
							}
							if (i.status === 5) {
								signPrice.t = "<font class='auctionStatus-error'>" + signPrice.t + "</font>";
								signPrice.d = "成交价";
							}
							tableList += "<tr>" +
								"<td class='pr'>" + 	f.infoList([{t: w(i.obligorName), d: "　债务人"}, {t: w(i.obligorNumber), d: "　证件号"},
									{t: w(i.orgName), d: "机构名称"}, {t: f.format(i.createTime,"m"), d: "更新时间"}],65) +
								(i.important ? "<div class='accurate-img'></div>" : "2") + "</td>" +
								"<td>" + matchReason(i) + "</td>" +
								"<td><li class=\"mg8-0\"><div class=\"nAndI\">"+ f.urlDom(i.title, i.url) +"</div></li>" +
								f.infoList([{t: w(i.court), d: "处置机关"}]) +
								"<div class='list-half'>"+ f.infoList([
									{t: f.format(i.start,"m"), d: "开拍时间"},
									{t: f.floatFormat(i.consultPrice," 元"), d: "评估价"},
									{t: auctionStatus, d: "拍卖状态"},signPrice]) +"</div>" +

								"</td></tr>";
						});
						break;
					}
					case "publicity": {
						data.list.forEach(function (i) {
							tableList += "<tr>" +
								"<td>" + f.format(i.startTime) + "</td><td>" + w(i.obligorName) + "</td>" +
								"<td>" + f.urlDom(i.title, i.sourceUrl) + "</td><td>" + f.floatFormat(i.price) + "</td>" +
								"<td>" + f.format(i.endTime) + "</td><td>" + f.format(i.createTime) + "</td></tr>";
						});
						break;
					}
					case "lawsuit.trial":
					case "subrogation.trial":{
						data.list.forEach(function (i) {
							var _caseType = (i.restore ? "99" : "") || i.caseType || 0;
							var pR = parties(i.parties);
							var pRow = pR.length > 1 ? ("rowspan=\"" + pR.length + "\"") : "";
							tableList += "<tr><td " + pRow + ">" + f.format(i.gmtRegister) + "</td>" + pR.fill +
								"<td " + pRow + ">" + w(i.court) + "</td><td " + pRow + ">" + w(i.caseNumber) + "</td>" +
								"<td " + pRow + ">" + s.caseType[_caseType] + "</td><td " + pRow + ">" + f.format(i.gmtCreate) + "</td></tr>";
							tableList += pR.appendDom;
						});
						break;
					}
					case "lawsuit.court":
					case "subrogation.court":{
						data.list.forEach(function (i) {
							var pR = parties(i.parties);
							var pRow = pR.length > 1 ? ("rowspan=\"" + pR.length + "\"") : "";
							tableList += "<tr><td " + pRow + ">" + f.format(i.gmtRegister) + "</td>" + pR.fill +
								"<td " + pRow + ">" + w(i.court) + "</td><td " + pRow + ">" + w(i.caseNumber) + "</td>" +
								"<td " + pRow + ">" + w(i.caseReason) + "</td><td " + pRow + ">" + f.format(i.gmtCreate) + "</td></tr>";
							tableList += pR.appendDom;
						});
						break;
					}
					case "bankrupt": {
						data.list.forEach(function (i) {
							tableList += "<tr><td>" + (f.format(i.publishDate)) + "</td><td>" + w(i.obligorName) + "</td><td>" + w(i.court) + "</td>" +
								"<td>" + f.urlDom(i.title, i.url) + "</td><td>" + (f.format(i.createTime)) + "</td></tr>";
						});
						break;
					}
					case "epb":
					case "bidding": {
						data.list.forEach(function (i) {
							tableList += "<tr><td>" + f.format(i.publishDate) + "</td><td>" + w(i.obName) + "</td>" +
								"<td>" + f.urlDom(i.title, i.url) + "</td><td>" + (f.format(i.createTime)) + "</td></tr>";
						});
						break;
					}
					case "tax": {
						data.list.forEach(function (i) {
							var taxRes = taxParties(i.parties);
							var taxRow = taxRes.length > 1 ? ("rowspan=\"" + taxRes.length + "\"") : "";
							tableList += "<tr><td " + taxRow + ">" + w(i.publishDate) + "</td>" + taxRes.fill +
								"<td " + taxRow + ">" + f.urlDom(i.caseNature, i.url) + "</td><td " + taxRow + ">" + w(i.gmtCreate) + "</td></tr>";
							tableList += taxRes.appendDom;
						});
						break;
					}
					case "dishonest": {
						data.list.forEach(function (i) {
							tableList += "<tr><td>" +
								f.infoList([{t: w(i.courtName), d: "机构名称"}, {t: w(i.caseCode), d: "案号"},
									{t: w(i.areaName), d: "省份"}, {t: w(i.publishDate), d: "发布时间"}])
								+ "</td><td>" +
								f.infoList([
									{t: w(i.performance), d: "被执行人的履行情况"},
									{t: w(i.disruptTypeName), d: "失信被执行人行为具体情形"},
									{t: w(i.businessEntity), d: "法定代表人/负责人姓名"}])
								+ "</td><td>" + w(i.duty) + "</td></tr>";
						});
						break;
					}
					default:
						tableList = "";
				}
				f.replaceHtml([{f: "{" + taxon + ".list}", v: tableList}, {f: "{" + taxon + ".total}", v: data.list.length}])
			} else {
				f.replaceHtml([{f: "{" + taxon + ".display}", v: "display-none"}])
			}
		}
	};
	drawList(d[field + '02'], "asset");
	drawList(d[field + '03'], "assetsBidding");
	drawList(d[field + '04'], "publicity");
	drawList(d[field + '05'], "lawsuit.trial");
	drawList(d[field + '06'], "lawsuit.court");
	drawList(d[field + '07'], "subrogation.trial");
	drawList(d[field + '08'], "subrogation.court");
	drawList(d[field + '09'], "bankrupt");
	drawList(d[field + '10'], "bidding");
	drawList(d[field + '11'], "tax");
	drawList(d[field + '12'], "epb");
	drawList({list: (((d.BA13 || [])[0] || {}).result || [])}, "dishonest");

	return htmlResult;
}

fs.writeFile("./template/result/demo-ob.html", exportTemplate(dataSource, false), (error) => {
	error && console.log('error');
});

module.exports = {exportTemplate, bgImgData, deIconData, disIconData, disEdIconData,htmlResultStr,cssResult};
