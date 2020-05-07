import React from 'react';
import { Modal, Button } from 'antd';
import { Court } from 'api/monitor-info/subrogation';
import { Spin, Table } from '@/common';
import { Attentions } from '@/common/table';
import { timeStandard } from '@/utils';
import { partyInfo } from '@/views/_common';
import associationLink from '@/views/_common/association-link';

export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [
				{
					associatedInfo: {
						courtAssociatedInfo: [
							{
								caseNumber: '（2020）粤05民初181号',
								caseReason: '侵害商标权纠纷',
								court: '汕头市中级人民法院',
								deleted: false,
								gmtTrial: 1596038400,
								id: 12318313,
								parties: [{ name: '张勇滨', role: '被告', roleType: 2 }, { name: '深圳罗马仕科技有限公司', role: '原告', roleType: 1 }],
								url: 'http://www.gdcourts.gov.cn/index.php?v=index_ktgg_detail&pid=330185',
							},
						],
						judgmentAssociatedInfo: [],
						trialAssociatedInfo: [],
					},

					caseNumber: '（2020）粤05民初181号',
					caseReason: '侵害商标权纠纷',
					court: '汕头市中级人民法院',
					gmtCreate: 1587479679,
					gmtModified: 1588766131,
					gmtTrial: '2020-07-30',
					id: 196015,
					isAttention: false,
					isDeleted: false,
					isRead: true,
					parties: [
						{
							name: '深圳罗马仕科技有限公司',
							obligorId: 324164,
							role: '原告',
							roleType: 1,
							sid: 196015,
						},
						{
							name: '张勇滨',
							obligorId: null,
							role: '被告',
							roleType: 2,
							sid: 196015,
						},
					],
					url: 'http://www.gdcourts.gov.cn/index.php?v=index_ktgg_detail&pid=330185',
				},
			], // 列表数据
			loading: false,
			columns: [
				{
					title: '开庭日期',
					dataIndex: 'gmtTrial',
					render: text => timeStandard(text) || '-',
				}, {
					title: '当事人',
					dataIndex: 'parties',
					render: partyInfo,
				}, {
					title: '法院',
					dataIndex: 'court',
					render: text => text || '-',
				}, {
					title: '案号',
					dataIndex: 'caseNumber',
					render: text => text || '-',
				}, {
					title: '案由',
					dataIndex: 'caseReason',
					className: 'min-width-80-normal',
					render: text => text || '-',
				}, {
					title: '关联信息',
					dataIndex: 'associatedInfo',
					className: 'tAlignCenter_important min-width-80',
					render: (value, row) => associationLink(value, row, 'Court'),
				}, {
					title: '更新日期',
					dataIndex: 'gmtCreate',
					render: val => timeStandard(val),
				}, {
					title: '操作',
					unNormal: true,
					className: 'tAlignCenter_important',
					width: 60,
					render: (text, row, index) => (
						<Attentions
							text={text}
							row={row}
							onClick={this.onRefresh}
							api={row.isAttention ? Court.unAttention : Court.attention}
							index={index}
						/>
					),
				}],
		};
	}

	// 表格发生变化
	onRefresh=(data, type) => {
		// console.log('onRefresh:', data, type);
		const { dataSource } = this.state;
		const { index } = data;
		const _dataSource = dataSource;
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
		const { subrogationCourtModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-代位权(开庭)"
				width={1100}
				style={{ height: 320 }}
				visible={subrogationCourtModalVisible}
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
