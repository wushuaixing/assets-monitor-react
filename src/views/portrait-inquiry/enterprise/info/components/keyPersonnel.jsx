import React from 'react';
import { Spin, Table } from '@/common';

export default class KeyPersonnel extends React.Component {
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
				width: 240,
				render(text) {
					return <div>{text || '-'}</div>;
				},
			}, {
				title: '姓名',
				dataIndex: 'name',
				key: 'name',
				width: 240,
				render(text) {
					return <div>{text || '-'}</div>;
				},
			}, {
				title: '职务',
				dataIndex: 'post',
				key: 'post',
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
                        主要人员
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
