import React from 'react';
import { navigate } from '@reach/router';
import { Pagination } from 'antd';
import QueryView from './common/queryView';
import { inquiryList } from '@/utils/api/portrait-inquiry';
import { Button, Spin, Table } from '@/common';
import { timeStandard } from '@/utils';

export default class InquiryList extends React.Component {
	constructor(props) {
		document.title = '列表-画像查询';
		super(props);
		this.state = {
			dataSource: '',
			current: 1,
			total: 0,
			loading: false,
		};
	}

	componentWillMount() {
		// this.toGetData();
	}

	// 当前页数变化
	onPageChange=(val) => {
		this.toGetData(val);
	};

	toGetColumns=() => [
		{
			title: '信息',
			dataIndex: 'owner',
		}, {
			title: '关联信息',
			width: 360,
			render: (value, row) => (
				<div className="assets-info-content">
					<li>
						<span className="list list-content">{row.state === 0 ? '有效' : '无效'}</span>
					</li>
					{
						row.state === 1 ? [
							<li>
								<span className="list list-title align-justify">注销时间</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content">{row.regDate || '-'}</span>
							</li>,
							<li>
								<span className="list list-title align-justify">注销原因</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content">{timeStandard(row.cancelReason) || '-'}</span>
							</li>,
						] : null
					}
					<li>
						<span className="list list-title align-justify">登记编号</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{row.regNumber || '-'}</span>
					</li>
				</div>
			),
		},
	];

	// 查询数据methods
	toGetData=(page) => {
		this.setState({ loading: true });
		inquiryList({
			page: page || 1,
			name: '阿里巴巴',
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
			<div className="yc-inquiry-list">
				<QueryView />
				<div className="mark-line" />
				<div className="inquiry-list-content">
					<div className="list-content-total">
						<span>源诚为您找到以下</span>
						<span style={{ fontWeight: 'bold', margin: '0 5px' }}>{total || 0}</span>
						<span>家可能符合条件的企业</span>
					</div>
					<div className="content-list">
						<Button
							onClick={() => navigate('/inquiry/enterprise')}
						>
							{'=> 企业查询详情'}
						</Button>
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
				</div>
			</div>
		);
	}
}
