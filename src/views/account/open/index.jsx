import React from 'react';
import Header from './header';
import SearchTree from './tree';
import OrgTable from './table';
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
				<div className="account-content">
					<SearchTree />
					<OrgTable />
				</div>
			</React.Fragment>
		);
	}
}

export default Open;
