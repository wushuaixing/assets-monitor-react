import React, { PureComponent } from 'react';
import { Icon } from '@/common';
import './style.scss';

class DetailItem extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}


	render() {
		return (
			<div className="detail-container">
				<div className="detail-container-content">
					<div className="detail-container-content-left">
						<div className="detail-container-content-left-icon">
							罗山矿业
						</div>
					</div>
					<div className="detail-container-content-right">
						<div className="detail-container-content-right-header">
							<div className="detail-container-content-right-header-name">
								东阳市罗山矿业有限公司
							</div>
							<div className="detail-container-content-right-header-time">
								209-12-01
							</div>
						</div>
						<div className="detail-container-content-right-item">
							<div className="detail-container-content-right-item-detail">
								2020年1月2日取得“仙居县湫山乡深里坑萤石矿”采矿权，建议及时核实并查封
							</div>
							<div className="detail-container-content-right-item-tag">
								<Icon type="icon-intangible-mining" className="detail-container-content-right-item-tag-icon" />
								采矿权发证
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default DetailItem;
