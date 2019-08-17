import React from 'react';
import Modal from 'antd/lib/modal';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import message from 'antd/lib/message';

export default class DetailModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				name: null,
				tel: null,
				buzhidaojiaoshenm: null,
				email: null,
			},
		};
	}

	componentDidMount() {
	/*	const { data } = this.props;
		this.setState({ data }); */
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
		if (!data.name) {
			message.warning('请输入姓名');
		} else {
			console.log('aaa', data);
			this.handleCancel();
		}
	}

	change=(val, type, maxSize) => {
		const { data } = this.state;
		const maxValue = this.getInMaxValue(val, maxSize);
		data[type] = maxValue;
		this.setState({ data });
	}

	render() {
		const { data } = this.state;
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
								onChange={event => this.change(event, 'name', 12)}
								onBlur={event => this.change(event, 'name', 12)}
							/>
						</div>
						<div className="line">
							<p>手机号：</p>
							<Input
								size="large"
								placeholder="请输入"
								style={{ width: 340 }}
								onChange={event => this.change(event, 'tel', 12)}
								onBlur={event => this.change(event, 'tel', 12)}
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
									this.change(val, 'buzhidaojiaoshenm');
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
								onChange={event => this.change(event, 'email', 12)}
								onBlur={event => this.change(event, 'emal', 12)}
							/>
						</div>
					</div>
				</div>
			</Modal>
		);
	}
}
