import actions from '../constants/actions';

const {
  FETCH_SOUND_SUCCESS,
} = actions;

export default function fetchSound(filename) {
  return (dispatch, getState) => {
    const {
      config: { urls }, // base url for sounds in s3 bucket
      sounds
    } = getState();

    if (!sounds[filename]) {
      const newSound = {};
      newSound[filename] = new Audio(`${urls.sounds}/${filename}`);
      return Promise.resolve(
        dispatch({
          type: FETCH_SOUND_SUCCESS,
          payload: newSound,
        })
      );
    }
    return Promise.resolve();
  }
};
