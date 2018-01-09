import actions from '../constants/actions';

const {
  REMOVE_SOUND_SUCCESS,
} = actions;

export default function removeSound(index) {
  return (dispatch, getState) => {
    return Promise.resolve(dispatch({
      type: REMOVE_SOUND_SUCCESS,
      payload: index,
    }));
  }
};
