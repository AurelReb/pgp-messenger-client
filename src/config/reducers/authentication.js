import userApi from '../../api/userApi';

export const GET_TOKEN_FAILURE = 'GET_TOKEN_FAILURE';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const LOGOUT = 'LOGOUT';

const authenticationReducer = (draft, action) => {
  switch (action.type) {
    case GET_TOKEN_SUCCESS:
      draft.isAuthenticated = true;
      draft.error = null;
      break;
    case GET_TOKEN_FAILURE:
      draft.isAuthenticated = false;
      draft.error = action.error;
      break;

    default:
      break;
  }
};

const getTokenSuccess = (access, refresh) => {
  sessionStorage.access_token = access;
  sessionStorage.refresh_token = refresh;
  return { type: GET_TOKEN_SUCCESS };
};

const getTokenFailure = (error) => {
  return { type: GET_TOKEN_FAILURE, error };
};

export const getToken = (username, password) => {
  return async (dispatch) => {
    try {
      const { data: tokens } = await userApi.getUserToken(username, password);
      const { access, refresh } = tokens;
      dispatch(getTokenSuccess(access, refresh));
    } catch (error) {
      dispatch(getTokenFailure(error.message));
    }
  };
};

export default authenticationReducer;
