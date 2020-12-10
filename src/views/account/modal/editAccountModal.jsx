import React from 'react';
import { Form, Modal, message } from 'antd';
import { Input } from '@/common';
import { modifyUser } from '@/utils/api/agency';
import './modal.scss';

const createForm = Form.create;
const FormItem = Form.Item;
const formItemLayout = {
	labelCol: { span: 5 },
	wrapperCol: { span: 15 },
};

class EditAccountModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			visible: props.editAccountVisible,
		};
	}

	componentWillReceiveProps(nextProps) {
		const { editAccountVisible } = this.props;
		if (nextProps.editAccountVisible !== editAccountVisible) {
			this.setState({
				visible: nextProps.editAccountVisible,
			});
		}
	}

	// 关闭添加机构弹窗
	handleCancel = () => {
		const { handleCloseEditAccount } = this.props;
		handleCloseEditAccount();
	};

	// 弹窗确认按钮，确认添加下级机构
	handleConfirmBtn = () => {
		const { form, handleCloseEditAccount, accountData } = this.props;
		form.validateFields((errors, values) => {
			if (errors) {
				console.log(errors);
				return;
			}
			const params = {
				...values,
				userId: accountData.id,
			};
			modifyUser(params).then((res) => {
				if (res.code === 200) {
					message.success('编辑修改成功');
					this.handleReset();
					handleCloseEditAccount();
				} else {
					message.error('编辑修改失败');
					this.handleReset();
					handleCloseEditAccount();
				}
			}).catch();
		});
	};

	// 手动清除全部
	handleReset = () => {
		const { form } = this.props;
		const { resetFields } = form;
		resetFields();
	};

	render() {
		const { visible } = this.state;
		const { form, accountData } = this.props;
		const { getFieldProps } = form;
		return (
			<Modal
				title="编辑账号"
				width={396}
				visible={visible}
				onCancel={this.handleCancel}
				onOk={this.handleConfirmBtn}
			>
				<Form horizontal className="account-form">
					<FormItem
						{...formItemLayout}
						label="姓名"
						required
					>
						<Input
							style={{ width: 240 }}
							placeholder="请填写姓名"
							{...getFieldProps('name', {
								initialValue: accountData.name,
							})}
						/>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="账号"
					>
						<Input
							style={{ width: 240 }}
							disabled
							placeholder="请填写账号（手机号）"
							{...getFieldProps('account', {
								initialValue: accountData.mobile,
							})}
						/>
					</FormItem>
				</Form>
			</Modal>
		);
	}
}
export default createForm()(EditAccountModal);
