import React from 'react';
import './style.scss';
import Badge from '../badge';
import { parseQuery } from '@/utils';

const toGetDefaultActive = (source, field) => {
	const { hash } = window.location;
	if (field) {
		const r = Number(parseQuery(hash)[field]);
		return (source.filter(item => item.id === r))[0] || source[0];
	}
	return source[0];
};
const numUnit = val => (val > 10000 ? `${(val / 10000).toFixed(1)}万` : val);

class SimpleTab extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: props.defaultCurrent || toGetDefaultActive(props.source, props.field).id,
		};
	}

	componentDidMount() {
		window._addEventListener(window, 'hashchange', this.onHashChange);
	}

	componentWillUnmount() {
		window._removeEventListener(window, 'hashchange', this.onHashChange);
	}

	onHashChange=() => {
		const { active } = this.state;
		const { source, field, onChange } = this.props;
		const res = toGetDefaultActive(source, field);
		if (res.id !== active) {
			this.setState({
				active: res.id,
			});
			if (onChange)onChange(res);
		}
	};

	onClick=(item) => {
		const { onChange } = this.props;
		this.setState({ active: item.id });
		if (onChange)onChange(item);
	};

	render() {
		const { rightRender, source } = this.props;
		const { active } = this.state;
		return (
			<div className="yc-tabs-wrapper yc-tabs-simple">
				<ul>
					{source.map(item => (
						<li
							className={`${active === item.id ? 'yc-tabs-active' : 'yc-tabs-un-active'} yc-tabs-li`}
							onClick={() => this.onClick(item)}
						>
							<div className="yc-tabs-active-line" />
							<Badge dot={item.dot}>
								{ item.showNumber ? `${item.name}「${numUnit(item.number)}」` : item.name}
							</Badge>
						</li>
					))}
				</ul>
				<div className="yc-tabs-right">
					{ rightRender ? rightRender() : '' }
				</div>
			</div>
		);
	}
}
// const Tabs = (props) => {
// 	const {
// 		rightRender, onChange, source, number, field, defaultCurrent,
// 	} = props;
// 	const [active, setActive] = useState(defaultCurrent || toGetDefaultActive(source, field));
//
//
// 	function handleStatusChange(status) {
// 		console.log('onHashChange');
// 	}
//
// 	useEffect(() => {
// 		window._addEventListener(window, 'hashchange', handleStatusChange);
// 		// Specify how to clean up after this effect:
// 		return () => {
// 			window._removeEventListener(window, 'hashchange', handleStatusChange);
// 		};
// 	});
// 	return (
// 		<div className="yc-tabs-wrapper yc-tabs-simple">
// 			<ul>
// 				{source.map(item => (
// 					<li
// 						className={`${active === item.id ? 'yc-tabs-active' : 'yc-tabs-un-active'} yc-tabs-li`}
// 						onClick={() => {
// 							setActive(item.id);
// 							if (onChange)onChange(item);
// 						}}
// 					>
// 						<div className="yc-tabs-active-line" />
// 						<Badge dot={item.dot}>
// 							{number || item.showNumber ? `${item.name}「${numUnit(item.number)}」` : item.name}
// 						</Badge>
// 					</li>
// 				))}
// 			</ul>
// 			<div className="yc-tabs-right">
// 				{ rightRender ? rightRender() : '' }
// 			</div>
// 		</div>
// 	);
// };
export default SimpleTab;
