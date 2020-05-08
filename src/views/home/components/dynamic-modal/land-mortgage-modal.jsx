import React, { Fragment } from 'react';
import { Modal, Button } from 'antd';
import { Dump } from 'api/monitor-info/intangible';
import Api from 'api/monitor-info/public';
import { Ellipsis, Spin, Table } from '@/common';
import { Attentions, ReadStatus, SortVessel } from '@/common/table';
import { linkDom, timeStandard } from '@/utils';
import { partyInfo } from '@/views/_common';
import { Result } from '@/views/asset-excavate/land-data/table/common';

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
			dataSource: [
				{
					administrativeRegion: '山东省枣庄市',
					consultPrice: 344.8355,
					endTime: 1655884801,
					gmtCreate: 1586942648,
					gmtModified: 1587031203,
					id: 12556,
					isAttention: 0,
					isRead: 1,
					landAddress: '榴园镇',
					landArea: 1.2185,
					landUse: '工业用地',
					landUseCertificateNumber: '峄国用（2016）第16号',
					mortgageAmount: 240,
					mortgageArea: 1.2185,
					otherObligeeCertificateNumber: '峄他项（2016）第18号',
					parties: [
						{
							name: '周春桃', obligorId: 0, role: '抵押人', roleType: 2,
						},
						{
							name: '中国工商银行股份有限公司', obligorId: 354226, role: '抵押权人', roleType: 1,
						},
					],
					startTime: 1471334401,
					url: 'http://www.landchina.com/default.aspx?tabid=386&comname=default&wmguid=aeb2d2f3-7519-4112-add8-7ba77dc33803&recorderguid=993c6a34-c7f9-474f-bf66-9011df3522f5',
				},
			], // 列表数据
			loading: false,
			columns: [
				{
					title: '登记日期',
					dataIndex: 'startTime',
					render: text => timeStandard(text) || '-',
				}, {
					title: '土地权利人',
					dataIndex: 'parties',
					render: (text, row) => partyInfo(text, row, false, false, 223),
				}, {
					title: '项目信息',
					dataIndex: 'title',
					render: Result.InfoTransferProject,
				}, {
					title: '土地信息',
					dataIndex: 'title',
					render: Result.InfoMortgageLand,
				}, {
					title: '抵押信息',
					dataIndex: 'title',
					render: Result.InfoMortgage,
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
							// api={Api.attentionPunish}
							api={row.isAttention ? Api.attentionUnFollowMortgage : Api.attentionFollowMortgage}
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
		const { landMortgageModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-土地抵押"
				width={1100}
				style={{ height: 320 }}
				visible={landMortgageModalVisible}
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
