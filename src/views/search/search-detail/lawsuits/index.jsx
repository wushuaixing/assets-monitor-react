import React from 'react';
// ==================
// 所需的所有组件
// ==================
import {
	Form, Pagination, message, DatePicker,
} from 'antd';
import { getQueryByName } from '@/utils';
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
			plaintiff: [
				{ name: '', id: '' },
			],
			defendant: [
				{ name: '', id: '' },
			],
			sourceType: 1,
		};
	}

	componentDidMount() {
		// const { hash } = window.location;
		// const content = getQueryByName(hash, 'content');
		// this.setState({
		// 	content,
		// });
	}

	// sourceType变化
	onSourceType=(val) => {
		this.setState({
			sourceType: val,
		});
		// this.onQueryChange(null, val, 'all', 1);
	};

	render() {
		const { plaintiff, defendant, tabConfig } = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps } = form;
		return (
			<div className="yc-content-query">
				<div className="yc-lawsuits-items">
					{
						plaintiff.map((item, index) => (
							<div className="item" style={{ 'margin-right': 10 }}>
								<Input
									key={item.id}
									title="原告"
									value={item.name}
									style={_style1}
									placeholder="姓名/公司名称"
									onChange={(val) => {
										plaintiff[index].name = val;
										this.setState({
											plaintiff,
										});
									}}
								/>
								{
									plaintiff.length > 1 ? (
										<img
											alt=""
											className="close"
											src={close}
											onClick={() => {
												plaintiff.splice(index, 1);
												this.setState({
													plaintiff,
												});
											}}
										/>
									) : null
								}
							</div>
						))
					}
					{
						plaintiff.length > 2 ? (<span style={{ fontSize: 12, marginTop: 5, display: 'inline-block' }}>最多可添加3个原告</span>) : (
							<img
								alt=""
								src={add}
								className="add"
								onClick={() => {
									plaintiff.push({
										name: '',
										id: plaintiff.length + 1,
									});
									this.setState({
										plaintiff,
									});
								}}
							/>
						)
					}
				</div>
				<div className="yc-lawsuits-items">
					{
						defendant.map((item, index) => (
							<div className="item" style={{ 'margin-right': 10 }}>
								<Input
									key={item.id}
									title="被告"
									value={item.name}
									style={_style1}
									placeholder="姓名/公司名称"
									onChange={(val) => {
										defendant[index].name = val;
										this.setState({
											defendant,
										});
									}}
								/>
								{
									defendant.length > 1 ? (
										<img
											alt=""
											className="close"
											src={close}
											onClick={() => {
												defendant.splice(index, 1);
												this.setState({
													defendant,
												});
											}}
										/>
									) : null
								}
							</div>
						))
					}
					{
						defendant.length > 2 ? (<span style={{ fontSize: 12, marginTop: 5, display: 'inline-block' }}>最多可添加3个被告</span>) : (
							<img
								alt=""
								src={add}
								className="add"
								onClick={() => {
									defendant.push({
										name: '',
										id: defendant.length + 1,
									});
									this.setState({
										defendant,
									});
								}}
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
