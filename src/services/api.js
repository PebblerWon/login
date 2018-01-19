import request from '../utils/request';
import delay from '../utils/delay'

export async function fakeAccountLogin(params) {
	console.log(params);
	const data = await request('/api/login/account', {
		method: 'POST',
		body: params,
	});
	return data;
}