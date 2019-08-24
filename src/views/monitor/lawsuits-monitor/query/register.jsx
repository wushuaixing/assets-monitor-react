import React from 'react';
import { Input, Button } from '@/common';
import { DatePicker, Form, Radio } from 'antd';

class QueryCondition extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filterCurrentOrg: 1,
		};
	}

	handleSubmit=() => {
		const { form: { getFieldsValue }, onQueryChange } = this.props;
		const { filterCurrentOrg } = this.state;
		const condition = getFieldsValue();
		condition.filterCurrentOrg = Boolean(filterCurrentOrg);
		if (onQueryChange)onQueryChange(condition);
		// console.log('condition:', condition);
	};

	handleReset=() => {
		const { form, onQueryChange } = this.props;
		form.resetFields();
		this.setState({
			filterCurrentOrg: 1,
		});
		const condition = form.getFieldsValue();
		if (onQueryChange)onQueryChange(condition);
	};

	radioChange=(e) => {
		console.log('radio checked', e.target.value);
		this.setState({
			filterCurrentOrg: e.target.value,
		});
	};

	render() {
		const _style1 = { width: 274 };
		const _style2 = { width: 100 };
		const { form: { getFieldProps } } = this.props;
		const { filterCurrentOrg } = this.state;
		const timeOption = {
			normalize(n) {
				return n && new Date(n).format('yyyy-MM-dd');
			},
		};
		return (
			<div className="yc-content-query">
				<div className="yc-query-item">
					<Input title="原告" style={_style1} size="large" placeholder="原告姓名/公司" {...getFieldProps('yg')} />
				</div>
				<div className="yc-query-item">
					<Input title="被告" style={_style1} size="large" placeholder="被告姓名/公司" {...getFieldProps('bg')} />
				</div>
				<div className="yc-query-item">
					<Input title="案号" style={_style1} size="large" placeholder="案号" {...getFieldProps('ah')} />
				</div>
				<div className="yc-query-item">
					<Input title="法院" style={_style1} size="large" placeholder="法院名称" {...getFieldProps('court')} />
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">立案/开庭日期：</span>
					<DatePicker size="large" style={_style2} placeholder="开始日期" {...getFieldProps('startLarq', timeOption)} />
					<span className="yc-query-item-title">至</span>
					<DatePicker size="large" style={_style2} placeholder="结束日期" {...getFieldProps('endLarq', timeOption)} />
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">更新日期：</span>
					<DatePicker size="large" style={_style2} placeholder="开始日期" {...getFieldProps('startUpdateTime', timeOption)} />
					<span className="yc-query-item-title">至</span>
					<DatePicker size="large" style={_style2} placeholder="结束日期" {...getFieldProps('endUpdateTime', timeOption)} />
				</div>

				<div className="yc-query-item" style={{ height: 34, paddingTop: 9 }}>
					<span className="yc-query-item-title">是否过滤本机机构：</span>
					<Radio.Group onChange={this.radioChange} value={filterCurrentOrg}>
						<Radio key="a" value={1}>是</Radio>
						<Radio key="b" value={0}>否</Radio>
					</Radio.Group>
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
