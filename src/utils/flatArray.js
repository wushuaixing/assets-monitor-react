function flat(arr) {
	return arr && [].concat(...arr.map(item => [].concat(item, ...flat(item.children))));
}
export default flat;
