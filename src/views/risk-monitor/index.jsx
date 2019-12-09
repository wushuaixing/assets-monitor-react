import React from 'react';
import { navigate } from '@reach/router';
import Router from '@/utils/Router';
import { Tabs, Button } from '@/common';
import { unReadCount } from '@/utils/api/monitor-info';
/* 主要内容模块 */
import Lawsuits from './lawsuits-monitor';
import Bankruptcy from './bankruptcy';
import Operation from './operation-risk';
import Star from '@/assets/img/icon/btn_attention16_n.png';
import ruleMethods from '@/utils/rule';
import './style.scss';

/* 获取展示配置 */
const toGetRuth = (moduleID) => {
	const result = ruleMethods.toGetRuleSource(global.ruleSource, moduleID);
	const noPage = () => <div>暂未开发</div>;
	return result.children.map((item) => {
		let components = '';
		if (item.id === `${moduleID}01`) components = Lawsuits;
		else if (item.id === `${moduleID}02`) components = Bankruptcy;
		else if (item.id === `${moduleID}03`) components = Operation;
		else components = noPage;
		return Object.assign({}, item, {
			components,
			paramUrl: item.paramUrl || '',
		});
	});
};
// 主界面
class RiskMonitor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			source: toGetRuth('YC03'),
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

	// 一级tab未读消息统计
	onUnReadCount=() => {
		const { source } = this.state;
		unReadCount().then((res) => {
			const { data, code } = res;
			if (code === 200) {
				const _source = source.map((item) => {
					const _item = item;
					if (_item.id === 'YC0301')_item.dot = data.trialCourtSessionCount || data.trialFilingCount || data.trialJudgmentCount;
					if (_item.id === 'YC0302')_item.dot = data.bankruptcyCount;
					if (_item.id === 'YC0303')_item.dot = data.companyAbnormalCount || data.companyIllegalCount || data.changeFlag || data.punishmentFlag || data.taxCount || data.epbCount;
					return _item;
				});
				// console.log(_source);
				this.setState({ source: _source });
			}
		});
	};

	toNavigate=() => {
		navigate(`/my/attention?init=YC03${this.sourceType ? `&process=${this.sourceType}` : ''}`);
	};

	render() {
		const { source } = this.state;
		const { rule } = this.props;
		const _source = source.filter(item => item.status);

		return (
			<React.Fragment>
				<Tabs
					id="TABS"
					rightRender={() => (
						<Button
							style={{
								marginTop: 8, marginRight: 20, width: 95, padding: '2px 9px',
							}}
							onClick={this.toNavigate}
							size="large"
							icon={() => <img src={Star} alt="" className="yc-img-normal" style={{ width: 14, marginTop: -2 }} />}
							title="我的关注"
						/>
					)}
					onActive={val => this.sourceType = val}
					onChange={res => navigate(res.url + res.paramUrl || '')}
					source={source}
				/>
				<div className="yc-monitor yc-page-content">
					<Router>
						{
							_source.map(Item => <Item.components path={`${Item.url}/*`} rule={rule} />)
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
			<RiskMonitor path="/*" rule={rule} />
		</Router>
	);
};
export default monitorRouter;
