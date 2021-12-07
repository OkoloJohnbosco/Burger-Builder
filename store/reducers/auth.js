import * as actiontypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actiontypes.AUTH_START:
      return updateObject(state, {error: null, loading: true});

    case actiontypes.AUTH_SUCCESS:
      return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
      });

    case actiontypes.AUTH_FAIL:
      return updateObject(state, {
        loading: false,
        error: action.error,
      });

    case actiontypes.AUTH_LOGOUT:
      return updateObject(state, {
        token: null,
        userId: null,
      });

    case actiontypes.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path,
      };
    default:
      return state;
  }
};

export default reducer;
