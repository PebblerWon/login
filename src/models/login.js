import {
	routerRedux
} from 'dva/router';
import {
	fakeAccountLogin
} from '../services/api';

export default {
	namespace: 'login',
	state: {
		status: undefined,
		submitting: undefined,
	},
	effects: {
		* login({
			payload
		}, {
			call,
			put
		}) {
			yield put({
				type: 'changeSubmitting',
				payload: true,
			})

			//todo

			const response = yield call(fakeAccountLogin, payload);
			console.log(response);
			yield put({
				type: 'changeLoginStatus',
				payload: response
			})

			if (response.status === true) {
				yield put(routerRedux.push('/index'));
				yield put({
					type:'example/fetch',
					payload:response
				})
			}
		},
		* logout({}, {
			call,
			put
		}) {

		}
	},
	reducers: {
		changeLoginStatus(state, {
			payload
		}) {
			return {
				...state,
				status: payload.status,
				type: payload.type,
				submitting: false,
			}
		},
		changeSubmitting(state, {
			payload
		}) {
			return {
				...state,
				submitting: payload,
			}
		}

	}
}