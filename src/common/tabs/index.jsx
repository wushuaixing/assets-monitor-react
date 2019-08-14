import React, { useState } from 'react';
// import Badge from 'antd/lib/badge';
import './style.scss';
import Badge from '../Badge';

const Tabs = (props) => {
	const {
		simple, rightRender, onChange, source, number,
	} = props;
	const [active, setActive] = useState(source[0].id);
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
