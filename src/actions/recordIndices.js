import actions from '../constants/actions';

const {
  RECORD_INDICES_SUCCESS,
} = actions;

export default function recordIndices(dragIndex, hoverIndex) {
  return (dispatch, getState) => {
    return Promise.resolve(dispatch({
      type: RECORD_INDICES_SUCCESS,
      payload: {
        dragIndex,
        hoverIndex,
      },
    }));
  }
};
