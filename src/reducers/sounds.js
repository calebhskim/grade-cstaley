import actions from '../constants/actions';
import initialState from '../constants/initialState';

const sounds = (state = initialState.sounds, { payload, response, type }) => {
  switch(type) {
    case actions.FETCH_SOUND_SUCCESS: {
      return Object.assign({}, state, {
        ...payload,
      });
    }
    default:
      return state;
  }
};

export default sounds;
