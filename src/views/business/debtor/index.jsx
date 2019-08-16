import React from 'react';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';

import { Input, Button } from '@/common';

const { Option } = Select;
const dishonstList = [
	{ id: 1, name: '全部', value: 'all' },
	{ id: 2, name: '未失信', value: 'nodishonst' },
	{ id: 3, name: '已失信', value: 'dishonsted' },
	{ id: 4, name: '曾失信', value: 'beforehonst' },
];
class BusinessDebtor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const _style1 = { width: 274 };
		const _style3 = { width: 80 };
		return (
			<div className="yc-content-query">
				<div className="yc-query-item">
					<Input title="债务人" style={_style1} size="large" placeholder="姓名/公司名称" />
				</div>
				<div className="yc-query-item">
					<Input title="证件号" style={_style1} size="large" placeholder="身份证号/统一社会信用代码" />
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">信用状态: </span>
					<Select size="large" defaultValue="all" style={_style3}>
						{dishonstList.map(item => <Option key={item.key} value={item.value}>{item.name}</Option>)}
					</Select>
				</div>
				<div className="yc-query-item yc-query-item-btn">
					<Button size="large" type="warning" style={{ width: 84 }}>查询</Button>
					<Button size="large" style={{ width: 120 }}>重置查询条件</Button>
				</div>
				<div className="yc-split-hr" />
			</div>
		);
	}
}
export default Form.create()(BusinessDebtor);
