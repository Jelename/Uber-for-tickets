import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers/index';
import ReduxThunk from 'redux-thunk'

const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;

const enhancer = compose(
  applyMiddleware(ReduxThunk),
  devTools
);

const store = createStore(reducer, enhancer);

export default store;