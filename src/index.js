import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import burgerReducer from './store/reducer/BurgerReducer';
import thunk from 'redux-thunk';
import orderReducer from './store/reducer/OrderReducer';
import authReducer from './store/reducer/authReducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



const rootReducer = combineReducers({
  burgerReducer: burgerReducer,
  orderReducer: orderReducer,
  authReducer: authReducer
});

const burgerStore = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));




ReactDOM.render(
  <Provider store={burgerStore}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


serviceWorker.unregister();
