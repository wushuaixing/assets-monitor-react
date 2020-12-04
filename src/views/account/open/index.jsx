import React from 'react';
import Header from './header';
import SearchTree from './tree';
import './index.scss';

class Open extends React.Component {
	constructor(props) {
		super(props);
		document.title = '账号开通';
		this.state = {};
	}

	render() {
		return (
			<React.Fragment>
				<Header />
				<SearchTree />
			</React.Fragment>
		);
	}
}

export default Open;
