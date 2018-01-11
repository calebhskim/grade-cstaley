import actions from '../constants/actions';

const {
  MOVE_SOUND_SUCCESS,
} = actions;

export default function moveSound(dragIndex, hoverIndex) {
  return (dispatch, getState) => {
    return Promise.resolve(dispatch({
      type: MOVE_SOUND_SUCCESS,
      payload: {
        dragIndex,
        hoverIndex,
      },
    }));
  }
};
