module.exports = {
	assets: {
		name: '资产',
		child: [
			{id: 10101, title: '资产拍卖', desc: '精准匹配', status: 'bep'},
			{id: 10102, title: '资产拍卖', desc: '模糊匹配', status: 'bep'},
			{id: 10401, title: '无形资产', desc: '排污权', status: 'be'},
			{id: 10402, title: '无形资产', desc: '矿业权', status: 'be'},
			{id: 10403, title: '无形资产', desc: '商标专利', status: 'be'},
			{id: 10404, title: '无形资产', desc: '建筑建造资质', status: 'be'},
			{id: 10301, title: '土地信息', desc: '出让结果', status: 'be'},
			{id: 10302, title: '土地信息', desc: '土地转让', status: 'be'},
			{id: 10303, title: '土地信息', desc: '土地抵押', status: 'be'},
			{id: 10201, title: '代位权', desc: '立案', status: 'bep'},
			{id: 10202, title: '代位权', desc: '开庭', status: 'bep'},
			{id: 10203, title: '代位权', desc: '裁判文书', status: 'bep'},
			{id: 10501, title: '股权质押', desc: '股权出质', status: 'be'},
			{id: 10502, title: '股权质押', desc: '股权质权', status: 'be'},
			{id: 10601, title: '动产抵押', desc: '抵押', status: 'be'},
			{id: 10602, title: '动产抵押', desc: '抵押权', status: 'be'},
			{id: 10701, title: '招投标', status: 'be'},
		]

	},
	risk: {
		name: '风险',
		child: [
			{id: 30201, title: '破产重组', status: 'be'},
			{id: 20603, title: '涉诉文书', status: 'ep'},
			{id: 20401, title: '失信记录', status: 'bep'},
			{id: 20502, title: '限高记录', status: 'bep'},
			{id: 20601, title: '涉诉信息', desc: '立案', status: 'be'},
			{id: 20602, title: '涉诉信息', desc: '开庭', status: 'be'},
			{id: 20603, title: '涉诉信息', desc: '裁判文书', status: 'be'},
			{id: 30301, title: '经营异常', status: 'be'},
			{id: 30401, title: '严重违法', status: 'be'},
			{id: 30501, title: '税收违法', status: 'bep'},
			{id: 30601, title: '行政处罚', status: 'be'},
			{id: 30701, title: '环保处罚', status: 'be'},
		]
	},
};
