import React from 'react';
//import  from 'dva/router';
import * as ttt from 'dva/router'
import dynamic from 'dva/dynamic';

console.log(ttt);
const { Switch, Route, Redirect, routerRedux } = ttt;
const {ConnectedRouter} = routerRedux;

import IndexPage from './routes/IndexPage';
import Login from './routes/Login';




function RouterConfig({history, app}) {

  return (
    <ConnectedRouter history={history}>
		<div>
			<Route path="/" component={Login}/>
        	<Route path="/index" component={IndexPage} />
        	<Route path="/login" component={Login} />
		</div>
      	
    </ConnectedRouter>
  );
}

export default RouterConfig;