import React from 'react';
import { Modal, Button } from 'antd';
import Api from 'api/monitor-info/public';
import { Spin, Table } from '@/common';
import { Attentions, ReadStatus } from '@/common/table';
import { timeStandard } from '@/utils';
import { partyInfo } from '@/views/_common';
import { Result } from '@/views/asset-excavate/land-data/table/common';

export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [
				{
					administrativeRegion: '广西壮族自治区柳州市',
					dealingTime: 1260598209,
					gmtCreate: 1586942648,
					gmtModified: 1586949738,
					id: 8894,
					isAttention: 0,
					isRead: 1,
					landAddress: '柳州市天山路5号4栋3单元1-2室',
					landArea: 0.0008,
					landUsageTerm: '65',
					landUse: '其他普通商品住房用地',
					parties: [
						{
							name: '周春桃', obligorId: 0, role: '现土地使用权人', roleType: 2,
						},
						{
							name: '罗意', obligorId: 0, role: '现土地使用权人', roleType: 2,
						},
						{
							name: '中国工商银行股份有限公司', obligorId: 354226, role: '原土地使用权人', roleType: 1,
						},
					],
					transferMode: '买卖',
					transferPrice: 19,
					url: 'http://www.landchina.com/default.aspx?tabid=386&comname=default&wmguid=b07b0664-79e7-4458-90ea-519c65045c6b&recorderguid=84d96611-afa3-4824-9d40-2b3470836720',
				},
			], // 列表数据
			loading: false,
			columns: [
				{
					title: '成交日期',
					dataIndex: 'dealingTime',
					render: text => timeStandard(text) || '-',
				}, {
					title: '土地使用权人',
					dataIndex: 'parties',
					render: partyInfo,
				}, {
					title: '项目信息',
					dataIndex: 'number',
					render: Result.InfoTransferProject,
				}, {
					title: '土地信息',
					dataIndex: 'property',
					render: Result.InfoLand,
				}, {
					title: '转让信息',
					dataIndex: 'property',
					render: Result.transferInfo,
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
							api={row.isAttention ? Api.attentionUnFollowTransfer : Api.attentionFollowTransfer}
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
		const { landTransferModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-土地转让"
				width={1100}
				style={{ height: 320 }}
				visible={landTransferModalVisible}
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
