import React from 'react';
import { Tabs } from '@/common';
import { Court, Trial, Judgment } from '@/views/asset-excavate/subrogation/table-version';

export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sourceType: 10201,
			config: [
				{
					id: 10201, name: '立案', number: 4, showNumber: true,
				},
				{
					id: 10202, name: '开庭', number: 3, showNumber: true, disabled: true,
				},
				{
					id: 10203, name: '裁判文书', number: 9, showNumber: true,
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
		const { id } = this.props;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<Tabs.Simple
					onChange={this.onSourceType}
					source={config}
					symbol="none"
					prefix={<div className="yc-tabs-simple-prefix">代位权</div>}
				/>
				<div className="inquiry-public-table">
					{sourceType === 10201 ? <Trial /> : null}
					{sourceType === 10202 ? <Court /> : null}
					{sourceType === 10203 ? <Judgment /> : null}
				</div>
			</div>
		);
	}
}
