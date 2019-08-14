import React, { useState } from 'react';
import './style.scss';
import Badge from '../badge';

const toGetDefaultActive = (source) => {
	const { hash } = window.location;
	let res = '';
	source.forEach((item) => {
		if (new RegExp(item.url).test(hash)) {
			res = item.id;
		}
	});
	return res || source[0].id;
};
const Tabs = (props) => {
	const {
		simple, rightRender, onChange, source, number,
	} = props;
	const [active, setActive] = useState(toGetDefaultActive(source));

	window.onhashchange = () => {
		const _result = toGetDefaultActive(source);
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
						className={active === item.id ? 'yc-tabs-active' : 'yc-tabs-un-active'}
						onClick={() => {
							setActive(item.id);
							if (onChange)onChange(item);
						}}
					>
						<div className="yc-tabs-active-line" />
						<Badge dot={item.dot}>
							{number ? `${item.name}(${item.number})` : item.name}
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
