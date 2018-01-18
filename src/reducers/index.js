import { combineReducers } from 'redux';

import config from './config';
import dragPairs from './dragPairs';
import droppedSounds from './droppedSounds';
import sounds from './sounds';

// Map of reducers to pass to store
const reducers = {
  config,
  dragPairs,
  droppedSounds,
  sounds,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
