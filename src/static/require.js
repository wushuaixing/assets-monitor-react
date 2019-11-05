require.config({
	paths: {
		"zrender": "../static/echarts/zrender",
	}
});
require(["zrender",],function(){
	window.zrDefine={
		Text:require('zrender/shape/Text')
	};
});
