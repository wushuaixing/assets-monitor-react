const config = {
	assets: {
		name: '资产',
		about:'{assets.content}',
		child: [
			{id: 'A10101', title: '资产拍卖', desc: '精准匹配', status: 'bep'},
			{id: 'A10102', title: '资产拍卖', desc: '模糊匹配', status: 'bep'},
			{id: 'A10401', title: '无形资产', desc: '排污权', status: 'be'},
			{id: 'A10402', title: '无形资产', desc: '矿业权', status: 'be'},
			{id: 'A10403', title: '无形资产', desc: '商标专利', status: 'be'},
			{id: 'A10404', title: '无形资产', desc: '建筑建造资质', status: 'be'},
			{id: 'A10301', title: '土地信息', desc: '出让结果', status: 'be'},
			{id: 'A10302', title: '土地信息', desc: '土地转让', status: 'be'},
			{id: 'A10303', title: '土地信息', desc: '土地抵押', status: 'be'},
			{id: 'A10201', title: '代位权', desc: '立案', status: 'bep'},
			{id: 'A10202', title: '代位权', desc: '开庭', status: 'bep'},
			{id: 'A10203', title: '代位权', desc: '裁判文书', status: 'bep'},
			{id: 'A10501', title: '股权质押', desc: '股权出质', status: 'be'},
			{id: 'A10502', title: '股权质押', desc: '股权质权', status: 'be'},
			{id: 'A10601', title: '动产抵押', desc: '抵押', status: 'be'},
			{id: 'A10602', title: '动产抵押', desc: '抵押权', status: 'be'},
			{id: 'A10701', title: '招投标', status: 'be'},
		]
	},
	risk: {
		name: '风险',
		about:'{risk.content}',
		child: [
			{id: 'R30201', title: '破产重组', status: 'be'},
			{id: 'R20603', title: '涉诉文书', status: 'p'},
			{id: 'R20401', title: '失信记录',desc: '列入', status: 'bep'},
			{id: 'R20402', title: '失信记录',desc: '已移除',status: 'bep'},
			// {id: 'R20502', title: '限高记录', status: 'bep'},
			{id: 'R20601', title: '涉诉信息', desc: '立案', status: 'be'},
			{id: 'R20602', title: '涉诉信息', desc: '开庭', status: 'be'},
			{id: 'R20603', title: '涉诉信息', desc: '裁判文书', status: 'be'},
			{id: 'R30301', title: '经营异常', status: 'be'},
			{id: 'R30401', title: '严重违法', status: 'be'},
			{id: 'R30501', title: '税收违法', status: 'bep'},
			{id: 'R30601', title: '行政处罚', status: 'be'},
			{id: 'R30701', title: '环保处罚', status: 'be'},
		]
	},
};

const parentDom = function (title, child) {
	return "<div><div class=\"t1 b-b\">" + title + "</div><div class=\"wrapper\">" + child + "</div></div>";
};

const childDom = function (option, count, list) {
	var title = option.title + (option.desc ? '_' + option.desc : '') + (count ? ' ' + count : '');
	return "<div><div class=\"title\"><div class=\"t2\">" + title + "</div>" +
		"</div><div class=\"content\"><table class=\"vertical-align-top\">" + list + "</table></div></div>"
};


window.onload = function () {

	Object.keys(config).forEach(function (field) {
		var item  = config[field];
		var child = '';
		item.child.forEach(function (i) {
			child+=childDom(i,0,i.id)
		});
		const wrapper = child?parentDom(item.name,child):'';
		document.body.innerHTML=document.body.innerHTML.replace(item.about,wrapper);
	});

};
