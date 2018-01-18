import actions from '../constants/actions';

const {
  MOVE_SOUND_DROP_SUCCESS,
} = actions;

export default function dropSoundSort() {
  return (dispatch, getState) => {
    const { dragPairs: { lastDragIndex, lastHoverIndex } } = getState();
    return Promise.resolve(dispatch({
      type: MOVE_SOUND_DROP_SUCCESS,
      payload: {
        dragIndex: lastDragIndex,
        hoverIndex: lastHoverIndex,
      }
    }));
  }
};
