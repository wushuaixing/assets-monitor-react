import React from 'react';
import { navigate } from '@reach/router';
import {
	Breadcrumb, Button, Table, Modal, Icon,
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
		document.title = '债务人详情-业务管理';
		this.state = {
			businessDetail: null,
			data: [],
			errorModalVisible: false,
			timeLeft: 3,
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
						<span className="yc-table-text-link" onClick={() => this.detail(row)}>查看</span>
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
				let time = 3;
				const timer = setInterval(() => {
					time -= 1;
					this.setState({
						timeLeft: time,
					});
					if (time === 0) {
						this.closeErrorModal();
						clearInterval(timer);
					}
				}, 1000);
				this.openErrorModal();
				this.setState({ loading: false });
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	openErrorModal = () => {
		this.setState({
			errorModalVisible: true,
		});
	}

	closeErrorModal = () => {
		window.close();
		this.setState({
			errorModalVisible: false,
		});
	}

	render() {
		const {
			loading, businessDetail, data, columns, errorModalVisible, timeLeft,
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
				{errorModalVisible && 	(
				<Modal
					visible={errorModalVisible}
					onCancel={this.handleCancel}
					footer={false}
					width={500}
					closable={false}
				>

					<div className="yc-confirm-body">
						<div className="yc-confirm-header">
							<Icon style={{ fontSize: 28, color: '#f66c5b', marginRight: 8 }} type="cross-circle-o" />
							<span className="yc-confirm-title">债务人不存在，可能关联的业务已经被删除</span>
						</div>
						<div className="yc-confirm-content">
							<span style={{ color: '#384482', fontSize: 14, marginRight: 5 }}>{timeLeft}</span>
							秒后自动关闭页面
						</div>
						<div className="yc-confirm-btn">
							{
								<Button onClick={this.closeErrorModal} className="yc-confirm-footer-btn" type="primary">知道了</Button>
							}
						</div>
					</div>

				</Modal>
				)}
				<TableList model="obligor" />
			</div>
		);
	}
}
