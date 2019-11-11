import React from 'react';
import { Pagination } from 'antd';
import { Spin, Table } from '@/common';
import assets from '@/utils/api/portrait-inquiry/enterprise/assets';
import { LawsuitsMonitor } from './common';

const { trial } = assets;


export default class lawsuitsMonitor extends React.Component {
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
			dataIndex: 'caseNumber',
			render: LawsuitsMonitor.LawsuitsDetail,
		}, {
			width: 360,
			render: LawsuitsMonitor.LawsuitsTrialCourt,
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
			console.log(res);
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
					<div className="yc-tabs-simple-prefix">
                        涉诉文书
						<span className="yc-table-num">{total}</span>
					</div>
				</div>
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
		);
	}
}
