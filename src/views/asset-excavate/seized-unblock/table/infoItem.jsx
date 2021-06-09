import React from 'react';
import { Icon } from 'antd';
import './index.scss';

export default class InfoItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: 'none',
			//	none canOpen canClose
		};
	}

	componentDidMount() {
		setTimeout(() => {
			if (this.dom && this.dom.clientHeight > 64) {
				this.setState({ status: 'canOpen' });
			}
		});
	}


	componentDidUpdate(prevProps) {
		const { row: { id } } = this.props;
		const _id = prevProps.row.id;
		if (id !== _id) {
			this.toInitStatus();
		}
	}

	toInitStatus=() => {
		if (this.dom && this.dom.clientHeight > 64) {
			this.setState({ status: 'canOpen' });
		} else {
			this.setState({ status: 'none' });
		}
	};

	render() {
		const { content, row } = this.props;
		const { status } = this.state;
		return (
			<div>
				{
					row.dataType === 1 ? (
						<div className="assets-matching-reason-wrapper">
							<div className={`reason-content-wrapper content-${status}`}>
								<div className="reason-content" ref={e => this.dom = e}>
									<div className="reason-list">
										<span>
											{content || row.address || '-' }
										</span>
									</div>
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
					) : null
				}
				{
					row.dataType === 2 ? (
						<div className="assets-matching-reason-wrapper">
							<div className={`reason-content-wrapper content-${status}`}>
								<div className="reason-content" ref={e => this.dom = e}>
									<div className="reason-list">
										 {
											row.title ? (
												<span>
													判决结果：
													{
														row.title
													}
												</span>
											)
												: (
													<span>
														{row.title || '-'}
													</span>
												)
										 }
									</div>
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
					) : null
				}
			</div>
		);
	}
}
