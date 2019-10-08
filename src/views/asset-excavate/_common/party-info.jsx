/**
 * @Description: 当事人组件
 * @author async
 * @date 2019-10-08
 */
import React from 'react';
import { Icon } from 'antd';

export default class PartyInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: props.child.length <= 0 ? 'none' : 'toOpen',
		//	none 无  toOpen 点击展开 toClose 点击收起
		};
	}

	handleToChange=() => {
		const { status } = this.state;
		if (status === 'toOpen') this.setState({ status: 'toClose' });
		if (status === 'toClose') this.setState({ status: 'toOpen' });
	};

	render() {
		const { status } = this.state;
		const { role, child, type } = this.props;
		const source = status === 'toOpen' ? child.slice(0, 2) : child;
		const statusText = status === 'toOpen'
			? (
				<span>
					{'展开'}
					<Icon type="caret-down" />
				</span>
			) : (
				<span>
					{'收起'}
					<Icon type="caret-up" />
				</span>
			);
		// 收起↓↓
		return (
			<div className="yc-party-info-list">
				<span className={`party-info party-info-title party-info-type-${type || 0}`}>{role}</span>
				<span className="party-info party-info-colon">：</span>
				<div className="party-info party-info-content">
					{
						source.map(i => <li className="text-ellipsis">{i.name}</li>)
					}
					{
						status !== 'none'
							? <div className="party-info-status" onClick={this.handleToChange}>{statusText}</div>
							: null
					}
				</div>
			</div>
		);
	}
}
