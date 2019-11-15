import React from 'react';
import { navigate } from '@reach/router';
import { Radio, Icon, message } from 'antd';
import { Button, Input } from '@/common';

export default class InitView extends React.Component {
	constructor(props) {
		document.title = '画像查询';
		super(props);
		this.state = {
			obligorType: 1,
			obligorName: '',
			obligorNumber: '',
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
				this.handleQuery();
				document.activeElement.blur();
			}
		}
	};


	toNavigate=(path) => {
		navigate(`/inquiry/${path}`);
	};

	onHandleChange = (e, field) => {
		const { obligorType } = this.state;
		const value = typeof e === 'object' ? e.target.value : e;
		// if(field==='obligorNumber')
		if (field === 'obligorType' && obligorType !== value) {
			this.setState({
				[field]: value,
				obligorName: '',
				obligorNumber: '',
			});
		} else {
			this.setState({ [field]: value });
		}
	};

	/* 一键查询债务人画像 */
	handleQuery=() => {
		const { obligorType: type, obligorName: name, obligorNumber: num } = this.state;
		if (type === 1) {
			if (!name)message.error('请输入债务人名称');
			else if (name.length < 2) message.error('债务人名称请至少输入两个字');
			else navigate(`/inquiry/list?type=1&name=${name}`);
		} else if (type === 2) {
			if (name && num) {
				navigate(`/inquiry/personal?type=2&name=${name}&num=${num}`);
			} else if (!name || !num)message.error('请输入债务人名称和证据号不能为空');
			else if (name.length < 2) message.error('债务人名称请至少输入两个字');
			else if (num.length < 7) message.error('个人债务人证件号不得小于7位');
			else message.error('请输入债务人名称及证据号');
		}
	};

	render() {
		const { obligorType, obligorName, obligorNumber } = this.state;
		return (
			<div className="yc-inquiry-view">
				<div className="yc-inquiry-title">画像查询</div>
				<div className="yc-inquiry-content">
					<div className="yc-query-item" style={{ height: 34, paddingTop: 9 }}>
						<span className="yc-query-item-title">债务人类型：</span>
						<Radio.Group onChange={e => this.onHandleChange(e, 'obligorType')} value={obligorType}>
							<Radio key="a" value={1}>企业</Radio>
							<Radio key="b" value={2}>个人</Radio>
						</Radio.Group>
					</div>
					<div className="yc-query-item yc-query-item-text1">
						<Input
							clear
							title="债务人名称"
							size="large"
							style={{ width: 350 }}
							placeholder="请输入债务人名称"
							titleWidth={100}
							onChange={e => this.onHandleChange(e, 'obligorName')}
							value={obligorName}
						/>
					</div>
					{
						obligorType === 2 ? (
							<div className="yc-query-item yc-query-item-text2">
								<Input
									clear
									title="债务人证件号"
									size="large"
									placeholder="请输入债务人证件号"
									titleWidth={100}
									style={{ width: 350 }}
									onChange={e => this.onHandleChange(e, 'obligorNumber')}
									value={obligorNumber}
								/>
							</div>
						) : null
					}
					<div className="yc-query-item" style={{ textAlign: 'center', marginTop: 80 }}>
						<Button type="primary" style={{ width: 186 }} size="large" onClick={this.handleQuery}>
							<Icon type="search" style={{ marginRight: 10 }} />
							一键查询债务人画像
						</Button>
					</div>
				</div>

				<div className="yc-to-go-list">
					{/* <Button onClick={() => this.toNavigate('list')}>{'=> 查询列表'}</Button> */}
					{/* <Button onClick={() => this.toNavigate('enterprise')}>{'=> 企业查询详情'}</Button> */}
					{/* <Button onClick={() => this.toNavigate('personal')}>{'=> 个人查询详情'}</Button> */}
					{/* <Button onClick={() => this.toNavigate('stock')}>{'=> 穿透图demo'}</Button> */}
				</div>
			</div>
		);
	}
}
