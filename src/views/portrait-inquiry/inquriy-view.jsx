import React from 'react';
import { navigate } from '@reach/router';
import { Button, Input } from '@/common';
import { Radio, Icon } from 'antd';

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

	toNavigate=(path) => {
		navigate(`/inquiry/${path}`);
	};

	onHandleChange = (e, field) => {
		const { obligorType } = this.state;
		const value = typeof e === 'object' ? e.target.value : e;
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
						<Button type="primary" style={{ width: 186 }} size="large">
							<Icon type="search" style={{ marginRight: 10 }} />
							{'一键查询债务人画像'}
						</Button>
					</div>
				</div>
				<div className="yc-to-go-list">
					<Button onClick={() => this.toNavigate('list')}>{'=> 查询列表'}</Button>
					<Button onClick={() => this.toNavigate('enterprise')}>{'=> 企业查询详情'}</Button>
					<Button onClick={() => this.toNavigate('personal')}>{'=> 个人查询详情'}</Button>
				</div>
			</div>
		);
	}
}
