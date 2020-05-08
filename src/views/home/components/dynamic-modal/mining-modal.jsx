import React, { Fragment } from 'react';
import { Modal, Button } from 'antd';
import { Dump, Mining } from 'api/monitor-info/intangible';
import { Ellipsis, Spin, Table } from '@/common';
import { Attentions, ReadStatus, SortVessel } from '@/common/table';
import { linkDetail, linkDom, timeStandard } from '@/utils';
import { floatFormat } from '@/utils/format';

const certificateTypeStatus = {
	1: '采矿权',
	2: '探矿权',
	0: '未知',
};

export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [
				{
					area: 2820000,
					certificateType: 2,
					certificateTypeString: '',
					gmtCreate: '2020-02-22',
					gmtModified: '2020-03-28',
					gmtPublishTime: '2019-07-31',
					gmtValidityPeriodEnd: '2021-06-06',
					gmtValidityPeriodStart: '2019-06-07',
					id: 171,
					isAttention: true,
					isRead: true,
					licenseNumber: 'T46120090602030083',
					mineralSpecies: '金矿',
					obligorId: 325952,
					projectName: '海南省乐东县抱伦金矿详查（保留）',
					rightsHolder: '海南山金矿业有限公司',
					url: '',
				},
			], // 列表数据
			loading: false,
			columns: [
				{
					title: '发布日期',
					dataIndex: 'gmtPublishTime',
					render: text => timeStandard(text) || '-',
				}, {
					title: '探/采矿权人',
					dataIndex: 'rightsHolder',
					width: 200,
					render: (text, row) => (text ? linkDetail(row.obligorId, text) : '-'),
				}, {
					title: '许可证编号',
					width: 200,
					dataIndex: 'licenseNumber',
					render: (text, row) => (text ? linkDom(row.url, text) : '-'),
				}, {
					title: '权证类型',
					width: 100,
					dataIndex: 'certificateType',
					render: text => (text !== '' ? certificateTypeStatus[text] : '-'),
				}, {
					title: '权证信息',
					width: 260,
					dataIndex: 'mineralSpecies',
					render: (text, row) => (
						<div className="assets-info-content">
							<li>
								<span className="list list-title align-justify" style={{ width: 50 }}>矿种</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content">{text || '-'}</span>
							</li>
							<li>
								<span className="list list-title align-justify" style={{ width: 50 }}>矿山名称</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content"><Ellipsis content={row.projectName || '-'} tooltip width={200} /></span>
							</li>
							<li>
								<span className="list list-title align-justify" style={{ width: 50 }}>面积</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content">{row.area ? `${floatFormat(row.area)} 平方米` : '-'}</span>
							</li>
							<li>
								<span className="list list-title align-justify" style={{ width: 50 }}>有效期</span>
								<span className="list list-title-colon">:</span>
								{
									row.gmtValidityPeriodStart && row.gmtValidityPeriodEnd ? (
										<span className="list list-content">{`${row.gmtValidityPeriodStart} 至 ${row.gmtValidityPeriodEnd}` }</span>
									) : '-'
								}
							</li>
						</div>
					),
				}, {
					title: '更新日期',
					dataIndex: 'gmtCreate',
					render: text => timeStandard(text) || '-',
				}, {
					title: '操作',
					width: 60,
					unNormal: true,
					className: 'tAlignCenter_important',
					render: (text, row, index) => (
						<Attentions
							text={text}
							row={row}
							// onClick={onRefresh}
							api={row.isAttention ? Mining.unAttention : Mining.attention}
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
		const { miningModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-采矿权"
				width={1100}
				style={{ height: 320 }}
				visible={miningModalVisible}
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
