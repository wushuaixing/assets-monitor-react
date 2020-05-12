import React from 'react';
import { currentOrganization } from 'api/home';
import Header from './home-header';
import QuickStart from './home-right/quick-start';
import Overview from './home-right/overview';
import Dynamic from './home-left/index';
import './index.scss';


class HomeRouter extends React.Component {
	constructor(props) {
		super(props);
		document.title = '首页';
		this.state = {
			headerPropsData: {}, // 首页详情
		};
	}

	componentDidMount() {
		this.getHeaderData();
	}

	// 获取统计信息
	getHeaderData=() => {
		currentOrganization().then((res) => {
			if (res.code === 200) {
				this.setState(() => ({
					headerPropsData: res.data,
				}));
			}
		});
	};

	render() {
		const { headerPropsData } = this.state;
		const params = {
			headerPropsData,
		};
		return (
			<div className="home-container">
				<div className="home-container-header">
					<Header {...params} />
				</div>
				<div className="home-container-horizontal-mark-line" />
				<div className="home-container-content">
					<div className="home-container-content-left">
						<Dynamic />
					</div>
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
