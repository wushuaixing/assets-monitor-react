import React from 'react';
import { Tooltip } from 'antd';
import { Tabs, Icon } from '@/common';
import { Court, Trial, Judgment } from '@/views/asset-excavate/subrogation/table-version';
import { toGetNumber, toGetDefaultId } from '@/utils/promise';


export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		const defaultID = toGetDefaultId(props.data);
		this.state = {
			sourceType: defaultID,
			config: [
				{
					id: 10201,
					name: '立案',
					number: toGetNumber(props.data, 10201),
					showNumber: true,
					disabled: !toGetNumber(props.data, 10201),
				},
				{
					id: 10202,
					name: '开庭',
					number: toGetNumber(props.data, 10202),
					showNumber: true,
					disabled: !toGetNumber(props.data, 10202),
				},
				{
					id: 10203,
					name: '裁判文书',
					number: toGetNumber(props.data, 10203),
					showNumber: true,
					disabled: !toGetNumber(props.data, 10203),
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
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<Tabs.Simple
					onChange={this.onSourceType}
					source={config}
					symbol="none"
					defaultCurrent={sourceType}
					prefix={(
						<div className="yc-tabs-simple-prefix" style={{ width: 100 }}>
							<span>代位权</span>
							<Tooltip placement="top" title="债务人作为原告起诉他人的案件">
								<span><Icon type="icon-question" style={{ fontSize: 14, marginLeft: 5 }} /></span>
							</Tooltip>
						</div>
					)}
				/>
				<div className="inquiry-public-table">
					{sourceType === 10201 ? <Trial portrait={portrait} /> : null}
					{sourceType === 10202 ? <Court portrait={portrait} /> : null}
					{sourceType === 10203 ? <Judgment portrait={portrait} /> : null}
				</div>
			</div>
		);
	}
}
