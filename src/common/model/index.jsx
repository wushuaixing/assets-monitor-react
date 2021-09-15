import React from 'react';
import { Modal, Timeline } from 'antd';
import { Ellipsis, Spin } from '@/common';
import { getDebtorNotices, getPortrayalNotices, getMessageNotices } from '@/utils/api/monitor-info/subrogation';
import './index.scss';

const apiAll = new Map([
	['debtor', getDebtorNotices],
	['portrayal', getPortrayalNotices],
	['message', getMessageNotices],
]);

export default class ClueModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataList: [],
			loading: true,
		};
	}

	componentWillMount() {
		const { apiType, data: { id } } = this.props;
		apiAll.get(apiType)({ id }).then((res) => {
			const { code, data } = res.data;
			if (code === 200) {
				this.setState({
					dataList: data,
					loading: false,
				});
			}
		});
	}

	handleCancel=() => {
		const { onCancel } = this.props;
		onCancel();
	};

	render() {
		const { dataList, loading } = this.state;
		const { historyInfoModalVisible } = this.props;
		return (
			<Modal title="关联公告" width={507} style={{ top: '19%' }} visible={historyInfoModalVisible} footer={null} maskClosable={false} onCancel={this.handleCancel} wrapClassName="yc-broke-subrogation">
				<Spin visible={loading} minHeight={loading ? 300 : 0}>
					<div className="yc-clueModal-content">
						<Timeline>
							 {
								 dataList && dataList.map(item => (
									<Timeline.Item>
										<div className="yc-clueModal-content-label">
											<span className="yc-clueModal-content-label-time">
												{item.gmtPublish || '--'}
											</span>
											<span className="yc-clueModal-content-label-url">
												{
													item.pid ? (
														<Ellipsis content={item.title} width={250} tooltip url={`#/judgement?sourceId=10986&pid=${item.pid}&title=${item.title}`} />
													) : (
														<Ellipsis content={item.title} url={item.url} width={250} isSourceLink tooltip />
													)

												}
											</span>
											<span className="yc-clueModal-content-label-name">
												{item.typeName}
											</span>
										</div>
									</Timeline.Item>
								 ))
							 }
						</Timeline>
					</div>
				</Spin>
			</Modal>
		);
	}
}
