/*eslint-disable*/
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from '~@/App';
import '~@s/iconfont/iconfont';
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
if(process.env.NODE_ENV) {
  reportWebVitals(console.log);
}
