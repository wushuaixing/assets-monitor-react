import React from 'react';
import {
	DatePicker, Button, Form, Tooltip, message,
} from 'antd';
import { navigate } from '@reach/router';
import { Input, timeRule } from '@/common';
import { generateUrlWithParams, objectKeyIsEmpty } from '@/utils';
import close from '@/assets/img/icon/close.png';
import add from '@/assets/img/icon/icon_add.png';
import checkoutIcon from '@/assets/img/icon/icon_checked.png';
import './style.scss';

const createForm = Form.create;
class LAWSUITS extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startTime: undefined,
			endTime: undefined,
			type: 1,
			checkedType: 1,
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

	// 切换信息类型
	changeType = (type) => {
		console.log(type);
		switch (type) {
		case 1:
			this.setState({
				checkedType: type,
				type,
			});
			break;
		case 2:
			this.setState({
				checkedType: type,
				type,
			});
			break;
		default:
			break;
		}
	}

	// 搜索
	search = () => {
		const { form } = this.props; // 会提示props is not defined
		const {
			startTime, endTime, yg, bg, type,
		} = this.state;
		const { getFieldsValue } = form;
		const fildes = getFieldsValue();
		fildes.startLarq = startTime;
		fildes.endLarq = endTime;
		fildes.type = type;
		fildes.yg0 = yg[0] ? yg[0].name : undefined;
		fildes.yg1 = yg[1] ? yg[1].name : undefined;
		fildes.yg2 = yg[2] ? yg[2].name : undefined;
		fildes.bg0 = bg[0] ? bg[0].name : undefined;
		fildes.bg1 = bg[1] ? bg[1].name : undefined;
		fildes.bg2 = bg[2] ? bg[2].name : undefined;
		console.log(fildes, type);
		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(fildes)) {
			// 将值传到URL
			navigate(generateUrlWithParams('/search/detail/lawsuits', fildes));
		} else {
			message.error('请至少输入一个搜索条件');
		}
	}

	// 重置输入框
	queryReset = () => {
		const { form } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		this.setState({
			startTime: undefined,
			endTime: undefined,
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
		});

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
			return (_item.id = index + 1);
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
			return (_item.id = index + 1);
		});
		this.setState({
			bg,
		});
	}

	render() {
		const {
			yg, bg, checkedType,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps, getFieldValue } = form;
		return (
			<div className="yc-tabs-data" style={{ padding: '0 22px' }}>
				<div className="yc-tabs-items">
					{yg.map(item => (
						<div key={item.id} className="item" style={{ 'margin-right': 10 }}>
							<Input
								title="原告"
								value={item.name}
								placeholder="姓名/公司名称"
								onChange={e => this.handleYg(e, item.id)}
							/>
							{yg.length > 1 ? (
								<Tooltip placement="top" title="删除">
									<img
										alt=""
										className="close"
										src={close}
										onClick={() => this.deleteYg(item.id)}
									/>
								</Tooltip>
							) : null}
						</div>
					))}
					{yg.length > 2 ? (
						<span style={{ 'margin-top': 8, display: 'inline-block', color: '#FB5A5C' }}>
							最多添加3个
						</span>
					) : (
						<Tooltip placement="top" title="添加">
							<img
								alt=""
								style={{
									'margin-top': 8, cursor: 'pointer', width: 16, height: 16,
								}}
								src={add}
								onClick={() => this.addYg()}
							/>
						</Tooltip>
					)}
				</div>
				<div className="yc-tabs-items">
					{bg.map(item => (
						<div className="item" style={{ 'margin-right': 10 }}>
							<Input
								key={item.id}
								title="被告"
								value={item.name}
								placeholder="姓名/公司名称"
								onChange={e => this.handleBg(e, item.id)}
							/>
							{bg.length > 1 ? (
								<Tooltip placement="top" title="删除">
									<img
										alt=""
										className="close"
										src={close}
										onClick={() => this.deleteBg(item.id)}
									/>
								</Tooltip>
							) : null}
						</div>
					))}
					{bg.length > 2 ? (
						<span style={{ 'margin-top': 8, display: 'inline-block', color: '#FB5A5C' }}>
							最多添加3个
						</span>
					) : (
						<Tooltip placement="top" title="添加">
							<img
								alt=""
								style={{
									'margin-top': 8, cursor: 'pointer', width: 16, height: 16,
								}}
								src={add}
								onClick={() => this.addBg()}
							/>
						</Tooltip>
					)}
				</div>
				<div className="yc-tabs-items">
					<div className="item" style={{ 'margin-right': 10 }}>
						<Input
							title="起诉法院"
							placeholder="法院名称"
							{...getFieldProps('court', { getValueFromEvent: e => e.trim() })}
						/>
					</div>
					<div className="item" style={{ 'margin-right': 10 }}>
						<Input
							title="案号"
							placeholder="案件编号"
							{...getFieldProps('ah', { getValueFromEvent: e => e.trim() })}
						/>
					</div>
					<div className="item" style={{ 'margin-right': 0, width: 303 }}>
						<span>日期选择：</span>
						<DatePicker
							placeholder="开始日期"
							size="large"
							style={{ width: 112 }}
							{...getFieldProps('uploadTimeStart', {
								onChange: (value, dateString) => {
									console.log(value, dateString);
									this.setState({
										startTime: dateString,
									});
								},
							})}
							disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('uploadTimeEnd'))}
							allowClear
						/>
						<span style={{ margin: '0 2px ' }}>至</span>
						<DatePicker
							placeholder="结束日期"
							size="large"
							style={{ width: 112 }}
							{...getFieldProps('uploadTimeEnd', {
								onChange: (value, dateString) => {
									console.log(value, dateString);
									this.setState({
										endTime: dateString,
									});
								},
							})}
							disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('uploadTimeStart'))}
							allowClear
						/>
					</div>
				</div>
				<div className="others">
					<span>信息类型：</span>
					<span>
						<Button
							size="large"
							type="ghost"
							style={{ 'margin-right': 10 }}
							className={checkedType === 1 ? 'yc-checked-btn' : null}
							onClick={() => this.changeType(1)}
						>
							{checkedType === 1 ? <img src={checkoutIcon} alt="" /> : ''}
							立案信息
						</Button>

					</span>
					<Button
						size="large"
						type="ghost"
						className={checkedType === 2 ? 'yc-checked-btn' : null}
						onClick={() => this.changeType(2)}
					>
						{checkedType === 2 ? <img src={checkoutIcon} alt="" /> : ''}
						开庭公告
					</Button>
				</div>
				<div className="btn">
					<Button
						type="primary"
						size="large"
						className="yc-high-search"
						onClick={this.search}
					>
						搜索
					</Button>
					<Button onClick={this.queryReset} type="ghost" size="large">
						重置搜索条件
					</Button>
				</div>
			</div>
		);
	}
}
export default createForm()(LAWSUITS);
