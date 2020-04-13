import React from 'react';
import { Tabs } from '@/common';
import BrokenVersion from '@/views/risk-monitor/broken-record/table-version';
import { toGetNumber } from '@/utils/promise';

export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sourceType: 20401,
			config: [
				{
					id: 20401,
					name: '列入',
					number: toGetNumber(props.data, 20401),
					showNumber: true,
					disabled: !toGetNumber(props.data, 20401),
				},
				{
					id: 20402,
					name: '已移除',
					number: toGetNumber(props.data, 20402),
					showNumber: true,
					disabled: !toGetNumber(props.data, 20402),
				}],
		};
	}

	onSourceType=(val) => {
		const { sourceType } = this.state;
		if (sourceType !== val) {
			this.setState({ sourceType: val });
		}
	};

	render() {
		const { config, sourceType } = this.state;
		const { id, portrait } = this.props;
		const params = {
			portrait,
			sourceType,
		};
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<Tabs.Simple
					onChange={this.onSourceType}
					source={config}
					symbol="none"
					defaultCurrent={sourceType}
					prefix={(
						<div className="yc-tabs-simple-prefix" style={{ width: 120 }}>
							<span>失信列表</span>
						</div>
					)}
				/>
				<div className="inquiry-public-table">
					<BrokenVersion {...params} />
				</div>
			</div>
		);
	}
}
