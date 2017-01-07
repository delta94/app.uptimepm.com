import React from 'react';
import ReactDOM from 'react-dom';
import NextApp from './NextApp';
import './index.css';

// Wrap the rendering in a function:
const render = (Component: React.ComponentType) => {
  ReactDOM.render(<Component />, document.getElementById('root'));
};

render(NextApp);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./NextApp', () => {
    render(NextApp);
  });
}
