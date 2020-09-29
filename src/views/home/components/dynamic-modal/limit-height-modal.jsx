import React from 'react';
import { Modal, Button } from 'antd';
import { Ellipsis, Spin, Table } from '@/common';
import { Attentions, ReadStatus } from '@/common/table';
import Api from 'api/monitor-info/seizedUnbock';
import { timeStandard } from '@/utils';
import RegisterModal from '../../../risk-monitor/bankruptcy/registerModal';
import './comStyle.scss';

export default class LimitHeightModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [], // 列表数据
			loading: false,
			registerModalVisible: false,
			rowObj: {},
			columns: [
				{
					title: <span style={{ paddingLeft: 11 }}>立案日期</span>,
					dataIndex: 'registerDate',
					width: 120,
					render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
				}, {
					title: '姓名',
					dataIndex: 'parties',
					render: text => (
						text.map(i => (
							<Ellipsis
								content={`${i.role === 1 ? `${i.obligorName}(${i.obligorNumber})` : `${i.name}`}`}
								tooltip
								width={180}
								url={`${i.obligorId !== 0 && i.role === 1 ? `/#/business/debtor/detail?id=${i.obligorId}` : ''}`}
							/>
						))
					),
				},
				{
					title: '企业',
					dataIndex: 'parties',
					render: text => (
						text.map(i => (
							<Ellipsis
								content={`${i.role === 1 ? '-' : `${i.obligorName}`}`}
								tooltip
								width={180}
								url={`${i.obligorId !== 0 ? `/#/business/debtor/detail?id=${i.obligorId}` : ''}`}
							/>
						))
					),
				}, {
					title: '案号',
					dataIndex: 'caseNumber',
					width: 190,
					render: text => <span>{text}</span>,
				}, {
					title: '移除状况',
					dataIndex: 'status',
					width: 102,
					render: text => (
						<span>
							<span className="status-dot" style={{ backgroundColor: text === 1 ? '#3DBD7D' : '#FB5A5C' }} />
							<span className="status-text">{text === 1 ? '已移除' : '未移除'}</span>
						</span>
					),
				}, {
					title: global.Table_CreateTime_Text,
					dataIndex: 'gmtModified',
					width: 120,
				}, {
					title: '操作',
					width: 55,
					unNormal: true,
					className: 'tAlignCenter_important',
					render: (text, row, index) => (
						<Attentions
							text={text}
							row={row}
							// onClick={onRefresh}
							api={row.isAttention ? Api.unFollow : Api.follow}
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

	// 打开立案弹框
	openRegisterModal = (rowObj) => {
		// console.log(rowObj);
		this.setState({
			registerModalVisible: true,
			rowObj,
		});
	};

	// 关闭弹窗
	onCancel = () => {
		this.setState({
			registerModalVisible: false,
		});
	};

	handleCancel=() => {
		const { onCancel } = this.props;
		onCancel();
	};

	render() {
		const {
			columns, dataSource, loading, registerModalVisible, rowObj,
		} = this.state;
		const { limitHeightModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-限制高消费"
				width={1100}
				style={{ height: 320 }}
				visible={limitHeightModalVisible}
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
						<Button onClick={this.handleCancel} type="primary" className="dynamic-modal-btn">关闭</Button>
					</div>
				</Spin>
				{registerModalVisible && (
					<RegisterModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						rowObj={rowObj}
						registerModalVisible={registerModalVisible}
					/>
				)}
			</Modal>
		);
	}
}
