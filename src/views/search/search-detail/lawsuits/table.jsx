import React from 'react';
import { Form } from 'antd';
import { Table } from '@/common';
import { partyInfo } from '@/views/_common';
import associationLink from '@/views/_common/association-link';
import order from '@/assets/img/icon/icon_arrow.png';
import './style.scss';

/* const toClick = row => Modal.info({
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
}; */
class BusinessView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			Sort, dataList, SortTime, type,
		} = this.props;
		const trailColumns = [
			{
				title: (
					<div className="yc-trialRelation-title" onClick={() => SortTime('DESC')}>
						{type === 1 ? '立案日期' : '开庭日期'}
						{/* {Sort === undefined && <span className="sort th-sort-default" />} */}
						{Sort === undefined && <img src={order} alt="" className="sort th-sort-default" /> }
						{Sort === 'DESC' && <span className="sort th-sort-down" />}
						{Sort === 'ASC' && <span className="sort th-sort-up" />}
					</div>),
				dataIndex: 'gmtRegister',
				key: 'gmtRegister',
				width: 122,
				render: (text, row) => (
					<span>{`${type === 1 ? row.gmtRegister : row.gmtTrial}`}</span>
				),
			}, {
				title: '当事人',
				dataIndex: 'parties',
				key: 'parties',
				width: 241,
				render: partyInfo,
			}, {
				title: '法院',
				dataIndex: 'court',
				render: text => text || '--',
			}, {
				title: '案号',
				dataIndex: 'caseNumber',
				render: text => text || '--',
			},
			{
				title: '案件类型',
				render: (value, row) => {
					const { isRestore, caseType } = row;
					if (isRestore) return '执恢案件';
					if (caseType === 1) return '普通案件';
					if (caseType === 2) return '破产案件';
					if (caseType === 3) return '执行案件';
					if (caseType === 4) return '终本案件';
					return '--';
				},
			}, {
				title: '关联链接',
				dataIndex: 'associatedInfo',
				className: 'tAlignCenter_important min-width-80',
				render: (value, row) => associationLink(value, row, 'Trial'),
			},
		];
		const courtColumns = [
			{
				title: (
					<div className="yc-trialRelation-title" onClick={() => SortTime('DESC')}>
						{type === 1 ? '立案日期' : '开庭日期'}
						{/* {Sort === undefined && <span className="sort th-sort-default" />} */}
						{Sort === undefined && <img src={order} alt="" className="sort th-sort-default" /> }
						{Sort === 'DESC' && <span className="sort th-sort-down" />}
						{Sort === 'ASC' && <span className="sort th-sort-up" />}
					</div>),
				dataIndex: 'gmtRegister',
				key: 'gmtRegister',
				width: 122,
				render: (text, row) => (
					<span>{`${type === 1 ? row.gmtRegister : row.gmtTrial}`}</span>
				),
			}, {
				title: '当事人',
				dataIndex: 'parties',
				key: 'parties',
				width: 241,
				render: partyInfo,
			}, {
				title: '法院',
				dataIndex: 'court',
				render: text => text || '--',
			}, {
				title: '案号',
				dataIndex: 'caseNumber',
				render: text => text || '--',
			}, {
				title: '案由',
				dataIndex: 'caseReason',
				render: text => text || '--',
			},
			{
				title: '关联链接',
				dataIndex: 'associatedInfo',
				className: 'tAlignCenter_important min-width-80',
				render: (value, row) => associationLink(value, row, 'Trial'),
			},
		];
		return (
			<React.Fragment>
				{
					type === 1 ? (
						<Table
							rowKey={record => record.id}
							dataSource={dataList.length > 0 && dataList}
							columns={trailColumns}
							style={{ width: '100%' }}
							defaultExpandAllRows
							pagination={false}
							onRowClick={() => {}}
						/>
					) : (
						<Table
							rowKey={record => record.id}
							dataSource={dataList.length > 0 && dataList}
							columns={courtColumns}
							style={{ width: '100%' }}
							defaultExpandAllRows
							pagination={false}
							onRowClick={() => {}}
						/>
					)
				}


			</React.Fragment>
		);
	}
}
export default Form.create()(BusinessView);
