import React from 'react';
// ==================
// 所需的所有组件
// ==================
import {
	Form, Pagination, message, DatePicker,
} from 'antd';
import { parseQuery, getQueryByName } from '@/utils';
import {
	Spin, Input, Button, Tabs,
} from '@/common';
import close from '@/assets/img/icon/close.png';
import add from '@/assets/img/icon/icon_add.png';
import './style.scss';

const createForm = Form.create;
const _style1 = { width: 274 };
const _style2 = { width: 120 };
class LAWSUITS extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tabConfig: [
				{
					id: 1,
					name: '立案信息',
					dot: false,
					number: 0,
					showNumber: false,
				},
				{
					id: 2,
					name: '开庭公告',
					number: 0,
					dot: false,
					showNumber: false,
				},
			],
			yg: [
				{
					name: '',
					id: 1,
				},
			],
			bg: [
				{
					name: '',
					id: 1,
				},
			],
			sourceType: 1,
		};
	}

	componentDidMount() {
		const { hash } = window.location;
		const params = parseQuery(hash);
		console.log(params);

		const { form } = this.props; // 会提示props is not defined
		const { setFieldsValue } = form;
		this.initialValue(params);
		setFieldsValue({
			yg0: params.yg0,
			yg1: params.yg1,
			yg2: params.yg2,
			bg0: params.bg0,
			bg1: params.bg1,
			bg2: params.bg2,
		});
	}

	initialValue = (params) => {
		if (params.yg1) {
			this.addYg(params.yg1);
		}
		if (params.yg2) {
			this.addYg(params.yg2);
		}

		if (params.bg1) {
			this.addBg(params.yg1);
		}
		if (params.bg2) {
			this.addBg(params.yg2);
		}
	}

	// 搜索
	search = () => {
		const { form } = this.props; // 会提示props is not defined
		const {
			startTime, endTime,
		} = this.state;
		const { getFieldsValue } = form;
		const fildes = getFieldsValue();
		console.log(fildes);

		// if (startTime && endTime && startTime > endTime) {
		// 	message.warning('结束时间必须大于开始时间');
		// 	return;
		// }
		// const params = {
		// 	...fildes,
		// 	page: 1,
		// 	num: 10,
		// 	uploadTimeStart: startTime || null, // 搜索时间
		// 	uploadTimeEnd: endTime || null,
		// };

		// this.getData(params);
		// this.setState({
		// 	searchValue: params,
		// });
	}

	// 重置输入框
	queryReset = () => {
		const { form } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		resetFields('');
	}

	// sourceType变化
	onSourceType=(val) => {
		this.setState({
			sourceType: val,
		});
		// this.onQueryChange(null, val, 'all', 1);
	};

	// 添加原告
	addYg = () => {
		const { yg } = this.state;
		yg.push({
			name: '',
			id: yg.length + 1,
		});
		this.setState({
			yg,
		});
	}

	// 添加被告
	addBg = (val) => {
		const { bg } = this.state;
		bg.push({
			name: val || '',
			id: bg.length + 1,
		});
		this.setState({
			bg,
		});
	}

	render() {
		const { yg, bg, tabConfig } = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps } = form;
		return (
			<div className="yc-content-query">
				<div className="yc-lawsuits-items">
					{
						yg.map((item, index) => (
							<div className="item" style={{ 'margin-right': 15 }}>
								<Input
									key={item.id}
									title="原告"
									value={item.name}
									style={_style1}
									placeholder="姓名/公司名称"
									onChange={(val) => {
										yg[index].name = val;
										this.setState({
											yg,
										});
									}}
									{...getFieldProps(`yg${index}`, {
										// initialValue: content,
										// rules: [
										// 	{ required: true, whitespace: true, message: '请填写密码' },
										// ],
										getValueFromEvent: e => e.trim(),
									})}
								/>
								{
									yg.length > 1 ? (
										<img
											alt=""
											className="close"
											src={close}
											onClick={() => {
												yg.splice(index, 1);
												this.setState({
													yg,
												});
											}}
										/>
									) : null
								}
							</div>
						))
					}
					{
						yg.length > 2 ? (<span style={{ fontSize: 12, marginTop: 5, display: 'inline-block' }}>最多可添加3个原告</span>) : (
							<img
								alt=""
								src={add}
								className="add"
								onClick={() => this.addYg()}
							/>
						)
					}
				</div>
				<div className="yc-lawsuits-items">
					{
						bg.map((item, index) => (
							<div className="item" style={{ 'margin-right': 15 }}>
								<Input
									key={item.id}
									title="被告"
									value={item.name}
									style={_style1}
									placeholder="姓名/公司名称"
									onChange={(val) => {
										bg[index].name = val;
										this.setState({
											bg,
										});
									}}
									{...getFieldProps(`bg${index}`, {
										// initialValue: content,
										// rules: [
										// 	{ required: true, whitespace: true, message: '请填写密码' },
										// ],
										getValueFromEvent: e => e.trim(),
									})}
								/>
								{
									bg.length > 1 ? (
										<img
											alt=""
											className="close"
											src={close}
											onClick={() => {
												bg.splice(index, 1);
												this.setState({
													bg,
												});
											}}
										/>
									) : null
								}
							</div>
						))
					}
					{
						bg.length > 2 ? (<span style={{ fontSize: 12, marginTop: 5, display: 'inline-block' }}>最多可添加3个被告</span>) : (
							<img
								alt=""
								src={add}
								className="add"
								onClick={() => this.addBg()}

							/>
						)
					}
				</div>
				<div style={{ borderBottom: '1px solid #F0F2F5' }}>
					<div className="yc-query-item">
						<Input
							title="起诉法院"
							style={_style1}
							size="large"
							placeholder="法院名称"
							{...getFieldProps('court', {
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
							{...getFieldProps('ah', {
							// initialValue: content,
							// rules: [
							// 	{ required: true, whitespace: true, message: '请填写密码' },
							// ],
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div className="yc-query-item">
						<span className="yc-query-item-title">日期选择: </span>
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
					<div className="yc-query-item yc-query-item-btn">
						<Button onClick={this.search} size="large" type="warning" style={{ width: 84 }}>查询</Button>
						<Button onClick={this.queryReset} size="large" style={{ width: 120 }}>重置查询条件</Button>
					</div>
					<Tabs.Simple
						onChange={this.onSourceType}
						source={tabConfig}
						field="process"
					/>
				</div>
			</div>
		);
	}
}

export default createForm()(LAWSUITS);
