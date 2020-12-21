import React from 'react';
import { Tabs } from '@/common';
import API from '@/utils/api/assets/construct';
import { getUrlParams } from '@/views/asset-excavate/query-util';
import { promiseAll } from '@/utils/promise';


export default class TabsIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			_source: props.source,
		};
	}

	toRefreshCount = (config, type) => {
		const { onRefresh } = this.props;
		const _source =	config;
		// console.log('construct config === ', type, config);
		this.toGetUnReadCount(_source);
		config.forEach((i, index) => {
			if (i.id !== type) {
				API(i.id, 'listCount')(this.isUrlParams(i.id)).then((res) => {
					// console.log('res === ', res);
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
		promiseArray.push(API('YC021201', 'listCount')(params));
		promiseArray.push(API('YC021202', 'listCount')(params));
		promiseArray.push(API('YC021203', 'listCount')(params));
		const handlePromise = promiseAll(promiseArray.map(promiseItem => promiseItem.catch(err => err)));
		handlePromise.then((values) => {
			const isArray = Array.isArray(values) && values.length > 0;
			// console.log('values === ', values);
			if (isArray) {
				const result = config.map((item) => {
					const _item = item;
					if (_item.id === 'YC021201') {
						_item.dot = values.filter(it => it.id === 'YC021201')[0].data > 0;
					}
					if (_item.id === 'YC021202') {
						_item.dot = values.filter(it => it.id === 'YC021202')[0].data > 0;
					}
					if (_item.id === 'YC021203') {
						_item.dot = values.filter(it => it.id === 'YC021203')[0].data > 0;
					}
					return _item;
				});
				this.setState({
					_source: result,
				});
				if (onRefresh) {
					onRefresh(result);
				}
			}
		}).catch((reason) => {
			console.log('promise reject failed reason', reason);
		});
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
