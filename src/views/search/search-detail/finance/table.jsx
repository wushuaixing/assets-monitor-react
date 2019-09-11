import React from 'react';
import { Table, Form } from 'antd';
import { formatDateTime } from '@/utils/changeTime';


class BusinessView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			columns: [
				{
					title: '资产匹配',
					dataIndex: 'title',
					key: 'title',
					width: 760,
					render(text, row) {
						return (
							<div className="yc-td-hl">
								<a href={row.url} target="_blank" rel="noopener noreferrer" className="yc-td-header" dangerouslySetInnerHTML={{ __html: row.title }} />
								<div dangerouslySetInnerHTML={{ __html: row.hl }} />
							</div>
						);
					},
				}, {
					title: '资产信息',
					dataIndex: 'address',
					key: 'address',
					render(text, row) {
						return (
							<div className="table-column">
								<div style={{
									display: 'inline-block', float: 'left', verticalAlign: 'top', lineHeight: '20px',
								}}
								>
									<div>
										<span className="yc-td-title" style={{ marginRight: '4px' }}>项目编号:</span>
										<p style={{ display: 'inline-block' }}>
											{row.number}
										</p>
									</div>
									<div>
										<span className="yc-td-title" style={{ marginRight: '4px' }}>发布时间:</span>
										<p style={{ display: 'inline-block' }}>
											{formatDateTime(row.releaseTime) || '-'}
										</p>
									</div>
									<div>
										<span className="yc-td-title" style={{ marginRight: '4px' }}>更新时间:</span>
										<p style={{ display: 'inline-block' }}>
											{formatDateTime(row.updateTime) || '-'}
										</p>
									</div>
								</div>
							</div>
						);
					},
				}],
		};
	}

	render() {
		const { columns } = this.state;
		const { dataList } = this.props;

		return (
			<React.Fragment>
				<Table
					rowKey={record => record.id}
					dataSource={dataList.length > 0 && dataList}
					columns={columns}
					style={{ width: '100%' }}
					defaultExpandAllRows
					pagination={false}
					onRowClick={() => {
						// if (!record.children) {
						// 	const w = window.open('about:blank');
						// 	w.location.href = '#/monitor';
						// }
					}}
				/>
			</React.Fragment>
		);
	}
}
export default Form.create()(BusinessView);
