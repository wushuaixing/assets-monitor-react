import React from 'react';
import { Icon, Tooltip } from 'antd';
import { getByteLength } from '@/utils';

const maxShowLength = 3;

/**
 * @Description: 当事人组件
 * @author async
 * @date 2019-10-08
 */
export default class PartyInfoDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: props.child.length <= maxShowLength ? 'none' : 'toOpen',
		//	none 无  toOpen 点击展开 toClose 点击收起
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		const _nextState = nextState;
		const { id } = this.props;
		const { status } = this.state;
		// console.log(nextProps.id, id, nextProps.child, nextState.status);
		if (nextProps.id !== id) {
			// console.log(nextProps.id, id, nextProps.child);
			_nextState.status = nextProps.child.length <= maxShowLength ? 'none' : 'toOpen';
			return true;
		}
		return nextState.status !== status;
	}

	handleToChange=() => {
		const { status } = this.state;
		if (status === 'toOpen') this.setState({ status: 'toClose' });
		if (status === 'toClose') this.setState({ status: 'toOpen' });
	};

	render() {
		const { status } = this.state;
		const {
			role, child, width,
		} = this.props;
		const source = status === 'toOpen' ? child.slice(0, maxShowLength) : child;

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
		const _site = role.indexOf('（') > -1 ? role.indexOf('（') : '';
		const roleContent = {
			role: _site ? role.slice(0, _site) : role,
			mark: _site ? role.slice(_site) : '',
		};
		const maxWidth = 280 - width - 50;
		const liMaxWidth = width ? { maxWidth } : '';
		return (
			<div className="yc-party-info-list">
				<span className="party-info party-info-title" style={width ? { width } : ''}>
					<li className="li-role">{roleContent.role}</li>
					{
						roleContent.mark ? (
							<Tooltip placement="top" title={roleContent.mark}>
								<li className="text-ellipsis">{roleContent.mark}</li>
							</Tooltip>
						) : null
					}
				</span>
				<span className="party-info party-info-colon">：</span>
				<div className="party-info party-info-content">
					{
						source.map((i) => {
							if (getByteLength(i.name) * 6 >= maxWidth) {
								return (
									<Tooltip placement="top" title={i.name}>
										<li className="text-ellipsis" style={liMaxWidth}>{i.name}</li>
									</Tooltip>
								);
							}
							return (
								<li className="text-ellipsis" style={liMaxWidth}>{i.name}</li>
							);
						})
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
