import actions from '../constants/actions';
import appConfig from '../config';
import initialState from '../constants/initialState';

const config = (state = initialState.config, { payload, type }) => {
  switch(type) {
    case actions.APP_INITIALIZED_SUCCESS: {
      return Object.assign({}, state, appConfig, payload);
    }
    default:
      return state;
  }
};

export default config;
