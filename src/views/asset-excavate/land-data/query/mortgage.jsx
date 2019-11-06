import React from 'react';
import {
	DatePicker, Form, message, Select,
} from 'antd';
import provinceList from '../../../../utils/provinceList';
import { Input, Button, timeRule } from '@/common';
import InputPrice from '@/common/input/input-price';

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
		const { form: { getFieldsValue }, onQueryChange, clearSelectRowNum } = this.props;
		clearSelectRowNum();// 清除选中项
		const condition = getFieldsValue();
		if (condition.lowPrice && Number(condition.lowPrice) > condition.highPrice && Number(condition.highPrice)) {
			message.error('成交价格最低价不能高于成交价格最高价！');
			return;
		}
		if (onQueryChange)onQueryChange(condition, '', '', 1);
	};

	handleReset=() => {
		const { form, onQueryChange, clearSelectRowNum } = this.props;
		clearSelectRowNum();// 清除选中项
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
					<Input title="土地用途" style={_style1} size="large" placeholder="土地用途" {...getFieldProps('landUse')} />
				</div>

				<div className="yc-query-item">
					<InputPrice
						title="成交价格"
						style={_style1}
						size="large"
						suffix="万元"
						inputFirstProps={getFieldProps('lowPrice', {
							validateTrigger: 'onBlur',
							getValueFromEvent: e => (e.target.value < 0 ? 1 : e.target.value.trim().replace(/[^0-9]/g, '').replace(/^[0]+/, '')),
						})}
						inputSecondProps={getFieldProps('highPrice', {
							validateTrigger: 'onBlur',
							getValueFromEvent: e => (e.target.value < 0 ? 1 : e.target.value.trim().replace(/[^0-9]/g, '').replace(/^[0]+/, '')),
						})}
					/>
				</div>

				<div className="yc-query-item" style={{ marginRight: 0 }}>
					<span className="yc-query-item-title">土地省份：</span>
					<Select
						allowClear
						size="large"
						style={{ width: 212 }}
						placeholder="请选择土地省份"
						{...getFieldProps('province')}
					>
						{
							provinceList && provinceList.provinceList.map(city => <Select.Option key={city.id} value={city.name}>{city.name}</Select.Option>)
						}
					</Select>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">登记日期：</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('signedDateStart', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('signedDateEnd'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('signedDateEnd', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('signedDateStart'))}
					/>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">{`${global.Table_CreateTime_Text}：`}</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="开始日期"
						{...getFieldProps('createDateStart', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('createDateEnd'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style2}
						placeholder="结束日期"
						{...getFieldProps('createDateEnd', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('createDateStart'))}
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
