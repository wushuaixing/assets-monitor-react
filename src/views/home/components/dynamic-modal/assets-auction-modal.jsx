import React from 'react';
import { Modal, message } from 'antd';
import { followSingle, unFollowSingle } from 'api/monitor-info/assets';
import { processSave } from '@/utils/api/monitor-info/assets-follow';
import {
	Spin, Table, Button,
} from '@/common';
import { Attentions } from '@/common/table';
import { AssetsInfo, AuctionInfo, MatchingReason } from '@/views/asset-excavate/assets-auction/tableComponents';
import { floatFormat } from '@/utils/format';
import FollowModel from '@/views/asset-excavate/assets-auction/follow-info';
import TableVersionModal from '@/views/asset-excavate/assets-auction/tableVersionModal';
import '@/views/asset-excavate/assets-auction/style.scss';

// 忽略操作
const handleIgnore = (row, index, onRefresh) => {
	Modal.confirm({
		title: '确认忽略本条推送信息吗？',
		content: '点击确定，本条推送信息将被标记为忽略。',
		iconType: 'exclamation-circle',
		onOk() {
			processSave({ monitorId: row.id, process: 12 }, true).then((res) => {
				if (res.code === 200) {
					message.success('操作成功！');
					onRefresh({ id: row.id, process: 12, index }, 'process');
				}
			});
		},
		onCancel() {},
	});
};

export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			source: {},
			historyInfoModalVisible: false,
			historyInfoModalData: {},
			dataSource: [
				{
					approveTime: 1588233834,
					auctionId: 3460498,
					auctionStatusTag: null,
					commentTotal: 1,
					consultPrice: 120000,
					court: '北海市中级人民法院',
					currentPrice: 96000,
					dishonestStatus: null,
					expend: 1100,
					historyAuction: [
						{
							consultPrice: 120000,
							court: '北海市中级人民法院',
							currentPrice: 120000,
							initialPrice: 120000,
							round: '一拍',
							start: '2018-03-06 10:00',
							status: 7,
							title: '【第一次拍卖】北海市长青路6号“领秀一方”-02069号地下车位（13.94㎡）',
							url: 'https://sf-item.taobao.com/sf_item/562526905975.htm',
						},
						{
							consultPrice: 120000,
							court: '北海市中级人民法院',
							currentPrice: 96000,
							initialPrice: 96000,
							round: '变卖',
							start: '2018-06-19 10:00',
							status: 7,
							title: '【变卖】北海市长青路6号“领秀一方”-02069号地下车位（13.94㎡）',
							url: 'https://sf-item.taobao.com/sf_item/570373413186.htm',
						},
					],
					id: 1010017,
					important: 1,
					initialPrice: 96000,
					isAttention: 1,
					obligorId: 354373,
					obligorName: '哈哈',
					obligorNumber: '340111197901278012',
					orgName: '',
					orgNameList: '',
					process: 6,
					pushType: 1,
					// reason: "[{"number":"340111197901278012","hl":["秦睿为拍卖资产的所有人"]}]",
					recovery: 1200,
					remark: '11',
					roundTag: null,
					start: 1524189600,
					status: 7,
					title: '【第二次拍卖】北海市长青路6号“领秀一方”-02069号地下车位（13.94㎡）',
					updateTime: 1588838014,
					url: 'https://sf-item.taobao.com/sf_item/566527197927.htm',
				},
			], // 列表数据
			loading: false,
			columns: [
				{
					title: '登记日期',
					width: '23%',
					render: AssetsInfo,
				}, {
					title: '匹配原因',
					dataIndex: 'reason',
					width: '33%',
					render: MatchingReason,
				}, {
					title: '拍卖信息',
					width: '33%',
					render: (text, row) => AuctionInfo(text, row, this.toOpenHistory),
				}, {
					title: '操作',
					width: '11%',
					unNormal: true,
					className: 'tAlignCenter_important yc-assets-auction-action',
					render: (text, row, index) => {
						const { recovery, process } = row;
						const event = {
							onClick: () => this.toFollowClick(row, index),
						};
						return (
							<React.Fragment>
								{recovery > 0 ?	(
									<div className="auction-recovery">
										追回金额
										{floatFormat(recovery).length > 12 ? <br /> : '：'}
										{`${floatFormat(recovery)}元`}
									</div>
								) : ''}
								{{
									0: (
										<React.Fragment>
											<Button className="auction-button" type="ghost-other" title="跟进" {...event} />
											<br />
											<Button className="auction-button" title="忽略" onClick={() => handleIgnore(row, index)} />
										</React.Fragment>
									),
									3: <Button className="auction-button" type="ghost-ing" title="跟进中" {...event} />,
									6: <Button className="auction-button" type="ghost-ing" title="跟进中" {...event} />,
									9: <Button className="auction-button" type="ghost-done" title="已完成" {...event} />,
									12: (
										<React.Fragment>
											<Button className="auction-button" type="ghost-other" title="跟进" {...event} />
											<br />
											<Button className="auction-button" type="ghost-ing" title="已忽略" disabled />
										</React.Fragment>
									),
									15: <Button className="auction-button" type="ghost-abort" title="已放弃" {...event} />,
								}[process] || null }
								<Attentions
									text={text}
									row={row}
									onClick={this.onRefresh}
									index={index}
									api={row.isAttention ? unFollowSingle : followSingle}
									single
								/>
							</React.Fragment>
						);
					},
				}],
		};
	}

	// 跟进点击效果
	toFollowClick=(source, index) => {
		const _source = source;
		_source.index = index;
		this.setState({
			visible: true,
			source: _source,
		});
	};

	// 点击历史拍卖信息
	toOpenHistory=(source = {}) => {
		this.setState({
			historyInfoModalVisible: true,
			historyInfoModalData: source,
		});
	};

	// 表格发生变化
	onRefresh=(data, type) => {
		// console.log('onRefresh:', data, type);
		const { dataSource } = this.state;
		const { index } = data;
		const _dataSource = dataSource;
		_dataSource[index][type] = data[type];
		this.setState({
			dataSource: _dataSource,
		});
	};

	handleCancel=() => {
		const { onCancel } = this.props;
		onCancel();
	};

	render() {
		const {
			columns, dataSource, loading, visible, historyInfoModalVisible, historyInfoModalData, source,
		} = this.state;
		const { assetAuctionModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-资产拍卖"
				width={1100}
				style={{ height: 320 }}
				visible={assetAuctionModalVisible}
				footer={null}
				onCancel={this.handleCancel}
				wrapClassName="vertical-center-modal"
			>
				<div className="yc-assets-auction">

					<Spin visible={loading}>
						<Table
							scroll={dataSource.length > 8 ? { y: 440 } : {}}
							columns={columns}
							dataSource={dataSource}
							pagination={false}
							className="table"
						/>
						<div style={{ width: '100%', textAlign: 'center' }}>
							<Button onClick={this.handleCancel} type="primary" style={{ width: 180, height: 34, margin: '50px 0' }}>关闭</Button>
						</div>
					</Spin>
					{
						visible ? (
							<FollowModel
								visible={visible}
								source={source}
								onClose={() => this.setState({ visible: false })}
							/>
						)
							: null
					}
					{historyInfoModalVisible && (
						<TableVersionModal
							onCancel={() => this.setState({ historyInfoModalVisible: false })}
							onOk={() => this.setState({ historyInfoModalVisible: false })}
							data={historyInfoModalData}
							historyInfoModalVisible={historyInfoModalVisible}
						/>
					)}
				</div>
			</Modal>
		);
	}
}
