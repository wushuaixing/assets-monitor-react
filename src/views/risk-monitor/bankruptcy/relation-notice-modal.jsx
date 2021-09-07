import React from 'react';
import { Modal, Timeline } from 'antd';
import PropTypes from 'reactPropTypes';
import './style.scss';
import { Ellipsis } from '@/common';
// 信息监控/风险监控/破产重组- 公告信息列|关联公告弹窗
function RelationNoticeModal(props) {
	const {
		visible, onCancel, onOk, list = [],
	} = props;
	const fn = i => i || '-';
	console.log(list);
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
											 	<a href={i.typeName === '裁判文书' ? `#/judgement?sourceId=10986&pid=${i.pid}&title=${i.title}` : i.url} target="_blank" rel="noreferrer">{fn(i.title)}</a>
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


RelationNoticeModal.propTypes = {
	visible: PropTypes.bool,
	onCancel: PropTypes.func,
	onOk: PropTypes.func,
	list: PropTypes.array,
};

RelationNoticeModal.defaultProps = {
	visible: false,
	onCancel: () => {},
	onOk: () => {},
	list: [],
};
export default RelationNoticeModal;
