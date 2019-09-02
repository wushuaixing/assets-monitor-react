import React from 'react';
import './style.scss';
import Badge from '../badge';
import { parseQuery } from '@/utils';

const toGetDefaultActive = (source, field, defaultCurrent) => {
	const { hash } = window.location;
	if (field) {
		const res = parseQuery(hash)[field];
		const r = res ? Number(res) : -100;
		return ((source.filter(item => item.id === r)[0]) || {}).id || source[0].id;
	}
	return defaultCurrent || source[0].id;
};
const numUnit = val => (val > 10000 ? `${(val / 10000).toFixed(1)}万` : val);

class SimpleTab extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: toGetDefaultActive(props.source, props.field, props.defaultCurrent) || props.defaultCurrent,
		};
	}

	componentWillMount() {
		this.onHashChange();
	}

	componentDidMount() {
		window._addEventListener(window, 'hashchange', this.onHashChange);
	}

	componentWillUnmount() {
		window._removeEventListener(window, 'hashchange', this.onHashChange);
	}

	onHashChange=() => {
		const { active } = this.state;
		const { source, field, onChange } = this.props;
		const res = toGetDefaultActive(source, field);
		if (res !== active) {
			this.setState({
				active: res,
			});
			if (onChange)onChange(res);
		}
	};

	onClick=(item) => {
		const { onChange } = this.props;
		this.setState({ active: item.id });
		if (onChange)onChange(item.id);
	};

	render() {
		const { rightRender, source } = this.props;
		const { active } = this.state;
		return (
			<div className="yc-tabs-wrapper yc-tabs-simple">
				<ul>
					{source.map(item => (
						<li
							className={`${active === item.id ? 'yc-tabs-active' : 'yc-tabs-un-active'} yc-tabs-li`}
							onClick={() => this.onClick(item)}
						>
							<div className="yc-tabs-active-line" />
							<Badge dot={item.dot}>
								{ item.showNumber ? `${item.name}「${numUnit(item.number)}」` : item.name}
							</Badge>
						</li>
					))}
				</ul>
				<div className="yc-tabs-right">
					{ rightRender ? rightRender() : '' }
				</div>
			</div>
		);
	}
}

SimpleTab.toGetDefaultActive = toGetDefaultActive;
export default SimpleTab;
