const Router = (props) => {
	// console.log('props:', props);
	const { children } = props;
	// const pathChildStatus = /\/\*$/.test(path);
	// const pathBase = path.replace(/\/\*$/, '');
	const { hash } = window.location;
	// console.log('window.location.hash:', hash);
	let childrenDOM = '';
	if (children) {
		const child = Array.isArray(children) ? children : [children];
		let childList = [];
		child.forEach((item) => {
			if (item.props.child) {
				const _r = item.type(item.props);
				if (_r.props.children) {
					if (Array.isArray(_r.props.children)) childList = childList.concat(_r.props.children);
					else childList.push(_r.props.children);
				}
			} else {
				childList.push(item);
			}
		});
		// console.log(childList);

		childList.forEach((item) => {
			// console.log(item.type(item.props));
			const _path = item.props.path;
			const itemStatus = /^\/\*$/.test(_path);
			const itemBase = _path.replace(/\/\*$/, '').replace(/^\//, '');
			// if(new RegExp(itemBase).test(hash))
			// console.log(new RegExp(itemBase).test(hash), itemBase, hash);
			if ((itemStatus && itemBase === '') || new RegExp(itemBase).test(hash)) {
				// console.log(item)
				childrenDOM = item;
			}
		});
	}
	return childrenDOM;
};
export default Router;
