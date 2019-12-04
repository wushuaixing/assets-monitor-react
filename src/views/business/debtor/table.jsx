import React from 'react';
import {
	Modal, Form, message, Tooltip,
} from 'antd';
import {
	openPush, // 打开推送
	closePush, // 关闭推送
} from '@/utils/api/debator';
import isBreak from '../../../assets/img/business/status_shixin.png';
import beforeBreak from '../../../assets/img/business/status_cengshixin.png';
import { Table } from '@/common';

const { confirm } = Modal;

class BusinessView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [{
				title: '债务人',
				dataIndex: 'obligorName',
				key: 'obligorName',
				width: 254,
				render: (text, row) => (
					<div style={{ position: 'relative' }}>
						<span>
							{
								text && text.length > 16
									? (
										<Tooltip placement="topLeft" title={text}>
											<span>{`${text.substr(0, 16)}...`}</span>
										</Tooltip>
									)
									: <span>{text || '-'}</span>
							}
						</span>
						<span className="yc-item-break">
							{
								row && row.dishonestStatus === 1 ? <img src={isBreak} alt="" /> : null
							}
							{
								row && row.dishonestStatus === 2 ? <img src={beforeBreak} alt="" /> : null
							}
						</span>
					</div>
				),
			}, {
				title: '身份证号/统一社会信用代码',
				dataIndex: 'obligorNumber',
				key: 'obligorNumber',
				width: 308,
				render: text => (
					<p>{text || '-'}</p>
				),
			},
			{
				title: '当前业务',
				dataIndex: 'businessCount',
				key: 'businessCount',
				width: 133,
				render(text) {
					if (text === '0' || !text) {
						return <div>0</div>;
					}
					return <p>{text}</p>;
				},
			}, {
				title: '相关推送',
				dataIndex: 'pushCount',
				key: 'pushCount',
				width: 133,
				render(text) {
					if (text === '0' || !text) {
						return <div>0</div>;
					}
					return <a>{text}</a>;
				},
			}, {
				title: '推送状态',
				dataIndex: 'pushState',
				key: 'pushState',
				width: 133,
				render: text => (
					<React.Fragment>
						{
							text === 1 ? (
								<React.Fragment>
									<p className="circle-item">启用</p>
								</React.Fragment>

							) : (
								<React.Fragment>
									<p className="no-attention">关闭</p>
								</React.Fragment>
							)
						}
					</React.Fragment>

				),
			}, {
				title: '操作',
				key: 'operation',
				className: 'column-center',
				render: (text, row) => (
					<span>
						<span className="yc-table-text-link" onClick={() => this.detail(row)}>查看</span>
						<span className="ant-divider" />
						<span className="yc-table-text-link" onClick={() => this.handlePut(row)}>{row.pushState === 1 ? '关闭推送' : '开启推送'}</span>
					</span>
				),
			}],
		};
	}

	// 跳转详情
	detail = (row) => {
		console.log(row.id);
		const w = window.open('about:blank');
		w.location.href = `#/business/debtor/detail?id=${row.id}`;
	};

	commonPushState = (row) => {
		const { getData } = this.props;// 刷新列表
		const Api = row && row.pushState === 1 ? closePush : openPush;
		const params = {
			id: row.id,
		};
		const start = new Date().getTime(); // 获取接口响应时间
		return Api(params).then((res) => {
			if (res.code === 200) {
				if (!global.GLOBAL_MEIE_BROWSER) {
					const now = new Date().getTime();
					const latency = now - start;
					setTimeout(res.data, latency);
				}
				message.success(`${row.pushState === 1 ? '关闭成功' : '开启成功'}`);
				getData();
			}
		});
	};

	// 关闭, 开启推送
	handlePut = (row) => {
		const that = this;
		confirm({
			title: `确认${row.pushState === 1 ? '关闭' : '开启'}本债务人的推送功能吗?`,
			content: `点击确定，系统将${row.pushState === 1 ? '不再' : ''}为您推送本债务人相关的监控信息。`,
			iconType: 'exclamation-circle-o',
			onOk() {
				that.commonPushState(row);
			},
			onCancel() {},
		});
	};

	render() {
		const { stateObj } = this.props;
		const { columns } = this.state;

		return (
			<React.Fragment>
				<Table
					columns={columns}
					dataSource={stateObj.dataList}
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
