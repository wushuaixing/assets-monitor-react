import React from 'react';
import { Form, Select } from 'antd';
import {
	Input, Button, timeRule, DatePicker,
} from '@/common';
import { getUrlParams, reserUrl } from '@/views/asset-excavate/query-util';
import provinceList from '@/utils/provinceList';

class QueryCondition extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const url = window.location.hash;
		if (url.indexOf('?') !== -1) {
			const dParams = getUrlParams(url, 'startCreateTime', 'endCreateTime');
			const { form: { setFieldsValue } } = this.props;
			setFieldsValue({ startCreateTime: dParams.startCreateTime });
			setFieldsValue({ endCreateTime: dParams.endCreateTime });
			this.handleSubmit();
		}
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
		if (onQueryChange)onQueryChange(condition, '', '', 1);
	};

	handleReset=() => {
		const url = window.location.hash;
		if (url.indexOf('timeHorizon') !== -1) {
			reserUrl();
		} else {
			const { form, onQueryChange, clearSelectRowNum } = this.props;
			clearSelectRowNum();// 清除选中项
			form.resetFields();
			const condition = 	form.getFieldsValue();
			if (onQueryChange)onQueryChange(condition, '', '', 1);
		}
	};

	render() {
		const _style1 = { width: 278 };
		const _style2 = { width: 100 };
		const _style3 = { width: 150 };
		const _style4 = { width: 164 };
		const { form: { getFieldProps, getFieldValue } } = this.props;
		const timeOption = {
			normalize(n) {
				return typeof n === 'object' ? (n && new Date(n).format('yyyy-MM-dd')) : n;
			},
		};
		return (
			<div className="yc-content-query">
				<div className="yc-query-item">
					<Input title="债务人" style={_style1} size="large" maxLength="40" placeholder="企业债务人名称" {...getFieldProps('obligorName')} />
				</div>
				<div className="yc-query-item" style={{ marginRight: 30 }}>
					<span className="yc-query-item-title">公告类型：</span>
					<Select size="large" style={_style3} placeholder="全部" {...getFieldProps('noticeType')} allowClear>
						<Select.Option value="法院公告">法院公告</Select.Option>
						<Select.Option value="公司合并分立公告">公司合并分立公告</Select.Option>
						<Select.Option value="机关单位公告">机关单位公告</Select.Option>
						<Select.Option value="减资公告">减资公告</Select.Option>
						<Select.Option value="交易公告">交易公告</Select.Option>
						<Select.Option value="破产/清算公告">破产/清算公告</Select.Option>
						<Select.Option value="其他公告">其他公告</Select.Option>
						<Select.Option value="行政处罚公告">行政处罚公告</Select.Option>
						<Select.Option value="遗失生明">遗失生明</Select.Option>
						<Select.Option value="债权公告">债权公告</Select.Option>
						<Select.Option value="招标采购公告">招标采购公告</Select.Option>
						<Select.Option value="未知">未知</Select.Option>
					</Select>
				</div>
				<div className="yc-query-item">
					<Input title="电子名称" style={_style1} size="large" maxLength="40" placeholder="公告标题关键字" {...getFieldProps('newspaperName')} />
				</div>
				<div className="yc-query-item">
					<span>省份：</span>
					<Select
						allowClear
						style={{ width: 181 }}
						placeholder="请选择"
						size="large"
						{...getFieldProps('province')}
					>
						{
							provinceList && provinceList.provinceList.map(city => <Select.Option key={city.id} value={city.name}>{city.name}</Select.Option>)
						}
					</Select>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">发布日期：</span>
					<DatePicker
						size="large"
						style={_style4}
						placeholder="开始日期"
						{...getFieldProps('publishTimeStart', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('publishTimeEnd'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style4}
						placeholder="结束日期"
						{...getFieldProps('publishTimeEnd', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('publishTimeStart'))}
					/>
				</div>
				<div className="yc-query-item">
					<span className="yc-query-item-title">{`${global.Table_CreateTime_Text}：`}</span>
					<DatePicker
						size="large"
						style={_style4}
						placeholder="开始日期"
						{...getFieldProps('startCreateTime', timeOption)}
						disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('gmtCreateEnd'))}
					/>
					<span className="yc-query-item-title">至</span>
					<DatePicker
						size="large"
						style={_style4}
						placeholder="结束日期"
						{...getFieldProps('endCreateTime', timeOption)}
						disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startCreateTime'))}
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
