import React from 'react';

import { Select, Form } from 'antd';
import { Input, Button } from '@/common';

const { Option } = Select;
const todoList = [
	{ id: 1, name: '全部', value: 'all' },
	{ id: 2, name: '未处置', value: 'nodishonst' },
	{ id: 3, name: '处置中', value: 'dishonsted' },
	{ id: 4, name: '已处置', value: 'beforehonst' },
];
const diyaList = [
	{ id: 1, name: '全部', value: 'all' },
	{ id: 2, name: '未知', value: 'nodishonst' },
	{ id: 3, name: '我方抵押物', value: 'dishonsted' },
	{ id: 4, name: '他方抵押物', value: 'beforehonst' },
	{ id: 5, name: '未抵押', value: 'no' },
];
class AssetInformation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const _style1 = { width: 274 };
		const _style3 = { width: 100 };
		return (
			<div className="yc-content-query">
				<div className="yc-query-item">
					<Input title="资产信息" style={_style1} size="large" placeholder="资产基本信息" />
				</div>
				<div className="yc-query-item">
					<Input title="负责人/机构" style={_style1} size="large" placeholder="负责人/机构" />
				</div>
				<div className="yc-query-item">
					<Input title="债务人" style={_style1} size="large" placeholder="姓名/公司名称" />
				</div>
				<div className="yc-query-item">
					<Input title="权证号码" style={_style1} size="large" placeholder="权证号码" />
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">处置状态: </span>
					<Select size="large" defaultValue="all" style={_style3}>
						{todoList.map(item => <Option key={item.key} value={item.value}>{item.name}</Option>)}
					</Select>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">抵押状态: </span>
					<Select size="large" defaultValue="all" style={_style3}>
						{diyaList.map(item => <Option key={item.key} value={item.value}>{item.name}</Option>)}
					</Select>
				</div>

				<div className="yc-query-item yc-query-item-btn">
					<Button size="large" type="common" style={{ width: 84 }}>查询</Button>
					<Button size="large" style={{ width: 120 }}>重置查询条件</Button>
				</div>
				<div className="yc-split-hr" />
			</div>
		);
	}
}
export default Form.create()(AssetInformation);
