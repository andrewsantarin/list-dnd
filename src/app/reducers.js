import { combineReducers } from 'redux';
import {
  routerReducer
} from 'react-router-redux';

import lists from './lists/reducer';

const reducer = combineReducers({
  routing: routerReducer,
  lists,
});

export default reducer;
