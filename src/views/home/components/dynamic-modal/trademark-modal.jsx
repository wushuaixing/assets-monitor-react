import React, { Fragment } from 'react';
import { Modal, Button } from 'antd';
import { Copyright, Dump } from 'api/monitor-info/intangible';
import { Ellipsis, Spin, Table } from '@/common';
import { Attentions, ReadStatus, SortVessel } from '@/common/table';
import { linkDetail, linkDom, timeStandard } from '@/utils';

const rightsTypeStatus = {
	0: '未知',
	1: '商标',
	2: '专利',
};
export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [
				{
					gmtCreate: '2020-04-21',
					gmtModified: '2020-04-22 ',
					id: 238153,
					isAttention: 0,
					isRead: 1,
					noticeTime: '2020-01-06',
					obligorId: 354314,
					obligorName: '徽商银行股份有限公司',
					rightsName: '雏鹰 ',
					rightsType: 1,
					url: 'http://wsgg.sbj.cnipa.gov.cn:9080/tmann/annInfoView/annSearch.html?annNum=1678',
				},
			], // 列表数据
			loading: false,
			columns: [
				{
					title: '公告日期',
					dataIndex: 'noticeTime',
					render: text => timeStandard(text) || '-',
				}, {
					title: '申请人/权利人',
					dataIndex: 'obligorName',
					render: (text, row) => (text ? linkDetail(row.obligorId, text) : '-'),
				}, {
					title: '商标/专利名称',
					dataIndex: 'rightsName',
					render: (text, row) => (text ? linkDom(row.url, text) : '-'),
				}, {
					title: '权利类型',
					dataIndex: 'rightsType',
					render: text => (
						<span>{rightsTypeStatus[text]}</span>
					),
				}, {
					title: '更新日期',
					dataIndex: 'gmtCreate',
					render: text => timeStandard(text) || '-',
				}, {
					title: '操作',
					unNormal: true,
					className: 'tAlignCenter_important',
					render: (text, row, index) => (
						<Attentions
							text={text}
							row={row}
							// onClick={onRefresh}
							api={row.isAttention ? Copyright.unAttention : Copyright.attention}
							index={index}
						/>
					),
				}],
		};
	}

	handleCancel=() => {
		const { onCancel } = this.props;
		onCancel();
	};

	render() {
		const { columns, dataSource, loading } = this.state;
		const { trademarkModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-商标专利"
				width={1100}
				style={{ height: 320 }}
				visible={trademarkModalVisible}
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
						<Button onClick={this.handleCancel} type="primary" style={{ width: 180, height: 34, margin: '50px 0' }}>关闭</Button>
					</div>
				</Spin>
			</Modal>
		);
	}
}
