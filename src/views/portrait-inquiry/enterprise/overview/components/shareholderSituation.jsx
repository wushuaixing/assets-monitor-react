import React from 'react';
import { Spin, Table } from '@/common';

export default class ShareholderSituation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			columns: [{
				title: '股东名称',
				dataIndex: 'investorName',
				key: 'investorName',
				width: 220,
				render: text => (
					<p>
						{text || '-'}
					</p>
				),
			}, {
				title: '持股比',
				dataIndex: 'subscribeAmountRate',
				key: 'subscribeAmountRate',
				width: 200,
				render(text) {
					return <div>{`${text} %` || '-'}</div>;
				},
			}],
		};
	}

	render() {
		const { loading, columns } = this.state;
		const { shareholderInfos } = this.props;
		return (
			<div>
				<div className="overview-container-title">
					<div className="overview-left-item" />
					<span className="container-title-name">股东情况</span>
				</div>
				<div className="overview-container-content">
					<Spin visible={loading}>
						<Table
							scroll={shareholderInfos.length > 8 ? { y: 440 } : {}}
							columns={columns}
							dataSource={shareholderInfos}
							pagination={false}
							className="table"
						/>
					</Spin>
				</div>
			</div>
		);
	}
}
