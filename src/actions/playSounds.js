import actions from '../constants/actions';

const {
  PLAY_SOUNDS_SUCCESS,
} = actions;

export default function playSounds() {
  return (dispatch, getState) => {
    const {
      droppedSounds,
      sounds,
    } = getState();
    
    // Play all the sounds by chaining event listeners.
    // Remove all event listeners once all sounds have been played.
    const playAllSounds = () => {
      var i = 0;
      const increment = () => {
        if (i < droppedSounds.length) {
          sounds[droppedSounds[i].filename].addEventListener('ended', increment);
          sounds[droppedSounds[i].filename].play();
          i += 1;
        } else {
          droppedSounds.forEach((el, k) => {
            sounds[droppedSounds[k].filename].removeEventListener('ended', increment);
          });
        }
      };
      
      sounds[droppedSounds[i].filename].addEventListener('ended', increment);
      sounds[droppedSounds[i].filename].play();
      i += 1;
    }
    
    playAllSounds();

    return Promise.resolve(dispatch({
      type: PLAY_SOUNDS_SUCCESS,
    }));
  }
};
