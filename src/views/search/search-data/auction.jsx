import React from 'react';
import {
	Select, Button, Form, message,
} from 'antd';
import { navigate } from '@reach/router';
import {
	Input, timeRule, DatePicker,
} from '@/common';
import { generateUrlWithParams, objectKeyIsEmpty } from '@/utils';
import InputPrice from '@/common/input/input-price';
import './style.scss';

const createForm = Form.create;
const _style1 = { marginRight: 16, width: 259 };
const _style2 = { width: 116 };
const _style3 = { width: 259 };
class AUCTION extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {

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
				this.search();
				document.activeElement.blur();
			}
		}
	};

	// 搜索
	search = () => {
		const { form } = this.props; // 会提示props is not defined
		const { startTime, endTime } = this.state;
		const { getFieldsValue } = form;
		const fildes = getFieldsValue();
		fildes.startTime = startTime;
		fildes.endTime = endTime;
		// console.log(fildes);

		if (fildes.lowestConsultPrice && Number(fildes.lowestConsultPrice) > fildes.highestConsultPrice && Number(fildes.highestConsultPrice)) {
			message.error('评估价格最低价不能高于评估价格最高价！');
			return;
		}
		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(fildes)) {
			// console.log(fildes);

			// 将值传到URL
			navigate(generateUrlWithParams('/search/detail/auction', fildes));
		} else {
			message.error('请至少输入一个搜索条件');
		}
	};

	// 重置输入框
	queryReset = () => {
		const { form } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		this.setState({
			startTime: undefined,
			endTime: undefined,
		});
		resetFields('');
	};

	render() {
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps, getFieldValue } = form;
		const timeOption = {
			normalize(n) {
				return typeof n === 'object' ? (n && new Date(n).format('yyyy-MM-dd')) : n;
			},
		};
		return (
			<div className="yc-tabs-data" style={{ padding: '0 22px' }}>
				<div className="yc-tabs-items">
					<div style={_style1} className="item">
						<Input
							title="债务人"
							placeholder="姓名/公司名称"
							maxLength="40"
							{...getFieldProps('name', {
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div style={_style1} className="item">
						<Input
							title="证件号"
							maxLength="18"
							placeholder="身份证号/统一社会信用代码"
							{...getFieldProps('number', {
								getValueFromEvent: e => e.trim().replace(/[^0-9a-zA-Z-*（）()]/g, ''),
								// getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div style={_style3} className="item">
						<Input
							title="产权证"
							maxLength="40"
							placeholder="房产证/土地证号"
							{...getFieldProps('certificate', {
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div style={_style1} className="item">
						<Input
							title="处置机关"
							maxLength="20"
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
							maxLength="9"
							inputFirstProps={getFieldProps('lowestConsultPrice', {
								validateTrigger: 'onBlur',
								getValueFromEvent: e => (e.target.value < 0 ? 1 : e.target.value.trim().replace(/[^0-9]/g, '').replace(/^[0]+/, '')),
								rules: [
									{ required: true },
								],
							})}
							inputSecondProps={getFieldProps('highestConsultPrice', {
								validateTrigger: 'onBlur',
								getValueFromEvent: e => (e.target.value < 0 ? 1 : e.target.value.trim().replace(/[^0-9]/g, '').replace(/^[0]+/, '')),
								rules: [
									{ required: true },
								],
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
							...timeOption,
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
							...timeOption,
						})}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startTime'))}
					/>
				</div>
				<div className="other">
					<span>拍卖状态：</span>
					<Select
						style={{ width: 120 }}
						placeholder="请选择拍卖状态"
						size="large"
						{...getFieldProps('status', {
						})}
					>
						<Select.Option value="9">中止</Select.Option>
						<Select.Option value="11">撤回</Select.Option>
						<Select.Option value="5">已成交</Select.Option>
						<Select.Option value="7">已流拍</Select.Option>
						<Select.Option value="1">即将开始</Select.Option>
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
export const Name = 'AUCTION';
