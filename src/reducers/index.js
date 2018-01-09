import { combineReducers } from 'redux';

import config from './config';
import droppedSounds from './droppedSounds';
import sounds from './sounds';

// Map of reducers to pass to store
const reducers = {
  config,
  droppedSounds,
  sounds,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
