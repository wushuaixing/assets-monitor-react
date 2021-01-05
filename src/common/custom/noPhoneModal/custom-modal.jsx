import React from 'react';
import {
	Form, Button, Modal,
} from 'antd';
import './custom.scss';

const createForm = Form.create;

class CustomModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}


	render() {
		const {
			customVisible, onCancel, content, customWidth, customTitle,
		} = this.props;
		return (
			<Form layout="inline">
				<Modal
					maskClosable={false}
					title={customTitle}
					width={customWidth}
					visible={customVisible}
					onOk={this.handleOk}
					onCancel={onCancel}
					footer={false}
				>
					{
						content
					}
					<div className="custom-btn">
						<Button type="primary" className="yc-modal-btn" onClick={onCancel}>我知道了</Button>
					</div>
				</Modal>
			</Form>
		);
	}
}

export default createForm()(CustomModal);
