import React from 'react';
import { Input, Button, timeRule } from '@/common';
import { DatePicker, Form } from 'antd';

class QueryCondition extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		window._addEventListener(document, 'keyup', this.toKeyCode13);
	}

	componentWillUnmount() {
		window._removeEventListener(document, 'keyup', this.toKeyCode13);
	}

	toKeyCode13=(e) => {
		const event = e || window.event;
		const key = event.keyCode || event.which || event.charCode;
		if (document.activeElement.nodeName === 'INPUT' && key === 13) {
			const { className } = document.activeElement.offsetParent;
			if (/yc-input-wrapper/.test(className)) {
				this.handleSubmit();
				document.activeElement.blur();
			}
		}
	};

	handleSubmit=() => {
		const { form: { getFieldsValue }, onQueryChange } = this.props;
		const condition = getFieldsValue();
		if (onQueryChange)onQueryChange(condition, '', '', 1);
	};

	handleReset=() => {
		const { form, onQueryChange } = this.props;
		form.resetFields();
		const condition = form.getFieldsValue();
		if (onQueryChange)onQueryChange(condition, '', '', 1);
		// console.log(form.getFieldsValue());
	};

	render() {
		const _style1 = { width: 274 };
		const _style2 = { width: 100 };
		const { form: { getFieldProps, getFieldValue } } = this.props;
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
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('publishDateStart', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('publishDateEnd'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('publishDateEnd', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('publishDateStart'))}
					/>
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">更新日期：</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('updateTimeStart', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('updateTimeEnd'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('updateTimeEnd', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('updateTimeStart'))}
					/>
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
