import Components from './search-data';
import Write from './search-detail/writ';
import Auction from './search-detail/auction';
import Finance from './search-detail/finance';
import Lawsuits from './search-detail/lawsuits';
import Bankruptcy from './search-detail/bankruptcy';
import Land from './search-detail/land';
import EquityPledge from './search-detail/equityPledge';


export default {
	getSource(rule) {
		return [
			{
				id: 1,
				name: '拍卖信息',
				router: 'auction',
				url: '/search/detail',
				status: !!(rule && rule.xxsspmxx),
				search: Components.AUCTION,
				components: Auction,
			},
			{
				id: 2,
				name: '涉诉信息',
				router: 'lawsuits',
				url: '/search/detail/lawsuits',
				status: !!(rule && rule.xxssssxx),
				search: Components.LAWSUITS,
				components: Lawsuits,
			},
			{
				id: 3,
				name: '文书信息',
				router: 'writ',
				url: '/search/detail/writ',
				status: !!(rule && rule.xxsswsxx),
				search: Components.WRIT,
				components: Write,
			},
			{
				id: 4,
				name: '土地数据',
				router: 'land',
				url: '/search/detail/land',
				status: !!(rule && rule.xxsspccz),
				search: Components.LAND,
				components: Land,
			},
			{
				id: 5,
				name: '股权质押',
				router: 'equityPledge',
				url: '/search/detail/equityPledge',
				status: !!(rule && rule.xxssgqzy),
				search: Components.EQUITYPLEDGE,
				components: EquityPledge,
			},
			{
				id: 7,
				type: 'content',
				name: '金融资产',
				router: 'finance',
				url: '/search/detail/finance',
				status: !!(rule && rule.xxssjrzc),
				search: Components.FINANCE,
				components: Finance,
			},
			{
				id: 8,
				name: '破产重组',
				router: 'bankruptcy',
				url: '/search/detail/bankruptcy',
				status: !!(rule && rule.xxsspccz),
				search: Components.BANKRUPTCY,
				components: Bankruptcy,
			},

		];
	},
	getIdSource(id) {
		return this.getSource({}).filter(i => i.id === id)[0];
	},
};
