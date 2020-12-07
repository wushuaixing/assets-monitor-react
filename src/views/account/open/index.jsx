import React from 'react';
import Header from './header';
import SearchTree from './tree';
import OrgTable from './table';
import AddOrgModal from '../modal/AddOrgModal';
import './index.scss';

class Open extends React.Component {
	constructor(props) {
		super(props);
		document.title = '账号开通';
		this.state = {
			addOrgVisible: false,
		};
	}

	// 手动添加机构
	handleAddOrg = () => {
		// console.log('index handleAddOrg');
		this.setState({
			addOrgVisible: true,
		});
	};

	// 关闭添加机构弹窗
	handleCloseAddOrg = () => {
		this.setState({
			addOrgVisible: false,
		});
	};

	render() {
		const { addOrgVisible } = this.state;
		return (
			<React.Fragment>
				<Header />
				<div className="account-content">
					<SearchTree handleAddOrg={this.handleAddOrg} />
					<OrgTable handleAddOrg={this.handleAddOrg} />
				</div>
				{/* 添加机构弹窗 */}
				<AddOrgModal addOrgVisible={addOrgVisible} handleCloseAddOrg={this.handleCloseAddOrg} />
			</React.Fragment>
		);
	}
}

export default Open;
