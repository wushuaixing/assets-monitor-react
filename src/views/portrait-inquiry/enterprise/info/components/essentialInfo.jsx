import React from 'react';
import './style.scss';

export default class EssentialInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { id } = this.props;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab" style={{ borderBottom: 0 }}>
					<div className="yc-tabs-simple-prefix">
                        基本信息
					</div>
				</div>
				<div className="yc-base-content">
					<div className="yc-base-infoTitle">法定代表人</div>
					<div className="yc-base-infoName">赵斌</div>
					<div className="yc-base-infoTitle">组织机构代码</div>
					<div className="yc-base-infoName">a1223rf23414</div>
					<div className="yc-base-infoTitle">法定代表人</div>
					<div className="yc-base-infoName">赵斌</div>
					<div className="yc-base-infoTitle">组织机构代码</div>
					<div className="yc-base-infoName">a1223rf23414</div>
				</div>
			</div>
		);
	}
}
