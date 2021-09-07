import React from 'react';
import { Pagination } from 'antd';
import { getDynamicRisk } from 'api/dynamic';
import {
	Spin, Table, Ellipsis, LiItem, Button, Icon,
} from '@/common';
import {
	relationNotice,
} from '@/utils/api/monitor-info/bankruptcy';

import RelationNoticeModal from '../../bankruptcy/relation-notice-modal';
import message from '../../../../utils/api/message/message';
import '../../style.scss';
// 债务人详情-风险-破产重组
// 画像查询-企业详情-风险-破产重组
export default class TableIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: '',
			current: 1,
			total: 0,
			loading: false,
			visible: false,
			modalData: [],
		};
	}

	componentWillMount() {
		this.toGetData();
	}

	toShowExtraField=(item = {}) => {
		const { portrait } = this.props;
		if (portrait === 'business') {
			return (
				<React.Fragment>
					<span className="list list-title align-justify">破产/重整风险企业</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">
						<Ellipsis
							content={item.obligorName}
							url={item.obligorId ? `#/business/debtor/detail?id=${item.obligorId}` : ''}
							tooltip
							width={200}
						/>
					</span>
					<span className="list-split" style={{ height: 16 }} />
				</React.Fragment>
			);
		}
		return null;
	};

	handleOpenModal = (isPortraitInquiry, id, notices) => {
		if (isPortraitInquiry) {
			this.setState({
				modalData: notices,
				visible: true,
			});
		} else {
			relationNotice({ id }).then((res) => {
				const { code, data = [] } = res || {};
				if (code === 200) {
					this.setState({ modalData: data }, () => {
						this.setState({ visible: true });
					});
				} else {
					message.error('请求出错');
				}
			});
		}
	}

	toGetColumns = () => {
		const { portrait } = this.props;
		const isPortraitInquiry = portrait === 'enterprise'; // true 画像查询 false 债务人详情
		const f = i => (i || '-');
		return [
			{
				title: '主要信息',
				dataIndex: 'title',
				render: (value, row) => {
					console.log(row);
					const {
						applicants, respondents, title, gmtPublish, url, relateNoticeCount, caseNumber, id, notices,
					} = row || {};
					const modalHtml = (
						<Button onClick={() => this.handleOpenModal(isPortraitInquiry, id, notices)} style={{ padding: '1px 9px' }} className="auction-history-btn">
							<Icon type="icon-history" style={{ fontSize: 13, marginRight: 4 }} />
							查看关联公告
						</Button>
					);
					const obj = isPortraitInquiry ? {
						lableA: '申 请 人', valA: applicants, lableB: '被申请人', valB: respondents,
					} : {
						lableA: '最新公告', valA: title, lableB: '最新公告日期', valB: gmtPublish,
					};
					const flagA = isPortraitInquiry || relateNoticeCount; // 债务人详情 - 当公告数等于0时不显示最新公告和最新公告日期
					const flagB = relateNoticeCount && isPortraitInquiry; // 画像查询/债务人详情 - 当公告数大于0时，显示查看关联公告，不然不显示
					return (
						<div className="assets-info-content">
							<div className="yc-public-normal-bold assets-info-content-item" style={{ marginBottom: 2, display: 'flex' }}>
								 <div className="first-line">{caseNumber}</div>
								{flagB ? modalHtml : null}
							</div>
							{
								flagA ? (
									<div className="assets-info-content-item">
										<LiItem title={obj.lableA} auto Li className="second-line">
											{isPortraitInquiry ? f(obj.valA) : <a href={url} target="_blank" rel="noreferrer" className="second-line-val">{f(obj.valA)}</a> 	}
											{!isPortraitInquiry && modalHtml}
										</LiItem>
										<LiItem title={obj.lableB} auto Li className="three-line">
											{f(obj.valB)}
										</LiItem>
									</div>
								) : null
							}
						</div>
					);
				},
			}, {
				title: '辅助信息',
				width: 360,
				render: (value, row) => {
					const { gmtPublish, court } = row || {};
					return 	(
						<div className="assets-info-content">
							{	isPortraitInquiry && <LiItem Li title="公开日期" auto>{f(gmtPublish)}</LiItem>}
							<LiItem Li title="受理法院" auto>{f(court)}</LiItem>
						</div>
					);
				},
			},
		];
	};

	// 当前页数变化
	onPageChange = (val) => {
		this.toGetData(val);
	};

	// 查询数据methods
	toGetData = (page) => {
		const { portrait, option } = this.props;
		const isPortraitInquiry = portrait === 'enterprise'; // true 画像查询 false 债务人详情
		const { api, params } = getDynamicRisk(portrait, option || {
			b: 30201,
			e: 'bankruptcy',
		});
		this.setState({ loading: true });

		api.list({
			page: page || 1,
			num: 5,
			...params,
		}).then((res) => {
			const { code, data = {} } = res || {};
			const dataSource = isPortraitInquiry ? data.list : [{ ...data }];
			if (code === 200) {
				this.setState({
					dataSource,
					current: data.page || 1,
					total: data.total || 1,
					loading: false,
				});
			} else {
				this.setState({
					dataSource: '',
					current: 1,
					total: 0,
					loading: false,
				});
			}
		})
			.catch(() => {
				this.setState({ loading: false });
			});
	};

	onCancel = () => {
		this.setState({
			visible: false,
		});
	};

	onOk = () => {
		console.log('submit');
	}

	render() {
		const {
			dataSource, current, total, visible, modalData,
		} = this.state;
		const { loading } = this.state;
		const { loadingHeight } = this.props;
		return (
			<div className="yc-assets-auction backruptcy-detail-content">
				<Spin visible={loading} minHeight={(current > 1 && current * 5 >= total) ? '' : loadingHeight}>
					<Table
						rowClassName={() => 'yc-assets-auction-table-row'}
						columns={this.toGetColumns()}
						dataSource={dataSource}
						showHeader={false}
						pagination={false}
					/>
					{dataSource && dataSource.length > 0 && (
						<div className="yc-table-pagination">
							<Pagination
								showQuickJumper
								current={current || 1}
								total={total || 0}
								pageSize={5}
								onChange={this.onPageChange}
								showTotal={totalCount => `共 ${totalCount} 条信息`}
							/>
						</div>
					)}
				</Spin>
				{visible && (
					<RelationNoticeModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						visible={visible}
						list={modalData}
					/>
				)}
			</div>
		);
	}
}
