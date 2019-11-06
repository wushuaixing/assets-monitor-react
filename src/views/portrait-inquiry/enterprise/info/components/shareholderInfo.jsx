import React from 'react';
import { Spin, Table } from '@/common';

export default class ShareholderInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			data: [
				{
					num: 1, name: '张三', bili: '20%', post: '执行董事兼总经理', money: '465万人民币', data: '2018-03-02',
				},
				{
					num: 3, name: '张三', bili: '22%', post: '监事', money: '225万人民币', data: '2018-03-02',
				},
			], // 列表数据
			columns: [{
				title: '序号',
				dataIndex: 'num',
				key: 'num',
				width: 240,
				render(text) {
					return <div>{text || '-'}</div>;
				},
			}, {
				title: '股东基本信息',
				dataIndex: 'name',
				key: 'name',
				width: 240,
				render(text) {
					return <div>{text || '-'}</div>;
				},
			},
			{
				title: '出资比例',
				dataIndex: 'bili',
				key: 'bili',
				width: 240,
				render(text) {
					return <div>{text || '-'}</div>;
				},
			},
			{
				title: '认缴出资额',
				dataIndex: 'money',
				key: 'money',
				width: 260,
				render(text) {
					return <div>{text || '-'}</div>;
				},
			}, {
				title: '认缴出资日期',
				dataIndex: 'data',
				key: 'data',
				render(text) {
					return <div>{text || '-'}</div>;
				},
			}],
		};
	}

	render() {
		const { id } = this.props;
		const { loading, data, columns } = this.state;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab" style={{ borderBottom: 0 }}>
					<div className="yc-tabs-simple-prefix">
						股东信息
					</div>
				</div>
				<div className="yc-base-table">
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
