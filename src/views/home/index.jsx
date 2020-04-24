import React from 'react';
import Header from './home-header';
import QuickStart from './home-right/quick-start';
import Overview from './home-right/overview';
import './index.scss';


class HomeRouter extends React.Component {
	constructor(props) {
		super(props);
		document.title = '首页';
		this.state = {};
	}


	render() {
		return (
			<div className="home-container">
				<div className="home-container-header">
					<Header />
				</div>
				<div className="home-container-horizontal-mark-line" />
				<div className="home-container-content">
					<div className="home-container-content-left">left</div>
					<div className="home-container-content-middle" />
					<div className="home-container-content-right">
						<div className="home-container-content-right-quickStart">
							<QuickStart />
						</div>
						<div className="home-container-horizontal-mark-line" />
						<div className="home-container-content-right-overview">
							<Overview />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default HomeRouter;
