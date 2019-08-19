import React, { useState } from 'react';
import './style.scss';
import Badge from '../badge';
import { parseQuery } from '@/utils';

const toGetDefaultActive = (source, field) => {
	const { hash } = window.location;
	let res = '';
	if (field) {
		return Number(parseQuery(hash)[field]) || source[0].id;
	}
	source.forEach((item) => {
		if (new RegExp(item.url).test(hash)) {
			res = item.id;
		}
	});
	return res || source[0].id;
};
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
	// useEffect(() => {
	// 	/* 未考虑兼容性 暂时搁置 */
	//
	// });
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
