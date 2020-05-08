import React, { Fragment } from 'react';
import { Modal, Button } from 'antd';
import { Copyright, Dump } from 'api/monitor-info/intangible';
import isBreak from 'img/business/status_shixin.png';
import beforeBreak from 'img/business/status_cengshixin.png';
import { followSingle, unFollowSingle } from 'api/monitor-info/broken-record';
import { Ellipsis, Spin, Table } from '@/common';
import { Attentions, ReadStatus, SortVessel } from '@/common/table';
import { linkDetail, linkDom, timeStandard } from '@/utils';

const imgStyle = {
	position: 'absolute',
	right: 8,
	bottom: 5,
};
export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [
				{
					caseCode: '(2019)豫1082执恢782号',
					court: '长葛市人民法院',
					createTime: '2020-03-20',
					disruptType: '有履行能力而拒不履行生效法律文书确定义务',
					duty: '一、被告辉县市盛源纺织有限公司、河南凯迪药用特种包装材料有限公司、新乡市汇丰纺织有限公司、徐道平、郭照虎、徐艳君、宋连陆于本判决生效之日起十日内偿还原告贾保平借款本金150万元及利息（自2013年4月22日起至本判决确定的履行期限届满之日按中国人民银行同期同类人民币贷款利率的四倍计算），被告对该笔债务承担保证责任后，有权向获嘉县万得沣纺织有限公司及王士祥、宋清平、安国栋进行追偿。',
					gmtPublishDate: '2019-12-16',
					id: 25789,
					isAttention: true,
					isRead: true,
					name: '徐道平',
					number: '410724196201123514',
					obligorId: 321906,
					performance: '全部未履行',
					removeStatus: false,
					status: 1,
					updateTime: '2020-03-21',
				},
			], // 列表数据
			loading: false,
			columns: [
				{
					title: '发布日期',
					dataIndex: 'gmtPublishDate',
					render: text => timeStandard(text) || '-',
				}, {
					title: '债务人',
					dataIndex: 'name',
					width: 200,
					render: (text, row = {}) => (
						<div style={{ position: 'relative' }}>
							<Ellipsis
								content={(text || '-') + (text.length <= 4 ? `（${row.number}）` : '')}
								tooltip
								width={160}
								url={`/#/business/debtor/detail?id=${row.obligorId}`}
							/>
							{row.status === 1 && <img style={imgStyle} src={isBreak} alt="" />}
							{row.status === 2 && <img style={imgStyle} src={beforeBreak} alt="" />}
						</div>
					),

				}, {
					title: '案件信息',
					dataIndex: 'caseCode',
					width: 250,
					render: (text, row) => (
						<div className="assets-info-content">
							<li>
								<span className="list list-title align-justify" style={{ width: 50 }}>案号</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content"><Ellipsis content={text || '-'} tooltip width={200} /></span>
							</li>
							<li>
								<span className="list list-title align-justify" style={{ width: 50 }}>执行法院</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content"><Ellipsis content={row.court || '-'} tooltip width={200} /></span>
							</li>
						</div>
					),
				}, {
					title: '失信信息',
					dataIndex: 'disruptType',
					render: (text, row) => (
						<div className="assets-info-content">
							<li>
								<span className="list list-title align-justify" style={{ width: 100 }}>失信行为具体情形</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content"><Ellipsis content={text || '-'} tooltip width={200} /></span>
							</li>
							<li>
								<span className="list list-title align-justify" style={{ width: 100 }}>生效文书确定义务</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content"><Ellipsis content={row.duty || '-'} tooltip width={200} /></span>
							</li>
							<li>
								<span className="list list-title align-justify" style={{ width: 100 }}>被执行人履行情况</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content">{row.performance || '-'}</span>
							</li>
						</div>
					),
				}, {
					title: '移除情况',
					dataIndex: 'removeStatus',
					render: text => (text ? <p className="no-attention">已移除</p> : <p className="circle-item">未移除</p>),
				}, {
					title: '更新日期',
					dataIndex: 'updateTime',
					render: val => timeStandard(val),
				}, {
					title: '操作',
					unNormal: true,
					className: 'tAlignCenter_important',
					render: (text, row, index) => (
						<Attentions
							text={text}
							row={row}
							onClick={this.onRefresh}
							api={row.isAttention ? unFollowSingle : followSingle}
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
		const { brokenModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-商标专利"
				width={1100}
				style={{ height: 320 }}
				visible={brokenModalVisible}
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
