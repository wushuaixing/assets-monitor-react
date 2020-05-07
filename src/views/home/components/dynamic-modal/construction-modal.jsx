import React, { Fragment } from 'react';
import { Modal, Button } from 'antd';
import { Construction, Dump } from 'api/monitor-info/intangible';
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
					certificateNumber: 'D343021876',
					gmtCreate: '2020-02-20',
					gmtDeleted: null,
					gmtModified: '2020-04-09 ',
					id: 60,
					isAttention: 1,
					isRead: 1,
					issueTime: '2019-12-05',
					obligorId: 348177,
					obligorName: '湖南省第三工程有限公司',
					qualificationLevel: '三级',
					qualificationName: '环保工程专业承包',
					qualificationType: '建筑业企业资质',
					validityPeriod: '2024-12-07',
				},
			], // 列表数据
			loading: false,
			columns: [
				{
					title: '发布日期',
					dataIndex: 'issueTime',
					render: text => timeStandard(text) || '-',
				}, {
					title: '持证单位',
					dataIndex: 'obligorName',
					render: (text, row) => (
						<Ellipsis
							content={text || '-'}
							tooltip
							width={200}
							url={row.obligorId ? `#/business/debtor/detail?id=${row.obligorId}` : ''}
						/>
					),
				}, {
					title: '证书编号',
					dataIndex: 'certificateNumber',
					render: (text, row) => (
						<div className="assets-info-content">
							<li>
								<span className="list list-content">{text || '-'}</span>
								{ row.gmtDeleted ? <span className="yc-case-reason text-ellipsis yc-case-reason__invalid">已失效</span> : ''}
							</li>
						</div>
					),
				}, {
					title: '资质信息',
					dataIndex: 'qualificationName',
					render: (text, row) => (
						<div className="assets-info-content">
							<li>
								<span className="list list-title align-justify" style={{ width: 50 }}>资质名称</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content">
									<Ellipsis content={row.qualificationName || '-'} tooltip width={380} />
								</span>
							</li>
							<li>
								<span className="list list-title align-justify" style={{ width: 50 }}>资质类别</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content">{row.qualificationType || '-'}</span>
							</li>
							<li>
								<span className="list list-title align-justify" style={{ width: 50 }}>资质等级</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content">{row.qualificationLevel || '-'}</span>
							</li>
							<li>
								<span className="list list-title align-justify" style={{ width: 50 }}>有效期至</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content">{row.validityPeriod}</span>
							</li>
						</div>
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
							api={row.isAttention ? Construction.unAttention : Construction.attention}
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
		const { constructionModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-建筑建造"
				width={1100}
				style={{ height: 320 }}
				visible={constructionModalVisible}
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
