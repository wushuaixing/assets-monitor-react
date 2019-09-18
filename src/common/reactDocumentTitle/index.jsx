import React from 'react';
import PropTypes from 'reactPropTypes';

export default class ReactDocumentTitle extends React.Component {
	componentDidMount() {
		this.setTitle();
	}

	componentDidUpdate() {
		this.setTitle();
	}

	setTitle() {
		const { title } = this.props;
		document.title = title;
	}

	render() {
		const { children } = this.props;
		return React.Children.only(children);
	}
}
ReactDocumentTitle.propTypes = {
	title: PropTypes.string.isRequired,
};
