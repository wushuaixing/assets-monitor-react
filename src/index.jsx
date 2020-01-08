import React from 'react';
import ReactDOM from 'react-dom';
import 'anujs/lib/createClass';	// needed by antd 1.x
import { Provider } from 'react-redux';
import { message } from 'antd';
import store from './stores/app';
import App from './views/app';
import './assets/css';
import './utils/config';

const Version = 'v4.0.2';
window.CurrentVersions = Version;
if (window.location.protocol === 'http:') {
	const BetaNumber = '.1';
	console.info(`Version：${Version}${BetaNumber ? `-beta${BetaNumber}` : ''}`);
}

if (process.env.NODE_ENV === 'production') {
	global.console = {
		info: () => { },
		log: () => { },
		warn: () => { },
		debug: () => { },
		error: () => { },
	};
}

message.config({ top: 300 });

ReactDOM.render(
	<Provider store={store} className="Provider">
		<App />
	</Provider>,
	document.getElementById('app'),
);
