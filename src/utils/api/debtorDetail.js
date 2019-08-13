import service from '../service';
import { baseUrl } from './index';

export const businessInfos = async (data) => {
	const response = await service.post(`${baseUrl}/yc/user/businessInfos`, data);
	return response.data;
};
