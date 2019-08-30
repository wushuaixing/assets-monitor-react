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
const _style3 = { width: 100 };
const _style4 = { width: 1130 };
const { Option } = Select;
const createForm = Form.create;

class WRIT extends React.Component {
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
						title="全文"
						style={_style4}
						size="large"
						placeholder="姓名/公司名称/关键字"
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
						title="案号"
						style={_style1}
						size="large"
						placeholder="案件编号"
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
						title="案由"
						style={_style1}
						size="large"
						placeholder="案件内容提要"
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
						title="起诉法院"
						style={_style1}
						size="large"
						placeholder="法院名称"
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
						<span className="yc-query-item-title">发布时间: </span>
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
						<span className="yc-query-item-title">案件类型: </span>
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
							<Option value="2">刑事案件</Option>
							<Option value="3">民事案件</Option>
							<Option value="4">行政案件</Option>
							<Option value="5">赔偿案件</Option>
							<Option value="6">执行案件</Option>
							<Option value="7">知识产权</Option>
							<Option value="8">商事</Option>
							<Option value="9">海事海商</Option>
							<Option value="10">申诉</Option>
							<Option value="11">其他</Option>
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

export default createForm()(WRIT);
