import React from 'react';
import { Modal, Timeline } from 'antd';
import PropTypes from 'reactPropTypes';

// 信息监控/风险监控/破产重组- 公告信息列|关联公告弹窗
function RelationNoticeModal(props) {
	const listDefult = [{
		date: '2015-09-01',
		title: '（2019）浙0781破14号（2019）浙0781破14号之六 ',
		url: 'https://fanyi.baidu.com',
		type: '其他公告',
		id: 1,
	}, {
		date: '2015-09-01',
		title: '（2019）浙0781破14号（2019）浙0781破14号之六 ',
		url: 'https://fanyi.baidu.com',
		type: '其他公告',
		id: 2,
	}, {
		date: '2015-09-01',
		title: '（2019）浙0781破14号（2019）浙0781破14号之六 ',
		url: 'https://fanyi.baidu.com',
		type: '其他公告',
		id: 3,
	}];
	const {
		visible, onCancel, onOk, list = listDefult,
	} = props;
	return (
		<Modal
			wrapClassName="relation-notice-modal"
			title="关联公告"
			width={835}
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
										 <span>{i.date}</span>
										 <span>{i.title}</span>
										 <span>{i.type}</span>
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
};

RelationNoticeModal.defaultProps = {
	visible: false,
	onCancel: () => {},
	onOk: () => {},
};
export default RelationNoticeModal;
