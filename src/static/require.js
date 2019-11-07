require.config({
	paths: {
		'zrender': '../static/echarts/zrender',
		'echarts': '../static/echarts',
	}
});
require([
	'zrender',
	'echarts',
	'echarts/chart/tree',
	'echarts/chart/bar',
	'echarts/chart/pie',
], function (zr, echarts) {
	window.echarts = echarts;
	window.zrDefine = {
		Text: require('zrender/shape/Text'),
		Circle: require('zrender/shape/Circle'),
	};
});
