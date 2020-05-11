import React from 'react';
import { Icon } from '@/common';
import './style.scss';

export default class RiskInformation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			IconType, IconColor, text, children, customStyle, Risk, onClick, totalCount, asset, updateTime, unReadText, unReadNum,
		} = this.props;
		return (
			<div className={`monitor-card-container ${totalCount && 'monitor-card-noCount-hover'}`} style={customStyle} onClick={() => totalCount && onClick && onClick()}>
				<div className="card-header">
					<div className="card-header-left">
						<Icon className={`card-header-icon ${!totalCount && 'monitor-card-noCount-color'}`} type={`icon-${IconType}`} style={IconColor} />
						<div className={`card-left-font ${!totalCount && 'monitor-card-noCount-color'}`} style={{ display: 'inline-block' }}>
							{`${text} (${totalCount || 0})`}
						</div>
					</div>

					{unReadNum ? (
						<div className="card-header-monitor-right">
							<Icon className={`card-header-icon ${!totalCount && 'monitor-card-noCount-color'}`} type="icon-dot" style={{ color: '#FB5A5C', fontSize: '5px' }} />
							<div className="card-header-monitor-right-text">
								{unReadNum}
								{unReadText}
							</div>
						</div>
					) : null}
				</div>
				<div className={Risk ? 'risk-card-content' : 'excavate-card-content'} style={asset ? { paddingLeft: 0 } : {}}>
					{children}
					<Icon className={`monitor-card-container-arrow-icon ${!totalCount && 'monitor-card-noCount-color'}`} type="icon-icon_arrow" style={{ color: '#4E5566' }} />
				</div>
				{totalCount && updateTime ? (
					<div className="card-footer">
						{`最近更新时间：${updateTime}`}
					</div>
				) : null}

			</div>
		);
	}
}
