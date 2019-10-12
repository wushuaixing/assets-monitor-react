import React from 'react';
import {
	Modal, Form, message,
} from 'antd';
import { Button, Spin, Table } from '@/common';
import { trialDetail } from '@/utils/api/monitor-info/bankruptcy';
import { formatDateTime } from '@/utils/changeTime';

const createForm = Form.create;

class RegisterModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			loading: false,
			columns: [
				{
					title: '立案日期',
					dataIndex: 'publishDate',
					width: 100,
					render(text) {
						return <span>{formatDateTime(text, 'onlyYear') || '-'}</span>;
					},
				},
				{
					title: '当事人',
					// dataIndex: 'party',
					width: 300,
				}, {
					title: '法院',
					dataIndex: 'court',
					render: text => text || '-',
				}, {
					title: '案件状态',
					dataIndex: 'state',
					render: text => text || '-',
				},
			],
		};
	}

	componentDidMount() {
		const { rowObj } = this.props;
		const { id } = rowObj;
		this.setState({
			loading: true,
		});
		trialDetail({ id }).then((res) => {
			if (res.code === 200) {
				this.setState({
					data: [res.data],
					loading: false,
				});
			} else {
				this.setState({
					loading: false,
				});
				message.error(res.message);
			}
		});
	}

	render() {
		const { registerModalVisible, rowObj, onCancel } = this.props;
		const { data, columns, loading } = this.state;

		return (
			<Modal title={rowObj && rowObj.title} width={835} visible={registerModalVisible} onCancel={onCancel} onOk={this.handleOk} footer={false}>
				<Spin visible={loading}>
					<Table
						columns={columns}
						dataSource={data}
						pagination={false}
					/>
				</Spin>
				{data && <div style={{ borderTop: '1px solid #f0f2f5' }} />}
				<div style={{ marginTop: 60, textAlign: 'center' }}><Button onClick={onCancel} type="common" style={{ width: 120 }}>关闭</Button></div>
			</Modal>
		);
	}
}
export default createForm()(RegisterModal);
