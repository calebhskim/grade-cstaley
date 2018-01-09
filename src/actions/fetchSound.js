import actions from '../constants/actions';

const {
  FETCH_SOUND_SUCCESS,
} = actions;

export default function fetchSound(filename) {
  return (dispatch, getState) => {
    const {
      config: { urls },
      sounds
    } = getState();

    if (!sounds[filename]) {
      const newSound = {};
      newSound[filename] = new Audio(`${urls.sounds}/${filename}`);
      // newSound[filename].play();
      return Promise.resolve(
        dispatch({
          type: FETCH_SOUND_SUCCESS,
          payload: newSound,
        })
      );
    }
    // else {
    //   return Promise.resolve(sounds[filename].play());
    // }
    //
    return Promise.resolve();
  }
};
