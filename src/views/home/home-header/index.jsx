import React from 'react';
import { Icon } from '@/common';
import './style.scss';

class HomeHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			headerData: {
				organizationName: '中国银行杭州分行',
				a: 2582,
				b: 533,
				c: 6,
			},
		};
	}

	render() {
		const { headerData } = this.state;
		return (
			<div className="header-container">
				<div className="header-container-left">
					<div className="left-organization">
						<Icon type="icon-logo" className="left-organization-icon" />
						<span className="left-organization-name">我的机构</span>
						<div className="left-organization-text">{headerData.organizationName || '-'}</div>
					</div>
				</div>

				<div className="header-container-right">
					<div className="right-organization">
						<Icon type="icon-home-user" className="right-organization-icon" style={{ color: '#3DBD7D' }} />
						<span className="right-organization-name">本级机构监控债务人数</span>
						<div className="right-organization-text">
							<span className="right-organization-text-num">
								{headerData.a || '-'}
							</span>
							名
						</div>
					</div>
					<div className="horizontal-line" />
					<div className="right-organization">
						<Icon type="icon-home-info" className="right-organization-icon" style={{ color: '#FB8E3C' }} />
						<span className="right-organization-name">本级机构监控业务笔数</span>
						<div className="right-organization-text">
							<span className="right-organization-text-num">
								{headerData.b || '-'}
							</span>
							笔
						</div>
					</div>
					<div className="horizontal-line" />
					<div className="right-organization">
						<Icon type="icon-home-money" className="right-organization-icon" style={{ color: '#1C80E1' }} />
						<span className="right-organization-name">下级机构数</span>
						<div className="right-organization-text">
							<span className="right-organization-text-num">
								{headerData.c || '-'}
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default HomeHeader;
