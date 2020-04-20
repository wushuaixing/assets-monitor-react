import React from 'react';
import './style.scss';

export default class NoPermission extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			timeLeft: 3,
		};
	}

	componentDidMount() {
		let time = 3;
		const timer = setInterval(() => {
			time -= 1;
			this.setState({
				timeLeft: time,
			});
			if (time === 0) {
				clearInterval(timer);
				window.history.go(-1);
			}
		}, 1000);
	}

	skip = () => {
		window.history.go(-1);
	};

	render() {
		const { timeLeft } = this.state;
		return (
			<div className="yc-NoPermission-container">
				<div className="yc-NoPermission-img" />
				<div className="yc-NoPermission-content">
					<p style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 18 }}>对不起，您当前账号没有相应操作权限</p>
					<div>
						页面自动
						<span className="yc-NoPermission-skip" onClick={this.skip}>跳转</span>
						{`等待时间：${timeLeft}`}
					</div>
				</div>
			</div>
		);
	}
}
