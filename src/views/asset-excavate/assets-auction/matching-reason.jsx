import React from 'react';
import { Icon } from 'antd';
import './style.scss';

export default class MatchingReason extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: 'none',
		//	none canOpen canClose
		};
	}

	componentDidMount() {
		if (this.dom.clientHeight > 64) {
			this.setState({ status: 'canOpen' });
		}
	}

	componentDidUpdate(prevProps) {
		const { content: { id } } = this.props;
		const _id = prevProps.content.id;
		if (id !== _id) this.toInitStatus();
	}


	toInitStatus=() => {
		if (this.dom.clientHeight > 64) {
			this.setState({ status: 'canOpen' });
		} else {
			this.setState({ status: 'none' });
		}
	};

	// 资产拍卖
	toGetReasonList=(reason, pushType, approveTime) => {
		if (reason) {
			const _reason = JSON.parse(reason);
			return _reason.map((item) => {
				if (item.used_name) {
					return (
						<div className="reason-list">
							<div>{`● 根据曾用名"${item.used_name}"匹配 | ${new Date(approveTime * 1000).format('yyyy-MM-dd hh:mm')}`}</div>
							{ item.hl.map(i => <p dangerouslySetInnerHTML={{ __html: i }} className="yc-text-content" />) }
						</div>
					);
				} if (item.birth) {
					return (
						<div className="reason-list">
							<div>{`● 根据"${item.birth}"匹配 | ${new Date(approveTime * 1000).format('yyyy-MM-dd hh:mm')}`}</div>
							<p dangerouslySetInnerHTML={{ __html: item.desc }} className="yc-text-content" />
						</div>
					);
				}
				if (pushType === 1 && /<em/.test(JSON.stringify(item.hl))) return null;
				return (
					<div className="reason-list">
						<div>{`● 根据"${item.name || item.number}"匹配 | ${new Date(approveTime * 1000).format('yyyy-MM-dd hh:mm')}`}</div>
						{ item.hl.map(i => <p dangerouslySetInnerHTML={{ __html: i }} className="yc-text-content" />) }
					</div>
				);
			});
		}
		return '-';
	};

	// 生效法律文书确定的义务
	toGetReason = (reason, approveTime) => {
		if (reason) {
			// const _reason = JSON.parse(reason);
			return (
				<div className="reason-list">
					<div>{`${new Date(approveTime * 1000).format('yyyy-MM-dd hh:mm')}`}</div>
					<p dangerouslySetInnerHTML={{ __html: reason }} className="yc-text-content" />
				</div>
			);
		}
		return '-';
	};

	render() {
		const {
			content: {
				reason, remark, duty, approveTime, pushType,
			}, dishonest,
		} = this.props;
		// console.log(pushType, 3333);
		// console.log(pushType);		// 类型 1 结构化 0 全文
		const remarkOrder = pushType ? 'last' : 'first';
		const { status } = this.state;
		return (
			<div className="assets-matching-reason-wrapper">
				<div className={`reason-content-wrapper content-${status}`}>
					<div className="reason-content" ref={e => this.dom = e}>
						{
							remark && remarkOrder === 'first' ? (
								<div className="reason-list">
									<div>● 审核备注</div>
									<p dangerouslySetInnerHTML={{ __html: remark }} className="yc-text-content" />
								</div>
							) : null
						}
						{ dishonest ? this.toGetReason(duty, approveTime) : this.toGetReasonList(reason, pushType, approveTime) }
						{
							remark && remarkOrder === 'last' ? (
								<div className="reason-list">
									<div>{'● 审核备注 '}</div>
									<p dangerouslySetInnerHTML={{ __html: remark }} className="yc-text-content" />
								</div>
							) : null
						}
					</div>
				</div>
				<div className={`reason-action reason-action-${status}`}>
					{
						status === 'canOpen' ? (
							<React.Fragment>
								<li className="action-ellipsis yc-text-normal">
									<Icon type="ellipsis" />
								</li>
								<li className="action-btn yc-text-normal under-line" onClick={() => this.setState({ status: 'canClose' })}>
									<span>展开</span>
									<Icon type="down" />
								</li>
							</React.Fragment>
						) : (
							<li className="action-btn yc-text-normal under-line" onClick={() => this.setState({ status: 'canOpen' })}>
								<span>收起</span>
								<Icon type="up" />
							</li>
						)
					}
				</div>
			</div>
		);
	}
}
