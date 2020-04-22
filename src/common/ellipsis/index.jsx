import React from 'react';
import { Tooltip } from 'antd';
import { toCutString, linkDom, getByteLength } from '@/utils';
import './style.scss';

/**
 * @author: async
 * @date: 2019-12-27
 * @version: v1.1
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
			tooltip, url, font, line, content, width, className, onClick, customColor, auto,
		} = this.props;
		const _line = line || 1;
		const _width = width || this.maxWidth;
		const size = ((font || 12) / 2);
		const showContent = _width
			? toCutString(content, (_width * _line) / size - (3 * _line), '...') : '';
		const ContentText = url ? linkDom(url, showContent, '', '', '', (onClick || '')) : showContent;

		// tooltip 的状态
		const _tooltip = showContent === content ? false : tooltip;

		const contentSize = (getByteLength(showContent || content) + 3) * size;
		const __width = contentSize < _width ? (auto ? 'auto' : contentSize) : _width;
		const style = _width ? {
			color: customColor || undefined,
			width: __width,
			display: 'inline-block',
		} : '';

		return (
			<div ref={e => this.element = e} className={`yc-ellipsis-element${className ? ` ${className}` : ''}`} style={style}>
				{
					_tooltip
						? <Tooltip placement="top" title={content}>{url ? (ContentText || '-') : <span>{(ContentText || '-')}</span>}</Tooltip>
						: (ContentText || '-')
				}
			</div>
		);
	}
}
