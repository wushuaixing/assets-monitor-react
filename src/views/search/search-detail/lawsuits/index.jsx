import React from 'react';
// ==================
// 所需的所有组件
// ==================
import {
	Form, DatePicker, Tooltip,
} from 'antd';
import { parseQuery } from '@/utils';
import {
	Spin, Input, Button, Tabs,
} from '@/common';
import LawsuitsTable from './table';
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
		};
	}

	componentDidMount() {
		const { hash } = window.location;
		const params = parseQuery(hash);
		console.log(params);
		const {
			yg, bg,
		} = this.state;
		this.initialValue(params);
		if (yg[0]) {
			yg[0].name = params.yg0 ? params.yg0 : '';
		}
		if (yg[1]) {
			yg[1].name = params.yg1 ? params.yg1 : '';
		}
		if (yg[2]) {
			yg[2].name = params.yg2 ? params.yg2 : '';
		}
		if (bg[0]) {
			bg[0].name = params.bg0 ? params.bg0 : '';
		}
		if (bg[1]) {
			bg[1].name = params.bg1 ? params.bg1 : '';
		}
		if (bg[2]) {
			bg[2].name = params.bg2 ? params.bg2 : '';
		}
		this.setState({
			yg,
			bg,
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
			this.addBg(params.bg1);
		}
		if (params.bg2) {
			this.addBg(params.bg2);
		}
	}

	// 搜索
	search = () => {
		const { form } = this.props; // 会提示props is not defined
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

	handleYg = (e, id) => {
		const { yg } = this.state;
		if (yg && yg.length > 0) {
			yg.forEach((i, index) => {
				if (i.id === id) {
					yg[index].name = e.trim();
				}
			});
			this.setState({
				yg,
			});
		}
	}

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

	// 删除
	deleteYg = (id) => {
		let { yg } = this.state;
		yg = yg.filter(key => key.id !== id);
		// console.log(id);
		yg.map((item, index) => {
			const _item = item;
			return _item.id = index + 1;
		});
		this.setState({
			yg,
		});
	}

	handleBg = (e, id) => {
		const { bg } = this.state;
		if (bg && bg.length > 0) {
			bg.forEach((i, index) => {
				if (i.id === id) {
					bg[index].name = e.trim();
				}
			});
			this.setState({
				bg,
			});
		}
	}

	addBg = () => {
		const { bg } = this.state;
		bg.push({
			name: '',
			id: bg.length + 1,
		});
		this.setState({
			bg,
		});
	}

	// 删除
	deleteBg = (id) => {
		let { bg } = this.state;
		bg = bg.filter(key => key.id !== id);
		// console.log(id);
		bg.map((item, index) => {
			const _item = item;
			return _item.id = index + 1;
		});
		this.setState({
			bg,
		});
	}

	render() {
		const {
			yg, bg, tabConfig, dataList, loading, startTime, endTime,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps } = form;
		console.log(startTime, endTime);

		return (
			<div className="yc-content-query">
				<div className="yc-lawsuits-items">
					{
					yg.map(item => (
						<div key={item.id} className="item" style={{ 'margin-right': 15 }}>
							<Input
								title="原告"
								style={_style1}
								value={item.name}
								placeholder="姓名/公司名称"
								onChange={e => this.handleYg(e, item.id)}
							/>
							{
								yg.length > 1 ? (
									<Tooltip placement="top" title="删除">
										<img
											alt=""
											className="close"
											src={close}
											onClick={() => this.deleteYg(item.id)}
										/>
									</Tooltip>
								) : null
							}
						</div>
					))
				}
					{
					yg.length > 2 ? (<span style={{ fontSize: 12, marginTop: 5, display: 'inline-block' }}>最多可添加3个原告</span>) : (
						<Tooltip placement="top" title="添加">
							<img
								alt=""
								className="add"
								src={add}
								onClick={() => this.addYg()}
							/>
						</Tooltip>
					)
				}
				</div>
				<div className="yc-lawsuits-items">
					{
						bg.map(item => (
							<div className="item" style={{ 'margin-right': 15 }}>
								<Input
									key={item.id}
									style={_style1}
									title="被告"
									value={item.name}
									placeholder="姓名/公司名称"
									onChange={e => this.handleBg(e, item.id)}
								/>
								{
									bg.length > 1 ? (
										<Tooltip placement="top" title="删除">
											<img
												alt=""
												className="close"
												src={close}
												onClick={() => this.deleteBg(item.id)}
											/>
										</Tooltip>
									) : null
								}
							</div>
						))
					}
					{
						bg.length > 2 ? (<span style={{ fontSize: 12, marginTop: 5, display: 'inline-block' }}>最多可添加3个被告</span>) : (
							<Tooltip placement="top" title="添加">
								<img
									alt=""
									className="add"
									src={add}
									onClick={() => this.addBg()}
								/>
							</Tooltip>
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
							{...getFieldProps('ah', { getValueFromEvent: e => e.trim() })}
						/>
					</div>
					<div className="yc-query-item">
						<span className="yc-query-item-title">日期选择: </span>
						<DatePicker
							{...getFieldProps('uploadTimeStart', {
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
				</div>
				<Tabs.Simple
					onChange={this.onSourceType}
					source={tabConfig}
					field="process"
				/>
				<div className="yc-lawsuits-tablebtn">
					<Button onClick={this.handleExportExcel}>
							全部导出
					</Button>
				</div>
				<Spin visible={loading}>
					<LawsuitsTable stateObj={this.state} dataList={dataList} />
				</Spin>
			</div>
		);
	}
}

export default createForm()(LAWSUITS);
