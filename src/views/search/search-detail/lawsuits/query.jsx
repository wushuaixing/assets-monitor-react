import React from 'react';
// ==================
// 所需的所有组件
// ==================
import { navigate } from '@reach/router';
import { Form, Tooltip } from 'antd';
import {
	Input, Button, timeRule, DatePicker,
} from '@/common';
import { parseQuery } from '@/utils';
import { generateUrlWithParams, objectKeyIsEmpty } from '@/utils';
import close from '@/assets/img/icon/close.png';
import add from '@/assets/img/icon/icon_add.png';
import './style.scss';

const createForm = Form.create;
const _style1 = { width: 278 };
const _style2 = { width: 100 };

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
		const {
			endLarq, startLarq, pageSize,
		} = this.state;
		const {
			type, plaintiff, defendant, getData, getCount, queryReset, getQueryData,
		} = this.props;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const fildes = getFieldsValue();
		fildes.startLarq = startLarq;
		fildes.endLarq = endLarq;
		fildes.type = type;
		fildes.plaintiff0 = plaintiff[0] ? plaintiff[0].name : undefined;
		fildes.plaintiff1 = plaintiff[1] ? plaintiff[1].name : undefined;
		fildes.plaintiff2 = plaintiff[2] ? plaintiff[2].name : undefined;
		fildes.defendant0 = defendant[0] ? defendant[0].name : undefined;
		fildes.defendant1 = defendant[1] ? defendant[1].name : undefined;
		fildes.defendant2 = defendant[2] ? defendant[2].name : undefined;
		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(fildes)) {
			// 将值传到URL
			navigate(generateUrlWithParams('/search/detail/lawsuits', fildes));
		} else {
			queryReset();
		}
		const { hash } = window.location;
		const urlObj = parseQuery(hash);

		const defendantArray = ([urlObj.defendant0 || undefined, urlObj.defendant1 || undefined, urlObj.defendant2 || undefined]);
		const plaintiffArray = ([urlObj.plaintiff0 || undefined, urlObj.plaintiff1 || undefined, urlObj.plaintiff2 || undefined]);
		const Params = {
			bgList: defendantArray,
			ygList: plaintiffArray,
			ah: urlObj.ah || undefined,
			court: urlObj.court || undefined,
			endLarq: urlObj.endLarq || undefined,
			startLarq: urlObj.startLarq || undefined,
			page: 1,
			num: pageSize,
			Sort: undefined,
			// current: 1,
		};
		// 判断是否为空对象,非空请求接口
		if (Object.keys(urlObj).length !== 0) {
			getData(Params, type); // 进入页面请求数据
			getCount(Params);
		}
		getQueryData(Params);
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
			form, inputChange, addDefendant, deleteDefendant, addPlaintiff, deletePlaintiff, urlObj, plaintiff, defendant,
		} = this.props; // 会提示props is not defined
		const { getFieldProps, getFieldValue } = form;
		const timeOption = {
			normalize(n) {
				return typeof n === 'object' ? (n && new Date(n).format('yyyy-MM-dd')) : n;
			},
		};
		return (
			<div>
				<div className="yc-lawsuits-items">
					{
					plaintiff.map(item => (
						<div key={item.id} className="item" style={{ 'margin-right': 15 }}>
							<Input
								title="原告"
								style={_style1}
								value={item.name}
								placeholder="姓名/公司名称"
								onChange={e => inputChange(1, e, item.id)}
							/>
							{
								plaintiff.length > 1 ? (
									<Tooltip placement="top" title="删除">
										<img
											alt=""
											className="close"
											src={close}
											onClick={() => deletePlaintiff(item.id)}
										/>
									</Tooltip>
								) : null
							}
						</div>
					))
				}
					{
					plaintiff.length > 2 ? (
						<span style={{
							fontSize: 12, marginTop: 3, display: 'inline-block', color: '#FB5A5C',
						}}
						>
							最多可添加3个原告
						</span>
					) : (
						<Tooltip placement="top" title="添加">
							<img
								alt=""
								className="add"
								src={add}
								onClick={() => addPlaintiff()}
							/>
						</Tooltip>
					)
				}
				</div>
				<div className="yc-lawsuits-items">
					{
						defendant.map(item => (
							<div className="item" style={{ 'margin-right': 15 }}>
								<Input
									key={item.id}
									style={_style1}
									title="被告"
									value={item.name}
									placeholder="姓名/公司名称"
									onChange={e => inputChange(2, e, item.id)}
								/>
								{
									defendant.length > 1 ? (
										<Tooltip placement="top" title="删除">
											<img
												alt=""
												className="close"
												src={close}
												onClick={() => deleteDefendant(item.id)}
											/>
										</Tooltip>
									) : null
								}
							</div>
						))
					}
					{
						defendant.length > 2 ? (
							<span style={{
								fontSize: 12, marginTop: 3, display: 'inline-block', color: '#FB5A5C',
							}}
							>
								最多可添加3个被告
							</span>
						) : (
							<Tooltip placement="top" title="添加">
								<img
									alt=""
									className="add"
									src={add}
									onClick={() => addDefendant()}
								/>
							</Tooltip>
						)
					}
				</div>
				<div>
					<div className="yc-query-item">
						<Input
							title="起诉法院"
							style={_style1}
							size="large"
							placeholder="法院名称"
							{...getFieldProps('court', {
								initialValue: urlObj.court,
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
								initialValue: urlObj.ah,
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div className="yc-query-item">
						<span className="yc-query-item-title">日期选择: </span>
						<DatePicker
							{...getFieldProps('startLarq', timeOption, {
								initialValue: urlObj.startLarq,
								onChange: (value, dateString) => {
									this.setState({
										startLarq: dateString,
									});
								},
							})}
							disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('endLarq'))}
							size="large"
							style={_style2}
							placeholder="开始日期"
						/>
						<span className="yc-query-item-title">至</span>
						<DatePicker
							{...getFieldProps('endLarq', timeOption, {
								initialValue: urlObj.endLarq,
								onChange: (value, dateString) => {
									this.setState({
										endLarq: dateString,
									});
								},
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
