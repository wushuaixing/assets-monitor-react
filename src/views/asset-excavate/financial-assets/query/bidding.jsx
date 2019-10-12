import React from 'react';
import {
	DatePicker, Select, Form, message,
} from 'antd';
import { Input, Button, timeRule } from '@/common';
import InputPrice from '@/common/input/input-price';

class QueryCondition extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			moreOption: false,
		};
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
		const { consultPriceStart: start, consultPriceEnd: end } = condition;
		if (start && end && Number(start) > Number(end)) {
			message.error('评估价最低价不得高过最高价', 1);
			return false;
		}
		// if ((Number.isNaN(Number(start)) || Number(start) % 1 !== 0 || Number(start) < 0) || (Number.isNaN(Number(end)) || Number(end) % 1 !== 0 || Number(end) < 0)) {
		// 	message.error('评估价只能输入正整数！', 2);
		// 	// setFieldsValue({ consultPriceStart: '' });
		// 	return false;
		// }
		// if (Number(start) > 9999999 || Number(end) > 9999999) {
		// 	message.error('评估价数值上限不得超过9999999', 2);
		// 	return false;
		// 	// setFieldsValue({ consultPriceStart: '' });
		// }
		if (onQueryChange)onQueryChange(condition);
		return true;
	};

	handleReset=() => {
		const { form, onQueryChange } = this.props;
		form.resetFields();
		const condition = form.getFieldsValue();
		if (onQueryChange)onQueryChange(condition);
		// console.log('reset:', form.getFieldsValue());
	};

	render() {
		const { form: { getFieldProps, getFieldValue } } = this.props;
		const _style1 = { width: 278 };
		const _style2 = { width: 100 };
		const _style3 = { width: 80 };
		const { moreOption } = this.state;
		const timeOption = {
			normalize(n) {
				return n && new Date(n).format('yyyy-MM-dd');
			},
		};
		return (
			<div className="yc-content-query">
				<div className="yc-query-item">
					<Input title="债务人" style={_style1} size="large" placeholder="姓名/公司名称" {...getFieldProps('obligorName')} />
				</div>
				<div className="yc-query-item">
					<Input
						title="证件号"
						style={_style1}
						size="large"
						placeholder="身份证号/统一社会信用代码"
						{...getFieldProps('obligorNumber')}
					/>
				</div>
				<div className="yc-more-option inline-block cursor-pointer" style={{ marginLeft: 0 }}>
					{ moreOption
						? <span onClick={() => this.setState({ moreOption: false })}>收起选项 ▲</span>
						: <span onClick={() => this.setState({ moreOption: true })}>更多选项 ▼</span>
					}
				</div>
				<br />
				<div className={`${moreOption ? '' : 'displayNoneImportant'}`}>
					<div className="yc-query-item">
						<Input title="机构名称" style={_style1} size="large" placeholder="机构名称" {...getFieldProps('orgName')} />
					</div>
					<div className="yc-query-item">
						<InputPrice
							title="评估价"
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
						<Input title="信息标题" style={_style1} size="large" placeholder="拍卖信息标题" {...getFieldProps('title')} />
					</div>
					<div className="yc-query-item" style={{ marginRight: 0 }}>
						<Input title="处置机关" style={_style1} size="large" placeholder="处置法院/单位" {...getFieldProps('court')} />
					</div>
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">拍卖状态：</span>
					<Select size="large" defaultValue="all" style={_style3} {...getFieldProps('status', { initialValue: '' })}>
						<Select.Option value="">全部</Select.Option>
						<Select.Option value="9">中止</Select.Option>
						<Select.Option value="11">撤回</Select.Option>
						<Select.Option value="5">已成交</Select.Option>
						<Select.Option value="7">已流拍</Select.Option>
						<Select.Option value="1">即将开始</Select.Option>
						<Select.Option value="3">正在进行</Select.Option>
					</Select>
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">开拍时间：</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('startStart', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('startEnd'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('startEnd', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startStart'))}
					/>
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">更新时间：</span>
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
					<Button size="large" type="common" style={{ width: 84 }} onClick={this.handleSubmit}>查询</Button>
					<Button size="large" style={{ width: 120 }} onClick={this.handleReset}>重置查询条件</Button>
				</div>
				<div className="yc-split-hr" />
			</div>
		);
	}
}
export default Form.create()(QueryCondition);
