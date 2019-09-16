import React from 'react';
import { Icon } from 'antd';
import Button from '../button';
import Cookies from 'universal-cookie';
import { exportFile, normalGet } from '@/utils/api/home';

const cookies = new Cookies();
export default class Download extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingStatus: 'normal',
		};
	}

	handleDownload=() => {
		const { str, condition } = this.props;
		// const token = cookies.get('token');
		normalGet(str, condition).then((res) => {
			// const { code, data } = res;
			// console.log(`${exportFile(data)}?token=${token}`);
			// // window.open(, '_self');
			console.log(res);
		});
	};

	render() {
		const { loadingStatus } = this.state;
		return (
			<Button disabled={loadingStatus === 'loading'} onClick={this.handleDownload}>
				{
					loadingStatus === 'loading' ? <Icon type="loading" /> : <span className="yc-export-img" />
				}
				<span style={{ marginLeft: 5 }}>一键导出</span>
			</Button>
		);
	}
}
