import React from 'react';
// import { message, Modal } from 'antd';
// import {
// 	Button, Spin, Download, Icon,
// } from '@/common';
// import Api from '@/utils/api/monitor-info/bidding';
// import { unReadCount as unReadTotal } from '@/utils/api/monitor-info';
// import { clearEmpty } from '@/utils';
// import QueryView from './query';
// import TableView from './table';

import './style.scss';

export default class Lawsuits extends React.Component {
	constructor(props) {
		super(props);
		document.title = '电子报-资产挖掘';
	}

	componentWillMount() {
		// const url = window.location.hash;
		// if (url.indexOf('?') === -1) {
		// 	this.onQueryChange({});
		// }
	}

	render() {
		return (
			<div className="yc-assets-auction">电子报</div>
		);
	}
}