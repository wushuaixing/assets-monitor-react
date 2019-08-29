import React from 'react';
import { Input, Button, timeRule } from '@/common';
import { DatePicker, Form } from 'antd';

class QueryCondition extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { form: { getFieldProps, getFieldValue } } = this.props;
		const _style1 = { width: 274 };
		const _style2 = { width: 100 };
		const timeOption = {
			normalize(n) {
				return n && new Date(n).format('yyyy-MM-dd');
			},
		};
		return (
			<div className="yc-content-query">
				<div className="yc-query-item">
					<Input title="相关单位" style={_style1} size="large" placeholder="原告姓名/公司" />
				</div>
				<div className="yc-query-item">
					<Input title="项目名称" style={_style1} size="large" placeholder="被告姓名/公司" />
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">起始日期：</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('startTimeStart', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('startTimeEnd'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('startTimeEnd', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startTimeStart'))}
					/>
				</div>

				<div className="yc-query-item">
					<span className="yc-query-item-title">期满日期：</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('endTimeStart', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('endTimeEnd'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('endTimeEnd', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('endTimeStart'))}
					/>
				</div>


				<div className="yc-query-item yc-query-item-btn">
					<Button size="large" type="warning" style={{ width: 84 }}>查询</Button>
					<Button size="large" style={{ width: 120 }}>重置查询条件</Button>
				</div>
				<div className="yc-split-hr" />
			</div>
		);
	}
}
export default Form.create()(QueryCondition);
