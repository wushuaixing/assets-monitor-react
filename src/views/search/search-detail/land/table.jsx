import React from 'react';
import { Form } from 'antd';
import { Ellipsis, Table } from '@/common';
import { partyInfo } from '@/views/_common';
import order from '@/assets/img/icon/icon_arrow.png';
import './style.scss';
import { Result } from '@/views/asset-excavate/land-data/table/common';

class LandView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			Sort, dataList, SortTime, type,
		} = this.props;
		const sellColumns = [
			{
				title: (
					<div className="yc-trialRelation-title" onClick={() => SortTime('DESC')}>
						{ '签订日期' }
						{/* {Sort === undefined && <span className="sort th-sort-default" />} */}
						{Sort === undefined && <img src={order} alt="" className="sort th-sort-default" /> }
						{Sort === 'DESC' && <span className="sort th-sort-down" />}
						{Sort === 'ASC' && <span className="sort th-sort-up" />}
					</div>),
				dataIndex: 'singedTime',
				key: 'singedTime',
				width: 122,
				render: (text, row) => (
					<span>{row.singedTime || '-'}</span>
				),
			}, {
				title: '土地使用权人',
				dataIndex: 'obligorName',
				key: 'obligorName',
				width: 241,
				render: text => <span>{text || '-'}</span>,
			}, {
				title: '项目信息',
				dataIndex: 'projectName',
				key: 'projectName',
				render: (text, rowContent) => (
					<React.Fragment>
						<div className="assets-info-content yc-space-nowrap">
							<li>
								<span className="list list-title align-justify">项目名称：</span>
								<span className="list list-content" style={{ color: '#186fc7' }}>
									<Ellipsis content={rowContent.projectName} url={rowContent.url} tooltip width={200} />
								</span>
							</li>
							<li>
								<span className="list list-title align-justify">行政区划：</span>
								<span className="list list-content">
									<Ellipsis content={rowContent.administrativeRegion || '-'} tooltip width={200} />
								</span>
							</li>
							<li>
								<span className="list list-title align-justify">宗地坐落：</span>
								<span className="list list-content">
									<Ellipsis content={rowContent.landAddress} tooltip width={200} />
								</span>
							</li>
						</div>
					</React.Fragment>
				),
			},
			{
				title: '土地信息',
				dataIndex: 'landUse',
				key: 'landUse',
				render: (text, rowContent) => (
					<React.Fragment>
						<div className="assets-info-content  yc-space-nowrap">
							<li>
								<span className="list list-title align-justify">土地用途：</span>
								<span className="list list-content text-ellipsis">
									<Ellipsis content={rowContent.landUse || '-'} tooltip width={110} />
								</span>
							</li>
							<li>
								<span className="list list-title align-justify">面　　积：</span>
								<span className="list list-content">
									{rowContent.landArea ? `${rowContent.landArea}公顷` : '-' }
								</span>
							</li>
							<li>
								<span className="list list-title align-justify">使用年限：</span>
								<span className="list list-content">
									{rowContent.transferTerm || '-'}
								</span>
							</li>
						</div>
					</React.Fragment>
				),
			},
			{
				title: '出让信息',
				dataIndex: 'supplyWay',
				key: 'supplyWay',
				render: (text, rowContent) => (
					<React.Fragment>
						<div className="assets-info-content">
							<li>
								<span className="list list-title align-justify">供地方式：</span>
								<span className="list list-content text-ellipsis">{rowContent.supplyWay || '-'}</span>
							</li>
							<li>
								<span className="list list-title align-justify">批准单位：</span>
								<span className="list list-content">
									<Ellipsis content={rowContent.approver || '-'} tooltip width={170} />
								</span>
							</li>
							<li>
								<span className="list list-title align-justify">成交价格：</span>
								<span className="list list-content">
									{rowContent.finalPrice ? `${rowContent.finalPrice} 万元` : '-'}
								</span>
							</li>
						</div>
					</React.Fragment>
				),
			},
		];
		const transferColumns = [
			{
				title: (
					<div className="yc-trialRelation-title" onClick={() => SortTime('DESC')}>
						{'成交日期'}
						{/* {Sort === undefined && <span className="sort th-sort-default" />} */}
						{Sort === undefined && <img src={order} alt="" className="sort th-sort-default" /> }
						{Sort === 'DESC' && <span className="sort th-sort-down" />}
						{Sort === 'ASC' && <span className="sort th-sort-up" />}
					</div>),
				dataIndex: 'dealingTime',
				key: 'dealingTime',
				width: 122,
				render: (text, row) => (
					<span>{row.dealingTime || '-'}</span>
				),
			}, {
				title: '土地使用权人',
				dataIndex: 'parties',
				width: 241,
				render: partyInfo,
			}, {
				title: '项目信息',
				dataIndex: 'court',
				render: Result.InfoTransferProject,
			}, {
				title: '土地信息',
				dataIndex: 'caseNumber',
				render: Result.InfoLand,
			}, {
				title: '转让信息',
				dataIndex: 'caseReason',
				render: Result.transferInfo,
			},
		];
		const mortgageColumns = [
			{
				title: (
					<div className="yc-trialRelation-title" onClick={() => SortTime('DESC')}>
						{'登记日期'}
						{/* {Sort === undefined && <span className="sort th-sort-default" />} */}
						{Sort === undefined && <img src={order} alt="" className="sort th-sort-default" /> }
						{Sort === 'DESC' && <span className="sort th-sort-down" />}
						{Sort === 'ASC' && <span className="sort th-sort-up" />}
					</div>),
				dataIndex: 'registrationStartTime',
				key: 'registrationStartTime',
				width: 122,
				render: (text, row) => (
					<span>{row.registrationStartTime || '-'}</span>
				),
			}, {
				title: '土地权利人',
				dataIndex: 'parties',
				render: (text, row) => partyInfo(text, row, false, false, 223),
			}, {
				title: '项目信息',
				dataIndex: 'court',
				render: Result.InfoTransferProject,
			}, {
				title: '土地信息',
				dataIndex: 'caseNumber',
				render: Result.InfoMortgageLand,
			}, {
				title: '抵押信息',
				dataIndex: 'caseReason',
				render: Result.InfoMortgage,
			},
		];

		return (
			<React.Fragment>
				{type === 1 ? (
					<Table
						rowKey={record => record.id}
						dataSource={dataList.length > 0 && dataList}
						columns={sellColumns}
						style={{ width: '100%' }}
						defaultExpandAllRows
						pagination={false}
						onRowClick={() => {}}
					/>
				) : null}
				{type === 2 ? (
					<Table
						rowKey={record => record.id}
						dataSource={dataList.length > 0 && dataList}
						columns={transferColumns}
						style={{ width: '100%' }}
						defaultExpandAllRows
						pagination={false}
						onRowClick={() => {}}
					/>
				) : null}
				{type === 3 ? (
					<Table
						rowKey={record => record.id}
						dataSource={dataList.length > 0 && dataList}
						columns={mortgageColumns}
						style={{ width: '100%' }}
						defaultExpandAllRows
						pagination={false}
						onRowClick={() => {}}
					/>
				) : null}
			</React.Fragment>
		);
	}
}
export default Form.create()(LandView);
