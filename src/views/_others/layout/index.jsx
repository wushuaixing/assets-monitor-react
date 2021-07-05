import React from 'react';
import Cookies from 'universal-cookie';
import Header from './header';
import Footer from './footer';
import './style.scss';

const cookie = new Cookies();
const isSpecial = cookie.get('isSpecial');
// 基础内容容器
const Container = (props) => {
	const { children } = props;
	return (
		<div className={['yc-container-wrapper', !isSpecial ? 'yc-container-wrapper-special' : null].join(' ')}>
			<div className="yc-container-content">
				{children}
			</div>
		</div>
	);
};

export { Header, Container, Footer };
