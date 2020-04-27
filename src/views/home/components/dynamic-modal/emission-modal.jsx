import React, { Fragment } from 'react';
import { Modal, Button } from 'antd';
import { Dump } from 'api/monitor-info/intangible';
import { Ellipsis, Spin, Table } from '@/common';
import { Attentions, ReadStatus, SortVessel } from '@/common/table';
import { linkDom, timeStandard } from '@/utils';

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
					companyName: '江苏腾达缸泵机械股份有限公司',
					gmtCreate: '2020-04-17',
					gmtIssueTime: '2019-12-06',
					gmtModified: '2020-04-17',
					gmtPublishTime: '2019-12-06',
					gmtValidityPeriodEnd: '2022-12-05',
					gmtValidityPeriodStart: '2019-12-06',
					id: 103,
					industry: '黑色金属铸造',
					isAttention: false,
					isRead: true,
					licenseNumber: '91321000552508646B001R',
					obligorId: 353301,
					reason: '应当注销的其他情形',
					status: '注销',
					url: 'http://permit.mee.gov.cn/permitExt/xkgkAction!xkgk.action?xkgk=getxxgkContent&dataid=f9c7c29498e54ea39eb4469966efb555',
				},
			], // 列表数据
			loading: false,
			columns: [
				{
					title: '发证日期',
					dataIndex: 'gmtPublishTime',
					render: text => (text || '-'),
				}, {
					title: '持证单位',
					dataIndex: 'companyName',
					width: 200,
					render: (text, row) => (
						<Ellipsis
							content={text || '-'}
							tooltip
							width={180}
							url={row.obligorId ? `#/business/debtor/detail?id=${row.obligorId}` : ''}
						/>
					),
				}, {
					title: '许可证编号',
					dataIndex: 'licenseNumber',
					width: 120,
					render: (text, row) => (text ? linkDom(row.url, text) : '-'),
				}, {
					title: '权证信息',
					dataIndex: 'industry',
					render: (text, row) => (
						<div className="assets-info-content">
							<li>
								<span className="list list-title align-justify" style={{ width: 50 }}>行业分类</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content"><Ellipsis content={text || '-'} tooltip width={200} /></span>
							</li>
							<li>
								<span className="list list-title align-justify" style={{ width: 50 }}>有效期</span>
								<span className="list list-title-colon">:</span>
								{
									row.gmtValidityPeriodStart && row.gmtValidityPeriodEnd ? (
										<span className="list list-content">{`${row.gmtValidityPeriodStart}至${row.gmtValidityPeriodEnd}` }</span>
									) : '-'
								}
							</li>
						</div>
					),
				}, {
					title: '当前状态',
					dataIndex: 'status',
					render: (text, row) => (
						<div className="assets-info-content">
							<li>
								<span className="list list-content">{text}</span>
							</li>
							{
								text !== '正常' ? (
									<Fragment>
										<li>
											<span className="list list-title align-justify" style={{ width: 50 }}>{status[keyToValue(text)].reasonName}</span>
											<span className="list list-title-colon">:</span>
											<span className="list list-content"><Ellipsis content={row.reason || '-'} tooltip width={200} /></span>
										</li>
										<li>
											<span className="list list-title align-justify" style={{ width: 50 }}>{status[keyToValue(text)].dateName}</span>
											<span className="list list-title-colon">:</span>
											<span className="list list-content">{row.gmtIssueTime || '-'}</span>
										</li>
									</Fragment>
								) : null
							}
						</div>
					),
				}, {
					title: '更新日期',
					dataIndex: 'gmtModified',
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
							api={row.isAttention ? Dump.unAttention : Dump.attention}
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
		const { emissionModalVisible } = this.props;
		return (
			<Modal title="匹配详情-排污权" width={1040} style={{ height: 320 }} visible={emissionModalVisible} footer={null} onCancel={this.handleCancel}>
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
