import React from 'react';

export default class BusinessScale extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

			roleData: [
				{
					value: 104, name: '人员规模', description: '其中3条质押登记状态为无效', warning: '当前有效担保债权数额 1500万人民币',
				},
			],
		};
	}

	render() {
		const { roleData } = this.state;
		return (
			<div>
				<div className="overview-container-title">
					<div className="overview-left-item" />
					<span className="container-title-name"> 企业规模</span>
				</div>
				<div>
					{
						roleData && roleData.map(item => (
							<div className="yc-role-container">
								<span className="yc-role-icon" />
								<div className="yc-role-name">
									{item.name}
								</div>
								<div className="yc-role-num">
									{`${item.value} 人`}
								</div>
							</div>
						))
					}
				</div>
			</div>
		);
	}
}
