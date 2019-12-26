import React from 'react';
import { Icon, Tooltip } from 'antd';
import { getByteLength, timeStandard } from '@/utils';
import { Ellipsis } from '@/common';


/**
 * @Description: 当事人组件
 * @author async
 * @date 2019-10-08
 */
export default class PartyInfoDetail extends React.Component {
	constructor(props) {
		super(props);
		this.maxShowLength = props.noStatus ? 99999 : 3;
		this.state = {
			status: props.child.length <= this.maxShowLength ? 'none' : 'toOpen',
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
			_nextState.status = nextProps.child.length <= this.maxShowLength ? 'none' : 'toOpen';
			return true;
		}
		return nextState.status !== status;
	}

	handleToChange=() => {
		const { status } = this.state;
		if (status === 'toOpen') this.setState({ status: 'toClose' });
		if (status === 'toClose') this.setState({ status: 'toOpen' });
	};

	/* 处理当事人名称 */
	toHandleName=(item) => {
		const {
			birthday, certificateNumber, gender, name, identityType,
		} = item;
		const { row: { unifiedSocialCreditCode } } = this.props;
		if (certificateNumber) return `${name}（${certificateNumber}）`;
		const genderType = gender && typeof gender;
		if (birthday || genderType === 'number') {
			const res = [];
			if (gender && gender === 1) res.push('男');
			else if (gender && gender === 2) res.push('女');
			if (birthday)res.push(timeStandard(birthday));
			return `${name} （${res.join('')})`;
		}
		if (identityType) {
			const res = [];
			if (identityType === 1) res.push(`${unifiedSocialCreditCode.length > 0 ? unifiedSocialCreditCode : item.idNumber}`);
			if (identityType === 2 || identityType === 3) res.push(item.idNumber);
			const newRes = res.filter(s => s && s.trim()); // 注：IE9(不包含IE9)以下的版本没有trim()方法
			return `${name} ${newRes.length > 0 ? `（${newRes.join('')}）` : ''}`;
		}
		return name;
	};

	render() {
		const { status } = this.state;
		const { role, child, width } = this.props;
		const { noLink, detailWidth } = this.props;
		const source = status === 'toOpen' ? child.slice(0, this.maxShowLength) : child;

		// icon-arrow-up
		const statusText = status === 'toOpen'
			? [<span>展开</span>, <Icon type="down" style={{ paddingTop: 2 }} />]
			: [<span>收起</span>, <Icon type="up" style={{ paddingTop: 2 }} />];

		// 收起↓↓
		const _site = role.indexOf('（') > -1 ? role.indexOf('（') : '';
		const roleContent = {
			role: _site ? role.slice(0, _site) : role,
			mark: _site ? role.slice(_site) : '',
		};
		const maxWidth = (detailWidth || 300) - 12 - width - 50;
		console.log(maxWidth);
		// const obValue = (i, v) => (i.obligorId && noLink ? linkDetail(i.obligorId, v, '_blank') : v);
		// console.log(noLink);
		let contentWidth = '';
		child.forEach((item) => {
			const content = this.toHandleName(item);
			const l = (getByteLength(content) + 3) * 6;
			contentWidth = contentWidth < l ? l : contentWidth;
		});
		contentWidth = contentWidth > maxWidth ? maxWidth : contentWidth;
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
				<div className="party-info party-info-content" style={{ width: maxWidth + 30 }}>
					{
						source.map((i) => {
							const content = this.toHandleName(i);
							return (
								<Ellipsis
									content={content}
									url={i.obligorId && noLink ? `#/business/debtor/detail?id=${i.obligorId}` : ''}
									tooltip
									width={maxWidth}
									// width={getByteLength(content) * 6 > maxWidth ? maxWidth : (getByteLength(content) + 3) * 6}
								/>
							);

							// if (getByteLength(content) * 6 > maxWidth) {
							// 	return (
							// 		<Tooltip placement="top" title={content}>
							// 			<li className={`text-ellipsis ${i.obligorId && i.obligorId !== 0 && !noLink ? 'click-link' : ''}`} style={{ maxWidth }}>
							// 				{obValue(i, content)}
							// 			</li>
							// 		</Tooltip>
							// 	);
							// }
							// return (
							// 	<li className={`text-ellipsis ${i.obligorId && i.obligorId !== 0 && !noLink ? 'click-link' : ''}`} style={{ maxWidth }}>
							// 		{obValue(i, content)}
							// 	</li>
							// );
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
