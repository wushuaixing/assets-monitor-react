import React from 'react';
import { Modal } from 'antd';
import { linkDom, timeStandard } from '@/utils';
import { Button, Table } from '@/common';
import { ReadStatus } from '@/common/table';
import { partyInfo } from '@/views/_common';
import './association.scss';

/* 默认表格输出单元 */
const defaultColumns = {
	Trial: [
		{
			title: <span style={{ paddingLeft: 11 }}>立案日期</span>,
			dataIndex: 'gmtRegister',
			width: 103,
			render: text => ReadStatus(timeStandard(text), {}),
		},
		{
			title: '当事人',
			dataIndex: 'parties',
			width: 300,
			render: partyInfo,
		},
		{
			title: '法院',
			dataIndex: 'court',
			render: text => text || '-',
		},
		{
			title: '案号',
			dataIndex: 'caseNumber',
			render: text => text || '-',
		},
		{
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
		},
	],
	Court: [
		{
			title: <span style={{ paddingLeft: 11 }}>开庭日期</span>,
			dataIndex: 'gmtTrial',
			width: 103,
			render: text => ReadStatus(timeStandard(text)),
		},
		{
			title: '当事人',
			dataIndex: 'parties',
			width: 300,
			render: partyInfo,
		},
		{
			title: '法院',
			dataIndex: 'court',
			render: text => text || '-',
		},
		{
			title: '案号',
			dataIndex: 'caseNumber',
			render: text => text || '-',
		},
		{
			title: '案由',
			dataIndex: 'caseReason',
			render: text => text || '-',
		},
		{
			title: '链接',
			dataIndex: 'url',
			render: text => text || '-',
		},
	],
	Judgment: [
		{
			title: <span style={{ paddingLeft: 11 }}>立案日期</span>,
			dataIndex: 'gmtRegister',
			width: 103,
			render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
		},
		{
			title: '当事人',
			dataIndex: 'parties',
			width: 300,
			render: partyInfo,
		},
		{
			title: '法院',
			dataIndex: 'court',
			render: text => text || '-',
		},
		{
			title: '案号',
			dataIndex: 'caseNumber',
			render: text => text || '-',
		},
		{
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
		},
	],
};
/**
 * @author: async
 * @date: 2019-10-12
 * @Description: 关联连接
 */
class AssociationLink extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			type: '',
			dataSource: [],
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { visible } = this.state;
		const { source } = this.props;
		return nextState.visible !== visible || JSON.stringify(nextProps.source) !== JSON.stringify(source);
	}

	toShow=(list, type) => {
		this.setState({
			visible: true,
			dataSource: list,
			type,
		});
	};

	/* 关闭modal */
	toClose=() => {
		this.setState({
			visible: false,
		});
	};

	// 多个链接弹框
	toJudgmentShow = (source) => {
		Modal.info({
			title: '本案号关联多个文书链接，如下：',
			okText: '关闭',
			iconType: 'null',
			className: 'assets-an-info',
			width: 600,
			content: (
				<div style={{ marginLeft: -28 }}>
					{ source.map(item => (<p style={{ margin: 5 }}>{linkDom(item.url, item.url)}</p>)) }
				</div>
			),
			onOk() {},
		});
	};

	/* 处理数据 */
	handleSource = (source) => {
		const { associatedInfo: { trialAssociatedInfo: La, courtAssociatedInfo: Kt, judgmentAssociatedInfo: Ws } } = source;
		const resContent = [];
		/*
		* 立案和文书
		* 如果这里是一个的话，要和后端确定返回的数据格式再修改
		* */
		if (La.length > 0) {
			if (La.length > 1) {
				resContent.push(<span className="click-link" onClick={() => this.toShow(La, 'Trial')}>立案</span>);
			} else if (La.length === 1) {
				if (La[0].url) resContent.push(linkDom(La[0].url, '立案'));
				else resContent.push(<span className="click-link" onClick={() => this.toShow(La, 'Trial')}>立案</span>);
			}
		}
		if (Kt.length > 0) {
			if (Kt.length > 1) {
				if (resContent.length) resContent.push(<span className="info-line">|</span>);
				resContent.push(<span className="click-link" onClick={() => this.toShow(Kt, 'Court')}>开庭</span>);
			} else if (Kt.length === 1) {
				if (Kt[0].url) {
					resContent.push(<span className="info-line">|</span>);
					resContent.push(linkDom(Kt[0].url, '开庭'));
				}
			}
		}
		if (Ws.length > 0) {
			if (Ws.length > 1) {
				if (resContent.length)resContent.push(<span className="info-line">|</span>);
				resContent.push(<span className="click-link" onClick={() => this.toJudgmentShow(Ws, 'Judgment')}>文书</span>);
			} else if (Ws.length === 1 && Ws[0].url) {
				if (resContent.length)resContent.push(<span className="info-line">|</span>);
				resContent.push(linkDom(Ws[0].url, '文书'));
			}
		}
		return resContent;
	};

	render() {
		const { source } = this.props;
		const { visible, type, dataSource } = this.state;
		/* 重新数据的数据 */
		const _dataSource = {
			tableData: dataSource.filter(item => !item.url),
			listData: dataSource.filter(item => item.url),
		};
		const text = ((value) => {
			if (value === 'Trial') return { c: '立案', t: '立案日期' };
			if (value === 'Court') return { c: '开庭', t: '开庭日期' };
			if (value === 'Judgment') return { c: '文书', t: '判决日期' };
			return '';
		})(type || 'Trial') || { c: '立案', t: '立案日期' };

		const list = this.handleSource(source) || [];
		return (
			<React.Fragment>
				{ list.length ? list.map(i => i) : '-'}
				<Modal
					title={`关联${text.c}信息`}
					onCancel={this.toClose}
					wrapClassName="yc-modal-association-link"
					maskCloabe={false}
					visible={visible}
					width={900}
					footer={[
						<Button onClick={this.toClose} title="关闭" style={{ width: 100 }} />,
					]}
				>
					{[
						_dataSource.tableData.length
							? <Table columns={defaultColumns[type || 'Trial']} dataSource={_dataSource.tableData} pagination={false} /> : null,
						// _dataSource.tableData.length && _dataSource.listData.length ? <div className="source-list-hr" /> : null,
						// _dataSource.listData.length
						// 	? [
						// 		<div className="yc-public-title-normal source-list-title">{`本条信息关联的其他多个${text.c}链接：`}</div>,
						// 		<div className="source-list-data">
						// 			<span className="list-title">{text.t}</span>
						// 			<span className="list-content">相关链接地址</span>
						// 		</div>,
						// 		_dataSource.listData.map(item => (
						// 			<div className="source-list-data">
						// 				<span className="list-title">{timeStandard(item.gmtTrial || item.gmtRegister)}</span>
						// 				<span className="list-content">{linkDom(item.url, item.url)}</span>
						// 			</div>
						// 		)),
						// 	]
						// 	: null,
					]}
				</Modal>
			</React.Fragment>
		);
	}
}
const methods = (value, row, type) => <AssociationLink source={row} type={type} />;

export default methods;
