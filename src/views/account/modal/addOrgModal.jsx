import React from 'react';
import { Form, Modal, message } from 'antd';
import { Input } from '@/common';
import './modal.scss';

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
		message.success('添加成功');
		// message.error('机构名称已存在');
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
				<Form horizontal className="org-form">
					<FormItem
						{...formItemLayout}
						label="机构名称"
					>
						<div className="yc-query-item">
							<Input
								style={{ width: 240 }}
								size="large"
								maxLength="40"
								placeholder="请输入机构名称"
								{...getFieldProps('orgName', {
									getValueFromEvent: e => e.trim(),
								})}
							/>
						</div>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="可监控债务人数"
					>
						<div className="yc-query-item">
							<Input
								style={{ width: 240 }}
								size="large"
								maxLength="40"
								onlyUnit="人"
								placeholder="请输入可监控债务人数"
								{...getFieldProps('montiorCount', {
									getValueFromEvent: e => e.trim(),
								})}
							/>
						</div>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="查询授权次数"
					>
						<div className="yc-query-item">
							<Input
								style={{ width: 240 }}
								size="large"
								maxLength="40"
								onlyUnit="次"
								placeholder="请输入查询授权次数"
								{...getFieldProps('checkCount', {
									getValueFromEvent: e => e.trim(),
								})}
							/>
						</div>
					</FormItem>
				</Form>
			</Modal>
		);
	}
}
export default createForm()(AddOrgModal);
