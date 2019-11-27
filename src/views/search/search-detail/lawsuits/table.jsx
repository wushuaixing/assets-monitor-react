import React from 'react';
import { Form, Modal, Tooltip } from 'antd';
import { formatDateTime } from '@/utils/changeTime';
import { Table, Icon } from '@/common';
import './style.scss';

const toClick = row => Modal.info({
	title: '当事人详情',
	okText: '确定',
	iconType: 'null',
	className: 'assets-an-info',
	content: (
		<div style={{ marginLeft: -28, fontSize: 14 }}>
			{
				row && row.ygList && (
				<div>
					<strong>原告：</strong>
					<span>{row.ygList}</span>
				</div>
				)
			}
			{
				row && row.bgList && row.bgList.split(',').map(item => (
					<div key={item}>
						<strong>被告：</strong>
						<span>{item}</span>
					</div>
				))
			}

		</div>
	),
	onOk() {},
});

const toShow = (row, type) => {
	if (row.associates[type].url.length > 1) {
		let text = '立案';
		if (type === 0) text = '立案';
		if (type === 1) text = '开庭';
		if (type === 2) text = '文书';
		Modal.info({
			title: `本案号关联多个${text}链接，如下：`,
			okText: '关闭',
			iconType: 'null',
			className: 'assets-an-info',
			width: 600,
			content: (
				<div style={{ marginLeft: -28 }}>
					{ row.associates[type].url.map(item => (
						<p style={{ margin: 5 }}>
							<a href={item} target="_blank" rel="noopener noreferrer">{item}</a>
						</p>
					)) }
				</div>
			),
			onOk() {},
		});
	} else {
		window.open(row.associates[type].url[0], '_blank');
	}
};
const dividerType = (row) => {
	const trial = row.associates.length > 0 && row.associates[0].url.length > 0 && row.associates[0].url[0].length > 0;
	const kaiting = row.associates.length > 0 && row.associates[1].url.length > 0 && row.associates[1].url[0].length > 0;
	return trial || kaiting ? <span className="ant-divider" /> : '';
};
class BusinessView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			Sort, dataList, SortTime, type,
		} = this.props;
		const columns = [
			{
				title: (
					<div className="yc-trialRelation-title" onClick={() => SortTime('DESC')}>
						{type === 1 ? '立案日期' : '开庭日期'}
						{/* {Sort === undefined && <span className="sort th-sort-default" />}
						{Sort === 'DESC' && <span className="sort th-sort-down" />}
						{Sort === 'ASC' && <span className="sort th-sort-up" />}
						 */}
						{Sort === undefined && (
						<Icon
							type="icon-sort"
							style={{ fontSize: 16, color: '#7D8699', cursor: 'pointer' }}
						/>
						)}
						{Sort === 'DESC' && (
						<Icon
							type="icon-sort-desc"
							style={{ fontSize: 16, color: '#7D8699', cursor: 'pointer' }}
						/>
						)}
					</div>),
				dataIndex: 'larq',
				key: 'larq',
				width: 122,
				render(text) {
					return <span>{formatDateTime(text, 'onlyYear') || '-'}</span>;
				},
			}, {
				title: '原告',
				dataIndex: 'yg',
				key: 'yg',
				width: 241,
				render(text) {
					return (
						<div className="table-column">
							{
								text && text.length > 14
									? (
										<Tooltip placement="topLeft" title={text}>
											<p>{`${text.substr(0, 14)}...`}</p>
										</Tooltip>
									)
									: <p>{text || '-'}</p>
							}
						</div>
					);
				},
			}, {
				title: '被告',
				dataIndex: 'bg',
				key: 'bg',
				width: 265,
				render(text) {
					return (
						<div className="table-column">
							{
								text && text.length > 14
									? (
										<Tooltip placement="topLeft" title={text}>
											<p>{`${text.substr(0, 14)}...`}</p>
										</Tooltip>
									)
									: <p>{text || '-'}</p>
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
							{
								row.court && row.court.length > 12
									? (
										<Tooltip placement="topLeft" title={row.court}>
											<p>{`${row.court.substr(0, 12)}...`}</p>
										</Tooltip>
									)
									: <p>{row.court || '-'}</p>
							}
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
						<div>
							{
								row.ah && row.ygList.length > 0 ? (
									<div onClick={() => toClick(row)} className="yc-table-text-link">
										{' '}
										{row.ah || '-'}
									</div>
								) : <div>{row.ah || '-'}</div>
							}
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
							{row.associates.length > 0 && row.associates[0].url.length > 0 && row.associates[0].url[0].length > 0 && (
								<span>
									<span
										className="yc-table-text-link"
										onClick={() => toShow(row, 0)}
									>
										立案
									</span>
								</span>
							)}
							{row.associates.length > 0 && row.associates[1].url.length > 0 && row.associates[1].url[0].length > 0 && (
								<span>
									{row.associates.length > 0 && row.associates[0].url.length > 0 && row.associates[0].url[0].length > 0 && <span className="ant-divider" />}
									<span
										className="yc-table-text-link"
										onClick={() => toShow(row, 1)}
									>
										开庭
									</span>
								</span>
							)}
							{row.associates.length > 0 && row.associates[2].url.length > 0 && row.associates[2].url[0].length > 0 && (
								<span>
									{
										// 开庭立案分割线
										dividerType(row)
									}
									<span
										className="yc-table-text-link"
										onClick={() => toShow(row, 2)}
									>
										文书
									</span>
								</span>
							)}
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
					onRowClick={() => {}}
				/>
			</React.Fragment>
		);
	}
}
export default Form.create()(BusinessView);
