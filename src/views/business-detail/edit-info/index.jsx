import React from 'react';
import { Form, Input } from 'antd';
import { navigate } from '@reach/router';
import { getQueryByName } from '@/utils';
import {
	 BreadCrumb, Button,
} from '@/common';
import { getSource } from '@/views/business-detail/business/cache';
import Edit from './edit';
import './style.scss';

const createForm = Form.create;

class EditBusiness extends React.Component {
	constructor(props) {
		document.title = '业务详情';
		// const defaultSourceType = window.location.hash.match(/\d{3}?(\?)/);
		super(props);
		this.state = {
			id: getQueryByName(window.location.href, 'id'),
			source: getSource() || {},
		};
		this.portrait = 'debtor_personal';
		// 画像类型：business 业务，debtor_enterprise 企业债务人 debtor_personal 个人债务人
	}

	componentWillMount() {

	}

	handleBack = () => {
		navigate('/business/detail/info?id=22634');
	};

	render() {
		const { id, source } = this.state;
		const { form: { getFieldProps } } = this.props; // 会提示props is not defined
		const data = [
			{
				dishonestStatus: null,
				id: 340033,
				obligorId: 353533,
				obligorName: '照照',
				obligorNumber: '142622199902023333',
				role: 2,
				roleText: '担保人',
			},
		];
		console.log(source, 123123);
		return (
			<div className="edit-info-wrapper">
				<div className="info-navigation info-wrapper">
					<BreadCrumb
						list={[
							{ id: 1, name: '业务视图', link: '/business' },
							{ id: 2, name: '业务详情', link: `/business/detail/info?id=${id}` },
							{ id: 3, name: '编辑', link: '' },
						]}
						suffix={(
							<div className="info-navigation-suffix">
								<Button className="info-navigation-suffix__button" type="primary">保存</Button>
								<Button className="info-navigation-suffix__button" onClick={this.handleBack}>取消</Button>
							</div>
						)}
					/>
				</div>
				<div style={{ margin: '0 20px' }}><div className="mark-line" /></div>
				<div className="info-content info-wrapper">
					<div className="info-edit-title">
						<div className="info-edit-left-item" />
						<span className="info-edit-title-name">基本信息</span>
					</div>
					<div style={{ padding: '0 10px' }}>
						<div className="yc-from-container">
							<span className="yc-from-lable1">业务编号：</span>
							<Input
								onInput={this.isEdit}
								placeholder="请输入业务编号"
								maxLength="32"
								autocomplete="off"
								{...getFieldProps('caseNumber', {
									// initialValue: detail && detail.caseNumber,
									getValueFromEvent: e => e.target.value.trim(),
								})}
								className="yc-from-input"
							/>
						</div>
						<div className="yc-from-container">
							<span className="yc-from-lable2">
								<span className="yc-red">*</span>
									借款人名称：
							</span>
							<Input
								onInput={this.isEdit}
								placeholder="请输入借款人名称"
								maxLength="40"
								autocomplete="off"
								{...getFieldProps('obligorName', {
									// initialValue: detail && detail.obligorName,
									getValueFromEvent: e => e.target.value.trim(),
								})}
								className="yc-from-input"
							/>
						</div>
						<div className="yc-from-container">
							<span className="yc-from-lable1">负责人/机构：</span>
							<Input
								onInput={this.isEdit}
								placeholder="请输入负责人/机构"
								autocomplete="off"
								maxLength="40"
								{...getFieldProps('orgName', {
									// initialValue: detail && detail.orgName,
									getValueFromEvent: e => e.target.value.trim(),
								})}
								className="yc-from-input"
							/>
						</div>
						<div className="yc-from-container">
							<span className="yc-from-lable2">身份证号/统一社会信用代码：</span>
							<Input
								onInput={this.isEdit}
								maxLength="18"
								placeholder="请输入身份证号/统一社会信用代码"
								autocomplete="off"
								{...getFieldProps('obligorNumber', {
									// initialValue: detail && detail.obligorNumber,
									getValueFromEvent: e => e.trim().replace(/[^0-9a-zA-Z-]/g, ''),
									// getValueFromEvent: e => e.target.value.trim(),
								})}
								className="yc-from-input"
							/>
						</div>
					</div>
					<div className="info-edit-title" style={{ margin: '40px 0 20px' }}>
						<div className="info-edit-left-item" />
						<span className="info-edit-title-name">业务相关人列表</span>
					</div>
					<Edit editSave={this.editSave} isEdit={this.isEdit} data={data} />
				</div>
			</div>
		);
	}
}

export default createForm({})(EditBusiness);
