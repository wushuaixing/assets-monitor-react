import React from 'react';
import ReactDOM from 'react-dom';
import 'anujs/lib/createClass';	// needed by antd 1.x
import { Provider } from 'react-redux';
import { message } from 'antd';
import store from './stores/app';
import App from './views/app';
import './assets/css';
import './utils/config';

message.config({ top: 300 });
const Version = 'v4.0.2';
if (process.env.NODE_ENV === 'production') {
	window.nowVersion = Version;
	global.console = {
		info: () => { },
		log: () => { },
		warn: () => { },
		debug: () => { },
		error: () => { },
	};
} else {
	console.info(`Version：${Version}-Beta`);
}


ReactDOM.render(
	<Provider store={store} className="Provider">
		<App />
	</Provider>,
	document.getElementById('app'),
);
