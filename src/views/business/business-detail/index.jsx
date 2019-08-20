import React from 'react';
import { navigate } from '@reach/router';
import {
	Breadcrumb, Button, Table, Pagination, Input, Form,
} from 'antd';
import './style.scss';

const createForm = Form.create;

const columns = [{
	title: '资产信息',
	dataIndex: 'name',
	width: 375,
	render(text) {
		return <a href="#">{text}</a>;
	},
}, {
	title: '匹配原因',
	dataIndex: 'age',
	width: 375,
}, {
	title: '拍卖信息',
	dataIndex: 'address',
}];
const data = [];
for (let i = 0; i < 12; i += 1) {
	data.push({
		key: i,
		name: `李大嘴${i}`,
		age: 32,
		address: `西湖区湖底公园${i}号`,
	});
}


class DebtorDetail extends React.Component {
	constructor(props) {
		super(props);
		this.columns1 = [{
			title: '相关人名称',
			dataIndex: 'a',
			width: 375,
			render(text) {
				return <a href="#">{text}</a>;
			},
		}, {
			title: '身份证号/统一社会信用代码',
			dataIndex: 'b',
			width: 375,
		}, {
			title: '角色',
			dataIndex: 'c',
		}];
		this.state = {
			totals: 0,
			current: 1, // 当前页
			pageSize: 10, // 默认展示条数
			edit: false,
			detail: {
				caseNumber: 11123,
				obligorName: '占三',
				obligorNumber: 'TEST22335662',
				orgName: 'Test机构',
				guarantee: '担保',
			},
		};
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

	// page翻页
	handleChangePage = (val) => {
		const { pageSize, searchValue } = this.state;
		console.log(val, pageSize, searchValue);

		// const params = {
		// 	...searchValue,
		// 	current: val,
		// 	page: {
		// 		num: pageSize,
		// 		page: val,
		// 	},
		// };

		// this.getData(params);
	}


	render() {
		const {
			totals, current, edit, detail,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps } = form;
		return (
			<div className="yc-business-wrapper">
				<div className="yc-content-breadcrumb">
					<Breadcrumb>
						<Breadcrumb.Item><p style={{ fontSize: 14 }} className="click-p" onClick={() => navigate('/business/debtor')}>业务视图</p></Breadcrumb.Item>
						<Breadcrumb.Item><span style={{ 'font-weight': 100 }}>业务详情</span></Breadcrumb.Item>
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
								<div className="yc-basic-msg-inner">{detail.caseNumber}</div>
							</div>
							<div className="yc-form-group">
								<div className="yc-basic-msg-title">借款人名称:</div>
								<div className="yc-basic-msg-inner">{detail.obligorName}</div>
							</div>
							<div className="yc-form-group">
								<div className="yc-basic-msg-title">身份证号/统一社会信用代码:</div>
								<div className="yc-basic-msg-inner">{detail.obligorNumber}</div>
							</div>
							<div className="yc-form-group">
								<div className="yc-basic-msg-title">机构名称:</div>
								<div className="yc-basic-msg-inner">{detail.orgName}</div>
							</div>
							<div className="yc-form-group">
								<div className="yc-basic-msg-title">担保方式:</div>
								<div className="yc-basic-msg-inner">{detail.guarantee}</div>
							</div>
						</div>
					) : (
						<div style={{ padding: '0 35px' }}>
							<div className="yc-from-container">
								<span className="yc-from-lable1">业务编号:</span>
								<Input
									{...getFieldProps('caseNumber', {
										initialValue: detail.caseNumber,
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
										initialValue: detail.obligorName,
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
										initialValue: detail.orgName,
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
										initialValue: detail.obligorNumber,
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
					{/* <Table
						columns={this.columns1}
						dataSource={edit === false ? defaultData : cellData}
						style={{ width: '100%' }}
						pagination={false}
						onRowClick={(record) => {
							if (!record.children) {
								const w = window.open('about:blank');
								w.location.href = '#/monitor';
							}
						}}
					/> */}
				</div>
				<div className="yc-business-table">
					<div className="yc-table-header">
						<div className="table-header-left">
							资产拍卖
						</div>
					</div>
					<Table
						columns={columns}
						dataSource={data}
						style={{ width: '100%' }}
						pagination={false}
						onRowClick={(record) => {
							if (!record.children) {
								const w = window.open('about:blank');
								w.location.href = '#/monitor';
							}
						}}
					/>
					<div className="yc-pagination">
						<Pagination
							// total={totals}
							total={12}
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
export default createForm()(DebtorDetail);
