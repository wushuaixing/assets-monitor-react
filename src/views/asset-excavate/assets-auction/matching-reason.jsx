import React from 'react';
import { Icon } from 'antd';
import './style.scss';
import { Ellipsis } from '@/common';

export default class MatchingReason extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: 'none',
		//	none canOpen canClose
		};
	}

	componentDidMount() {
		const { content: { auctionStatusTag, roundTag } } = this.props;
		const status = auctionStatusTag || roundTag;
		setTimeout(() => {
			if (this.dom.clientHeight > (status ? 96 : 80)) {
				this.setState({ status: 'canOpen' });
			}
		}, 1);
	}

	componentDidUpdate(prevProps) {
		const { content: { id } } = this.props;
		const _id = prevProps.content.id;
		if (id !== _id) this.toInitStatus();
	}


	toInitStatus=() => {
		if (this.dom.clientHeight > 80) {
			this.setState({ status: 'canOpen' });
		} else {
			this.setState({ status: 'none' });
		}
	};

	// 资产拍卖
	toGetReasonList=(reason, pushType) => {
		if (reason) {
			const _reason = JSON.parse(reason);
			return _reason.map((item) => {
				if (item.used_name) {
					return (
						<div className="reason-list">
							<span className="reason-list-dots">● </span>
							{ item.hl.map(i => <span dangerouslySetInnerHTML={{ __html: i }} className="yc-text-content" />) }
						</div>
					);
				} if (item.birth) {
					return (
						<div className="reason-list">
							<span className="reason-list-dots">● </span>
							<span dangerouslySetInnerHTML={{ __html: item.desc }} className="yc-text-content" />
						</div>
					);
				}
				if (pushType === 1 && /<em/.test(JSON.stringify(item.hl))) return null;
				return (
					<div className="reason-list">
						<span className="reason-list-dots">● </span>
						{ item.hl.map(i => <span dangerouslySetInnerHTML={{ __html: i }} className="yc-text-content" />) }
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
					<div>{`${new Date(approveTime * 1000).format('yyyy-MM-dd')}`}</div>
					<p dangerouslySetInnerHTML={{ __html: reason }} className="yc-text-content" />
				</div>
			);
		}
		return '-';
	};

	// 字符串转dom
	parseDom=(arg) => {
		const objE = document.createElement('span');
		objE.innerHTML = arg;
		return objE.childNodes;
	};

	// 审核备注文案
	toGetRemarkBefore = (remark) => {
		if (remark.substr(0, remark.indexOf('<a')) !== '') {
			const remarkBefore = remark.substr(0, remark.indexOf('<a'));
			return remarkBefore;
		}
		return remark;
	}

	attributes = (val) => {
		const { attributes } = val[0];
		let pid = '';
		Array.from(attributes).forEach((v) => {
			if (v.nodeName === 'pid') pid = v.nodeValue;
		});
		return pid;
	}

	// 审核备注链接
	toGetRemarkBehind = (remark) => {
		if (remark.substr(0, remark.indexOf('<a')) !== '') {
			if (remark.substr(remark.indexOf('<a')) !== '') {
				const remarkBehind = remark.substr(remark.indexOf('<a'));
				const remarkBehindArr = remarkBehind.split('、');
				const remarkDom = remarkBehindArr.map((i, index) => {
					const curDom = this.parseDom(i);
					const pid = this.attributes(curDom);
					return	(
						<span style={{ marginRight: '10px' }}>
							{
								pid ? (
									<Ellipsis content={curDom[0].innerText} url={`#/judgement?sourceId=10379&pid=${pid}`} assetsMatching />
								) : (
									<Ellipsis url={curDom[0].href} content={curDom[0].innerText} isSourceLink assetsMatching />
								)
							}
							{
								index === remarkBehindArr.length - 1 ? null : <span style={{ marginLeft: -15 }}>、</span>
							}
						</span>
					);
				});
				return remarkDom;
			}
		}
		return null;
	}

	render() {
		const {
			content: {
				reason, remark, duty, approveTime, pushType, auctionStatusTag, roundTag,
			}, dishonest,
		} = this.props;
		const wrapper = auctionStatusTag || roundTag;
		// console.log(pushType);		// 类型 1 结构化 0 全文
		const remarkOrder = pushType ? 'last' : 'first';
		const { status } = this.state;
		// const testRemark = '经裁判文书分析，债务人被他方起诉，涉诉债权额xx万元本金及相应利息，详情见<a target=\'_blank\' href=\'http://www.baidu.com/\'>文书链接1</a>、<a target=\'_blank\' href=\'http://www.baidu.com/\'>文书链接2</a>';
		return (
			<div className="assets-matching-reason-wrapper">
				<div className={`reason-content-${wrapper ? 'wrapperSpecial' : 'wrapper'} content-${status}`}>
					<div className="reason-content" ref={e => this.dom = e}>
						{/* 全文匹配放在上面 */}
						{
							remark && remarkOrder === 'first' ? (
								<div className="reason-list">
									<span className="reason-list-dots">●</span>
									<span>
										{` 审核备注 | ${new Date(approveTime * 1000).format('yyyy-MM-dd')}`}
										{' '}
									</span>
									<br />
									<span dangerouslySetInnerHTML={{ __html: this.toGetRemarkBefore(remark) }} className="yc-text-content" />
									{this.toGetRemarkBehind(remark)}
								</div>
							) : null
						}
						{ dishonest ? this.toGetReason(duty, approveTime) : this.toGetReasonList(reason, pushType, approveTime) }
						{/* 精准匹配放在下面 */}
						{
							remark && remarkOrder === 'last' ? (
								<div className="reason-list">
									<span className="reason-list-dots">●</span>
									<span>
										{` 审核备注 | ${new Date(approveTime * 1000).format('yyyy-MM-dd')}`}
										{' '}
									</span>
									<br />
									<span dangerouslySetInnerHTML={{ __html: this.toGetRemarkBefore(remark) }} className="yc-text-content" />
									{this.toGetRemarkBehind(remark)}
								</div>
							) : null
						}
						{
							remark ? null : (
								<div className="reason-list">
									<span className="reason-list-dots">●</span>
									<span>{` 匹配时间 ：${new Date(approveTime * 1000).format('yyyy-MM-dd')}`}</span>
								</div>
							)
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
