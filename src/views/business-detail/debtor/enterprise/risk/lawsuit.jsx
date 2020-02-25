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
					id: 31001,
					name: '立案',
					number: toGetNumber(props.data, 31001),
					showNumber: true,
					disabled: !toGetNumber(props.data, 31001),
				},
				{
					id: 31002,
					name: '开庭',
					number: toGetNumber(props.data, 31002),
					showNumber: true,
					disabled: !toGetNumber(props.data, 31002),
				},
				{
					id: 31003,
					name: '裁判文书',
					number: toGetNumber(props.data, 31003),
					showNumber: true,
					disabled: !toGetNumber(props.data, 31003),
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
					defaultCurrent={sourceType}
					prefix={(
						<div className="yc-tabs-simple-prefix" style={{ width: 100 }}>
							<span>涉诉信息</span>
							<Tooltip placement="top" title="查询主体作为原告起诉他人的案件">
								<span><Icon type="icon-question" style={{ fontSize: 14, marginLeft: 5 }} /></span>
							</Tooltip>
						</div>
					)}
				/>
				<div className="inquiry-public-table">
					{sourceType === 31001 ? <Trial /> : null}
					{sourceType === 31002 ? <Court /> : null}
					{sourceType === 31003 ? <Judgment /> : null}
				</div>
			</div>
		);
	}
}
