import actions from '../constants/actions';

const {
  DROPPED_SOUND_SUCCESS,
} = actions;

export default function dropSound(sound) {
  return (dispatch, getState) => {
    return Promise.resolve(dispatch({
      type: DROPPED_SOUND_SUCCESS,
      payload: sound
    }));
  }
};
