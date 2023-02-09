import { combineReducers } from 'redux';
import playerReducer from './reducer';

// Esperando os reducers
const rootReducers = combineReducers({
  playerReducer,
});

export default rootReducers;
