import actions from '../constants/actions';

const {
  PLAY_SOUND_SUCCESS,
} = actions;

export default function play(filename) {
  return (dispatch, getState) => {
    const {
      sounds
    } = getState();
    
    sounds[filename].play();

    return dispatch({
      type: PLAY_SOUND_SUCCESS,
    });

    // else {
    //   return Promise.resolve(sounds[filename].play());
    // }
    //
    // return Promise.resolve();
  }
};
