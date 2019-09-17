import React from 'react';
import Item from './item';
import { Tabs } from '@/common';
import { changeURLArg, parseQuery } from '@/utils';
import {
	subCount, assCount, lawCount, pubCount,
} from '@/utils/api/monitor-info/attention';
import './style.scss';

/**
 * 获取默认tabs配置,含子模块btn
 * @param rule
 * @returns {*[]}
 */
const toGetDefaultConfig = (rule) => {
	const c = rule.children;
	const base = [
		{
			id: 1,
			name: '资产拍卖',
			status: Boolean(c.jkxxzcpm),
		},
		{
			id: 2,
			name: '代位权',
			status: Boolean(c.jkxxdwq),
			child: [
				{ id: 21, name: '立案信息', status: true },
				{ id: 22, name: '开庭公告', status: true },
			],
		},
		{
			id: 3,
			name: '金融资产',
			status: Boolean(c.jkxxjrzcgsxm || c.jkxxjrzcjjxm),
			child: [
				{ id: 31, name: '竞价项目', status: Boolean(c.jkxxjrzcjjxm) },
				{ id: 32, name: '公示项目', status: Boolean(c.jkxxjrzcgsxm) },
			],
		},
		{
			id: 4,
			name: '涉诉监控',
			status: Boolean(c.jkxxssjk),
			child: [
				{ id: 41, name: '立案信息', status: true },
				{ id: 42, name: '开庭公告', status: true },
			],
		},
		{
			id: 5,
			name: '企业破产重组',
			status: Boolean(c.jkxxpccz),
		},
		{
			id: 6,
			name: '公示公告',
			status: Boolean(c.gsgg_bidding || c.gsgg_epb || c.gsgg_tax),
			child: [
				{ id: 61, name: '招标中标', status: Boolean(c.gsgg_bidding) },
				{ id: 62, name: '重大税收违法', status: Boolean(c.gsgg_tax) },
				{ id: 63, name: '环境行政处罚', status: Boolean(c.gsgg_epb) },
			],
		},
		// {
		// 	id: 7,
		// 	name: '失信记录',
		// 	status: Boolean(c.jkxxpccz),
		// },
	];
	return base.filter(item => item.status);
};

export default class MyAttention extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			config: toGetDefaultConfig(props.rule),
			source: '',
			sourceType: 1,
			childType: 1,
		};
	}

	componentWillMount() {
		const { config } = this.state;
		const sourceType = Tabs.Simple.toGetDefaultActive(config, 'process');
		const source = (config.filter(i => i.id === sourceType))[0];
		const childAry = source.child ? source.child.filter(i => i.status) : '';
		const childType =	parseQuery(window.location.href).type || (childAry ? childAry[0].id : '');
		this.setState({
			sourceType,
			source,
			childType,
		});
		this.toGetTotal(sourceType, source);
	}

	// 获取数据统计
	toGetTotal=(type, source) => {
		const _source = source;
		if (type === 2) {
			subCount().then((res) => {
				const { data, code } = res;
				if (code === 200) {
					const r1 = data.filter(i => i.sourceType === 1)[0] || {};
					const r2 = data.filter(i => i.sourceType === 2)[0] || {};
					_source.child = _source.child.map((item) => {
						const _item = item;
						if (item.id === 21 && r1.count) _item.number = r1.count;
						if (item.id === 22 && r2.count) _item.number = r2.count;
						return _item;
					});
					this.setState({ source: _source });
				}
			});
		}
		if (type === 3) {
			assCount().then((res) => {
				_source.child = _source.child.map((item) => {
					const _item = item;
					_item.number = item.id === 31 ? res.bid.total || 0 : res.pub.total || 0;
					return _item;
				});
				this.setState({
					source: _source,
				});
			});
		}
		if (type === 4) {
			lawCount().then((res) => {
				const { data, code } = res;
				if (code === 200) {
					const r1 = data.filter(i => i.sourceType === 1)[0] || {};
					const r2 = data.filter(i => i.sourceType === 2)[0] || {};
					_source.child = _source.child.map((item) => {
						const _item = item;
						if (item.id === 41 && r1.count) _item.number = r1.count;
						if (item.id === 42 && r2.count) _item.number = r2.count;
						return _item;
					});
					this.setState({ source: _source });
				}
			});
		}
		if (type === 6) {
			pubCount().then((res) => {
				const { data, code } = res;
				if (code === 200) {
					const r1 = data.filter(i => i.sourceType === 1)[0] || {};
					const r2 = data.filter(i => i.sourceType === 2)[0] || {};
					const r3 = data.filter(i => i.sourceType === 3)[0] || {};
					_source.child = _source.child.map((item) => {
						const _item = item;
						if (item.id === 61 && r1.count) _item.number = r1.count;
						if (item.id === 62 && r2.count) _item.number = r2.count;
						if (item.id === 63 && r3.count) _item.number = r3.count;
						return _item;
					});
					this.setState({ source: _source });
				}
			});
		}
	};

	// sourceType变化
	onSourceType=(_sourceType) => {
		const { config, sourceType } = this.state;
		if (_sourceType !== sourceType) {
			const source = config.filter(i => i.id === _sourceType)[0];
			const childAry = source.child ? source.child.filter(i => i.status) : '';
			const childType =	childAry ? childAry[0].id : '';
			this.setState({
				sourceType: _sourceType,
				source,
				childType,
			});
			this.toGetTotal(_sourceType, source);
			const url = changeURLArg(window.location.href, 'process', _sourceType);
			window.location.href = changeURLArg(url, 'type', childType);
			//	问题遗留：直接href导致每个Router重新渲染
		}
	};

	// 如果有子项按钮，点击切换
	onBtnChange=(val) => {
		const { sourceType, source } = this.state;
		this.setState({
			childType: val.id,
		});
		this.toGetTotal(sourceType, source);
		window.location.href = changeURLArg(window.location.href, 'type', val.id);
	};

	render() {
		const {
			config, sourceType, source, childType,
		} = this.state;
		const content = {
			source,
			sourceType,
			childType,
			onBtnChange: this.onBtnChange,
		};
		return (
			<div className="yc-monitor-attention">
				<div className="attention-title">我的关注</div>
				<Tabs.Simple onChange={this.onSourceType} source={config} field="process" />
				<Item {...content} mark="子模块展示内容" />
			</div>
		);
	}
}
