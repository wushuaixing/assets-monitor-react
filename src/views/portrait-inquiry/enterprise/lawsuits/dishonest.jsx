import React from 'react';
import { Pagination } from 'antd';
import { Spin, Table } from '@/common';
import assets from '@/utils/api/portrait-inquiry/enterprise/assets';

const { court } = assets;
export default class Dishonest extends React.Component {
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
			title: '基本信息',
			dataIndex: 'disruptTypeName',
		}, {
			title: '关联信息',
			width: 360,
			render: (value, row) => (
				<div className="assets-info-content">
					<li>
						<span className="list list-title align-justify">执行法院</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{row.court || '-'}</span>
					</li>
					<li>
						<span className="list list-title align-justify">发布日期</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{row.publishDate || '-'}</span>
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
		court.list({
			page: page || 1,
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
		const { id } = this.props;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab">
					<div className="yc-tabs-simple-prefix">失信记录</div>
				</div>
				<div className="inquiry-public-table">
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
				</div>
			</div>

		);
	}
}
