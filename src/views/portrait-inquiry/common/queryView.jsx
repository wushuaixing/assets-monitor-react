import React from 'react';
import { Radio } from 'antd';
import { Button, Input } from '@/common';

export default class QueryView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			obligorType: props.type || 1,
			obligorName: '',
			obligorNumber: '',
		};
	}

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
			<div className="yc-inquiry-common">
				<div className="yc-query-item" style={{ height: 34, paddingTop: 7 }}>
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
				<div className="yc-query-item" style={{ float: 'right' }}>
					<Button type="primary" style={{ width: 85 }} size="large">查询</Button>
				</div>
			</div>
		);
	}
}
