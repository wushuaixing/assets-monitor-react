import React from 'react';
import { Form } from 'antd';
import { Ellipsis, Table } from '@/common';
import { partyInfo } from '@/views/_common';
import order from '@/assets/img/icon/icon_arrow.png';
import { Result } from '@/views/asset-excavate/land-data/table/common';
import { formatDateTime } from '@/utils/changeTime';
import { toFormatArrayToString } from '@/utils';

class EquityPledgeView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			Sort, dataList, SortTime,
		} = this.props;
		const columns = [
			{
				title: (
					<div className="yc-trialRelation-title" onClick={() => SortTime('DESC')}>
						{ '签订日期' }
						{/* {Sort === undefined && <span className="sort th-sort-default" />} */}
						{Sort === undefined && <img src={order} alt="" className="sort th-sort-default" /> }
						{Sort === 'DESC' && <span className="sort th-sort-down" />}
						{Sort === 'ASC' && <span className="sort th-sort-up" />}
					</div>),
				dataIndex: 'regDate',
				key: 'regDate',
				width: 122,
				render: (text, row) => (
					<span>{row.regDate || '-'}</span>
				),
			}, {
				title: '出质人',
				dataIndex: 'pledgorList',
				key: 'pledgorList',
				width: 241,
				render: text => <span>{text}</span>,
			}, {
				title: '质权人',
				dataIndex: 'pledgeeList',
				key: 'pledgeeList',
				width: 241,
				render: text => <span>{text}</span>,
			}, {
				title: '项目信息',
				dataIndex: 'projectName',
				key: 'projectName',
				render: (text, rowContent) => (
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
						</div>
					</React.Fragment>
				),
			},
			{
				title: '登记状态',
				dataIndex: 'state',
				key: 'state',
				render: (text) => <span>{text === 1 || text === '1' ? '无效' : '有效'}</span>,
			},
		];

		return (
			<React.Fragment>
				<Table
					rowKey={record => record.id}
					dataSource={dataList.length > 0 && dataList}
					columns={columns}
					style={{ width: '100%' }}
					defaultExpandAllRows
					pagination={false}
					onRowClick={() => {}}
				/>
			</React.Fragment>
		);
	}
}
export default Form.create()(EquityPledgeView);
