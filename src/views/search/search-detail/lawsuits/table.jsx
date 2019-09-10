import React from 'react';
import {
	Table, Form, Tooltip,
} from 'antd';
import './style.scss';

class BusinessView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {

		};
	}

	render() {
		const { Sort, dataList, SortTime } = this.props;
		const columns = [
			{
				title: (
					<div className="yc-trialRelation-title" onClick={() => SortTime('DESC')}>
						立案日期
						{Sort === undefined && <span className="sort th-sort-default" />}
						{Sort === 'DESC' && <span className="sort th-sort-down" />}
						{Sort === 'ASC' && <span className="sort th-sort-up" />}
					</div>),
				dataIndex: 'larq',
				key: 'larq',
				width: 122,
				render(text, row) {
					return (
						<div className="table-column">
							{row.larq || '-'}
						</div>
					);
				},
			}, {
				title: '原告',
				dataIndex: 'yg',
				key: 'yg',
				width: 241,
				render(text, row) {
					return (
						<div className="table-column">
							{
								row.yg && row.yg.length > 14
									? (
										<Tooltip placement="topLeft" title={row.yg}>
											<p>{`${row.yg.substr(0, 14)}...`}</p>
										</Tooltip>
									)
									: <p>{row.yg || '-'}</p>
							}
						</div>
					);
				},
			}, {
				title: '被告',
				dataIndex: 'bg',
				key: 'bg',
				width: 265,
				render(text, row) {
					return (
						<div className="table-column">
							{
								row.bg && row.bg.length > 14
									? (
										<Tooltip placement="topLeft" title={row.bg}>
											<p>{`${row.bg.substr(0, 14)}...`}</p>
										</Tooltip>
									)
									: <p>{row.tibgtle || '-'}</p>
							}
						</div>
					);
				},
			}, {
				title: '起诉法院',
				dataIndex: 'court',
				key: 'court',
				width: 183,
				render(text, row) {
					return (
						<div className="table-column">
							{row.court || '-'}
						</div>
					);
				},
			}, {
				title: '案号',
				dataIndex: 'ah',
				key: 'ah',
				width: 242,
				render(text, row) {
					return (
						<div className="table-column">
							{row.ah || '-'}
						</div>
					);
				},
			}, {
				title: '关联信息',
				dataIndex: 'associates',
				key: 'associates',
				render(text, row) {
					return (
						<div className="table-column">
							{row.associates.url || '-'}
						</div>
					);
				},
			},
		];
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
