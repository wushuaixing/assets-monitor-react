import React from 'react';
import { navigate } from '@reach/router';
import { Form, Select } from 'antd';
import {
	Input, Button, timeRule, DatePicker,
} from '@/common';
import { parseQuery } from '@/utils';
import { generateUrlWithParams, objectKeyIsEmpty } from '@/utils';
import './style.scss';
import provinceList from '@/utils/provinceList';

const createForm = Form.create;
const _style1 = { width: 278 };
const _style2 = { width: 140 };

class QUERYLAWSUITS extends React.Component {
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
				this.search();
				document.activeElement.blur();
			}
		}
	};

	// 搜索
	search = () => {
		const { pageSize } = this.state;
		const {
			type, getData, getCount, queryReset, getQueryData,
		} = this.props;
		const { hash } = window.location;
		const urlObj = parseQuery(hash);
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const fields = getFieldsValue();

		fields.type = type;

		const queryParams = {
			caseNumber: fields.ah,
			court: fields.court,
			startGmtRegister: fields.startLarq,
			endGmtRegister: fields.endLarq,
			startGmtTrial: fields.startLarq,
			endGmtTrial: fields.endLarq,
			page: 1,
			num: pageSize,
		};


		console.log(fields);

		console.log('queryParams:', queryParams);
		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(fields)) {
			// 将值传到URL
			navigate(generateUrlWithParams('/yc/information/land/landTransfer/search', fields));
			getData(queryParams, type); // 进入页面请求数据
			getCount(queryParams);
		} else {
			queryReset();
			// message.error('请至少输入一个搜索条件');
		}
		getQueryData(queryParams);
	};

	// 重置输入框
	queryReset = () => {
		const { form, queryReset } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		navigate('/search/detail/lawsuits');
		resetFields('');
		queryReset();
	};

	render() {
		const {
			form, urlObj,
		} = this.props; // 会提示props is not defined
		const { getFieldProps, getFieldValue } = form;
		const timeOption = {
			normalize(n) {
				return typeof n === 'object' ? (n && new Date(n).format('yyyy-MM-dd')) : n;
			},
		};
		return (
			<div>
				<div>
					<div className="yc-query-item">
						<Input
							title="个人/企业"
							style={_style1}
							size="large"
							maxLength="20"
							placeholder="个人/企业名称"
							{...getFieldProps('name', {
								initialValue: urlObj.name || undefined,
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div className="yc-query-item">
						<span>土地省份：</span>
						<Select
							style={{ width: 120 }}
							placeholder="请选择拍卖状态"
							size="large"
							{...getFieldProps('province', { initialValue: urlObj.province })}
						>
							{
								<Select.Option key="-1" value="-1">全国</Select.Option>
							}
							{
								provinceList && provinceList.provinceList.map(city => <Select.Option key={city.id} value={city.name}>{city.name}</Select.Option>)
							}
						</Select>
					</div>
					<div className="yc-query-item">
						<Input
							title="宗地坐落"
							style={_style1}
							size="large"
							maxLength="20"
							placeholder="宗地坐落"
							{...getFieldProps('landAddress', {
								initialValue: urlObj.landAddress || undefined,
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div className="yc-query-item">
						<Input
							title="土地用途"
							style={_style1}
							size="large"
							maxLength="20"
							placeholder="土地用途"
							{...getFieldProps('landUse', {
								initialValue: urlObj.landUse || undefined,
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div className="yc-query-item">
						<span className="yc-query-item-lable">出让/转让/抵押日期: </span>
						<DatePicker
							{...getFieldProps('signedTimeStart', {
								initialValue: urlObj.signedTimeStart,
								// onChange: (value, dateString) => {
								// 	this.setState({
								// 		startLarq: dateString,
								// 	});
								// },
								...timeOption,
							})}
							disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('endLarq'))}
							size="large"
							style={_style2}
							placeholder="开始日期"
						/>
						<span className="yc-query-item-lable">至</span>
						<DatePicker
							{...getFieldProps('signedTimeEnd', {
								initialValue: urlObj.signedTimeEnd || undefined,
								// onChange: (value, dateString) => {
								// 	this.setState({
								// 		endLarq: dateString,
								// 	});
								// },
								...timeOption,
							})}
							disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('startLarq'))}
							size="large"
							style={_style2}
							placeholder="结束日期"
						/>
					</div>
					<div className="yc-query-item yc-query-item-btn">
						<Button onClick={() => this.search()} size="large" type="common" style={{ width: 84 }}>查询</Button>
						<Button onClick={() => this.queryReset()} size="large" style={{ width: 120 }}>重置查询条件</Button>
					</div>
				</div>
				{/* 分隔下划线 */}
				<div className="yc-haveTab-hr" />
			</div>
		);
	}
}

export default createForm()(QUERYLAWSUITS);
