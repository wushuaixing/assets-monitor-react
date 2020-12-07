import React from 'react';
import { Form, Modal, Input } from 'antd';

const createForm = Form.create;
const FormItem = Form.Item;
const formItemLayout = {
	labelCol: { span: 7 },
	wrapperCol: { span: 14 },
};

class AddOrgModal extends React.PureComponent {
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

	// 弹窗确认按钮，确认添加下级机构
	handleConfirmBtn = () => {
		const { form, handleCloseAddOrg } = this.props;
		const values = form.getFieldsValue();
		console.log('values === ', values);
		handleCloseAddOrg();
		this.handleReset();
	};

	// 手动清除全部
	handleReset = () => {
		const { form } = this.props;
		const { resetFields } = form;
		resetFields();
	};

	render() {
		const { visible } = this.state;
		const { form } = this.props;
		const { getFieldProps } = form;
		return (
			<Modal
				title="添加机构"
				width={396}
				visible={visible}
				onCancel={this.handleCancel}
				onOk={this.handleConfirmBtn}
			>
				<Form horizontal>
					<FormItem
						{...formItemLayout}
						label="机构名称"
					>
						<Input placeholder="请输入机构名称" {...getFieldProps('orgName', undefined)} />
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="可监控债务人数"
					>
						<Input placeholder="请输入可监控债务人数" {...getFieldProps('montiorCount', undefined)} />
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="查询授权次数"
					>
						<Input placeholder="请输入查询授权次数" {...getFieldProps('checkCount', undefined)} />
					</FormItem>
				</Form>
			</Modal>
		);
	}
}
export default createForm()(AddOrgModal);
