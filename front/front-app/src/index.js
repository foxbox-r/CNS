import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import {createStore,applyMiddleware} from "redux"
import rootReducer from "./modules"
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from "redux-saga"
import rootSaga from "./sagas"

const sagaMiddleware = createSagaMiddleware();
const logMiddleware = store=>next=>action=>{
  console.log("prev",action,store);
  next(action);
  console.log("next",action,store);
}

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(sagaMiddleware,logMiddleware)));

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store} >
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
