import React from 'react';
import { Spin, Table } from '@/common';

export default class ShareholderSituation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			data: [
				{ obligorName: '浙江禾力佳德贸易有限公司', shareholdingRatio: '78.98%' },
				{ obligorName: '杭州越昌科技有限公司', shareholdingRatio: '18.98%' },
			], // 列表数据
			columns: [{
				title: '股东名称',
				dataIndex: 'obligorName',
				key: 'obligorName',
				width: 220,
				render: text => (
					<p>
						{text || '-'}
					</p>
				),
			}, {
				title: '持股比',
				dataIndex: 'shareholdingRatio',
				key: 'shareholdingRatio',
				width: 200,
				render(text) {
					return <div>{text || '-'}</div>;
				},
			}],
		};
	}

	render() {
		const { loading, data, columns } = this.state;
		return (
			<div>
				<div className="overview-container-title">
					<div className="overview-left-item" />
					<span className="container-title-name">股东情况</span>
				</div>
				<div className="overview-container-content">
					<Spin visible={loading}>
						<Table
							scroll={data.length > 8 ? { y: 440 } : {}}
							columns={columns}
							dataSource={data}
							pagination={false}
							className="table"
						/>
					</Spin>
				</div>
			</div>
		);
	}
}
