import React from 'react';
import {
	Tooltip, Table, Form,
} from 'antd';

const dataSource = [{
	key: '1',
	name: '胡彦斌',
	age: 32,
	address: 'GR2019SC1001238',
}, {
	key: '2',
	name: '胡彦祖',
	age: 42,
	address: '西湖区湖底公园1号',
}];

class BusinessView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			columns: [
				{
					title: '资产匹配',
					dataIndex: 'name',
					key: 'name',
					width: 760,
				}, {
					title: '资产信息',
					dataIndex: 'address',
					key: 'address',
					render(text, row) {
						return (
							<div className="table-column">
								<div style={{ display: 'inline-block', float: 'left' }}>
									<div>
										<span className="yc-td-title" style={{ marginRight: '4px' }}>项目编号:</span>
										<p style={{ display: 'inline-block' }}>
                                            GR2019SC1001238
										</p>
									</div>
									<div>
										<span className="yc-td-title" style={{ marginRight: '4px' }}>发布时间:</span>
										<p style={{ display: 'inline-block' }}>
                                            2019-05-13 01:19
										</p>
									</div>
									<div>
										<span className="yc-td-title" style={{ marginRight: '4px' }}>更新时间:</span>
										<p style={{ display: 'inline-block' }}>
                                            2019-05-13 20:49
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
		return (
			<React.Fragment>
				<div className="yc-header-title">
                    源诚科技为您找到104947条信息
				</div>
				<Table
					rowKey={record => record.id}
					dataSource={dataSource}
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
