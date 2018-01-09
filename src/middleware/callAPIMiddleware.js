export default function callAPIMiddleware({ dispatch, getState }) {
  return next => (action) => {
    const {
      types,
      callAPI,
      shouldCallAPI = () => true,
      payload = {},
    } = action;

    if (!types) {
      // Normal action: pass it on
      return next(action);
    }

    if (
      Object.keys(types).length !== 3 ||
      !types.request ||
      !types.failure ||
      !types.success ||
      !Object.keys(types).every(k => typeof types[k] === 'string')) {
      throw new Error('Expected an object with three keys (request, success, and failure) all with values of type string.');
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.');
    }

    if (!shouldCallAPI(getState())) {
      // Note(ckim): Be able to chain off middleware even if API not called
      return Promise.resolve();
    }

    const { request, success, failure } = types;

    dispatch(Object.assign({}, payload, {
      type: request,
    }));

    return callAPI(getState()).then(
      response => dispatch(Object.assign({}, payload, {
        response,
        type: success,
      })),
      error => dispatch(Object.assign({}, payload, {
        error,
        type: failure,
      })),
    );
  };
}
