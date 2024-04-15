import { combineReducers } from 'redux';
import dataReducer from './DataReducer';

const rootReducer = combineReducers({
  data: dataReducer, 
});

export default rootReducer;