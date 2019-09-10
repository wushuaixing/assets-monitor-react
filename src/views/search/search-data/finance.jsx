import React, { useState } from 'react';
import {
	Button, Input, message,
} from 'antd';
import { navigate } from '@reach/router';

/**
 * 拼接参数，跳转到查询详情
 * @param props
 */
const doSearch = (router, props) => {
	if (props && props instanceof Array) {
		let params = '';
		props.map((item) => {
			if (params === '') {
				params = item;
			} else {
				params = `${params}&${item}`;
			}
			return item;
		});
		navigate(`/search/detail/${router}?${params}`);
	}
};

const Datas = (props) => {
	const { router } = props;
	const [keywords, setKeywords] = useState(null);

	return (
		<div className="select-search">
			<div className="select">
				<p className="financial">全文</p>
			</div>
			<Input
				placeholder="标题、关键字"
				value={keywords}
				onChange={(e) => {
					setKeywords(e.target.value);
				}}
			/>
			<Button
				type="primary"
				size="large"
				className="red-search"
				onClick={() => {
					if (keywords) {
						doSearch(router, [`content=${keywords}`]);
					} else {
						message.error('请输入一个搜索条件');
					}
				}}
			>
				搜索
			</Button>
		</div>
	);
};
export default Datas;
