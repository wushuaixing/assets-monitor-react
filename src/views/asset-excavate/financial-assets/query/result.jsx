import React from 'react';
import {
	DatePicker, Form, Select,
} from 'antd';
import { Input, Button, timeRule } from '@/common';

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
		const condition = 	form.getFieldsValue();
		if (onQueryChange)onQueryChange(condition, '', '', 1);
	};

	render() {
		const _style1 = { width: 278 };
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
					<Input title="债务人" style={_style1} size="large" placeholder="企业债务人名称" {...getFieldProps('obligorName')} />
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">登记状态：</span>
					<Select
						size="large"
						defaultValue="all"
						style={{ width: 150 }}
						{...getFieldProps('state', { initialValue: '' })}
					>
						<Select.Option value="">全部</Select.Option>
						<Select.Option value="0">有效</Select.Option>
						<Select.Option value="1">无效</Select.Option>
					</Select>
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">质押角色：</span>
					<Select
						size="large"
						defaultValue="all"
						style={{ width: 150 }}
						{...getFieldProps('role', { initialValue: '' })}
					>
						<Select.Option value="">全部</Select.Option>
						<Select.Option value="0">出质人</Select.Option>
						<Select.Option value="1">质权人</Select.Option>
					</Select>
				</div>

				{/* <div className="yc-query-item">
					<InputPrice
						title="成交价格"
						style={_style1}
						size="large"
						suffix="万元"
						inputFirstProps={getFieldProps('consultPriceStart', {
							validateTrigger: 'onBlur',
							getValueFromEvent: e => (e.target.value < 0 ? 1 : e.target.value.trim().replace(/[^0-9]/g, '').replace(/^[0]+/, '')),

						})}
						inputSecondProps={getFieldProps('consultPriceEnd', {
							validateTrigger: 'onBlur',
							getValueFromEvent: e => (e.target.value < 0 ? 1 : e.target.value.trim().replace(/[^0-9]/g, '').replace(/^[0]+/, '')),

						})}
					/>
				</div> */}

				<div className="yc-query-item">
					<span className="yc-query-item-title">登记日期：</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('regDateStart', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('regDateEnd'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('regDateEnd', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('regDateStart'))}
					/>
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">{`${global.Table_CreateTime_Text}：`}</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('createTimeStart', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('createTimeEnd'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('createTimeEnd', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('createTimeStart'))}
					/>
				</div>

				<div className="yc-query-item yc-query-item-btn">
					<Button size="large" type="common" style={{ width: 84 }} onClick={this.handleSubmit}>查询</Button>
					<Button size="large" style={{ width: 120 }} onClick={this.handleReset}>重置查询条件</Button>
				</div>
				<div className="yc-split-hr" />
			</div>
		);
	}
}
export default Form.create()(QueryCondition);
