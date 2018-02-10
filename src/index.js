import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import routes from './routes';

import WithHeader from './components/with-header';

ReactDOM.render(
  <Provider store={store}>
    <WithHeader>
      {routes}
    </WithHeader>
  </Provider>,
  document.querySelector('#app'),
);
