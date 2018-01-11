import actions from '../constants/actions';
import initialState from '../constants/initialState';

const droppedSounds = (state = initialState.droppedSounds, { payload, response, type }) => {
  switch(type) {
    case actions.DROPPED_SOUND_SUCCESS: {
      const newSounds = [...state, payload];
      return Object.assign([], state, newSounds);
    }
    case actions.MOVE_SOUND_SUCCESS: {
      const { dragIndex, hoverIndex } = payload;
      const newSounds = [...state];

      // remove dragIndex and insert at hoverIndex
      const drag = newSounds[dragIndex];
      newSounds.splice(dragIndex, 1);
      newSounds.splice(hoverIndex, 0, drag);
      // newSounds[hoverIndex] = newSounds.splice(dragIndex, 1, newSounds[hoverIndex])[0];
      return Object.assign([], newSounds);
    }
    case actions.REMOVE_SOUND_SUCCESS: {
      const newSounds = [...state];
      newSounds.splice(payload, 1);
      return Object.assign([], newSounds);
    }
    default:
      return state;
  }
};

export default droppedSounds;
