import React from 'react';
import { Tooltip } from 'antd';
import img from '@/assets/img/business/assestCard.png';
import arrowRight from '@/assets/img/business/icon_arrow_right.png';
import { Icon } from '@/common';
import './style.scss';

export default class RiskInformation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			imgCard, gmtCreate, count, text, children, styleName, customStyle, tooltipText,
		} = this.props;
		return (
			<div className={styleName || 'business-card-content'} style={customStyle}>
				<div className="card-header">
					<div className="card-header-left">
						<img className="card-left-img" src={imgCard || img} alt="" />
						<div className="card-left-font" style={{ display: 'inline-block' }}>{`${text || '资产拍卖'} (${count || 0})`}</div>
						{tooltipText ? (
							<Tooltip placement="top" title={tooltipText} arrowPointAtCenter>
								<span>
									<Icon
										type="icon-question"
										style={{
											fontSize: 16, marginLeft: 5, position: 'relative', top: '2px', cursor: 'pointer', color: '#7D8699',
										}}
									/>
								</span>
							</Tooltip>
						) : null}
					</div>
					<div className="card-header-right">
						最近更新时间：
						{gmtCreate || '-'}
					</div>
				</div>
				{children}
				<img className="card-content-right-img" src={arrowRight} alt="" />
			</div>
		);
	}
}