import React from 'react';
import { Pagination } from 'antd';
import { getDynamicAsset } from 'api/dynamic';
import {
	Button, Ellipsis, Icon, Spin, Table, ClueModal,
} from '@/common';
import associationLink from '@/views/_common/association-link';
import { linkDom, timeStandard } from '@/utils';


export default class TableIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: '',
			current: 1,
			total: 0,
			loading: false,
			historyInfoModalVisible: false,
		};
	}

	componentWillMount() {
		this.toGetData();
	}

	toGetPortrait =() => {
		const { portrait } = this.props;
		return portrait === 'business';
	};

	toGetColumns=() => [
		{
			title: '拍卖信息',
			dataIndex: 'caseNumber',
			render: (value, row) => (
				<div className="assets-info-content">
					<li className="yc-public-normal-bold" style={{ marginBottom: 2, lineHeight: '20px' }}>
						<span className="list list-content text-ellipsis" style={{ maxWidth: 300 }}>
							{row.caseNumber ? <Ellipsis url={row.url} content={row.caseNumber.replace('（', '( ')} isSourceLink bussinessStyle tooltip /> : '-'}
						</span>
						<div className="relevance-announcement-btn" onClick={() => this.toOpenHistory(row)}>
							<Icon type="icon-history" style={{ fontSize: 13, marginLeft: 8, marginRight: 4 }} />
							查看关联公告
						</div>
					</li>
					<li>
						<span style={{ width: '65px' }} className="list list-title align-justify">申请人</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{timeStandard(row.gmtTrial)}</span>
					</li>
					<li>
						<span style={{ width: '65px' }} className="list list-title align-justify">被申请人</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{timeStandard(row.gmtTrial)}</span>
					</li>
				</div>
			),
		}, {
			title: '关联信息',
			width: 270,
			render: (value, row) => (
				<div className="assets-info-content">
					<li style={{ height: 24 }} />
					<li>
						<span className="list list-title align-justify">公开日期</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content"><Ellipsis content={row.court} width={200} font={12} tooltip /></span>
					</li>
					<li>
						<span className="list list-title align-justify">受理法院</span>
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
		const { portrait } = this.props;
		const { api, params } = getDynamicAsset(portrait, {
			b: 10202,
			e: 'court',
		});
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

	// 点击历史拍卖信息
	toOpenHistory=(source) => {
		console.log(source);
		const { historyInfoModalVisible } = this.state;
		this.setState({
			historyInfoModalVisible: !historyInfoModalVisible,
		});
	};

	render() {
		const {
			dataSource, current, total, historyInfoModalVisible,
		} = this.state;
		const { loading } = this.state;
		const { loadingHeight } = this.props;
		return (
			<div className="yc-assets-auction ">
				<Spin visible={loading} minHeight={(current > 1 && current * 5 >= total) ? '' : loadingHeight}>
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
				{
					historyInfoModalVisible && (
						<ClueModal
							onCancel={this.toOpenHistory}
							data={dataSource}
							historyInfoModalVisible={historyInfoModalVisible}
						/>
					)
				}
			</div>
		);
	}
}
