import React from 'react';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';
import {AppContainer} from './containers/App';
import {Provider} from 'react-redux';
import rootReducer from './reducers';
import * as actions from './reducers';
import 'antd/dist/antd.css';  

const store = createStore(rootReducer);

let cache = localStorage.getItem('mobSettings');
if(cache) {
  store.dispatch(actions.updateStateAction({setting:JSON.parse(cache)}));
}

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);