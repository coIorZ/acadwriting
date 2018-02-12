import reduceReducers from 'reduce-reducers';

import homeReducer from './modules/home/ducks/reducers';

export default reduceReducers(
  homeReducer,
);
