import dva from 'dva';
import createHistory from 'history/createBrowserHistory'
// 1. Initialize
const app = dva({
	history: createHistory(),
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));
//app.model(require('./models/app'));
app.model(require('./models/login'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');