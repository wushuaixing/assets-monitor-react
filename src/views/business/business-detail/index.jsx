import React from 'react';
import { navigate } from '@reach/router';
import {
	Breadcrumb, Button, Input, Form, message, Modal,
} from 'antd';
import {
	getDetail, // 详情
	save, // 编辑
} from '@/utils/api/business';
import { getQueryByName } from '@/utils';
import isBreak from '../../../assets/img/business/status_shixin.png';
import beforeBreak from '../../../assets/img/business/status_cengshixin.png';
import Edit from './edit';
import { Table, Spin } from '@/common';
import TableList from '../table-list';
import './style.scss';

const { confirm } = Modal;
const createForm = Form.create;

class DebtorDetail extends React.Component {
	constructor(props) {
		super(props);
		document.title = '业务详情-业务管理';
		this.state = {
			edit: false,
			detail: null,
			isEdit: false,
			data: [],
			columns: [{
				title: '相关人名称',
				dataIndex: 'obligorName',
				key: 'obligorName',
				width: 375,
				render: (text, row) => (
					<p
						onClick={() => {
							const w = window.open('about:blank');
							w.location.href = `#/business/debtor/detail?id=${row.obligorId}`;
						}}
						className="yc-table-text-link"
						style={{ position: 'relative' }}
					>
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
			} else {
				message.error(res.message);
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	handleCancal = () => {
		this.getTableData();
		this.setState({
			edit: false,
			isEdit: false,
		});
	};

	handleEdit = (edit) => {
		this.setState({
			edit: !edit,
		});
	};


	// 保存
	handleSave = () => {
		const { data } = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const { hash } = window.location;
		const userId = getQueryByName(hash, 'id');
		const fields = getFieldsValue();
		const value = data && data.filter(res => res.obligorName === ''); // 过滤相关人内容为空
		const obligorNameLength = data && data.filter(res => res.obligorName.length < 5 && res.obligorNumber === ''); // 过滤相关人内容小于5身份证为空
		if (!fields.obligorName) {
			message.error('请填写借款人名称');
			return;
		}
		if (fields.obligorName.length < 5 && !fields.obligorNumber) {
			message.error('借款人为自然人时证件号不能为空！');
			return;
		}

		if (value.length > 0) {
			message.error('业务人相关列表中，相关人名称不能为空!');
			return;
		}
		if (obligorNameLength.length > 0) {
			message.error('业务人相关列表中，当相关人为自然人时证件号不可为空！');
			return;
		}
		confirm({
			title: '确认修改债务人名称/身份信息？',
			iconType: 'exclamation-circle-o',
			width: 500,
			content: '若本次编辑涉及债务人名称或身份证号，该债务人的历史数据匹配将被删除，并以新名称、身份证号重新进行匹配。',
			onOk() {
				const params = {
					detail: {
						...fields,
						id: Number(userId),
					},
					obligorList: data,
				};
				const start = new Date().getTime(); // 获取接口响应时间
				save(userId, params).then((res) => {
					if (res.code === 200) {
						const now = new Date().getTime();
						const latency = now - start;

						const hide = message.loading('正在刷新,请稍后...', 0);
						setTimeout(() => {
							window.location.reload(); // 实现页面重新加载
						}, latency);
						// 异步手动移除
						setTimeout(hide, latency);
						// that.getTableData();
					} else {
						message.error(res.message);
					}
				}).catch(() => {
					message.error('服务端错误');
				});
			},
			onCancel() {},
		});
	};

	// 判断是否已经编辑
	isEdit = () => {
		this.setState({
			isEdit: true,
		});
	};

	// 跳转债务人详情
	detail = (id) => {
		const w = window.open('about:blank');
		w.location.href = `#/business/debtor/detail?id=${id}`;
	};

	changeList = () => {
		const { hash } = window.location;
		const userId = getQueryByName(hash, 'id');
		navigate(`/business/detail/changeList?id=${userId}`);
	};

	// 变更记录
	render() {
		const {
			edit, detail, loading, columns, data, isEdit,
		} = this.state;
		const { form, parent, parentUrL } = this.props; // 会提示props is not defined
		const { getFieldProps } = form;

		return (
			<div className="yc-business-wrapper">
				<div className="yc-content-breadcrumb">
					<Breadcrumb>
						<Breadcrumb.Item><a className="yc-bread-hover" onClick={() => navigate(parentUrL || '/business')}>{parent || '业务视图'}</a></Breadcrumb.Item>
						<Breadcrumb.Item><span style={{ 'font-weight': 400, color: '#20242E' }}>业务详情</span></Breadcrumb.Item>
					</Breadcrumb>
					<div className="yc-search-right">
						{edit === false ? (
							<Button onClick={() => this.handleEdit(edit)} className="yc-btn">
								编辑
							</Button>
						) : (
							<Button disabled={!isEdit} onClick={() => this.handleSave()} className="yc-btn">
								保存
							</Button>
						)
						}
						{edit === false
							? (
								<React.Fragment>
									<Button onClick={this.changeList} className="yc-btn">
										变更记录
									</Button>
									<Button className="yc-btn">
										<span className="yc-icon-export" />
										下载
									</Button>
								</React.Fragment>
							) : (
								<Button onClick={() => this.handleCancal()} className="yc-btn">
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
								<a onClick={() => this.detail(detail.obligorId)} className="yc-basic-msg-inner">{detail && detail.obligorName.length > 0 ? detail.obligorName : '-'}</a>
							</div>
							<div className="yc-form-group">
								<div className="yc-basic-msg-title">身份证号/统一社会信用代码:</div>
								<div className="yc-basic-msg-inner">{detail && detail.obligorNumber.length > 0 ? detail.obligorNumber : '-'}</div>
							</div>
							<div className="yc-form-group">
								<div className="yc-basic-msg-title">机构名称:</div>
								<div className="yc-basic-msg-inner">{detail && detail.orgName.length > 0 ? detail.orgName : '-'}</div>
							</div>
							{/* <div className="yc-form-group"> */}
							{/*	<div className="yc-basic-msg-title">担保方式:</div> */}
							{/*	<div className="yc-basic-msg-inner">{detail && detail.guaranteeString.length > 0 ? detail.guaranteeString : '-'}</div> */}
							{/* </div> */}
						</div>
					) : (
						<div style={{ padding: '0 35px' }}>
							<div className="yc-from-container">
								<span className="yc-from-lable1">业务编号:</span>
								<Input
									onInput={this.isEdit}
									{...getFieldProps('caseNumber', {
										initialValue: detail && detail.caseNumber,
										getValueFromEvent: e => e.target.value.trim(),
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
									onInput={this.isEdit}
									{...getFieldProps('obligorName', {
										initialValue: detail && detail.obligorName,
										getValueFromEvent: e => e.target.value.trim(),
									})}
									className="yc-from-input"
								/>
							</div>
							<div className="yc-from-container">
								<span className="yc-from-lable1">机构名称:</span>
								<Input
									onInput={this.isEdit}
									{...getFieldProps('orgName', {
										initialValue: detail && detail.orgName,
										getValueFromEvent: e => e.target.value.trim(),
									})}
									className="yc-from-input"
								/>
							</div>
							<div className="yc-from-container">
								<span className="yc-from-lable2">身份证号/统一社会信用代码:</span>
								<Input
									onInput={this.isEdit}
									{...getFieldProps('obligorNumber', {
										initialValue: detail && detail.obligorNumber,
										getValueFromEvent: e => e.target.value.trim(),
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
						: <Edit editSave={this.editSave} isEdit={this.isEdit} data={data} />}
				</div>
				<TableList model="business" />
			</div>
		);
	}
}
export default createForm({})(DebtorDetail);
