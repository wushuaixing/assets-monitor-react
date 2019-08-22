import React from 'react';
import { navigate } from '@reach/router';
import {
	Breadcrumb, Button, Table, Input, Form,
} from 'antd';
import {
	getDetail, // 详情
} from '@/utils/api/business';
import { getQueryByName } from '@/utils';
import './style.scss';
import isBreak from '../../../assets/img/business/status_shixin.png';
import beforeBreak from '../../../assets/img/business/status_cengshixin.png';
import Edit from './edit';
import { Spin } from '@/common';

const createForm = Form.create;

class DebtorDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			detail: null,
			data: [],
			columns: [{
				title: '相关人名称',
				dataIndex: 'obligorName',
				key: 'obligorName',
				width: 375,
				render: (text, row) => (
					<p style={{ position: 'relative' }}>
						{text || '-'}
						{
								row && row.dishonestStatus === 1 ? <img className="yc-item-break" src={isBreak} alt="" /> : null
							}
						{
								row && row.dishonestStatus === 2 ? <img className="yc-item-break" src={beforeBreak} alt="" /> : null
							}
					</p>
				),
			}, {
				title: '身份证号/统一社会信用代码',
				dataIndex: 'obligorNumber',
				key: 'obligorNumber',
				width: 375,
				render: text => (
					<p>{text || '-'}</p>
				),
			}, {
				title: '角色',
				dataIndex: 'roleText',
				key: 'roleText',
				render: text => (
					<p>{text || '-'}</p>
				),
			}],
		};
	}

	componentDidMount() {
		this.getTableData();
	}

	getTableData=(value) => {
		const { hash } = window.location;
		const userId = getQueryByName(hash, 'id');
		this.setState({
			loading: true,
		});
		getDetail(value || userId).then((res) => {
			if (res.code === 200) {
				this.setState({
					data: res.data.obligorList,
					detail: res.data.detail,
					loading: false,
				});
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	}

	handleCancal = () => {
		this.setState({
			edit: false,
		});
	}

	handleEdit = (edit) => {
		if (edit === false) {
			this.setState({
				edit: !edit,
			});
		} else {
			console.log(2);
		}
	}

	render() {
		const {
			edit, detail, loading, columns, data,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps } = form;
		return (
			<div className="yc-business-wrapper">
				<div className="yc-content-breadcrumb">
					<Breadcrumb>
						<Breadcrumb.Item><span className="yc-bread-hover" onClick={() => navigate('/business')}>业务视图</span></Breadcrumb.Item>
						<Breadcrumb.Item><a className="yc-bread-hover" style={{ 'font-weight': 400, color: '#384482' }}>业务详情</a></Breadcrumb.Item>
					</Breadcrumb>
					<div className="yc-search-right">
						<Button onClick={() => this.handleEdit(edit)} className="yc-btn">
							{edit ? '保存' : '编辑'}
						</Button>
						{edit === false
							? (
								<React.Fragment>
									<Button className="yc-btn">
                                        变更记录
									</Button>
									<Button className="yc-btn">
										<span className="yc-icon-export" />
                                        下载
									</Button>
								</React.Fragment>
							) : (
								<Button onClick={() => this.handleCancal()} className="yc-btn">
									{/* {!edit && <span className="yc-icon-export" />} */}
                                    取消
								</Button>
							) }
					</div>
				</div>

				<div className="yc-business-ob">
					<div className="yc-module-title">基本信息</div>
					{edit === false ? (
						<div style={{ padding: '0 35px' }}>
							<div className="yc-form-group">
								<div className="yc-basic-msg-title">业务编号:</div>
								<div className="yc-basic-msg-inner">{detail && detail.caseNumber.length > 0 ? detail.caseNumber : '-'}</div>
							</div>
							<div className="yc-form-group">
								<div className="yc-basic-msg-title">借款人名称:</div>
								<a className="yc-basic-msg-inner">{detail && detail.obligorName.length > 0 ? detail.obligorName : '-'}</a>
							</div>
							<div className="yc-form-group">
								<div className="yc-basic-msg-title">身份证号/统一社会信用代码:</div>
								<div className="yc-basic-msg-inner">{detail && detail.obligorNumber.length > 0 ? detail.obligorNumber : '-'}</div>
							</div>
							<div className="yc-form-group">
								<div className="yc-basic-msg-title">机构名称:</div>
								<div className="yc-basic-msg-inner">{detail && detail.orgName.length > 0 ? detail.orgName : '-'}</div>
							</div>
							<div className="yc-form-group">
								<div className="yc-basic-msg-title">担保方式:</div>
								<div className="yc-basic-msg-inner">{detail && detail.guaranteeString.length > 0 ? detail.guaranteeString : '-'}</div>
							</div>
						</div>
					) : (
						<div style={{ padding: '0 35px' }}>
							<div className="yc-from-container">
								<span className="yc-from-lable1">业务编号:</span>
								<Input
									{...getFieldProps('caseNumber', {
										initialValue: detail && detail.caseNumber,
										// rules: [
										// 	{ required: true, whitespace: true, message: '请填写密码' },
										// ],
									})}
									className="yc-from-input"
								/>
							</div>
							<div className="yc-from-container">
								<span className="yc-from-lable2">
									<span className="yc-red">*</span>
									借款人名称:
								</span>
								<Input
									{...getFieldProps('obligorName', {
										initialValue: detail && detail.obligorName,
										// rules: [
										// 	{ required: true, whitespace: true, message: '请填写密码' },
										// ],
									})}
									className="yc-from-input"
								/>
							</div>
							<div className="yc-from-container">
								<span className="yc-from-lable1">机构名称:</span>
								<Input
									{...getFieldProps('orgName', {
										initialValue: detail && detail.orgName,
										// rules: [
										// 	{ required: true, whitespace: true, message: '请填写密码' },
										// ],
									})}
									className="yc-from-input"
								/>
							</div>
							<div className="yc-from-container">
								<span className="yc-from-lable2">身份证号/统一社会信用代码:</span>
								<Input
									{...getFieldProps('obligorNumber', {
										initialValue: detail && detail.obligorNumber,
										// rules: [
										// 	{ required: true, whitespace: true, message: '请填写密码' },
										// ],
									})}
									className="yc-from-input"
								/>
							</div>
						</div>
					)}
				</div>
				<div className="yc-business-table">
					<div className="yc-table-header">
						<div className="table-header-left">
                            业务相关人列表
						</div>
					</div>
					{edit === false ? (
						<Spin visible={loading}>
							<Table
								dataSource={data}
								columns={columns}
								style={{ width: '100%' }}
								pagination={false}
								onRowClick={(record) => {
									console.log(record);
								}}
							/>
						</Spin>
					)
						: <Edit data={data} />}
				</div>
			</div>
		);
	}
}
export default createForm()(DebtorDetail);
