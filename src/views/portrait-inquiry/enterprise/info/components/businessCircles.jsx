import React from 'react';
import { Spin, Table } from '@/common';
import { getChange } from '@/utils/api/portrait-inquiry/enterprise/info';
import { formatDateTime } from '@/utils/changeTime';

export default class BusinessCircles extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			data: [], // 列表数据
		};
	}

	componentDidMount() {
		this.getChangeData();
	}

	getChangeData = () => {
		this.setState({
			loading: true,
		});
		const params = {
			id: 1,
		};
		getChange(params)
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
			title: '变更日期',
			dataIndex: 'changeTime',
			key: 'changeTime',
			width: 200,
			render(text) {
				return <div>{text ? `${formatDateTime(text, 'onlyYear')}` : '-'}</div>;
			},
		}, {
			title: '变更事项',
			dataIndex: 'changItem',
			key: 'changItem',
			width: 300,
			render(text) {
				return <div>{text || '-'}</div>;
			},
		}, {
			title: '变更前内容',
			dataIndex: 'contentBefore',
			key: 'contentBefore',
			width: 300,
			render(text, row) {
				return (
					<div className="yc-td-hl">
						<div dangerouslySetInnerHTML={{ __html: row.contentBefore }} />
					</div>
				);
			},
		}, {
			title: '变更后内容',
			dataIndex: 'contentAfter',
			key: 'contentAfter',
			width: 300,
			render(text, row) {
				return (
					<div className="yc-td-hl">
						<div dangerouslySetInnerHTML={{ __html: row.contentAfter }} />
					</div>
				);
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
						工商变更
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
