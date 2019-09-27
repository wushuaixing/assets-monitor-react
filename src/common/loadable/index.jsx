import React from 'react';
import Loadable from 'react-loadable';

const loadableMethods = ele => (ele ? Loadable({
	loader: ele,
	loading: () => <div>loading</div>,
}) : '');

export default loadableMethods;
