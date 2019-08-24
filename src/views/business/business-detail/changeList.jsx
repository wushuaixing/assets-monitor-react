import React from 'react';
import { navigate } from '@reach/router';
import {
	Breadcrumb, Button, Table, Input, Form, message, Pagination,
} from 'antd';
import {
	getDetail, // 详情
	businessChange, // 变更记录
} from '@/utils/api/business';
import { getQueryByName } from '@/utils';
import './style.scss';
import isBreak from '../../../assets/img/business/status_shixin.png';
import beforeBreak from '../../../assets/img/business/status_cengshixin.png';
import { Spin } from '@/common';

const createForm = Form.create;

class DebtorDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			detail: null,
			data: [],
			totals: 0,
			current: 1, // 当前页
			changeDataList: [],
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
			changeColumns: [{
				title: '变更时间',
				dataIndex: 'updateTime',
				key: 'updateTime',
				width: 180,
				render: (text, row) => (
					<p style={{ position: 'relative' }}>
						{text || '-'}
					</p>
				),
			}, {
				title: '	变更项',
				dataIndex: 'changeItem',
				key: 'changeItem',
				width: 300,
				render: text => (
					<p>{text || '-'}</p>
				),
			}, {
				title: '变更前',
				dataIndex: 'beforeContent',
				key: 'beforeContent',
				width: 226,
				render: text => (
					<p>{text || '-'}</p>
				),
			}, {
				title: '变更后',
				dataIndex: 'afterContent',
				key: 'afterContent',
				width: 227,
				render: text => (
					<p>{text || '-'}</p>
				),
			}, {
				title: '变更人',
				dataIndex: 'username',
				key: 'username',
				render: text => (
					<p>{text || '-'}</p>
				),
			}],
		};
	}

	componentDidMount() {
		this.getTableData();
		this.getChangeData();
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

    getChangeData=(value) => {
    	const { hash } = window.location;
    	const userId = getQueryByName(hash, 'id');
    	this.setState({
    		loading: true,
    	});
    	const params = {
    		page: {
    			num: 10,
    			page: 1,
    		},
    	};
    	businessChange(userId, params).then((res) => {
    		if (res && res.data) {
    			this.setState({
    				changeDataList: res.data.list,
    				totals: res.data.total,
    				current: value && value.current ? value.current : 1, // 翻页传选中页数，其他重置为1
    				loading: false,
    			});
    		} else {
    			message.error(res.message);
    		}
    	}).catch(() => {
    		this.setState({ loading: false });
    	});
    }

	// page翻页
	handleChangePage = (val) => {
		const { pageSize, searchValue } = this.state;
		const params = {
			...searchValue,
			current: val,
			num: pageSize,
			page: val,
		};

		this.getData(params);
	}

	handleCancal = () => {
		// const { defaultData } = this.state;
		this.getTableData();
		this.setState({
			edit: false,
		});
	}

    // back
    back = () => {
    	const { hash } = window.location;
    	const userId = getQueryByName(hash, 'id');
    	navigate(`/business/detail?id=${userId}`);
    }

	// 跳转债务人详情
	detail = (id) => {
		const w = window.open('about:blank');
		w.location.href = `#/business/debtor/detail?id=${id}`;
	}

	// 变更记录
	render() {
		const {
			edit, detail, loading, columns, data, changeColumns, changeDataList, totals, current,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps } = form;

		return (
			<div className="yc-business-wrapper">
				<div className="yc-content-breadcrumb">
					<Breadcrumb>
						<Breadcrumb.Item><a className="yc-bread-hover" onClick={() => navigate('/business')}>业务视图</a></Breadcrumb.Item>
						<Breadcrumb.Item><a className="yc-bread-hover" onClick={() => this.back()}>业务详情</a></Breadcrumb.Item>
						<Breadcrumb.Item><span className="yc-bread-hover" style={{ 'font-weight': 400, color: '#384482' }}>变更记录</span></Breadcrumb.Item>
					</Breadcrumb>
					<div className="yc-search-right">
						<Button onClick={() => this.back()} className="yc-btn">
							返回
						</Button>
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
									onInput={this.isEdit}
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
									onInput={this.isEdit}
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
									onInput={this.isEdit}
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
									onInput={this.isEdit}
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
				</div>
				<div className="yc-business-table">
					<div className="yc-table-header">
						<div className="table-header-left">
                        变更记录
						</div>
					</div>
					<Spin visible={loading}>
						<Table
							dataSource={changeDataList}
							columns={changeColumns}
							style={{ width: '100%' }}
							pagination={false}
							onRowClick={(record) => {
								console.log(record);
							}}
						/>
					</Spin>
					<div className="yc-pagination">
						<Pagination
							total={totals}
							current={current}
							defaultPageSize={10} // 默认条数
							showQuickJumper
							showTotal={total => `共 ${total} 条记录`}
							onChange={(val) => {
								console.log(val);

								this.handleChangePage(val);
							}}
						/>
						{/* <div className="yc-pagination-btn"><Button>跳转</Button></div> */}
					</div>
				</div>
			</div>
		);
	}
}
export default createForm({})(DebtorDetail);
