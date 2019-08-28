import React, { useState } from 'react';
import './style.scss';
import Badge from '../badge';
import { parseQuery } from '@/utils';

// 获取默认路由 选中
const toGetDefaultActive = (source, field) => {
	const { hash } = window.location;
	let res = '';
	if (field) {
		// console.log(Number(parseQuery(hash)[field]));
		return Number(parseQuery(hash)[field]) || source[0].id;
	}

	source.forEach((item) => {
		if (new RegExp(item.url).test(hash)) {
			res = item.id;
		}
	});
	return res || source[0].id;
};

// 数值超过10000，加单位
const numUnit = val => (val > 10000 ? `${(val / 10000).toFixed(1)}万` : val);

const Tabs = (props) => {
	const {
		simple, rightRender, onChange, source, number, field, defaultCurrent,
	} = props;
	const [active, setActive] = useState(defaultCurrent || toGetDefaultActive(source, field));
	window.onhashchange = () => {
		const _result = toGetDefaultActive(source, field);
		if (_result !== active) {
			setActive(_result);
		}
	};

	return (
		<div className={`yc-tabs-wrapper ${simple ? 'yc-tabs-simple' : 'yc-tabs-normal'}`}>
			<ul>
				{source.map(item => (
					<li
						className={`${active === item.id ? 'yc-tabs-active' : 'yc-tabs-un-active'} yc-tabs-li`}
						onClick={() => {
							setActive(item.id);
							if (onChange)onChange(item);
						}}
					>
						<div className="yc-tabs-active-line" />
						<Badge dot={item.dot}>
							{number || item.showNumber ? `${item.name}「${numUnit(item.number)}」` : item.name}
						</Badge>
					</li>
				))}
			</ul>
			<div className="yc-tabs-right">
				{
					rightRender ? rightRender() : ''
				}
			</div>

		</div>
	);
};
export default Tabs;
