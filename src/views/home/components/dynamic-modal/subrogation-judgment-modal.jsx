import React, { Fragment } from 'react';
import { Modal, Button } from 'antd';
import { Dump } from 'api/monitor-info/intangible';
import { Judgment } from 'api/monitor-info/subrogation';
import { Ellipsis, Spin, Table } from '@/common';
import { Attentions, ReadStatus, SortVessel } from '@/common/table';
import { linkDom, timeStandard } from '@/utils';
import { partyInfo } from '@/views/_common';

/* 文书信息 */
const documentInfo = (value, row) => {
	const {
		caseReason, caseType, gmtJudgment, title, url, isRestore,
	} = row;
	return (
		<div className="assets-info-content">
			<li>
				<Ellipsis content={title} line={2} tooltip url={url} />
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 50 }}>案由</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">{caseReason || '-'}</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 50 }}>案件类型</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">{isRestore ? '执恢案件' : (caseType || '-')}</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 50 }}>判决日期</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">{timeStandard(gmtJudgment)}</span>
			</li>
		</div>
	);
};
export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [
				{
					caseNumber: '（2016）黔0115民初3254号',
					caseReason: '金融借款合同纠纷',
					caseType: '民事案件',
					court: '贵阳市观山湖区人民法院',
					gmtCreate: 1588801077,
					gmtJudgment: 1517414400,
					gmtModified: 1588801077,
					gmtPublish: '2018-08-11',
					id: 10858,
					isAttention: false,
					isRead: false,
					isRestore: false,
					parties: [
						{
							birthday: null,
							certificateNumber: '',
							gender: 0,
							name: '招商银行股份有限公司',
							obligorId: 354228,
							role: '原告',
							roleType: 1,
							sid: 10858,
						},
						{
							birthday: 157824000,
							certificateNumber: '',
							gender: 1,
							name: '李崧',
							obligorId: null,
							role: '被告',
							roleType: 2,
							sid: 10858,
						},
						{
							birthday: 152121600,
							certificateNumber: '',
							gender: 2,
							name: '杨晓晶',
							obligorId: null,
							role: '被告',
							roleType: 2,
							sid: 10858,
						},
					],
					title: '招商银行股份有限公司贵阳分行与贵州科艺通贸易有限公司、贵州致远投资担保有限公司金融借款合同纠纷一审民事判决书',
					url: 'http://wenshu.court.gov.cn/website/wenshu/181107ANFZ0BXSK4/index.html?docId=5d3629d58a5e4a3ea177a8b30170b071',
				},
			], // 列表数据
			loading: false,
			columns: [
				{
					title: '发布日期',
					dataIndex: 'gmtPublish',
					render: text => timeStandard(text),
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
					title: '文书信息',
					dataIndex: 'associatedInfo1',
					width: 300,
					render: documentInfo,
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
							api={row.isAttention ? Judgment.unAttention : Judgment.attention}
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
		const { subrogationJudgmentModal } = this.props;
		return (
			<Modal
				title="匹配详情-代位权(文书)"
				width={1100}
				style={{ height: 320 }}
				visible={subrogationJudgmentModal}
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
