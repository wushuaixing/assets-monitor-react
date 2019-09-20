import React from 'react';
import { Input, Button, timeRule } from '@/common';
import InputPrice from '@/common/input/input-price';
import {
	DatePicker, Form, message, Select,
} from 'antd';

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
					<Input title="债务人" style={_style1} size="large" placeholder="企业债务人名称" {...getFieldProps('obName')} />
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">登记状态：</span>
					<Select
						size="large"
						defaultValue="all"
						style={{ width: 150 }}
						{...getFieldProps('important1', { initialValue: '' })}
					>
						<Select.Option value="">全部</Select.Option>
						<Select.Option value="1">有效</Select.Option>
						<Select.Option value="2">无效</Select.Option>
					</Select>
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">质押角色：</span>
					<Select
						size="large"
						defaultValue="all"
						style={{ width: 150 }}
						{...getFieldProps('important2', { initialValue: '' })}
					>
						<Select.Option value="">全部</Select.Option>
						<Select.Option value="1">出质人</Select.Option>
						<Select.Option value="2">质权人</Select.Option>
					</Select>
				</div>

				<div className="yc-query-item">
					<InputPrice
						title="成交价格"
						style={_style1}
						size="large"
						suffix="万元"
						inputFirstProps={getFieldProps('consultPriceStart', {
							validateTrigger: 'onBlur',
							getValueFromEvent: e => (e.target.value < 0 ? 1 : e.target.value.trim().replace(/[^0-9]/g, '').replace(/^[0]+/, '')),
							rules: [
								{
									required: true,
									validator(rule, value, callback) {
										const consultPriceEnd = getFieldValue('consultPriceEnd');
										if (consultPriceEnd && value) {
											if (Number(value) > Number(consultPriceEnd)) {
												message.error('评估价最低价不得高过最高价', 2);
												// setFieldsValue({ consultPriceStart: '' });
											}
										}
										if (Number.isNaN(Number(value)) || Number(value) % 1 !== 0 || Number(value) < 0) {
											message.error('只能输入正整数！', 2);
											// setFieldsValue({ consultPriceStart: '' });
										}
										// if (Number(value) > 9999999) {
										// 	message.error('数值上限不得超过9999999', 2);
										// 	// setFieldsValue({ consultPriceStart: '' });
										// }
										callback();
									},
								}],
						})}
						inputSecondProps={getFieldProps('consultPriceEnd', {
							validateTrigger: 'onBlur',
							getValueFromEvent: e => (e.target.value < 0 ? 1 : e.target.value.trim().replace(/[^0-9]/g, '').replace(/^[0]+/, '')),
							rules: [
								{
									required: true,
									validator(rule, value, callback) {
										const consultPriceStart = getFieldValue('consultPriceStart');
										if (consultPriceStart && value) {
											if (Number(value) < Number(consultPriceStart)) {
												message.error('评估价最高价不得低于最低价', 2);
												// setFieldsValue({ consultPriceEnd: '' });
											}
										}
										if (Number.isNaN(Number(value)) || Number(value) % 1 !== 0 || Number(value) < 0) {
											message.error('只能输入正整数', 2);
											// setFieldsValue({ consultPriceEnd: '' });
										}
										// if (Number(value) > 9999999) {
										// 	message.error('数值上限不得超过9999999', 2);
										// 	// setFieldsValue({ consultPriceEnd: '' });
										// }
										callback();
									},
								}],
						})}
					/>
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">签订日期：</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('startPublishTime', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('endPublishTime'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('endPublishTime', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startPublishTime'))}
					/>
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">{`${global.Table_CreateTime_Text}：`}</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('startCreateTime', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('endCreateTime'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('endCreateTime', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startCreateTime'))}
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
