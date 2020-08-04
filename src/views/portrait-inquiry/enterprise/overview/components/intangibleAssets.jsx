import React from 'react';
import { Spin } from '@/common';
import { getIntangible } from '@/utils/api/portrait-inquiry/enterprise/overview';
import ColumnarEcharts from '../../../common/columnarEcharts';
import getCount from '../../../common/getCount';

export default class IntangibleAssets extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			columnarData: [],
			columnarNum: null,
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const { companyId, getAssetProfile } = this.props;
		this.setState({ loading: true });
		const params = {
			companyId,
		};
		getIntangible(params).then((res) => {
			if (res.code === 200) {
				const columnarData = res.data.companyPortraitIntangibleInfos;
				const columnarNum = getCount(columnarData);
				this.setState({
					columnarNum,
					columnarData,
					loading: false,
				});
				getAssetProfile(columnarNum, 'IntangibleAsset');
			} else {
				this.setState({ loading: false });
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	render() {
		const { columnarData, loading, columnarNum } = this.state;
		return (
			<div>
				<Spin visible={loading}>
					{columnarData && columnarNum === 0 && (
					<div>
						{
								columnarNum > 0 && (
									<div>
										<div className="overview-container-title">
											<div className="overview-left-item" />
											<span className="container-title-num">
												{`${columnarNum} 条`}
											</span>
											<span className="container-title-name">无形资产信息</span>
										</div>
										<div className="overview-container-content">
											<ColumnarEcharts title="" Data={columnarData} id="IntangibleAssets" />
										</div>
									</div>
								)
							}
					</div>
					)
					}
				</Spin>
			</div>
		);
	}
}
