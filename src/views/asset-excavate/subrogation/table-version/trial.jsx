import React from 'react';
import { Pagination } from 'antd';
import { Ellipsis, Spin, Table } from '@/common';
import assets from '@/utils/api/portrait-inquiry/enterprise/assets';
import associationLink from '@/views/_common/association-link';
import {
	timeStandard, toEmpty, linkDom, getCaseType,
} from '@/utils';
import { PartyCrosswise } from '@/views/_common';

const { trial } = assets;


export default class TableIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: '',
			current: 1,
			total: 0,
			loading: false,
		};
	}

	componentWillMount() {
		this.toGetData();
	}

	toGetColumns=() => [
		{
			title: '拍卖信息',
			dataIndex: 'caseNumber',
			render: (value, row) => (
				<div className="assets-info-content">
					<li className="yc-public-normal-bold" style={{ marginBottom: 2, lineHeight: '20px' }}>
						<span className="list list-content text-ellipsis" style={{ maxWidth: 300 }}>
							{linkDom('', value.replace('（', '( '))}
						</span>
						{
							row.caseType ? <span className="yc-case-type">{getCaseType(row.caseType)}</span> : ''
						}
					</li>
					<li>
						<span className="list list-title align-justify">立案日期</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{timeStandard(row.gmtRegister)}</span>
					</li>
					<PartyCrosswise value={row.parties} row={row} />
				</div>
			),
		}, {
			title: '关联信息',
			width: 270,
			render: (value, row) => (
				<div className="assets-info-content">
					<li style={{ height: 24 }} />
					<li>
						<span className="list list-title align-justify">审理法院</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">
							{ toEmpty(row.court) ? <Ellipsis content={row.court} width={200} font={12} /> : '--' }
						</span>
					</li>
					<li>
						<span className="list list-title align-justify">关联信息</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{associationLink(value, row, 'Court')}</span>
					</li>
				</div>
			),
		},
	];

	// 当前页数变化
	onPageChange=(val) => {
		this.toGetData(val);
	};

	// 查询数据methods
	toGetData=(page) => {
		this.setState({ loading: true });
		trial.list({
			page: page || 1,
		}).then((res) => {
			// console.log(res);
			if (res.code === 200) {
				this.setState({
					dataSource: res.data.list,
					current: res.data.page,
					total: res.data.total,
					loading: false,
				});
			} else {
				this.setState({
					dataSource: '',
					current: 1,
					total: 0,
					loading: false,
				});
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	render() {
		const { dataSource, current, total } = this.state;
		const { loading } = this.state;

		return (
			<div className="yc-assets-auction">
				<Spin visible={loading}>
					<Table
						rowClassName={() => 'yc-assets-auction-table-row'}
						columns={this.toGetColumns()}
						dataSource={dataSource}
						showHeader={false}
						pagination={false}
					/>
					{dataSource && dataSource.length > 0 && (
						<div className="yc-table-pagination">
							<Pagination
								showQuickJumper
								current={current || 1}
								total={total || 0}
								onChange={this.onPageChange}
								showTotal={totalCount => `共 ${totalCount} 条信息`}
							/>
						</div>
					)}
				</Spin>
			</div>
		);
	}
}
