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
import BackruptcyItem from '../table/bankruptcyItem';
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
					const params = { ...row, isPortraitInquiry };
					return <BackruptcyItem handleOpenModal={this.handleOpenModal} {...params} />;
				},
			}, {
				title: '辅助信息',
				width: 360,
				render: (value, row) => {
					const { gmtPublish, court } = row || {};
					return 	(
						<div className="backruptcy-table-right-content">
							{/* {	isPortraitInquiry && <LiItem Li title="公开日期" auto>{f(gmtPublish)}</LiItem>} */}
							{/* <LiItem Li title="受理法院" auto>{f(court)}</LiItem> */}
							{
								isPortraitInquiry ?	(
									<li className="backruptcy-table-right-content-item">
										<div className="backruptcy-table-right-content-item-label">公开日期：</div>
										<div className="backruptcy-table-right-content-item-val">{f(gmtPublish)}</div>
									</li>
								) : null

							}
							<li className="backruptcy-table-right-content-item">
								<div className="backruptcy-table-right-content-item-label">受理法院：</div>
								<div className="backruptcy-table-right-content-item-val">{f(court)}</div>
							</li>
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
			<div className="yc-assets-auction">
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
