import React from 'react';
// import { navigate } from '@reach/router';
import { Pagination } from 'antd';
import QueryView from './common/queryView';
import { inquiryList } from '@/utils/api/portrait-inquiry';
import { Spin, Table } from '@/common';
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
		this.condition = {};
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
			title: '主要信息',
			dataIndex: 'name',
			render: (value, row) => (
				<div className="assets-info-content">
					<li className="yc-public-large-bold yc-em-tag" style={{ margin: '10px 0' }} dangerouslySetInnerHTML={{ __html: value }} />
					<li>
						<span className="list list-title">法定代表人</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content" style={{ minWidth: 40 }}>
							{row.legalPersonName || '--'}
						</span>
						<span className="list-split" style={{ height: 16 }} />
						<span className="list list-title">注册资本</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content" style={{ minWidth: 130 }}>
							{row.regCapital || '--'}
						</span>
						<span className="list-split" style={{ height: 16 }} />
						<span className="list list-title ">成立日期</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">
							{timeStandard(row.estiblishTime)}
						</span>
					</li>
				</div>
			),
		},
	];

	/* 默认查询 */
	handleQuery=(obj) => {
		this.condition = obj;
		this.toGetData(1);
	};

	// 查询数据methods
	toGetData=(page) => {
		this.setState({ loading: true });
		inquiryList({
			page: page || 1,
			name: this.condition.name,
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
				<QueryView onQuery={this.handleQuery} />
				<div className="mark-line" />
				<div className="inquiry-list-content">
					<div className="list-content-total">
						<span>源诚为您找到以下</span>
						<span style={{ fontWeight: 'bold', margin: '0 5px' }}>{total || 0}</span>
						<span>家可能符合条件的企业</span>
					</div>
					<div className="content-list" style={{ paddingTop: 2 }}>
						{/* <Button */}
						{/* onClick={() => navigate('/inquiry/enterprise')} */}
						{/* > */}
						{/* {'=> 企业查询详情'} */}
						{/* </Button> */}
						<Spin visible={loading}>
							<Table
								className="yc-none-background"
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
