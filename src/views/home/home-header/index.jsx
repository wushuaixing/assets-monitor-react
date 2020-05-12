import React from 'react';
import { Icon } from '@/common';
import './style.scss';

class HomeHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		const { headerPropsData } = this.props;
		const percentageBorrowers = headerPropsData && headerPropsData.mainObligorBusinessCount && headerPropsData.businessCount
			&& (headerPropsData.mainObligorBusinessCount / headerPropsData.businessCount).toFixed(2) * 100;
		return (
			<div className="header-container">
				<div className="header-container-left">
					<div className="left-organization">
						<Icon type="icon-my-org" className="left-organization-icon" />
						<span className="left-organization-name">我的机构</span>
						<div className="left-organization-text">{headerPropsData ? headerPropsData.orgName : '-'}</div>
					</div>
				</div>

				<div className="header-container-right">

					<div className="right-organization">
						<Icon type="icon-home-user" className="right-organization-icon" style={{ color: '#3DBD7D' }} />
						<span className="right-organization-name">本级机构监控债务人数</span>
						<div className="right-organization-text">
							<span className="right-organization-text-num">
								{headerPropsData ? headerPropsData.obligorCount : '-'}
							</span>
							名
						</div>

						{headerPropsData && headerPropsData.obligorCount < 200 ? (
							<div className="card-content-left-arrow">
								<div className="card-content-popover-content">
									监控债务人数偏低，建议添加更多债务人
								</div>
							</div>
						) : null}
					</div>

					<div className="horizontal-line" />
					<div className="right-organization">
						<Icon type="icon-business" className="right-organization-icon" style={{ color: '#FB8E3C' }} />
						<span className="right-organization-name">本级机构监控业务笔数</span>
						<div className="right-organization-text">
							<span className="right-organization-text-num">
								{headerPropsData ? headerPropsData.businessCount : '-'}
							</span>
							笔
						</div>
						{percentageBorrowers && percentageBorrowers >= 70 ? (
							<div className="card-content-left-arrow">
								<div className="card-content-popover-content" style={{ width: '350px' }}>
									{percentageBorrowers}
									%的业务只导入了借款人，建议导入保证人，便于形成业务画像
								</div>
							</div>
						) : null}
					</div>
					<div className="horizontal-line" />
					<div className="right-organization">
						<Icon type="icon-org" className="right-organization-icon" style={{ color: '#1C80E1' }} />
						<span className="right-organization-name">下级机构数</span>
						<div className="right-organization-text">
							<span className="right-organization-text-num">
								{headerPropsData && headerPropsData.totalCount && headerPropsData.totalCount ? headerPropsData.totalCount - 1 : '-'}
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default HomeHeader;
