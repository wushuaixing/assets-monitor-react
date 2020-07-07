import React from 'react';
import { Form } from 'antd';
import { Ellipsis, Table } from '@/common';

class DishonestyView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { dataList } = this.props;
		const columns = [
			{
				title: '发布日期',
				dataIndex: 'publishDate',
				key: 'publishDate',
				width: 122,
				render: (text, row) => (
					<span>{row.publishDate || '-'}</span>
				),
			}, {
				title: '被执行人姓名/名称',
				dataIndex: 'obligorName',
				key: 'obligorName',
				width: 241,
				render: text => <span>{text || '-'}</span>,
			}, {
				title: '身份证号码/组织机构代码',
				dataIndex: 'obligorNumber',
				key: 'obligorNumber',
				width: 241,
				render: text => <span>{text || '-'}</span>,
			}, {
				title: '案件信息',
				dataIndex: 'caseCode',
				key: 'caseCode',
				render: (text, row) => (
					<div className="assets-info-content">
						<li>
							<span className="list list-title align-justify" style={{ width: 50 }}>案号</span>
							<span className="list list-title-colon">:</span>
							<span className="list list-content"><Ellipsis content={text || '-'} tooltip width={200} /></span>
						</li>
						<li>
							<span className="list list-title align-justify" style={{ width: 50 }}>执行法院</span>
							<span className="list list-title-colon">:</span>
							<span className="list list-content"><Ellipsis content={row.court || '-'} tooltip width={200} /></span>
						</li>
					</div>
				),
			},
			{
				title: '失信信息',
				dataIndex: 'fact',
				key: 'fact',
				render: (text, row) => (
					<div className="assets-info-content">
						<li>
							<span className="list list-title align-justify" style={{ width: 100 }}>失信行为具体情形</span>
							<span className="list list-title-colon">:</span>
							<span className="list list-content"><Ellipsis content={text || '-'} tooltip width={200} /></span>
						</li>
						<li>
							<span className="list list-title align-justify" style={{ width: 100 }}>生效文书确定义务</span>
							<span className="list list-title-colon">:</span>
							<span className="list list-content"><Ellipsis content={row.duty || '-'} tooltip width={200} /></span>
						</li>
						<li>
							<span className="list list-title align-justify" style={{ width: 100 }}>被执行人履行情况</span>
							<span className="list list-title-colon">:</span>
							<span className="list list-content">{row.performance || '-'}</span>
						</li>
					</div>
				),
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
export default Form.create()(DishonestyView);
