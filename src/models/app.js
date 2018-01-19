import {
	routerRedux
} from 'dva/router';
import {query} from '../services/app'

export default{
	namespace:'app',
	state:{
		locationPathname:'',
		locationQuery:{},
	},
	subscriptions:{
		setupHistory ({ dispatch, history }) {
	      console.log("app subscriptions setupHistory");
	      history.listen((location) => {
	        dispatch({
	          type: 'updateState',
	          payload: {
	            locationPathname: location.pathname,
	            locationQuery: location.search,
	          },
	        })
	      })
	    },
		setup({dispatch}){
			console.log("app subscriptions setup");
			//验证用户是否已经登录
			dispatch({type:'query'});
			
		}
	},
	effects:{
		*query({
			payload
		},{call,put}){
			console.log('query');
			const isLogined = yield call(query,payload);
			console.log(isLogined);
			if(!isLogined){
				yield put(routerRedux.push('/login'));
			}
		}
	},
	reducers:{
		updateState (state, { payload }) {
		    return {
		    	...state,
		    	...payload,
		    }
	    },
	}
}