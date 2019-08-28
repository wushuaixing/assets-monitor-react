import React, { useState } from 'react';
import {
	Button, Input, Select, message,
} from 'antd';
import { navigate } from '@reach/router';

/**
 * 拼接参数，跳转到查询详情
 * @param props
 */
const doSearch = (router, props) => {
	console.log(router, 1);
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
	const { options, router } = props;
	const [keywords, setKeywords] = useState(null);
	if (options) {
		const [placeholder, setPlaceholder] = useState(options[0].placeholder);
		const [selectId, setSelectId] = useState(options[0].id);

		return (
			<div className="select-search">
				<div className="select">
					<Select
						value={selectId}
						style={{ width: 111 }}
						onChange={(item) => {
							options.forEach((ele) => {
								if (ele.id === item) {
									setPlaceholder(ele.placeholder);
									setSelectId(ele.id);
								}
							});
						}}
					>
						{
							options.map(item => (
								<Select.Option value={item.id}>{item.name}</Select.Option>
							))
						}
					</Select>
				</div>
				<Input placeholder={placeholder} value={keywords} onChange={(e) => { setKeywords(e.target.value); }} />
				<Button
					type="primary"
					size="large"
					className="red-search"
					onClick={() => {
						if (keywords) {
							console.log(keywords);
							doSearch(router, [`${selectId}=${keywords}`]);
						} else {
							message.error('请输入一个搜索条件');
						}
					}}
				>
					搜索
				</Button>
			</div>
		);
	}

	return (
		<div className="select-search">
			<div className="select">
				<p className="financial">全文</p>
			</div>
			<Input placeholder="标题、关键字" value={keywords} onChange={(e) => { setKeywords(e.target.value); }} />
			<Button
				type="primary"
				size="large"
				className="red-search"
				onClick={() => {
					if (keywords) {
						console.log(keywords);
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
