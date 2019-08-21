import React from 'react';
import { Input, Button } from '@/common';
import { DatePicker, Form } from 'antd';

class QueryCondition extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleSubmit=() => {
		const { form: { getFieldsValue }, onQueryChange } = this.props;
		const condition = getFieldsValue();
		if (onQueryChange)onQueryChange(condition);
	};

	handleReset=() => {
		const { form } = this.props;
		form.resetFields();
		// console.log(form.getFieldsValue());
	};

	render() {
		const _style1 = { width: 274 };
		const _style2 = { width: 100 };
		const { form: { getFieldProps } } = this.props;
		const timeOption = {
			normalize(n) {
				return n && new Date(n).format('yyyy-MM-dd');
			},
		};
		return (
			<div className="yc-content-query">
				<div className="yc-query-item">
					<Input title="企业" style={_style1} size="large" placeholder="企业名称" {...getFieldProps('obligorName')} />
				</div>
				<div className="yc-query-item">
					<Input title="标题" style={_style1} size="large" placeholder="标题信息" {...getFieldProps('title')} />
				</div>
				<div className="yc-query-item">
					<Input title="起诉法院" style={_style1} size="large" placeholder="法院名称" {...getFieldProps('court')} />
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">发布日期：</span>
					<DatePicker size="large" style={_style2} placeholder="开始日期" {...getFieldProps('publishDateStart', timeOption)} />
					<span className="yc-query-item-title">至</span>
					<DatePicker size="large" style={_style2} placeholder="结束日期" {...getFieldProps('publishDateEnd', timeOption)} />
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">更新日期：</span>
					<DatePicker size="large" style={_style2} placeholder="开始日期" {...getFieldProps('updateTimeStart', timeOption)} />
					<span className="yc-query-item-title">至</span>
					<DatePicker size="large" style={_style2} placeholder="结束日期" {...getFieldProps('updateTimeEnd', timeOption)} />
				</div>
				<div className="yc-query-item yc-query-item-btn">
					<Button size="large" type="warning" style={{ width: 84 }} onClick={this.handleSubmit}>查询</Button>
					<Button size="large" style={{ width: 120 }} onClick={this.handleReset}>重置查询条件</Button>
				</div>
				<div className="yc-split-hr" />
			</div>
		);
	}
}
export default Form.create()(QueryCondition);
