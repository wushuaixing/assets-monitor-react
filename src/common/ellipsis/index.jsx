import React from 'react';
import { Tooltip } from 'antd';
import { toCutString, linkDom } from '@/utils';
import './style.scss';

/**
 * @author: async
 * @date: 2019-10-15
 * @version: v1.0
 * @Description: 多行省略号
 */
export default class Ellipsis extends React.Component {
	constructor(props) {
		super(props);
		this.state = { };
		this.maxWidth = props.width || 0;
	}

	componentDidMount() {
		const { width } = this.props;
		if (!width) {
			this.toGetMaxWidth(this.element);
			this.setState({});
		}
	}

	shouldComponentUpdate(nextProps) {
		if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
			if (!nextProps.width) this.toGetMaxWidth(this.element);
		}
		return true;
	}

	toGetMaxWidth=(e) => {
		const { width } = this.props;
		if (!width) {
			const ele = e || this.element;
			this.maxWidth = ele.parentElement.clientWidth;
		} else {
			this.maxWidth = width;
		}
		return this.maxWidth;
	};

	render() {
		const {
			tooltip, url, font, line, content, width, className,
		} = this.props;
		const _line = line || 1;
		const _width = width || this.maxWidth;
		const showContent = _width
			? toCutString(content, (_width * _line) / ((font || 12) / 2) - (3 * _line), '...') : '';
		const ContentText = url ? linkDom(url, showContent) : showContent;
		const _tooltip = showContent === content ? false : tooltip;
		const style = _width ? {
			width: _width,
			display: 'inline-block',
		} : '';

		return (
			<div ref={e => this.element = e} className={`yc-ellipsis-element${className ? ` ${className}` : ''}`} style={style}>
				{
					_tooltip
						? <Tooltip placement="top" title={content}>{url ? ContentText : <span>{ContentText}</span>}</Tooltip>
						: ContentText
				}
			</div>
		);
	}
}