import actions from '../constants/actions';
import initialState from '../constants/initialState';

// Keep track of the current drag index and hover index to prevent multiple calls
// to moveSound while hovering
const dragPairs = (state = initialState.dragPairs, { payload, response, type }) => {
  switch(type) {
    case actions.MOVE_SOUND_SUCCESS: {
      return state;
    }
    case actions.MOVE_SOUND_DROP_SUCCESS: {
      return state;
    }
    case actions.RECORD_INDICES_SUCCESS: {
      const { dragIndex, hoverIndex } = payload;
      const newPair = {
        lastDragIndex: dragIndex,
        lastHoverIndex: hoverIndex,
      };

      return Object.assign({}, state, newPair);
    }
    default:
      return state;
  }
};

export default dragPairs;
