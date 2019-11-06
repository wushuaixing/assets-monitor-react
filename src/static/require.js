require.config({
	paths: {
		zrender: '../static/echarts/zrender',
	},
});
require(['zrender'], () => {
	window.zrDefine = {
		Text: require('zrender/shape/Text'),
	};
});
