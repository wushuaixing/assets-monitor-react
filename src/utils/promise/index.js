import service from '@/utils/service';

export const requestAll = (arrayApi) => {
	async function toRequest(array) {
		let result = [];
		result = await service.all(
			array.map(promise => promise.api
				.then(res => res)
				.catch(() => ({
					code: 500,
					data: 0,
					message: '请求未成功，暂不做处理',
					...promise.info,
				}))),
		);
		return result;
	}
	return toRequest(arrayApi);
};
