import React from 'react';
import { Form, Modal, message } from 'antd';
import { Input } from '@/common';
import { addNextOrg } from '@/utils/api/agency';
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
		this.state = {};
	}

	// 关闭添加机构弹窗
	handleCancel = () => {
		const { handleCloseAddOrg } = this.props;
		handleCloseAddOrg();
	};

	// 弹窗确认按钮，确认添加下级机构
	handleConfirmBtn = () => {
		const { form, handleCloseAddOrg, currentOrgDetail } = this.props;
		const values = form.getFieldsValue();
		const params = {
			orgId: currentOrgDetail.id,
			orgName: currentOrgDetail.name,
			...values,
		};
		addNextOrg(params).then((res) => {
			if (res.code === 200) {
				message.success('添加成功');
				handleCloseAddOrg();
			} else {
				message.error(res.message || '机构名称已存在');
			}
		}).catch(() => {});
	};

	render() {
		const { form, addOrgVisible } = this.props;
		const { getFieldProps } = form;
		return (
			<Modal
				title="添加机构"
				width={396}
				visible={addOrgVisible}
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
								{...getFieldProps('newOrgName', {
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
								{...getFieldProps('monitorNum', {
									getValueFromEvent: e => parseInt(e.trim(), 10),
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
								{...getFieldProps('authorizeNumber', {
									getValueFromEvent: e => parseInt(e.trim(), 10),
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
