import React from 'react';
import { Modal, Button } from 'antd';
import api from '@/utils/api/monitor-info/finance';
import { Ellipsis, Spin, Table } from '@/common';
import { Attentions } from '@/common/table';
import { timeStandard } from '@/utils';

// 出质详情
const PledgeDetail = (text, rowContent) => (
	<React.Fragment>
		<div className="assets-info-content">
			<li>
				<span className="list list-title align-justify " style={{ width: 72 }}>股权标的企业</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">
					<Ellipsis content={rowContent.companyName} tooltip width={250} />
				</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 72 }}>登记编号</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">{rowContent.regNumber || '-'}</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 72 }}>出质股权数额</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">{rowContent.equityAmount || '-'}</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 72 }}>状 态</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">{rowContent.state === 1 ? '无效' : '有效'}</span>
			</li>
		</div>
	</React.Fragment>
);

export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [], // 列表数据
			loading: false,
			columns: [
				{
					title: '登记日期',
					dataIndex: 'regDate',
					render: text => (text || '-'),
				}, {
					title: '出质人',
					dataIndex: 'pledgorList',
					width: 250,
					render: (text, row) => row.pledgorList && row.pledgorList.length > 0 && row.pledgorList.map(item => (
						<Ellipsis content={item.pledgor || '-'} url={item.pledgorId ? `/#/business/debtor/detail?id=${item.pledgorId}` : ''} tooltip width={230} />
					)),
				}, {
					title: '质权人',
					dataIndex: 'pledgeeList',
					width: 250,
					render: (text, row) => row.pledgeeList && row.pledgeeList.length > 0 && row.pledgeeList.map(item => (
						<Ellipsis content={item.pledgee || '-'} url={item.pledgeeId ? `/#/business/debtor/detail?id=${item.pledgeeId}` : ''} tooltip width={230} />
					)),
				}, {
					title: '出质详情',
					render: PledgeDetail,
				}, {
					title: '更新日期',
					className: 'tAlignCenter_important',
					dataIndex: 'gmtCreate',
					render: text => timeStandard(text),
				}, {
					title: '操作',
					unNormal: true,
					width: 60,
					className: 'tAlignCenter_important',
					render: (text, row, index) => (
						<Attentions
							text={text}
							row={row}
							onClick={this.onRefresh}
							api={row.isAttention ? api.unFollowResult : api.followResult}
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
		const { equityPledgeModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-股权质押"
				width={1100}
				style={{ height: 320 }}
				visible={equityPledgeModalVisible}
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
