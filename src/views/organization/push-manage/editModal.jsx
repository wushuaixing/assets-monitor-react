import React from 'react';
import {
	Modal, Input, message, Select,
} from 'antd';

export default class DetailModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			errorName: false,
			spin: false,
		};
	}

	componentDidMount() {
		const { data } = this.props;
		this.setState({ data });
	}

	handleCancel=() => {
		const { handleCancel } = this.props;
		handleCancel();
	}

	getInMaxValue=(val, maxSize) => {
		let text = this.getVal(val);
		if (maxSize && (text && text.length > maxSize)) {
			text = text.substr(0, maxSize);
			val.target.blur();
		}
		return text;
	}

	getVal=(val) => {
		if (val && val.target) {
			return val.target.value ? val.target.value : null;
		}
		return val || null;
	}

	handleSave=() => {
		const { data } = this.state;
		console.log('aaa', data);
	}

	change=(val, type, maxSize) => {
		const { data } = this.state;
		const maxValue = this.getInMaxValue(val, maxSize);
		data[type] = maxValue;
		if (type === 'name') {
			if (!maxValue) {
				this.setState({ data, errorName: true });
			} else {
				this.setState({ data, errorName: false });
			}
		}
		this.setState({ data });
	}

	render() {
		const {
			data, errorName,
		} = this.state;
		const { modalState } = this.props;
		let title = '新增推送';
		if (modalState === 'add') {
			title = '新增推送';
		} else {
			title = '修改推送';
		}
		return (
			<Modal maskClosable={false} title={title} className="client-modal" width={518} visible onCancel={this.handleCancel} onOk={this.handleSave}>
				<div className="edit-debtor">
					<div style={{ margin: '4px 0 0 0' }}>
						<div className="line">
							<span style={{
								color: 'red', position: 'absolute', left: 27, top: 9,
							}}
							>
*
							</span>
							<p>姓名：</p>
							<Input
								size="large"
								placeholder="请输入"
								style={{ width: 340 }}
								onChange={event => this.change(event, 'linkMode', 12)}
								onBlur={event => this.change(event, 'linkMode', 12)}
							/>
							{
								errorName ? (
									<p className="error">
										请输入联系方式
									</p>
								) : null
							}
						</div>
						<div className="line">
							<p>手机号：</p>
							<Input
								size="large"
								placeholder="请输入"
								style={{ width: 340 }}
								onChange={event => this.change(event, 'linkMode', 12)}
								onBlur={event => this.change(event, 'linkMode', 12)}
							/>
						</div>
						<div className="line">
							<p>角色：</p>
							<Select
								allowClear
								size="large"
								style={{ width: 100 }}
								placeholder="请选择"
								onChange={(val) => {
									this.onCommonChange('loanTypeConst', val);
								}}
							>
								<Select.Option key="1" value="1">111</Select.Option>
							</Select>
						</div>
						<div className="line">
							<p>邮箱：</p>
							<Input
								size="large"
								style={{ width: 340 }}
								placeholder="请输入"
								onChange={event => this.change(event, 'linkMode', 12)}
								onBlur={event => this.change(event, 'linkMode', 12)}
							/>
						</div>
					</div>
				</div>
			</Modal>
		);
	}
}
