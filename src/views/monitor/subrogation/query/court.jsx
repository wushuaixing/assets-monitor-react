import React from 'react';
import { Input, Button } from '@/common';
import { DatePicker, Form } from '@antd';

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
					<Input title="姓名" style={_style1} size="large" placeholder="原告姓名/公司" />
				</div>
				<div className="yc-query-item">
					<Input title="被告" style={_style1} size="large" placeholder="被告姓名/公司" />
				</div>
				<div className="yc-query-item">
					<Input title="案号" style={_style1} size="large" placeholder="案号" />
				</div>
				<div className="yc-query-item">
					<Input title="法院" style={_style1} size="large" placeholder="法院名称" />
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">开庭日期：</span>
					<DatePicker size="large" style={_style2} placeholder="开始日期" />
					<span className="yc-query-item-title">至</span>
					<DatePicker size="large" style={_style2} placeholder="结束日期" />
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
