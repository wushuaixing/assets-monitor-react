import React from 'react';
import { Modal, Timeline } from 'antd';
import { Ellipsis, Spin } from '@/common';
import './index.scss';

const status = (value) => {
	switch (value) {
	case 1: return '即将开始';
	case 3: return '正在进行';
	case 5: return '已成交';
	case 7: return '已流拍';
	case 9: return '中止';
	case 11: return '撤回';
	default: return '-';
	}
};

const data1 = [
	{
		gmtPublish: '2021-09-09',
		title: '案号',
		typeName: '其他公告',
		url: '',
	},
	{
		gmtPublish: '2021-09-09',
		title: '案号',
		typeName: '其他公告',
		url: '',
	},
	{
		gmtPublish: '2021-09-09',
		title: '案号',
		typeName: '其他公告',
		url: '',
	},
	{
		gmtPublish: '2021-09-09',
		title: '案号',
		typeName: '其他公告',
		url: '',
	},
];


export default class ClueModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		};
	}


	handleCancel=() => {
		const { onCancel } = this.props;
		onCancel();
	};

	render() {
		const { loading } = this.state;
		const { historyInfoModalVisible, data } = this.props;
		return (
			<Modal title="历史拍卖信息" width={507} style={{ top: '19%' }} visible={historyInfoModalVisible} footer={null} onCancel={this.handleCancel}>
				<Spin visible={loading}>
					<div className="yc-clueModal-content">
						<Timeline>
							 {
								 data1 && data1.map(item => (
									<Timeline.Item>
										<div className="yc-clueModal-content-label">
											<span className="yc-clueModal-content-label-time">
												{item.gmtPublish}
											</span>
											<span className="yc-clueModal-content-label-url">
												<Ellipsis isSourceLink content={item.url} url={item.url} />
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
