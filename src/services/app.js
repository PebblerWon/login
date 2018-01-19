import request from '../utils/request.js';
import config from '../utils/config.js';

const { api } = config
const { user, userLogout, userLogin } = api


//验证是否登录的请求
export async function query(params){
	let data = await request(
		user.replace('/:id', ''),
		{
			method: 'GET',
			body: params,
		}
	)
	return data;
}