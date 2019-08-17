import React from 'react';
import { Input, Button } from '@/common';
import { DatePicker, Select, Form } from '@antd';


const options = [2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2004];
class QueryCondition extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const _style1 = { width: 274 };
		const _style2 = { width: 100 };
		return (
			<div className="yc-content-query">
				<div className="yc-query-item">
					<Input title="纳税人" style={_style1} size="large" placeholder="纳税人姓名/公司名称" />
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">发布年份：</span>
					<Select size="large" defaultValue="all" style={_style2}>
						<Select.Option value="all">请选择年份</Select.Option>
						{options.map(item => <Select.Option value={item} key={item}>{`${item}年`}</Select.Option>)}
					</Select>
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">更新日期：</span>
					<DatePicker size="large" style={_style2} placeholder="开始日期" />
					<span className="yc-query-item-title">至</span>
					<DatePicker size="large" style={_style2} placeholder="结束日期" />
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
export default Form.create()(QueryCondition);
