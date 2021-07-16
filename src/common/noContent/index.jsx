import React from 'react';
// import rsaEncrypt from '@/utils/encryp';
// import { Button } from '@/components';
import noData from '@/assets/img/home/img_blank_nodata.png';
import bell from '@/assets/img/img_blank_nomassage.png';
import './style.scss';


class noContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}


	render() {
		const { font, style, emptyType } = this.props;
		const typeImg = emptyType === 'bell';
		return (
			<div style={style} className="yc-no-noContent">
				<img src={typeImg ? bell : noData} alt="" />
				<span>
					{font || '暂无数据'}
				</span>
			</div>
		);
	}
}

export default noContent;
