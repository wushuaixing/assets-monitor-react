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

	toRefreshCount = (config, type, params) => {
		const { onRefresh } = this.props;
		const _source =	config;
		this.toGetUnReadCount(_source, params, type);
		config.forEach((i) => {
			if (i.id !== type) {
				API(i.id, 'listCount')(this.isUrlParams(i.id)).then((res) => {
					if (res.code === 200) {
						_source.filter(it => it.id === i.id)[0].number = res.data;
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
				dParams = getUrlParams(url, 'startGmtCreate', 'endGmtCreate');
			}
			if (val === 'YC021203') {
				dParams = getUrlParams(url, 'startGmtCreate', 'endGmtCreate');
			}
			return dParams;
		}
		return {};
	};

	toGetUnReadCount = (config, params) => {
		const { onRefresh } = this.props;
		const promiseArray = [];
		const _params = {
			...params,
			isRead: 0,
		};
		config.forEach((item) => {
			promiseArray.push(API(item.id, 'listCount')(_params));
		});
		if (promiseArray.length > 0) {
			const handlePromise = promiseAll(promiseArray.map(promiseItem => promiseItem.catch(err => err)));
			handlePromise.then((values) => {
				const isArray = Array.isArray(values) && values.length > 0;
				if (isArray) {
					const result = config.map((item) => {
						const _item = item;
						_item.dot = values.filter(it => it.id === _item.id)[0].data > 0;
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
		}
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
