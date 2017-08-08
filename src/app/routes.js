import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Lists from './lists/Lists';

export const urls = {
  index: '/',
};

export const routes = (
  <Route path={urls.index} component={App}>
    <IndexRoute component={Lists} />
  </Route>
);
