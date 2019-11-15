import React from 'react';
import './style.scss';


class RingEcharts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { title, Data } = this.props;
		return (
			<div>
				<div className="yc-timeline-title">{title}</div>
				<ul className="yc-timeline">
					{
						Data
						&& Data.slice(0, 5).map(item => (
							<li className="yc-li-complete">
								<div className="yc-timestamp">
									<span className="num">
										{`${item.count} 条`}
									</span>
								</div>
								<div className="yc-dotted-line" />
								<div className="status">
									<h4>
										{item.year === 0 ? '未知' : `${item.year} 年`}
									</h4>
								</div>
							</li>
						))
                    }
				</ul>
			</div>
		);
	}
}

export default RingEcharts;
