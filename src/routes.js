import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import app from './modules/app/routes';

const routes = [
  ...app,
];

export default (
  <BrowserRouter>
    <Switch>
      {routes.map(({ path, exact, component }) => (
        <Route path={path} exact={exact} component={component}/>
      ))}
    </Switch>
  </BrowserRouter>
);
