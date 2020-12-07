import React from 'react';
import { Modal } from 'antd';

export default class AddOrgModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			visible: props.addOrgVisible,
		};
	}

	componentWillReceiveProps(nextProps) {
		const { addOrgVisible } = this.props;
		if (nextProps.addOrgVisible !== addOrgVisible) {
			this.setState({
				visible: nextProps.addOrgVisible,
			});
		}
	}

	// 关闭添加机构弹窗
	handleCancel = () => {
		const { handleCloseAddOrg } = this.props;
		handleCloseAddOrg();
	};

	handleConfirmBtn = () => {

	};

	render() {
		const { visible } = this.state;
		const { addOrgVisible } = this.props;
		console.log('modal addOrgVisible === ', visible, addOrgVisible);
		return (
			<Modal
				title="添加机构"
				width={396}
				visible={visible}
				onCancel={this.handleCancel}
				onOk={this.handleConfirmBtn}
			>
				<h2>this is modal</h2>
			</Modal>
		);
	}
}
