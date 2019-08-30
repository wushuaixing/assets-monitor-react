import Tabs from './tabs';
import Simple from './tabs/simple';
import Badge from './badge';
import Button from './button';
import Input from './input';
import Spin from './spin';

Tabs.Simple = Simple;

const timeRule = {
	disabledStartDate: (startValue, endValue) => {
		if (!startValue || !endValue) {
			return false;
		}
		const _endValue = new Date(endValue);
		_endValue.setHours(23, 59, 59, 0);
		return startValue.getTime() >= _endValue.getTime();
	},
	disabledEndDate: (endValue, startValue) => {
		if (!startValue || !endValue) {
			return false;
		}
		return endValue.getTime() <= new Date(startValue).getTime();
	},
};

export {
	Tabs, Badge, Button, Input, Spin, timeRule,
};
