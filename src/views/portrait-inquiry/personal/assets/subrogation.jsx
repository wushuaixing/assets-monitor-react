import React from 'react';
import { Judgment } from '@/views/asset-excavate/subrogation/table-version';
import { toGetNumber } from '@/utils/promise';
import { Ellipsis } from '@/common';

export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sourceType: 1,
			count: toGetNumber(props.data, 10203),
		};
	}

	onSourceType=(val) => {
		const { sourceType } = this.state;
		if (sourceType !== val) {
			this.setState({ sourceType: val });
		}
	};

	render() {
		const { id, obligorName } = this.props;
		const { count } = this.state;

		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab" style={{ position: 'relative' }}>
					<div className="yc-tabs-simple-prefix">
						代位权
						<span className="yc-table-num">{count}</span>
					</div>
					<Ellipsis className="yc-tabs-simple-suffix" content="查看更多相关文书＞" url={`#/search/detail/writ?content=${obligorName}`} />
				</div>
				<div className="inquiry-public-table">
					<Judgment portrait="personal" />
				</div>
			</div>
		);
	}
}
