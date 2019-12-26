import React from 'react';
import Loadable from 'react-loadable';

const loadableMethods = ele => (ele ? Loadable({
	loader: ele,
	loading: () => <div style={{ padding: 10 }}>loading</div>,
}) : '');

export default loadableMethods;
