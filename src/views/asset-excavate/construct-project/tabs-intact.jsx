import React from 'react';
import { Tabs } from '@/common';
import API from '@/utils/api/assets/construct';
import { unReadCount } from '@/utils/api/monitor-info';
import { getUrlParams } from '@/views/asset-excavate/query-util';
import { promiseAll } from '@/utils/promise';


export default class TabsIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			_source: props.source,
		};
	}

	// componentDidMount() {
	// 	const { source, sourceType } = this.props;
	// 	this.toRefreshCount(source, sourceType);
	// }

	toRefreshCount = (config, type) => {
		const { onRefresh } = this.props;
		const _source =	config;
		this.toGetUnReadCount(_source);
		config.forEach((i, index) => {
			if (i.id !== type) {
				API(i.id, 'listCount')(this.isUrlParams(i.id)).then((res) => {
					if (res.code === 200) {
						_source[index].number = res.data;
						this.setState({ _source });
						if (onRefresh)onRefresh(_source);
					}
				});
			}
		});
	};

	isUrlParams = (val) => {
		const url = window.location.hash;
		if (url.indexOf('?') !== -1) {
			let dParams = {};
			if (val === 'YC021201') {
				dParams = getUrlParams(url, 'startGmtCreate', 'endGmtCreate');
			}
			if (val === 'YC021202') {
				dParams = getUrlParams(url, 'gmtCreateStart', 'gmtCreateEnd');
			}
			if (val === 'YC021203') {
				dParams = getUrlParams(url, 'startGmtCreate', 'endGmtCreate');
			}
			return dParams;
		}
		return {};
	};

	toGetUnReadCount = (config) => {
		const { onRefresh } = this.props;
		const params = {
			isRead: 0,
		};
		const promiseArray = [];
		promiseArray.push(API('YC030301', 'listCount')(params));
		promiseArray.push(API('YC030302', 'listCount')(params));
		promiseArray.push(API('YC030303', 'listCount')(params));
		// unReadCount({ ...this.isUrlParams(config.id), isRead: 1 }).then((res) => {
		// 	const { data, code } = res;
		// 	if (code === 200) {
		// 		const result = config.map((item) => {
		// 			const _item = item;
		// 			if (_item.id === 'YC030301')_item.dot = data.companyAbnormalCount;
		// 			if (_item.id === 'YC030302')_item.dot = data.changeFlag;
		// 			if (_item.id === 'YC030303')_item.dot = data.companyIllegalCount;
		// 			return _item;
		// 		});
		// 		this.setState({ _source: result });
		// 		if (onRefresh)onRefresh(result);
		// 	}
		// });
	};

	render() {
		const { onChange, field } = this.props;
		const { _source } = this.state;
		const params = {
			source: _source,
			onChange,
			field,
		};
		return (
			<Tabs.Simple borderBottom {...params} />
		);
	}
}
