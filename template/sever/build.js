var fs =require('fs');
var cleanCSS = require('clean-css');
var minify = require('html-minifier').minify;
var UglifyJS = require("uglify-js");
var methods = require("./dev");

// 转换为 data:image/jpeg;base64,***** 格式的字符串

const backgroundImg = fs.readFileSync('./template/img/watermark.png',);
const backgroundImgData = 'data:image/png;base64,' + new Buffer.alloc(65 * 1024, backgroundImg).toString('base64');

var iconImg  = fs.readFileSync('./template/img/icon_shixin.png',);
var iconImgData = 'data:image/png;base64,' +  new Buffer.alloc(4*1024,iconImg).toString('base64');

const cssResult  = fs.readFileSync('./template/src/index.css','utf8');
const minifyCss = new cleanCSS().minify(cssResult);

const htmlEnterprise  = fs.readFileSync('./template/src/enterprise.html','utf8');
const htmlPersonal  = fs.readFileSync('./template/src/personal.html','utf8');

const htmlEnterpriseTxt = htmlEnterprise.replace(/<link rel="stylesheet" type="text\/css" href="index.css">/g,'').replace("___style___",minifyCss.styles);
const htmlPersonalTxt = htmlPersonal.replace(/<link rel="stylesheet" type="text\/css" href="index.css">/g,'').replace("___style___",minifyCss.styles);

var html_E =minify(htmlEnterpriseTxt, {
	processScripts: ['text/html'],
	collapseWhitespace: true,
	minifyJS: {
		compress: {
			warnings: false,
			drop_debugger: true,
			drop_console: true
		}
	},
	minifyCSS: true,
	removeComments: true, //删除注释
	removeCommentsFromCDATA: true,
});

var html_P =minify(htmlPersonalTxt, {
	processScripts: ['text/html'],
	collapseWhitespace: true,
	minifyJS: {
		compress: {
			warnings: false,
			drop_debugger: true,
			drop_console: true
		}
	},
	minifyCSS: true,
	removeComments: true, //删除注释
	removeCommentsFromCDATA: true,
});
const resultCode = `"use strict";

var htmlEnterprise = ${JSON.stringify(html_E)};
var htmlPersonal = ${JSON.stringify(html_P)};
var backgroundImgData = "${backgroundImgData}";
var iconImgData = "${iconImgData}";

${methods.exportTemplate};`;

fs.writeFileSync("./template/result/outputHtml.js",resultCode);
fs.writeFileSync("./template/result/outputHtml.min.js",UglifyJS.minify(resultCode).code);
