import React from 'react';
import { navigate } from '@reach/router';
import Router from '@/utils/Router';
import { Button, Tabs } from '@/common';
import { unReadCount } from '@/utils/api/monitor-info';
import { toGetRuleSource } from '@/utils';
// 主要内容模块
import Assets from './assets-auction'; // 资产拍卖
import Subrogation from './subrogation'; // 代位权
import LandData from './land-data'; // 土地数据
import Tender from './tender-bid'; // 招标中标
import Financial from './financial-assets'; // 金融资产
import Mortgage from './chattel-mortgage'; // 动产抵押
// import Public from './public-proclamation'; // 公示公告
// import Attention from '../my-attention'; // 我的关注
import ClearProcess from './assets-auction/clearProcess'; // 资产清收流程
import Star from '@/assets/img/icon/btn_attention_n.png';
import './style.scss';

const noPage = () => <div>暂未开发</div>;

// 获取展示配置
const toGetRuth = (moduleID) => {
	const result = toGetRuleSource(global.ruleSource, moduleID);
	// console.log(result.children);
	return result.children.map((item) => {
	  const _item = item;
	  let components = '';
	  if (item.id === `${moduleID}01`) components = Assets;
	  else if (item.id === `${moduleID}02`) components = Subrogation;
	  else if (item.id === `${moduleID}03`) components = LandData;
	  else if (item.id === `${moduleID}04`) components = Tender;
	  else if (item.id === `${moduleID}05`) components = Financial;
	  else if (item.id === `${moduleID}06`) components = Mortgage;
	  else components = noPage;
	  _item.paramUrl = item.paramUrl || '';
	  _item.components = components;
	  return _item;
	});
};

// 主界面
class MonitorMain extends React.Component {
	constructor(props) {
		super(props);
		const _source = toGetRuth('YC02');
		this.state = {
			source: _source,
		};
		this.sourceType = '';
	}

	componentWillMount() {
		this.onUnReadCount();
		this.setUnReadCount = setInterval(() => {
			this.onUnReadCount();
		}, 30 * 1000);
	}

	componentWillUnmount() {
		if (this.setUnReadCount) window.clearInterval(this.setUnReadCount);
	}

	onUnReadCount=() => {
		const { source } = this.state;
		unReadCount().then((res) => {
			const { data, code } = res;
			if (code === 200) {
				const _source = source.map((item) => {
					const _item = item;
					// console.log(_item.id, 123);

					if (_item.id === 'YC0201')_item.dot = data.auctionCount;
					if (_item.id === 'YC0202')_item.dot = data.subrogationCourtSessionCount + data.subrogationFilingCount;
					if (_item.id === 'YC0203')_item.dot = data.landResultFlag; // 土地数据
					if (_item.id === 'YC0204')_item.dot = data.biddingCount; // 招标中标
					if (_item.id === 'YC0205')_item.dot = data.financeCount + data.stockPledgeFlag; // 金融资产
					if (_item.id === 'YC0206')_item.dot = data.mortgageFlag; // 动产抵押
					return _item;
				});
				this.setState({ source: _source });
			}
		});
	};

	toNavigate=() => {
		navigate(`/my/attention?init=YC02${this.sourceType ? `&process=${this.sourceType}` : ''}`);
	};

	render() {
		const { source } = this.state;
		const { rule } = this.props;
		return (
			<React.Fragment>
				<Tabs
					id="TABS"
					rightRender={() => (
						<Button
							style={{ marginTop: 6, marginRight: 20, width: 95 }}
							onClick={this.toNavigate}
							size="large"
							icon={() => <img src={Star} alt="" className="yc-img-normal" style={{ width: 16, marginTop: -2 }} />}
							title="我的关注"
						/>
					)}
					onActive={(val) => {
					  console.log(val);
					  this.sourceType = val;
					}}
					onChange={res => navigate(res.url + res.paramUrl || '')}
					source={source}
				/>
				<div className="yc-monitor yc-page-content">
					<Router>
						{
							source.map(Item => <Item.components path={`${Item.url}/*`} rule={rule} />)
						}
					</Router>
				</div>
			</React.Fragment>
		);
	}
}

const monitorRouter = (props) => {
	const { rule } = props;
	return (
		<Router>
			<MonitorMain path="/*" rule={rule} />
			{/* <Attention path="/monitor/attention/*" rule={rule} /> */}
			<ClearProcess path="/monitor/clearProcess/*" />
		</Router>
	);
};
export default monitorRouter;
