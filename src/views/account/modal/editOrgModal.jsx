import React from 'react';
import { Form, Modal, message } from 'antd';
import { Input } from '@/common';
import { editOrg } from '@/utils/api/agency';

const createForm = Form.create;
const FormItem = Form.Item;
const formItemLayout = {
	labelCol: { span: 7 },
	wrapperCol: { span: 14 },
};

class EditOrgModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	// 关闭添加机构弹窗
	handleCancel = () => {
		const { handleCloseEditOrg } = this.props;
		handleCloseEditOrg();
	};

	// 弹窗确认按钮，确认添加下级机构
	handleConfirmBtn = () => {
		const {
			form, handleCloseEditOrg, orgData, currentOrgDetail,
		} = this.props;
		const values = form.getFieldsValue();
		const params = {
			...values,
			orgId: currentOrgDetail.id,
			orgName: orgData.name,
			authorizeNumber: parseInt(values.authorizeNumber, 10),
			monitorNum: parseInt(values.monitorNum, 10),
		};
		editOrg(params).then((res) => {
		    if (res.code === 200) {
				message.success('编辑成功');
				handleCloseEditOrg();
			} else {
				message.error('编辑失败');
			}
		}).catch();
	};

	render() {
		const { form, editOrgVisible, orgData } = this.props;
		console.log('orgData modal === ', orgData);
		const { getFieldProps } = form;
		return (
			<Modal
				title="编辑机构"
				width={396}
				visible={editOrgVisible}
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
									initialValue: orgData.name,
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
								placeholder="请输入可监控数"
								unit="人"
								unitStyle={{ color: '#B2B8C9' }}
								suffix={`（已监控：${orgData.obligorLimitUseCount || 0}人）`}
								suffixRightStyle={{ width: 170 }}
								suffixSpanStyle={{ width: 120, color: '#20242E', fontWeight: 400 }}
								{...getFieldProps('monitorNum', {
									initialValue: orgData.obligorLimitCount || '0',
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
								placeholder="请输入查询授权数"
								unit="次"
								unitStyle={{ color: '#B2B8C9' }}
								suffix={`（已使用：${orgData.portraitLimitUseCount || 0}次）`}
								suffixRightStyle={{ width: 170 }}
								suffixSpanStyle={{ width: 120, color: '#20242E', fontWeight: 400 }}
								{...getFieldProps('authorizeNumber', {
									initialValue: orgData.portraitLimitCount || '0',
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
export default createForm()(EditOrgModal);
