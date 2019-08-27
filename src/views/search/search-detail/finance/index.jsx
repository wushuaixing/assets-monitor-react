import React from 'react';
// ==================
// 所需的所有组件
// ==================
import { Form, Pagination, message } from 'antd';
import { getQueryByName } from '@/utils';
import { Spin, Input, Button } from '@/common';
import './style.scss';

const createForm = Form.create;
const _style1 = { width: 900 };
class FINANCE extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}


	render() {
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps } = form;
		return (
			<div className="yc-content-query">
				<div className="yc-query-item">
					<Input
						title="全文"
						style={_style1}
						size="large"
						placeholder="姓名/公司名称"
						onkeydown={e => this.handleKeyDown(e)}
						onFocus={e => this.handleKeyDown(e)}
						{...getFieldProps('content', {
							initialValue: getQueryByName('content'),
							// rules: [
							// 	{ required: true, whitespace: true, message: '请填写密码' },
							// ],
							getValueFromEvent: e => e.replace(/\s+/g, ''),
						})}
					/>
				</div>
				<div className="yc-query-item yc-query-item-btn">
					<Button onClick={this.search} size="large" type="warning" style={{ width: 84 }}>查询</Button>
					<Button onClick={this.queryReset} size="large" style={{ width: 120 }}>重置查询条件</Button>
				</div>
			</div>
		);
	}
}

export default createForm()(FINANCE);
