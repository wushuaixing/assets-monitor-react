import React from 'react';
// import { navigate } from '@reach/router';
import Header from './header';
import Footer from './footer';
// import { Button } from '@/components';
import './style.scss';

// 基础内容容器
const Container = (props) => {
	const { children } = props;
	return (
		<div className="yc-container-wrapper">
			<div className="yc-container-content">
				{children}
			</div>
		</div>
	);
};

export { Header, Container, Footer };

// 面包屑导航栏
// const Breadcrumb = (props) => {
// 	const { children, className, config } = props;
// 	return (
// 		<div className="yc-breadcrumb-wrapper">
// 			<div className="yc-breadcrumb">
// 				<Button style={{ width: 72 }} className="yc-breadcrumb-btn" onClick={() => window.history.go(-1)}>返回</Button>
// 				<div className={`yc-breadcrumb-content ${className || ''}`}>
// 					<p className="bread-content">
// 						{config && config.map((item, index) => {
// 							if (index === config.length - 1) {
// 								return (
// 									<span className="bread-name-no-link">{item.name}</span>
// 								);
// 							}
// 							return (
// 								<React.Fragment>
// 									<span className="bread-name-link" onClick={() => navigate(item.url)}>{item.name}</span>
// 									<span className="bread-name-split">/</span>
// 								</React.Fragment>
// 							);
// 						})}
// 					</p>
// 					{children}
// 				</div>
// 			</div>
// 			<div className="yc-breadcrumb-extra" />
// 		</div>
// 	);
// };
