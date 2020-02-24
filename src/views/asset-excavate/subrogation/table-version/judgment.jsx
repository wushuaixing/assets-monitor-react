import React from 'react';
import { Pagination } from 'antd';
import assetsDetail from 'api/detail/assets';
import {
	Ellipsis, Icon, Spin, Table,
} from '@/common';
import assets from '@/utils/api/portrait-inquiry/enterprise/assets';
import personalAssets from '@/utils/api/portrait-inquiry/personal/assets';
import {
	getQueryByName, timeStandard, toEmpty,
} from '@/utils';
import { PartyCrosswise } from '@/views/_common';

const { judgment } = assets;
const { personalJudgment } = personalAssets;

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
			title: '信息',
			dataIndex: 'title',
			render: (value, row) => (
				<div className="assets-info-content">
					<li className="yc-public-normal-bold" style={{ marginBottom: 2, lineHeight: '20px' }}>
						<span className="list list-content text-ellipsis" style={{ maxWidth: 400 }}>
							{ toEmpty(row.title)
								? <Ellipsis content={row.title} url={row.url} tooltip width={400} font={15} /> : '--' }
						</span>
						{ row.caseType ? <span className="yc-case-type">{(row.caseType)}</span> : ''}
						{ row.caseReason ? <span className="yc-case-reason text-ellipsis">{row.caseReason}</span> : ''}
					</li>
					<li>
						<span className="list list-title align-justify">判决日期</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content" style={{ minWidth: 80 }}>{timeStandard(row.gmtJudgment)}</span>
						<span className="list-split" style={{ height: 16 }} />
						<span className="list list-title align-justify">发布日期</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{timeStandard(row.gmtPublish)}</span>
					</li>
					<PartyCrosswise value={row.parties} row={row} type="judgment" />
				</div>
			),
		}, {
			title: '关联信息',
			width: 270,
			dataIndex: 'caseNumber',
			render: (value, row) => (
				<div className="assets-info-content">
					<li>
						<Icon type="icon-dot" style={{ fontSize: 12, color: '#3DBD7D', marginRight: 2 }} />
						<span className="list list-content " style={{ maxWidth: 210 }}>{value}</span>
					</li>
					<li>
						<span className="list list-title align-justify">审理法院</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{row.court || '-'}</span>
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
		const { portrait } = this.props;
		const params = {};
		let api = '';
		if (portrait === 'personal') {
			params.obligorName = getQueryByName(window.location.href, 'name');
			params.obligorNumber = getQueryByName(window.location.href, 'num');
			api = personalJudgment;
		} else if (portrait === 'detail') {
			params.id = getQueryByName(window.location.href, 'id');
			api = judgment;
		} else {
			params.companyId = getQueryByName(window.location.href, 'id');
			api = assetsDetail.judgment;
		}
		this.setState({ loading: true });
		api.list({
			page: page || 1,
			num: 5,
			...params,
		}).then((res) => {
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
								pageSize={5}
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
