import React from 'react';
import { Modal, Timeline } from 'antd';
import './style.scss';
import { Ellipsis } from '@/common';
// 信息监控/风险监控/破产重组- 公告信息列|关联公告弹窗
function RelationNoticeModal(props) {
	const {
		visible, onCancel, onOk, list = [],
	} = props;
	const fn = i => i || '-';
	return (
		<Modal
			wrapClassName="relation-notice-modal"
			title="关联公告"
			width={507}
			visible={visible}
			maskClosable={false}
			footer={false}
			onOk={onOk}
			onCancel={onCancel}
		>
			<div className="modal-content">
				<div className="yc-Timeline-content">
					<Timeline>
						{
							list.map(i => (
								<Timeline.Item key={i.id}>
									<div className="yc-Timeline-item">
										 <span className="yc-Timeline-item-publish">{fn(i.gmtPublish)}</span>
										 <span className="yc-Timeline-item-title">
											 <Ellipsis content={i.title} url={i.pid ? `#/judgement?sourceId=10986&pid=${i.pid}&title=${i.title}` : i.url} isSourceLink={!i.pid} tooltip width={270} />
										 </span>
										 <span className="yc-Timeline-item-typeName">{fn(i.typeName)}</span>
									</div>
								</Timeline.Item>
							))
						}
					</Timeline>
				</div>
			</div>
		</Modal>
	);
}

export default RelationNoticeModal;
