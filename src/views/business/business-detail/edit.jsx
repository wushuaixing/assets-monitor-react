import React from 'react';
import {
	Form, Button, Modal,
} from 'antd';
import { Input } from '@/common';
import './style.scss';

const { confirm } = Modal;
const createForm = Form.create;
class DebtorDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataList: [],
		};
	}

	componentDidMount() {
		const { data } = this.props; // 会提示props is not defined
		this.setState({
			dataList: data,
		});
	}

	// 相关人名称
	handleInputName = (value, id) => {
		const { dataList } = this.state;
		const that = this;
		const { isEdit } = this.props;
		isEdit();
		// console.log(target.value.trim(), 3333333);
		if (dataList && dataList.length > 0) {
			dataList.forEach((i, index) => {
				if (i.id === id) {
					dataList[index].obligorName = value.trim();
				}
			});
			that.setState({
				dataList,
			});
		}
	};

	// 身份证号/统一社会信用代码
	handleInputNumber = (value, id) => {
		const { dataList } = this.state;
		const { isEdit } = this.props;
		isEdit();
		const that = this;
		if (dataList && dataList.length > 0) {
			dataList.forEach((i, index) => {
				if (i.id === id) {
					dataList[index].obligorNumber = value.trim();
				}
			});
			that.setState({
				dataList,
			});
		}
	};

	// 角色
	changeValue = (value, id) => {
		const { dataList } = this.state;
		const that = this;
		const { isEdit } = this.props;
		isEdit();
		if (dataList && dataList.length > 0) {
			dataList.forEach((i, index) => {
				if (i.id === id) {
					dataList[index].roleText = value;
				}
			});
			that.setState({
				dataList,
			});
		}
	};

	add = () => {
		const { dataList } = this.state;
		dataList.push({
			dishonestStatus: null,
			id: -(dataList.length + 1),
			obligorName: '',
			obligorNumber: '',
			role: 2,
			roleText: '担保人',
		});
		this.setState({
			dataList,
		});
	};

	// 删除
	delete = (id) => {
		const { dataList } = this.state;
		const { isEdit } = this.props;
		const that = this;
		confirm({
			title: '您是否确认要删除该条业务相关人？',
			iconType: 'exclamation-circle-o',
			onOk() {
				isEdit();

				if (dataList && dataList.length > 0) {
					dataList.forEach((i, index) => {
						if (i.id === id) {
							dataList.splice(index, 1);
						}
					});
					that.setState({
						dataList,
					});
				}
			},
			onCancel() {},
		});
	};

	render() {
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps } = form;
		const { dataList } = this.state;

		return (
			<div className="ant-table-body">
				<table className="table" style={{ marginBottom: 0 }}>
					<thead className="ant-table-thead">
						<tr>
							<th style={{ width: 400 }}>相关人名称</th>
							<th style={{ width: 400 }}>身份证号/统一社会信用代码</th>
							<th style={{ width: 250 }}>角色</th>
							<th style={{ width: 110 }}>操作</th>
						</tr>
					</thead>
					<tbody className="ant-table-tbody">
						{
						dataList && dataList.map(item => (
							<tr>
								<td>
									<Input
										size="large"
										placeholder="请输入相关人名称"
										{...getFieldProps(`obligorName${item.id}`, {
											id: item.id,
											initialValue: item && item.obligorName,
											onChange: (e) => {
												this.handleInputName(e, item.id);
											},
											getValueFromEvent: value => value.trim(),
										})}
										className="yc-from-input"
									/>
								</td>
								<td>
									<Input
										size="large"
										placeholder="请输入身份证号/统一社会信用代码"
										{...getFieldProps(`obligorNumber${item.id}`, {
											initialValue: item && item.obligorNumber,
											onChange: (e) => {
												this.handleInputNumber(e, item.id);
											},
											getValueFromEvent: value => value.trim(),
										})}
										className="yc-from-input"
									/>
								</td>
								<td>
									<Input
										style={{ width: 200 }}
										placeholder="请选择人员"
										size="large"
										maxLength={30}
										{...getFieldProps(`roleText${item.id}`, {
											initialValue: item && item.roleText,
											onChange: (e) => {
												this.changeValue(e, item.id);
											},
											getValueFromEvent: value => value.trim(),
										})}
									/>
								</td>
								<td>
									<Button type="ghost" onClick={() => this.delete(item.id)}>
										删除
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div onClick={() => this.add()} className="yc-table-addlist">
						+ 添加相关人
				</div>
			</div>
		);
	}
}
export default createForm({
	// 判断表单是否编辑
	onFieldsChange(props, fields) {
		const { isEdit } = props;
		isEdit();
		console.log(props, fields);
	},
})(DebtorDetail);
