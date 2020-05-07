import React, { Fragment } from 'react';
import { Modal, Button } from 'antd';
import { Dump } from 'api/monitor-info/intangible';
import { Trial } from 'api/monitor-info/subrogation';
import { Ellipsis, Spin, Table } from '@/common';
import { Attentions, ReadStatus, SortVessel } from '@/common/table';
import { linkDom, timeStandard } from '@/utils';
import { partyInfo } from '@/views/_common';
import associationLink from '@/views/_common/association-link';

export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [
				{
					associatedInfo: {
						courtAssociatedInfo: [],
						judgmentAssociatedInfo: [],
						trialAssociatedInfo: [
							{
								caseNumber: '（2020）川01民初2660号',
								caseReason: '侵害商标权纠纷',
								caseType: 1,
								court: '成都市中级人民法院',
								deleted: false,
								gmtRegister: 1587916800,
								id: 25290281,
								parties: [{ name: '中顺洁柔纸业股份有限公司', role: '原告', roleType: 1 }, { name: '彭州市濛阳镇芒果超市', role: '被告', roleType: 2 }],
								restore: false,
								url: 'http://cdfy12368.gov.cn:8141/sfgk/webapp/area/cdsfgk/splc/splcView.jsp?lsh=300120200301003145',
							},
							{
								caseNumber: '（2020）川01民初2660号',
								caseReason: '侵害商标权纠纷',
								caseType: 1,
								court: '成都市中级人民法院',
								deleted: false,
								gmtRegister: 1587916800,
								id: 25321952,
								parties: [{ name: '中顺洁柔纸业股份有限公司', role: '原告', roleType: 1 }, { name: '彭州市濛阳镇芒果超市', role: '被告', roleType: 2 }],
								restore: false,
								url: 'http://cdfy12368.gov.cn:8141/sfgk/webapp/area/cdsfgk/splc/splcView.jsp?lsh=300120200301003145',
							},
						],
					},
					caseNumber: '（2020）川01民初2660号',
					caseType: 1,
					court: '成都市中级人民法院',
					gmtCreate: 1588765552,
					gmtModified: 1588765552,
					gmtRegister: '2020-04-27',
					id: 81722,
					isAttention: false,
					isDeleted: false,
					isRead: false,
					isRestore: false,
					parties: [
						{
							name: '中顺洁柔纸业股份有限公司',
							obligorId: 354304,
							role: '原告',
							roleType: 1,
							sid: 81722,
						},
						{
							name: '彭州市濛阳镇芒果超市',
							obligorId: null,
							role: '被告',
							roleType: 2,
							sid: 81722,
						},
					],
					url: 'http://cdfy12368.gov.cn:8141/sfgk/webapp/area/cdsfgk/splc/splcView.jsp?lsh=300120200301003145',
				},
			], // 列表数据
			loading: false,
			columns: [
				{
					title: '立案日期',
					dataIndex: 'gmtRegister',
					width: 103,
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
					title: '案件类型',
					render: (value, row) => {
						const { isRestore, caseType } = row;
						if (isRestore) return '执恢案件';
						if (caseType === 1) return '普通案件';
						if (caseType === 2) return '破产案件';
						if (caseType === 3) return '执行案件';
						if (caseType === 4) return '终本案件';
						return '-';
					},
				}, {
					title: '关联链接',
					dataIndex: 'associatedInfo',
					className: 'tAlignCenter_important min-width-80',
					render: (value, row) => associationLink(value, row, 'Trial'),
				}, {
					title: '更新日期',
					dataIndex: 'gmtCreate',
					render: value => (value ? new Date(value * 1000).format('yyyy-MM-dd') : '-'),
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
							api={row.isAttention ? Trial.unAttention : Trial.attention}
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
		const { subrogationTrialModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-代位权(立案)"
				width={1100}
				style={{ height: 320 }}
				visible={subrogationTrialModalVisible}
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
