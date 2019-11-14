import service from '@/utils/service';

export const toGetNumber = (data, id) => {
	const item = data.filter(i => i.id === id)[0];
	return item.field ? item.data[item.field] : item.data;
};

export const toGetDefaultId = (data) => {
	const item = data.filter((i) => {
		const _data = i.field ? i.data[i.field] : i.data;
		return _data > 0;
	})[0];
	return item.id;
};

export const requestAll = (arrayApi) => {
	async function toRequest(array) {
		/* eslint-disable no-return-await */
		return await service.all(
			array.map(promise => promise.api
				.then(res => Object.assign(res, promise.info))
				.catch(() => ({
					code: 500,
					data: 0,
					message: '请求未成功，暂不做处理',
					...promise.info,
				}))),
		);
		/* eslint-enable */
	}
	return toRequest(arrayApi);
};
