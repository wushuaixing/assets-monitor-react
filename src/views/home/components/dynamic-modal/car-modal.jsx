import React, { Fragment } from 'react';
import { Modal, Button } from 'antd';
import { Dump } from 'api/monitor-info/intangible';
import {
	Ellipsis, LiItem, Spin, Table,
} from '@/common';
import { Attentions, ReadStatus, SortVessel } from '@/common/table';
import { linkDom, timeStandard } from '@/utils';
import { postFollow, postUnFollow } from 'api/monitor-info/car';

const status = {
	1: {
		reasonName: '注销原因',
		dateName: '注销时间',
	},
	2: {
		reasonName: '撤销原因',
		dateName: '撤销时间',
	},
	3: {
		reasonName: '遗失原因',
		dateName: '遗失时间',
	},
};
function keyToValue(key) {
	if (key === '注销') {
		return 1;
	}
	if (key === '撤销') {
		return 2;
	}
	if (key === '遗失') {
		return 3;
	}
	return 0;
}
export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [], // 列表数据
			loading: false,
			columns: [
				{
					title: '公示日期',
					dataIndex: 'publishTime',
					width: 110,
					render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
				}, {
					title: '车辆所有人',
					dataIndex: 'obligorName',
					width: 190,
					render: (text, row) => <Ellipsis content={text} width={170} url={row.obligorId ? `/#/business/debtor/detail?id=${row.obligorId}` : ''} tooltip />,
				}, {
					title: '车辆种类',
					dataIndex: 'vehicleType',
					width: 190,
				}, {
					title: '车牌号',
					width: 250,
					dataIndex: 'vehicleNumber',
				}, {
					title: '源链接',
					width: 110,
					dataIndex: 'url',
					render: (text, row) => (text ? linkDom(row.url, '查看') : '-'),
				}, {
					title: global.Table_CreateTime_Text,
					dataIndex: 'gmtModified',
					width: 110,
					render: text => timeStandard(text) || '-',
				}, {
					title: '操作',
					width: 55,
					unNormal: true,
					className: 'tAlignCenter_important',
					render: (text, row, index) => (
						<Attentions
							text={text}
							row={row}
							onClick={() => this.onRefresh()}
							api={row.isAttention ? postUnFollow : postFollow}
							index={index}
						/>
					),
				}],
		};
	}

	componentDidMount() {
		const { dataSource } = this.props;
		this.setState(() => ({
			dataSource,
		}));
	}

	// 表格发生变化
	onRefresh=(data, type) => {
		const { dataSource } = this.state;
		const { index } = data;
		const _dataSource = [...dataSource];
		_dataSource[index][type] = data[type];
		this.setState({
			dataSource: _dataSource,
		});
	};

	handleCancel=() => {
		const { onCancel } = this.props;
		onCancel();
	};

	render() {
		const { columns, dataSource, loading } = this.state;
		const { carModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-车辆信息"
				width={1100}
				style={{ height: 320 }}
				visible={carModalVisible}
				footer={null}
				onCancel={this.handleCancel}
				wrapClassName="vertical-center-modal"
			>
				<Spin visible={loading}>
					<Table
						scroll={dataSource.length > 8 ? { y: 440 } : {}}
						columns={columns}
						dataSource={dataSource}
						pagination={false}
						className="table"
					/>
					<div style={{ width: '100%', textAlign: 'center' }}>
						<Button onClick={this.handleCancel} type="primary" className="dynamic-modal-btn">关闭</Button>
					</div>
				</Spin>
			</Modal>
		);
	}
}
