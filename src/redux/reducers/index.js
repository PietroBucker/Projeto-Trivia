import { combineReducers } from 'redux';
import player from './reducer';

// Esperando os reducers
const rootReducers = combineReducers({
  player,
});

export default rootReducers;
