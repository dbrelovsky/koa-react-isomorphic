import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { batchedUpdatesMiddleware } from 'redux-batched-updates';
import root from './../reducers/index';

let finalCreateStore;

if (process.env.NODE_ENV === 'development') {
  finalCreateStore = compose(
    applyMiddleware(
      require('redux-logger'),
      thunkMiddleware,
      batchedUpdatesMiddleware
    ),
    require('redux-devtools').devTools()
  )(createStore);
} else {
  finalCreateStore = compose(
    applyMiddleware(
      thunkMiddleware,
      batchedUpdatesMiddleware
    )
  )(createStore);
}

export default function configureStore(initialState = {}) {
  return finalCreateStore(root, initialState);
}
