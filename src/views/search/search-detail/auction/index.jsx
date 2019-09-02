import React from 'react';
// ==================
// 所需的所有组件
// ==================
import { Form, DatePicker, Select } from 'antd';
import { getQueryByName } from '@/utils';
import { Spin, Input, Button } from '@/common';
import InputPrice from '@/common/input/input-price';
import './style.scss';

const _style1 = { width: 274 };
const _style2 = { width: 120 };
const _style3 = { width: 80 };
const { Option } = Select;
const createForm = Form.create;

class AUCTION extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}


	render() {
		const { startTime, endTime } = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps } = form;
		return (
			<div className="yc-content-query">
				<div className="yc-query-item">
					<Input
						title="债务人"
						style={_style1}
						size="large"
						placeholder="姓名/公司名称"
						{...getFieldProps('content', {
							// initialValue: content,
							// rules: [
							// 	{ required: true, whitespace: true, message: '请填写密码' },
							// ],
							getValueFromEvent: e => e.trim(),
						})}
					/>
				</div>
				<div className="yc-query-item">
					<Input
						title="证件号"
						style={_style1}
						size="large"
						placeholder="身份证号/统一社会信用代码"
						{...getFieldProps('content', {
							// initialValue: content,
							// rules: [
							// 	{ required: true, whitespace: true, message: '请填写密码' },
							// ],
							getValueFromEvent: e => e.trim(),
						})}
					/>
				</div>
				<div className="yc-query-item">
					<Input
						title="产权证"
						style={_style1}
						size="large"
						placeholder="房产证/土地证号"
						{...getFieldProps('content', {
							// initialValue: content,
							// rules: [
							// 	{ required: true, whitespace: true, message: '请填写密码' },
							// ],
							getValueFromEvent: e => e.trim(),
						})}
					/>
				</div>
				<div className="yc-query-item">
					<InputPrice
						title="评估价"
						style={_style1}
						size="large"
						suffix="万元"
						inputFirstProps={getFieldProps('consultPriceStart')}
						inputSecondProps={getFieldProps('consultPriceEnd')}
					/>
				</div>
				<div className="yc-query-item">
					<Input
						title="处置机关"
						style={_style1}
						size="large"
						placeholder="处置法院/单位"
						{...getFieldProps('content', {
							// initialValue: content,
							// rules: [
							// 	{ required: true, whitespace: true, message: '请填写密码' },
							// ],
							getValueFromEvent: e => e.trim(),
						})}
					/>
				</div>
				<div className="yc-query-item">
					<Input
						title="地址"
						style={_style1}
						size="large"
						placeholder="地址信息"
						{...getFieldProps('content', {
							// initialValue: content,
							// rules: [
							// 	{ required: true, whitespace: true, message: '请填写密码' },
							// ],
							getValueFromEvent: e => e.trim(),
						})}
					/>
				</div>
				<div style={{ borderBottom: '1px solid #F0F2F5' }}>
					<div className="yc-query-item">
						<span className="yc-query-item-title">开拍时间: </span>
						<DatePicker
							{...getFieldProps('uploadTimeStart', {
							// initialValue: true,
							// rules: [
							// 	{ required: true, whitespace: true, message: '请填写密码' },
							// ],
								onChange: (value, dateString) => {
									console.log(value, dateString);
									this.setState({
										startTime: dateString,
									});
								},
							})}
							size="large"
							style={_style2}
							placeholder="开始日期"
						/>
						<span className="yc-query-item-title">至</span>
						<DatePicker
							{...getFieldProps('uploadTimeEnd', {
							// initialValue: true,
							// rules: [
							// 	{ required: true, whitespace: true, message: '请填写密码' },
							// ],
								onChange: (value, dateString) => {
									console.log(value, dateString);
									this.setState({
										endTime: dateString,
									});
								},
							})}
							size="large"
							style={_style2}
							placeholder="结束日期"
						/>
					</div>
					<div className="yc-query-item">
						<span className="yc-query-item-title">拍卖状态: </span>
						<Select
							size="large"
							allowClear
							defaultValue="1"
							style={_style3}
							{...getFieldProps('dishonestStatus', {
								initialValue: '1',
							// rules: [
							// 	{ required: true, whitespace: true, message: '请填写密码' },
							// ],
							})}
						>
							<Option value="1">全部</Option>
							<Option value="2">中止</Option>
							<Option value="3">已成交</Option>
							<Option value="4">已流拍</Option>
							<Option value="5">即将开始</Option>
							<Option value="6">正在进行</Option>
						</Select>
					</div>
					<div className="yc-query-item yc-query-item-btn">
						<Button onClick={this.search} size="large" type="warning" style={{ width: 84 }}>查询</Button>
						<Button onClick={this.queryReset} size="large" style={{ width: 120 }}>重置查询条件</Button>
					</div>
				</div>
			</div>
		);
	}
}

export default createForm()(AUCTION);
