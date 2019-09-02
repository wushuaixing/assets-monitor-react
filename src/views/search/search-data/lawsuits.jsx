import React from 'react';
import {
	DatePicker, Button, Form, message,
} from 'antd';
import Input from '@/common/input';
import close from '@/assets/img/icon/close.png';
import add from '@/assets/img/icon/icon_add.png';
import './style.scss';

const createForm = Form.create;
class Datas extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startTime: '',
			endTime: '',
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

	changeType= () => {
		console.log(1);
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

	render() {
		const {
			yg, bg, startTime, endTime,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps } = form;
		return (
			<div className="yc-tabs-data" style={{ padding: '16px 22px' }}>
				<div className="yc-tabs-items">
					{
					yg.map((item, index) => (
						<div className="item" style={{ 'margin-right': 10 }}>
							<Input
								key={item.id}
								title="原告"
								value={item.name}
								placeholder="姓名/公司名称"
								onChange={(val) => {
									const temp = yg;
									temp[index].name = val;
									this.setState({
										yg: temp,
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
											const temp = yg;
											temp.splice(index, 1);
											this.setState({
												yg: temp,
											});
										}}
									/>
								) : null
							}
						</div>
					))
				}
					{
					yg.length > 2 ? (<span style={{ 'margin-top': 8, display: 'inline-block' }}>最多添加3个</span>) : (
						<img
							alt=""
							style={{ 'margin-top': 8, cursor: 'pointer' }}
							src={add}
							onClick={() => {
								const temp = yg;
								temp.push({
									name: '',
									id: yg.length + 1,
								});
								this.setState({
									yg: temp,
								});
								// setyg(temp);
							}}
						/>
					)
				}
				</div>
				<div className="yc-tabs-items">
					{
					bg.map((item, index) => (
						<div className="item" style={{ 'margin-right': 10 }}>
							<Input
								key={item.id}
								title="被告"
								value={item.name}
								placeholder="姓名/公司名称"
								onChange={(val) => {
									const temp = bg;
									temp[index].name = val;
									this.setState({
										bg: temp,
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
											const temp = bg;
											temp.splice(index, 1);
											this.setState({
												bg: temp,
											});
										}}
									/>
								) : null
							}
						</div>
					))
				}
					{
					bg.length > 2 ? (<span style={{ 'margin-top': 8, display: 'inline-block' }}>最多添加3个</span>) : (
						<img
							alt=""
							style={{ 'margin-top': 8, cursor: 'pointer' }}
							src={add}
							onClick={() => {
								const temp = bg;
								temp.push({
									name: '',
									id: bg.length + 1,
								});
								this.setState({
									bg: temp,
								});
								// setbg(temp);
							}}
						/>
					)
				}
				</div>
				<div className="yc-tabs-items">
					<div className="item" style={{ 'margin-right': 10 }}>
						<Input
							title="起诉法院"
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
					<div className="item" style={{ 'margin-right': 10 }}>
						<Input
							title="案号"
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
					<div className="item" style={{ 'margin-right': 0, width: 303 }}>
						<span>日期选择：</span>
						<DatePicker
							placeholder="开始日期"
							style={{ width: 112 }}
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
							allowClear
						/>
						<span style={{ margin: '0 2px ' }}>至</span>
						<DatePicker
							placeholder="结束日期"
							style={{ width: 112 }}
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
							allowClear
						/>
					</div>
				</div>
				<div className="others">
					<span>信息类型：</span>
					<Button
						size="large"
						type="ghost"
						style={{ 'margin-right': 10 }}
						onClick={this.changeType}
					>
						立案信息
					</Button>
					<Button
						size="large"
						type="primary"
					>
						开庭公告
					</Button>
				</div>
				<div className="btn">
					<Button
						type="primary"
						size="large"
						style={{ 'margin-right': 10, 'background-color': '#FB5A5C', 'border-color': '#FB5A5C' }}
						onClick={this.search}
					>
						搜索
					</Button>
					<Button onClick={this.queryReset} type="ghost" size="large">重置搜索条件</Button>
				</div>
			</div>
		);
	}
}
export default createForm()(Datas);
