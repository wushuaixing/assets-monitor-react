import React from 'react';
import {
	Form, Button, Input, Select,
} from 'antd';
import {
	detail, // 详情
} from '@/utils/api/business';

import './style.scss';

const { Option } = Select;
const createForm = Form.create;
class DebtorDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

    add = () => {
    	console.log(1);
    }

    render() {
    	const { form, data } = this.props; // 会提示props is not defined
    	const { getFieldProps } = form;
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
				{data && data.map(item => (
					<tr>
						<td>
							<Input
								size="large"
								placeholder="请输入相关人名称"
								{...getFieldProps(`obligorName${item.id}`, {
									id: item.id,
									initialValue: item && item.obligorName,
									// rules: [
									// 	{ required: true, whitespace: true, message: '请填写密码' },
									// ],
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
									// rules: [
									// 	{ required: true, whitespace: true, message: '请填写密码' },
									// ],
								})}
								className="yc-from-input"
							/>
						</td>
						<td>
							<Select
								style={{ width: 200 }}
								placeholder="请选择人员"
								size="large"
								{...getFieldProps(`role${item.id}`, {
									initialValue: item && item.role,
									// rules: [
									// 	{ required: true, whitespace: true, message: '请填写密码' },
									// ],
								})}
							>
								<Option value={2}>担保人</Option>
								<Option value={4}>共同借款人</Option>
							</Select>
						</td>
						<td>
							<Button type="ghost">
								{/* {!edit && <span className="yc-icon-export" />} */}
                                    删除
							</Button>
						</td>
					</tr>
				))}

			</tbody>
		</table>
		<div onClick={this.add} className="yc-table-addlist">+ 添加相关人</div>
	</div>
    	);
    }
}
export default createForm()(DebtorDetail);
