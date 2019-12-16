"use strict";

var fs =require('fs');

var dataSource = JSON.stringify(require('./data-ob'));

const toBase64= (file,size)=>'data:image/png;base64,' +  new Buffer.alloc(size,file).toString('base64');

const bgImgData = toBase64(fs.readFileSync('./template/img/watermark.png'),60*1024);
const deIconData = toBase64(fs.readFileSync('./template/img/debtor.png'),2*1024);
const disIconData = toBase64(fs.readFileSync('./template/img/icon_shixin.png'),4*1024);
const disEdIconData = toBase64(fs.readFileSync('./template/img/icon_dishonest_ed.png'),4*1024);

let htmlResultStr  = fs.readFileSync('./template/src/content/debtor.html','utf8');
const cssResult  = fs.readFileSync('./template/src/content/index.css','utf8');
let htmlResult = htmlResultStr.replace(/<link rel="stylesheet" type="text\/css" href="index.css">/g,`<style>${cssResult}</style>`);
htmlResult = htmlResult.replace("<body>", `<body style="max-width: 904px">`);

function exportTemplate(source,exportType) {

	var d = JSON.parse(source);
	var type = exportType || false; // default business(false); debtor(true)
	var field = type ? "BA" : "BB";
	var s = { // public enumeration object
		identity:{
			0:"未知",
			1:"纳税人",
			2:"法定代表人",
			3:"财务",
			9:"其他"
		},
	};
	var f= {	// public function object
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
			const dW = defaultWord || "-";
			return (url ? "<a href=\"" + url + "\" target=\"_blank\" class=\"base-b fw-bold\">" + (title || dW) + "</a>" : (title || dW));
		}
	};
	var w = function(value,defaultWord){
		return value ? value : (defaultWord || '-');
	};
	f.replaceHtml([
		{f: "../../img/watermark.png", v: bgImgData },
		{f: "../../img/debtor.png", v: deIconData},
		{f: "../../img/icon_dishonest_ed.png", v: disIconData},
		{f: "../../img/icon_shixin.png", v: disEdIconData},
		{f: "{base.queryTime}", v: f.format()}]);

	var baseInfo = function method(data,status) {
		var list = (data.businessList)||[];
		var obj = (data.detail)||{};
		if(status){
			var usedLengthFlag = Boolean((obj.usedName||[]).length);
			var dishonestStatus = '';
			if(obj.dishonestStatus===1) dishonestStatus="<span class=\"img-icon-dishonest\"></span>";
			if(obj.dishonestStatus===2) dishonestStatus="<span class=\"img-icon-dishonest-ed\"></span>";
			f.replaceHtml([
				{f: "{business.display}", v: "display-none"},
				{f: "{base.title}", v: "债务人详情"},
				{f: "{about.title}", v: "相关业务列表"},
				{f: "{base.name}", v: obj.obligorName},
				{f: "{debtor.obligorName}", v: obj.obligorName},
				{f: "{debtor.obligorNumber}", v: obj.obligorNumber},
				{f: "{debtor.dishonest}", v: dishonestStatus},
				{f: "{debtor.formerNames}", v: (usedLengthFlag ? obj.usedName.join('、') : '-')}]);
		}else{
			f.replaceHtml([
				{f: "{debtor.display}", v: "display-none"},
				{f: "{base.title}", v: "业务详情"},
				{f: "{about.title}", v: "业务相关人列表"},
				{f: "{base.name}", v: obj.obligorName}]);
			f.replaceHtml(["caseNumber", "obligorName", "obligorNumber", "orgName", "guaranteeString"],{field:"business",source:obj});
		}
		if(list.length){
			var listDom =status? "<tr><th>业务编号</th><th>角色</th><th>机构名称</th></tr>":"<tr><th>相关人名称</th><th>身份证号/统一社会信用代码</th><th>角色</th></tr>";
			list.forEach(function (item) {
				listDom+=(status? ("<tr><td>"+item.caseNumber+"</td><td>"+item.roleText+"</td><td>"+item.orgName+"</td></tr>")
					:("<tr><td>"+item.obligorName+"</td><td>"+(item.obligorNumber||'-')+"</td><td>"+item.roleText+"</td></tr>"));
			});
			f.replaceHtml([{f: "{about.list}", v: listDom}, {f: "{about.total}", v: list.length}]);
		}else {
			f.replaceHtml([{f: "{about.list}", v: "<tr><td colspan='3' style='text-align: center;'>暂无数据</td></tr>"}, {f: "{about.total}", v: ""}]);
		}
	};
	baseInfo((type ? d.BA01 : d.BB01), type);

	var taxParties = function (data) {
		var res ={
			length:(data||[]).length,
			fill:"",
			appendDom:"",
		};
		if(res.length){
			data.forEach(function (i,index) {
				if(index===0)res.fill="<td>"+w(i.name)+"</td><td>"+w(i.idNumber)+"</td>";
				else res.appendDom+="<tr><td>"+w(i.name)+"</td><td>"+w(i.idNumber)+"</td></tr>"
			});
		}else{
			res.fill="<td>-</td><td>-</td>";
		}
		return res;
	};

	var drawList = function methods(data,taxon) {
		if ((data.list || []).length) {
			var tableList = "";
			switch (taxon) {
				case "bankrupt": {
					data.list.forEach(function (i) {
						tableList += "<tr><td>" + (f.format(i.publishDate)) + "</td><td>" + w(i.obligorName) + "</td><td>" + w(i.court) + "</td>" +
							"<td>" + f.urlDom(i.title, i.url) + "</td><td>" + (f.format(i.createTime)) + "</td></tr>";
					});
					break;
				}
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
				default:
					tableList = "";
			}
			f.replaceHtml([{f: "{" + taxon + ".list}", v: tableList},{f: "{" + taxon + ".total}", v: data.list.length}])
		} else {
			f.replaceHtml([{f: "{" + taxon + ".display}", v: "display-none"}])
		}
	};
	drawList(d[field+'09'],"bankrupt");
	drawList(d[field+'10'],"bidding");
	drawList(d[field+'11'],"tax");
	return htmlResult;
}

fs.writeFile("./template/result/demo-ob.html", exportTemplate(dataSource, true), (error) => {
	error && console.log('error');
});

module.exports = {exportTemplate};
