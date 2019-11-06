import React from 'react';
import { Spin, Table } from '@/common';

export default class Branch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			data: [
				{ num: 1, name: '张三', post: '执行董事兼总经理' },
				{ num: 3, name: '张三', post: '监事' },
			], // 列表数据
			columns: [{
				title: '序号',
				dataIndex: 'num',
				key: 'num',
				width: 120,
				render(text) {
					return <div>{text || '-'}</div>;
				},
			}, {
				title: '机构名称',
				dataIndex: 'name',
				key: 'name',
				width: 300,
				render(text) {
					return <div>{text || '-'}</div>;
				},
			}, {
				title: '法定代表人',
				dataIndex: 'post',
				key: 'post',
				render(text) {
					return <div>{text || '-'}</div>;
				},
			}, {
				title: '注册资本',
				dataIndex: 'post',
				key: 'post',
				width: 200,
				render(text) {
					return <div>{text || '-'}</div>;
				},
			}, {
				title: '注册时间',
				dataIndex: 'post',
				key: 'post',
				width: 120,
				render(text) {
					return <div>{text || '-'}</div>;
				},
			}, {
				title: '经营状态',
				dataIndex: 'post',
				key: 'post',
				width: 120,
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
						分支机构
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
