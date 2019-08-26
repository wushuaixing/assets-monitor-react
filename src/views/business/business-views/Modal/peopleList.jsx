import React from 'react';
import {
	Modal, Table, message,
} from 'antd';
import {
	postGuaranteeList, // 担保人
} from '@/utils/api/business';
import { Spin } from '@/common';

export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			data: [], // 列表数据
			loading: false,
			columns: [{
				title: '担保人名称',
				dataIndex: 'obligorName',
				key: 'obligorName',
				width: 220,
				render: (text, row) => (
					<p
						onClick={() => {
							const w = window.open('about:blank');
							w.location.href = `#/business/debtor/detail?id=${row.obligorId}`;
						}}
						style={{ color: '#3DA8F5', cursor: 'pointer' }}
					>
						{text || '-'}

					</p>
				),
			}, {
				title: '身份证号/统一社会信用代码',
				dataIndex: 'obligorNumber',
				key: 'obligorNumber',
				width: 200,
				render(text) {
					return <div>{text || '-'}</div>;
				},
			}, {
				title: '角色',
				dataIndex: 'role',
				key: 'role',
				render: text => this.filterText(text) || '-',
			}],
		};
	}

	componentDidMount() {
		const { businessId } = this.props;
		this.setState({
			loading: true,
		});
		postGuaranteeList(businessId).then((res) => {
			if (res.code === 200 && res.data) {
				this.setState({
					data: res.data,
					loading: false,
				});
			} else {
				message.error(res.message);
			}
		});
	}

	filterText = (text) => {
		switch (text) {
		case 1: return '借款人';
		case 2: return '担保人';
		case 3: return '抵质押人';
		case 4: return '共同借款人';
		default: return '其他-未知';
		}
	}

	handleCancel=() => {
		const { onCancel } = this.props;
		onCancel();
	}

	render() {
		const { columns, data, loading } = this.state;
		const { PeopleListModalVisible } = this.props;
		return (
			<Modal title="担保人列表" width={560} style={{ 'max-height': 650 }} visible={PeopleListModalVisible} footer={(null)} onCancel={this.handleCancel}>
				<Spin visible={loading}>
					<Table
						scroll={data.length > 8 ? { y: 440 } : {}}
						columns={columns}
						dataSource={data}
						pagination={false}
						className="table"
					/>
				</Spin>
			</Modal>
		);
	}
}
