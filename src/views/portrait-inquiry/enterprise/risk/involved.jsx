import React from 'react';
import { Tabs } from '@/common';
import { Trial } from '@/views/risk-monitor/lawsuits-monitor/table-version';
import { Court } from '@/views/risk-monitor/lawsuits-monitor/table-version';
import { Judgment } from '@/views/risk-monitor/lawsuits-monitor/table-version';
import { toGetDefaultId, toGetNumber } from '@/utils/promise';

export default class Involved extends React.Component {
	constructor(props) {
		super(props);
		const defaultID = toGetDefaultId(props.data);
		this.state = {
			sourceType: defaultID,
			config: [
				{
					id: 20301,
					name: '立案',
					number: toGetNumber(props.data, 20301),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 20301)),
				},
				{
					id: 20302,
					name: '开庭',
					number: toGetNumber(props.data, 20302),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 20302)),
				},
				{
					id: 20303,
					name: '涉诉文书',
					number: toGetNumber(props.data, 20303),
					showNumber: true,
					disabled: !(toGetNumber(props.data, 20303)),
				},
			],
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
		const { id } = this.props;

		return (
			<div className="yc-inquiry-public-table" id={id}>
				<Tabs.Simple
					symbol="none"
					onChange={this.onSourceType}
					source={config}
					defaultCurrent={sourceType}
					prefix={<div className="yc-tabs-simple-prefix">涉诉信息</div>}
				/>
				<div className="inquiry-public-table">
					{sourceType === 20301 ? <Trial portrait="enterprise" option={{ e: 'trial' }} /> : null}
					{sourceType === 20302 ? <Court portrait="enterprise" option={{ e: 'court' }} /> : null}
					{sourceType === 20303 ? <Judgment portrait="enterprise" option={{ e: 'judgment' }} /> : null}
				</div>
			</div>
		);
	}
}
