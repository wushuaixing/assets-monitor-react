import React, { Component } from 'react';
import {
	DatePicker, Form, message,
} from 'antd';
import {
	Input, Button, timeRule,
} from '@/common';

const createForm = Form.create;

const _style1 = { width: 274 };
const _style2 = { width: 160 };
class Penalties extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startTime: undefined,
			endTime: undefined,
		};
	}

	// 搜索
	search = () => {
		const { startTime, endTime } = this.state;
		const { form, getTableList } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const fildes = getFieldsValue();
		if (startTime && endTime && startTime > endTime) {
			message.warning('结束时间必须大于开始时间');
			return;
		}
		const params = {
			...fildes,
			page: 1,
			num: 10,
			uploadTimeStart: startTime || null, // 搜索时间
			uploadTimeEnd: endTime || null,
			startTime: startTime || null, // 搜索时间
			endTime: endTime || null,
		};

		getTableList(params);
	}

	// 重置输入框
	queryReset = () => {
		const { form } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		resetFields('');
		this.setState({
			startTime: undefined,
			endTime: undefined,
		});
	}

	render() {
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps, getFieldValue } = form;

		return (
			<div className="yc-content-query">
				<Form layout="inline">
					<div className="yc-query-item">
						<Input
							title="债务人"
							style={_style1}
							size="large"
							placeholder="姓名/公司名称"
							{...getFieldProps('detober', {

								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>

					<div className="yc-query-item">
						<Input
							title="违法类型"
							style={_style1}
							size="large"
							placeholder="违法行为类型"
							{...getFieldProps('obligorName', {

								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>

					<div className="yc-query-item">
						<Input
							title="决定文书号"
							style={_style1}
							size="large"
							placeholder="处罚决定文书号"
							{...getFieldProps('obligorName', {

								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>

					<div className="yc-query-item">
						<Input
							title="决定机关"
							style={_style1}
							size="large"
							placeholder="作出处罚决定机关"
							{...getFieldProps('obligorName', {

								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>

					<div className="yc-query-item">
						<span className="yc-query-item-title">决定日期: </span>
						<DatePicker
							{...getFieldProps('uploadTimeStart', {
								onChange: (value, dateString) => {
									this.setState({
										startTime: dateString,
									});
								},
							})}
							disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('uploadTimeEnd'))}
							size="large"
							style={_style2}
							placeholder="搜索范围起始变更日期"
						/>
						<span className="yc-query-item-title">至</span>
						<DatePicker
							{...getFieldProps('uploadTimeEnd', {
								onChange: (value, dateString) => {
									this.setState({
										endTime: dateString,
									});
								},
							})}
							disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('uploadTimeStart'))}
							size="large"
							style={_style2}
							placeholder="搜索范围截止变更日期"
						/>
					</div>

					<div className="yc-query-item">
						<span className="yc-query-item-title">更新日期: </span>
						<DatePicker
							{...getFieldProps('uploadTimeStart', {
								onChange: (value, dateString) => {
									this.setState({
										startTime: dateString,
									});
								},
							})}
							disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('uploadTimeEnd'))}
							size="large"
							style={_style2}
							placeholder="搜索范围起始变更日期"
						/>
						<span className="yc-query-item-title">至</span>
						<DatePicker
							{...getFieldProps('uploadTimeEnd', {
								onChange: (value, dateString) => {
									this.setState({
										endTime: dateString,
									});
								},
							})}
							disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('uploadTimeStart'))}
							size="large"
							style={_style2}
							placeholder="搜索范围截止变更日期"
						/>
					</div>
					<div className="yc-query-item yc-query-item-btn">
						<Button onClick={this.search} size="large" type="warning" style={{ width: 84 }}>查询</Button>
						<Button onClick={this.queryReset} size="large" style={{ width: 120 }}>重置查询条件</Button>
					</div>
					<div className="yc-split-hr" />
				</Form>
			</div>
		);
	}
}

export default createForm()(Penalties);
