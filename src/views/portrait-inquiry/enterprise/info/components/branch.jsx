import React from 'react';
import { Spin, Table } from '@/common';
import { getBranch } from '@/utils/api/portrait-inquiry/enterprise/info';
import { formatDateTime } from '@/utils/changeTime';

export default class Branch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			data: [], // 列表数据
		};
	}

	componentDidMount() {
		this.getBranchData();
	}

	getBranchData = () => {
		this.setState({
			loading: true,
		});
		const params = {
			id: 1,
		};
		getBranch(params)
			.then((res) => {
				if (res.code === 200) {
					this.setState({
						loading: false,
						data: res.data,
					});
				} else {
					this.setState({ loading: false });
				}
			})
			.catch(() => {
				this.setState({ loading: false });
			});
	}

	toGetColumns = () => [
		{
			title: '序号',
			dataIndex: 'indexNum',
			key: 'indexNum',
			width: 120,
			render(text) {
				return <div>{text || '-'}</div>;
			},
		}, {
			title: '机构名称',
			dataIndex: 'companyName',
			key: 'companyName',
			width: 300,
			render(text) {
				return <div>{text || '-'}</div>;
			},
		}, {
			title: '法定代表人',
			dataIndex: 'legalName',
			key: 'legalName',
			render(text) {
				return <div>{text || '-'}</div>;
			},
		}, {
			title: '注册资本',
			dataIndex: 'regCapital',
			key: 'regCapital',
			width: 200,
			render(text) {
				return <div>{text || '-'}</div>;
			},
		}, {
			title: '注册时间',
			dataIndex: 'regTime',
			key: 'regTime',
			width: 120,
			render(text) {
				return <div>{text ? `${formatDateTime(text, 'onlyYear')}` : '-'}</div>;
			},
		}, {
			title: '经营状态',
			dataIndex: 'regStatus',
			key: 'regStatus',
			width: 120,
			render(text) {
				return <div>{text || '-'}</div>;
			},
		},
	]

	render() {
		const { id } = this.props;
		const { loading, data } = this.state;

		// 添加一个下标属性indexNum
		const newArray = [];
		if (data) {
			data.map((item, index) => newArray.push(
				Object.assign({}, item, { indexNum: index + 1 }),
			));
		}

		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab" style={{ borderBottom: 0 }}>
					<div className="yc-tabs-simple-prefix">
						分支机构
					</div>
				</div>
				<div className="yc-base-table">
					<Spin visible={loading}>
						<Table
							scroll={data.length > 8 ? { y: 440 } : {}}
							columns={this.toGetColumns()}
							dataSource={newArray}
							pagination={false}
							className="table"
						/>
					</Spin>
				</div>
			</div>
		);
	}
}
