import React from 'react';
import { Form, Modal } from 'antd';
import { Input } from '@/common';

const createForm = Form.create;
const FormItem = Form.Item;
const formItemLayout = {
	labelCol: { span: 7 },
	wrapperCol: { span: 14 },
};

class EditOrgModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			visible: props.editOrgVisible,
		};
	}

	componentWillReceiveProps(nextProps) {
		const { editOrgVisible } = this.props;
		if (nextProps.editOrgVisible !== editOrgVisible) {
			this.setState({
				visible: nextProps.editOrgVisible,
			});
		}
	}

	// 关闭添加机构弹窗
	handleCancel = () => {
		const { handleCloseEditOrg } = this.props;
		handleCloseEditOrg();
	};

	// 弹窗确认按钮，确认添加下级机构
	handleConfirmBtn = () => {
		const { form, handleCloseEditOrg } = this.props;
		const values = form.getFieldsValue();
		console.log('values === ', values);
		handleCloseEditOrg();
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
				title="编辑机构"
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
						<div className="yc-query-item">
							<Input
								style={{ width: 240 }}
								size="large"
								maxLength="40"
								placeholder="请输入机构名称"
								{...getFieldProps('orgName', {
									initialValue: '风险管理部',
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
								placeholder="请输入机构名称"
								suffix="已监控100人"
								{...getFieldProps('name', {
									initialValue: '建设机构',
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
								placeholder="请输入机构名称"
								suffix="已监控100人"
								{...getFieldProps('name', {
									initialValue: '建设机构',
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
export default createForm()(EditOrgModal);
