import React from 'react';
import { Modal } from 'antd';
import { linkDom, timeStandard } from '@/utils';
import { Button, Table } from '@/common';
import { ReadStatus } from '@/common/table';
import { partyInfo } from '@/views/_common';
import './association.scss';
import link from '@/assets/img/business/link.png';

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
			width: 50,
			render: text => (text ? <a href={text}><img className="linkPic" src={link} alt="链接" /></a> : '-'),
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

	/*
	* La: ；立案，Kt: 开庭， Ws: 文书
	* 立案：该条数据有链接, 点击直接跳转源链接
	* 开庭：只有1条且无源链接，不显示“开庭”两字；只有1条且有链接的情况：点击直接跳转；有多条的情况：打开弹窗
	* 有同个案号的文书信息，且有源链接 点击直接跳转源链接
	*/
	handleSource = (source) => {
		const { associatedInfo: { trialAssociatedInfo: La, courtAssociatedInfo: Kt, judgmentAssociatedInfo: Ws } } = source;
		const resContent = [];
		if (La.length > 0) {
			if (La[0].url) {
				resContent.push(linkDom(La[0].url, '立案'));
			}
		}
		if (Kt.length > 0) {
			if (Kt.length > 1) {
				if (resContent.length) resContent.push(<span className="info-line">|</span>);
				resContent.push(<span className="click-link" onClick={() => this.toShow(Kt, 'Court')}>开庭</span>);
			} else if (Kt.length === 1) {
				if (Kt[0].url) {
					if (resContent.length) resContent.push(<span className="info-line">|</span>);
					resContent.push(linkDom(Kt[0].url, '开庭'));
				}
			}
		}
		if (Ws.length > 0) {
			if (Ws[0].url) {
				resContent.push(<span className="info-line">|</span>);
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
					{
						 _dataSource && _dataSource.tableData && _dataSource.tableData.length > 3 && (
						<div className="tips">
							共搜索到
							<span>100</span>
							条关联开庭信息，为您展示最新
							<span>3</span>
							条：
						</div>
						 )
					}
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
