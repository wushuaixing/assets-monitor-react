import React from 'react';
import { Tabs } from '@/common';
import { Court, Trial, Judgment } from '@/views/asset-excavate/subrogation/table-version';

export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sourceType: 1,
			config: [
				{ id: 1, name: '立案', total: 4 },
				{ id: 2, name: '开庭', total: 3 },
				{ id: 3, name: '裁判文书', total: 9 }],
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
					prefix={<div className="yc-tabs-simple-prefix">代位权</div>}
				/>
				<div className="inquiry-public-table">
					{sourceType === 1 ? <Court /> : null}
					{sourceType === 2 ? <Trial /> : null}
					{sourceType === 3 ? <Judgment /> : null}
				</div>
			</div>
		);
	}
}
