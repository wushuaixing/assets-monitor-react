import React from 'react';
import { Modal, Button } from 'antd';
import { Spin } from '@/common';
import './index.scss';

export default class ViewContentModal extends React.PureComponent {
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
		const { visible, data } = this.props;
		return (
			<Modal
				title="限制消费令"
				width={800}
				visible={visible}
				onCancel={this.handleCancel}
				footer={[
					<Button key="back" type="ghost" size="large" onClick={this.handleCancel}>关闭</Button>,
				]}
			>
				<Spin visible={loading}>
					<p className="modal-content">{data}</p>
				</Spin>
			</Modal>
		);
	}
}
