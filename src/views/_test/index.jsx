// import React from 'react';
// import { Pagination } from 'antd';
//
//
// class Common extends React.Component {
// 	constructor(props) {
// 		const old = (Math.random() * 1000).toFixed(0);
// 		super(props);
// 		this.idKey = {
// 			old,
// 			new: old,
// 		};
// 	}
//
// 	shouldComponentUpdate(nextProps, nextState, nextContext) {
// 		console.log('shouldComponentUpdate');
// 		this.idKey.new = (Math.random() * 1000).toFixed(0);
// 		console.log(this.idKey);
// 		return true;
// 	}
//
// 	componentDidUpdate(prevProps, prevState, snapshot) {
// 		console.log('componentDidUpdate');
// 		this.idKey.old = this.idKey.new;
// 		console.log(this.idKey);
// 	}
//
// 	render() {
// 		const { onShowSizeChange } = this.props;
// 		console.log('render:', this.idKey);
// 		return (
// 			<React.Fragment>
// 				<p>
// 					<Pagination showSizeChanger onShowSizeChange={onShowSizeChange} defaultCurrent={3} total={180} pageSize={30} />
// 				</p>
//
// 			</React.Fragment>
// 		);
// 	}
// }
//
// export default class Temp extends React.Component {
// 	constructor(props) {
// 		document.title = '测试页面';
// 		super(props);
// 		this.state = {
// 			valueRes: 1,
// 		};
// 	}
//
// 	onShowSizeChange = (value) => {
// 		console.log(value);
// 		this.setState({ valueRes: value });
// 	};
//
// 	render() {
// 		return (
// 			<div style={{ padding: 20 }}>
// 				<Common onShowSizeChange={this.onShowSizeChange} />
// 			</div>
// 		);
// 	}
// }
