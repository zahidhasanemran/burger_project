import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Axios from 'axios';


Axios.interceptors.request.use(request => {
    console.log(request);
    return request;
}, error => {
    console.log(error);
    Promise.reject(error)
})

Axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'



ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
