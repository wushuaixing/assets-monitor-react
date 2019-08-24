import React from 'react';
import {
	Modal, Table, Form, message,
} from 'antd';
import {
	openPush, // 打开推送
	closePush, // 关闭推送
} from '@/utils/api/debator';
import isBreak from '../../../assets/img/business/status_shixin.png';
import beforeBreak from '../../../assets/img/business/status_cengshixin.png';

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
					<p style={{ position: 'relative' }}>
						{text || '-'}
						{
								row && row.dishonestStatus === 1 ? <img className="yc-item-break" src={isBreak} alt="" /> : null
							}
						{
								row && row.dishonestStatus === 2 ? <img className="yc-item-break" src={beforeBreak} alt="" /> : null
							}

					</p>
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
				render: text => (
					<p>{text || '-'}</p>
				),
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
									<p className="no-attention">禁用</p>
								</React.Fragment>
							)
						}
					</React.Fragment>

				),
			}, {
				title: '操作',
				key: 'operation',
				render: (text, row) => (
					<span>
						<a onClick={() => this.detail(row)}>查看</a>
						<span className="ant-divider" />
						<a onClick={() => this.handlePut(row)}>{row.pushState === 1 ? '关闭推送' : '开启推送'}</a>
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
	}

	// 关闭, 开启推送
	handlePut = (row) => {
		const { getData } = this.props;// 刷新列表
		confirm({
			title: `确认${row.pushState === 1 ? '关闭' : '开启'}本条业务的推送功能吗?`,
			content: `点击确定，系统将${row.pushState === 1 ? '不再' : ''}为您推送本条业务相关的监控信息。`,
			iconType: 'exclamation-circle-o',
			onOk() {
				console.log('确定', row.id);
				const params = {
					id: row.id,
				};
				if (row.pushState === 1) {
					closePush(params).then((res) => {
						if (res.code === 200) {
							message.success('关闭成功');
							getData();
						} else {
							message.error('res.message');
						}
					});
				} else {
					openPush(params).then((res) => {
						if (res.code === 200) {
							message.success('开启成功');
							getData();
						} else {
							message.error('res.message');
						}
					});
				}
			},
			onCancel() {},
		});
	}

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
