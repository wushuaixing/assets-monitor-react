/**
 * Created by WHASTEVER on 2021/6/21.
 * Description: token
 */
class Token {
	constructor() {
		this.token = '';
	}

	get() {
		return this.token;
	}

	set(val) {
		this.token = val;
	}

	refresh() {
		this.token = '123123123123';
	}

	clear() {
		this.token = '';
	}
}

const token = new Token();
export default token;
