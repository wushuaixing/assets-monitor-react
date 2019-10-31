import React from 'react';

export default class Basic extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			BasicArray: [
				{ name: '法定代表人', description: '井永柱' },
				{ name: '经营状态', description: '存续' },
				{ name: '注册资本', description: '10655.81万元人民币' },
				{ name: '成立日期', description: '2003-04-29' },
				{ name: '注册地址', description: '建德市乾潭镇新程村' },
			],
		};
	}

	render() {
		const { BasicArray } = this.state;
		return (
			<div>
				<div className="overview-container-title">
					<div className="overview-left-item" />
					<span className="container-title-name">基本信息</span>
				</div>
				<div className="overview-container-content">
					{
						BasicArray
						&& BasicArray.map(item => (
							<div className="yc-basic">
								<div className="yc-basic-name">{`${item.name}:`}</div>
								<div className="yc-basic-description">{item.description}</div>
							</div>
						))
                    }
				</div>
			</div>
		);
	}
}
