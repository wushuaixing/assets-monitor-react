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
		return startValue.getTime() >= new Date(endValue).getTime();
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
