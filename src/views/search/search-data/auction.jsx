import React from 'react';
import './style.scss';
import {
	DatePicker, Select, Button, Form, message,
} from 'antd';
import { navigate } from '@reach/router';
import {
	Input, timeRule,
} from '@/common';
import { generateUrlWithParams, objectKeyIsEmpty } from '@/utils';
import InputPrice from '@/common/input/input-price';

const createForm = Form.create;
const _style1 = { marginRight: 27, width: 240 };
const _style2 = { width: 120 };
const _style3 = { width: 225 };
class AUCTION extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	// 搜索
	search = () => {
		const { form } = this.props; // 会提示props is not defined
		const { startTime, endTime } = this.state;
		const { getFieldsValue } = form;
		const fildes = getFieldsValue();
		fildes.startTime = startTime;
		fildes.endTime = endTime;

		console.log(fildes);
		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(fildes)) {
			// 将值传到URL
			navigate(generateUrlWithParams('/search/detail/auction', fildes));
		} else {
			message.error('请至少输入一个搜索条件');
		}
	}

	// 重置输入框
	queryReset = () => {
		const { form } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		resetFields('');
	}

	render() {
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps, getFieldValue, setFieldsValue } = form;
		return (
			<div className="yc-tabs-data" style={{ padding: '0 40px' }}>
				<div className="yc-tabs-items">
					<div style={_style1} className="item">
						<Input
							title="债务人"
							placeholder="姓名/公司名称"
							{...getFieldProps('name', {
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div style={_style1} className="item">
						<Input
							title="证件号"
							placeholder="身份证号/统一社会信用代码"
							{...getFieldProps('number', {
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div style={_style3} className="item">
						<Input
							title="产权证"
							placeholder="房产证/土地证号"
							{...getFieldProps('certificate', {
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div style={_style1} className="item">
						<Input
							title="处置机关"
							placeholder="处置法院/单位"
							{...getFieldProps('court', {
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div style={_style1} className="item">
						<InputPrice
							title="评估价"
							style={_style1}
							size="large"
							suffix="万元"
							inputFirstProps={getFieldProps('lowestConsultPrice', {
								validateTrigger: 'onBlur',
								rules: [
									{
										required: true,
										validator(rule, value, callback) {
											const highestConsultPrice = getFieldValue('highestConsultPrice');
											if (highestConsultPrice && value) {
												if (Number(value) > Number(highestConsultPrice)) {
													message.error('评估价最低价不得高过最高价');
													setFieldsValue({ lowestConsultPrice: '' });
												}
											}
											if (Number.isNaN(Number(value)) || Number(value) % 1 !== 0) {
												message.error('只能输入整数数字');
												setFieldsValue({ lowestConsultPrice: '' });
											}
											callback();
										},
									}],
								getValueFromEvent: e => e.target.value.trim(),
							})}
							inputSecondProps={getFieldProps('highestConsultPrice', {
								validateTrigger: 'onBlur',
								rules: [
									{
										required: true,
										validator(rule, value, callback) {
											const lowestConsultPrice = getFieldValue('lowestConsultPrice');
											if (lowestConsultPrice && value) {
												if (Number(value) < Number(lowestConsultPrice)) {
													message.error('评估价最高价不得低于最低价');
													setFieldsValue({ highestConsultPrice: '' });
												}
											}
											if (Number.isNaN(Number(value)) || Number(value) % 1 !== 0) {
												message.error('只能输入整数数字');
												setFieldsValue({ highestConsultPrice: '' });
											}
											callback();
										},
									}],
								getValueFromEvent: e => e.target.value.trim(),
							})}
						/>
					</div>
					<div style={_style3} className="item">
						<Input
							title="地址"
							placeholder="地址信息"
							{...getFieldProps('addr', {
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
				</div>
				<div className="other">
					<span>开拍时间：</span>
					<DatePicker
						style={_style2}
						placeholder="开始日期"
						size="large"
						allowClear
						{...getFieldProps('startTime', {
							onChange: (value, dateString) => {
								console.log(value, dateString);
								this.setState({
									startTime: dateString,
								});
							},
						})}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('endTime'))}
					/>
					<span style={{ margin: '0 2px ' }}>至</span>
					<DatePicker
						style={_style2}
						placeholder="结束日期"
						size="large"
						allowClear
						{...getFieldProps('endTime', {
							onChange: (value, dateString) => {
								console.log(value, dateString);
								this.setState({
									endTime: dateString,
								});
							},
						})}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startTime'))}
					/>
				</div>
				<div className="other">
					<span>拍卖状态：</span>
					<Select
						style={_style2}
						placeholder="请选择拍卖状态"
						size="large"
						{...getFieldProps('status', {
						})}
					>
						<Select.Option value="9">中止</Select.Option>
						<Select.Option value="11">撤回</Select.Option>
						<Select.Option value="5">已成交</Select.Option>
						<Select.Option value="7">已流拍</Select.Option>
						<Select.Option value="0">即将开始</Select.Option>
						<Select.Option value="3">正在进行</Select.Option>
					</Select>
				</div>
				<div className="btn">
					<Button
						type="primary"
						size="large"
						className="yc-high-search"
						onClick={this.search}
					>
						搜索
					</Button>
					<Button onClick={this.queryReset} type="ghost" size="large">
						重置搜索条件
					</Button>
				</div>
			</div>
		);
	}
}
export default createForm()(AUCTION);
