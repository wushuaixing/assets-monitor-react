import React from 'react';
import { Modal, Timeline } from 'antd';
import { Spin } from '@/common';
import { toThousands } from '@/utils/changeTime';

export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			TimelineArray: [
				{
					name: '第一次拍卖', result: '撤回', currentPrice: 227000, time: '2019-04-29 10:00:00', url: 'https://sf-item.taobao.com/sf_item/603720609277.htm?spm=a213w.3064813.houseCat.2.4ac35dadcKE8P3',
				},
				{
					name: '第一次拍卖', result: '撤回', currentPrice: 227000, time: '2019-04-29 10:00:00', url: 'https://sf-item.taobao.com/sf_item/603720609277.htm?spm=a213w.3064813.houseCat.2.4ac35dadcKE8P3',
				},
				{
					name: '第二次拍卖', result: '流拍', currentPrice: 227000, time: '2019-04-29 10:00:00', url: 'https://sf-item.taobao.com/sf_item/603720609277.htm?spm=a213w.3064813.houseCat.2.4ac35dadcKE8P3',
				}, {
					name: '第一次拍卖', result: '撤回', currentPrice: 227000, time: '2019-04-29 10:00:00', url: 'https://sf-item.taobao.com/sf_item/603720609277.htm?spm=a213w.3064813.houseCat.2.4ac35dadcKE8P3',
				},
				{
					name: '第一次拍卖', result: '撤回', currentPrice: 227000, time: '2019-04-29 10:00:00', url: 'https://sf-item.taobao.com/sf_item/603720609277.htm?spm=a213w.3064813.houseCat.2.4ac35dadcKE8P3',
				},
				{
					name: '第二次拍卖', result: '流拍', currentPrice: 227000, time: '2019-04-29 10:00:00', url: 'https://sf-item.taobao.com/sf_item/603720609277.htm?spm=a213w.3064813.houseCat.2.4ac35dadcKE8P3',
				}, {
					name: '第一次拍卖', result: '撤回', currentPrice: 227000, time: '2019-04-29 10:00:00', url: 'https://sf-item.taobao.com/sf_item/603720609277.htm?spm=a213w.3064813.houseCat.2.4ac35dadcKE8P3',
				},
				{
					name: '第一次拍卖', result: '撤回', currentPrice: 227000, time: '2019-04-29 10:00:00', url: 'https://sf-item.taobao.com/sf_item/603720609277.htm?spm=a213w.3064813.houseCat.2.4ac35dadcKE8P3',
				},
				{
					name: '第二次拍卖', result: '流拍', currentPrice: 227000, time: '2019-04-29 10:00:00', url: 'https://sf-item.taobao.com/sf_item/603720609277.htm?spm=a213w.3064813.houseCat.2.4ac35dadcKE8P3',
				},
			],
		};
	}


	handleCancel=() => {
		const { onCancel } = this.props;
		onCancel();
	}

	render() {
		const { loading, TimelineArray } = this.state;
		const { historyInfoModalVisible } = this.props;
		return (
			<Modal title="历史拍卖信息" width={880} style={{ 'max-height': 650 }} visible={historyInfoModalVisible} footer={(null)} onCancel={this.handleCancel}>
				<Spin visible={loading}>
					<div className="yc-history-concent">
						<div className="yc-history-title">丽水市莲都区水阁工业园区石牛路252号</div>
						<div className="yc-history-item">
							<span>
								<span className="yc-history-lable">评估价：</span>
								{`${toThousands(32354100)} 元`}
							</span>
							<div className="yc-table-line" />
							<span>
								<span className="yc-history-lable">处置单位：</span>
								丽水市莲都区人民法院
							</span>
						</div>
						<div className="yc-Timeline-content">
							<Timeline>
								{TimelineArray && TimelineArray.map(item => (
									<Timeline.Item>
										<div className="yc-Timeline-item TimelineName">{item.name}</div>
										<div className="yc-Timeline-item">
											<span>
												<span className="yc-history-lable">拍卖结果：</span>
												{item.result}
											</span>
											<div className="yc-table-line" />
											<span>
												<span className="yc-history-lable">当前价：</span>
												{`${toThousands(item.currentPrice)} 元`}
											</span>
											<div className="yc-table-line" />
											<span>
												<span className="yc-history-lable">拍卖时间：</span>
												{item.time}
											</span>
										</div>
										<div className="yc-Timeline-item TimelineUrl">
											<a href={item.url} target="_blank" rel="noopener noreferrer" className="yc-table-text-link">
												{item.url}
											</a>
										</div>
									</Timeline.Item>
								))
                                }
							</Timeline>
						</div>
					</div>
				</Spin>
			</Modal>
		);
	}
}
