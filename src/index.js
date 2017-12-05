import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const rootElement = document.getElementById('root');
ReactDOM.render(<App/>, rootElement);

// webpack 에게 어떤 파일을 어떤 상황에 교체할 수 있는지 알려준다.
// 단, 보통은 파일이 교체될 때 local state 가 유지되지 않는다.
// webpack.config.js 에 react-hot-loader 를 추가해야 한다.
if(module.hot) {
  module.hot.accept();
}
