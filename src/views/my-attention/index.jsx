import React from 'react';
import Item from './item';
import { Tabs } from '@/common';
import { changeURLArg, parseQuery, toGetRuleSource } from '@/utils';
import {
	subrogationCount, assCount, lawCount,
} from '@/utils/api/monitor-info/attention';
import './style.scss';

export default class MyAttention extends React.Component {
	constructor(props) {
		super(props);
		document.title = '我的关注-监控信息';
		this.state = {
			initConfig: toGetRuleSource(global.ruleSource, ['YC02', 'YC03']),
			initType: 1,
			config: [],
			sourceType: 1,
			childType: 1,
			source: '',
		};
	}

	componentWillMount() {
		const { initConfig } = this.state;
		const initType = Tabs.Simple.toGetDefaultActive(initConfig, 'init');
		const config = (toGetRuleSource(global.ruleSource, initType) || {}).children;
		const sourceType = Tabs.Simple.toGetDefaultActive(config, 'process');
		const source = (config.filter(i => i.id === sourceType))[0];
		const childAry = source.child ? source.child.filter(i => i.status) : '';
		const childType =	parseQuery(window.location.href).type || (childAry ? childAry[0].id : '');
		this.setState({
			config,
			initType,
			sourceType,
			source,
			childType,
		});
		this.toGetTotal(sourceType, source);
	}

	// 获取数据统计
	toGetTotal=(type, source) => {
		const _source = source;
		console.log(type);

		if (type === 'YC0202') {
			subrogationCount().then((res) => {
				_source.child = _source.child.map((item) => {
					const _item = item;
					if (item.id === 'YC020201') _item.number = res.Trial;
					else if (item.id === 'YC020202') _item.number = res.Court;
					else if (item.id === 'YC020203') _item.number = res.Judgment;
					return _item;
				});
				this.setState({ source: _source });
			});
		} else if (type === 3) {
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
		} else if (type === 4) {
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
	};

	// Type变化
	onType=(nextType) => {
		const { initType } = this.state;
		if (nextType !== initType) {
			const config = (toGetRuleSource(global.ruleSource, nextType) || {}).children;
			this.setState({ initType: nextType, config });
			// console.log('_type:change', _type);
			window.location.href = changeURLArg(window.location.href, 'init', nextType);
			//	问题遗留：直接href导致每个Router重新渲染
		}
	};

	/* sourceType变化  */
	onSourceType=(nextSourceType) => {
		const { config, sourceType } = this.state;
		if (nextSourceType !== sourceType) {
			const source = config.filter(i => i.id === nextSourceType)[0];
			const childType = ((source.child || []).filter(i => i.status)[0] || {}).id || '';
			this.setState({
				sourceType: nextSourceType,
				source,
				childType,
			});
			this.toGetTotal(nextSourceType, source);
			const url = changeURLArg(window.location.href, 'process', nextSourceType);
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
			config, sourceType, source, childType, initConfig,
		} = this.state;
		const content = {
			source,
			sourceType,
			childType,
			onBtnChange: this.onBtnChange,
		};
		return (
			<div className="yc-monitor-attention">
				<Tabs.Simple
					onChange={this.onType}
					source={initConfig}
					field="init"
					type="primary"
					prefix={<div className="yc-tabs-simple-prefix">我的关注</div>}
				/>
				<div className="yc-monitor-attention-content">
					<Tabs.Simple onChange={this.onSourceType} source={config} field="process" />
					<Item {...content} mark="子模块展示内容" />
				</div>

			</div>
		);
	}
}
