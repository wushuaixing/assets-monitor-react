import React from 'react';
import { navigate } from '@reach/router';
import {
	Breadcrumb, Button, Table, Modal,
} from 'antd';
import {
	detail, // 详情
} from '@/utils/api/business';
import { getQueryByName } from '@/utils';
import { Spin } from '@/common';
import isBreak from '../../../assets/img/business/status_shixin.png';
import beforeBreak from '../../../assets/img/business/status_cengshixin.png';
import './style.scss';
import TableList from '../table-list';

export default class DebtorDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			businessDetail: null,
			data: [],
			columns: [{
				title: '业务编号',
				dataIndex: 'caseNumber',
				key: 'caseNumber',
				render: text => (
					<p>{text || '-'}</p>
				),
			},
			{
				title: '角色',
				dataIndex: 'roleText',
				key: 'roleText',
				render: text => (
					<p>{text || '-'}</p>
				),
			},
			{
				title: '机构名称',
				dataIndex: 'orgName',
				key: 'orgName',
				render: text => (
					<p>{text || '-'}</p>
				),
			},
			{
				title: '担保方式',
				dataIndex: 'guaranteeString',
				key: 'guaranteeString',
				render: text => (
					<p>{text || '-'}</p>
				),
			}, {
				title: '操作',
				key: 'operation',
				render: (text, row) => (
					<span>
						<a onClick={() => this.detail(row)}>查看</a>
					</span>
				),
			}],
		};
	}

	componentDidMount() {
		this.getTableData();
	}

	componentDidUpdate() {
		const { hash } = window.location;
		const userId = getQueryByName(hash, 'id');
		const { loaclUserId } = this.state;
		if (userId !== loaclUserId) {
			this.getTableData(userId);
		}
	}

	// 跳转详情
	detail = (row) => {
		const w = window.open('about:blank');
		w.location.href = `#/business/detail?id=${row.businessId}`;
	}

	// 匹配操作类型
	// eslint-disable-next-line consistent-return
	matchingType = (type) => {
		const { operateList } = this.state;
		if (operateList && operateList.length > 0) {
			const list = operateList.filter(item => item.target === type);
			return list[0].type;
		}
	};

	getTableData=(value) => {
		const { hash } = window.location;
		const userId = getQueryByName(hash, 'id');
		this.setState({
			loading: true,
			loaclUserId: userId,
		});
		detail(value || userId).then((res) => {
			if (res.code === 200) {
				this.setState({
					data: res.data.businessList,
					businessDetail: res.data.detail,
					loading: false,
				});
			} else {
				// message.error();
				this.warning(res.message);
				this.setState({ loading: false });
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	warning =() => {
		const modal = Modal.warning({
			title: '债务人不存在，可能关联的业务已经被删除',
			content: '3秒后自动关闭页面',
			onOk() {
				window.close();
			},
		});

		setTimeout(() => {
			modal.destroy();
			window.close();
		}, 3000);
	}

	render() {
		const {
			loading, businessDetail, data, columns,
		} = this.state;

		return (
			<div className="yc-debtor-wrapper">
				<div className="yc-content-breadcrumb">
					<Breadcrumb>
						<Breadcrumb.Item><a className="yc-bread-hover" onClick={() => navigate('/business/debtor')}>债务人</a></Breadcrumb.Item>
						<Breadcrumb.Item><span style={{ 'font-weight': 400, color: '#384482' }}>债务人详情</span></Breadcrumb.Item>
					</Breadcrumb>
				</div>
				<Spin visible={loading}>
					<div className="yc-item-ob">
						<div className="yc-item-icon" />
						<div className="yc-search-content">
							<span className="yc-item-title">
								{businessDetail ? businessDetail.obligorName : '-'}
								<span className="yc-item-break">
									{
										businessDetail && businessDetail.dishonestStatus === 1 ? <img src={isBreak} alt="" /> : null
									}
									{
										businessDetail && businessDetail.dishonestStatus === 2 ? <img src={beforeBreak} alt="" /> : null
									}
								</span>
							</span>

							<div className="search-item-text">
								<span className="search-item-text-header">身份证号/统一社会信用代码：</span>
								<span className="search-item-text-msg">{businessDetail && businessDetail.obligorNumber.length > 0 ? businessDetail.obligorNumber : '-'}</span>
							</div>
							<div className="search-item-text">
								<span className="search-item-text-header">曾用名：</span>
								<span className="search-item-text-msg">
									{
										businessDetail && businessDetail.usedName.length > 0 ? businessDetail.usedName.map(item => item) : '-'
									}
								</span>
							</div>
						</div>
						<div className="yc-search-right">
							<Button className="yc-btn">
								<span className="yc-icon-export" />
                            下载
							</Button>
						</div>
					</div>
					{data && data.length > 0 && (
					<div className="yc-debtor-table">
						<div className="yc-table-header">
							<div className="table-header-left">
									业务列表
							</div>
						</div>
						<Table
							columns={columns}
							dataSource={data}
							style={{ width: '100%' }}
							pagination={false}
							onRowClick={(record) => {
								console.log(record);
							}}
						/>
					</div>
					)}
				</Spin>
				<TableList model="obligor" />
			</div>
		);
	}
}
