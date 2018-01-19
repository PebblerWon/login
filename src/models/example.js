
export default {

  namespace: 'example',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      console.log("test");
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      //yield put({ type: 'save' });
      console.log(payload);
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
