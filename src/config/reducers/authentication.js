import conversationsApi from '../../api/conversationsApi';
import userApi from '../../api/userApi';

export const JUST_LOGGED_IN = 'JUST_LOGGED_IN';
export const GET_TOKEN_FAILURE = 'GET_TOKEN_FAILURE';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const CLEAR_ERROR = 'CLEAR_ERROR';
export const SET_ERROR = 'SET_ERROR';

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
    case REGISTER_USER_SUCCESS:
      draft.profile = action.profile.user;
      draft.error = null;
      break;
    case REGISTER_USER_FAILURE:
      draft.error = action.error;
      break;
    case CLEAR_ERROR:
      draft.error = null;
      break;
    case SET_ERROR:
      draft.error = action.error;
      break;

    case LOGOUT:
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('refreshTokenValidityTimestamp');
      localStorage.removeItem('accessTokenValidityTimestamp');
      localStorage.removeItem('rememberLogin');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      draft.profile = {};
      draft.conversations = [];
      draft.isAuthenticated = false;
      break;
    case GET_USER_SUCCESS:
      draft.profile = action.user;
      break;
    case GET_USER_FAILURE:
      draft.error = action.error;
      break;
    default:
      break;
  }
};

export const getCurrUserSuccess = (user) => {
  return { type: GET_USER_SUCCESS, user };
};

export const getCurrUserFailure = (error) => {
  return { type: GET_USER_FAILURE, error };
};

export const getCurrentUser = () => {
  return async (dispatch) => {
    try {
      const { data: user } = await conversationsApi.getCurrentUser();
      dispatch(getCurrUserSuccess(user));
    } catch (error) {
      dispatch(getCurrUserFailure(error.response));
    }
  };
};

const getTokenSuccess = (access, refresh, keepConnected) => {
  sessionStorage.accessToken = access;
  sessionStorage.refreshToken = refresh;
  localStorage.removeItem('rememberLogin');
  if (keepConnected) {
    localStorage.rememberLogin = true;
    localStorage.accessToken = access;
    localStorage.refreshToken = refresh;
    // refresh token validity
    localStorage.refreshTokenValidityTimestamp = Date.now() + 60000 * 60 * 24 * 7 - 60000;
    // access token validity
    localStorage.accessTokenValidityTimestamp = Date.now() + 60000 * 59;
  }
  return { type: GET_TOKEN_SUCCESS };
};

const getTokenFailure = (error) => {
  if (error.status === 401) {
    return { type: GET_TOKEN_FAILURE, error: 'Invalid Credentials' };
  }

  return { type: GET_TOKEN_FAILURE, error: 'Unknown Error' };
};

export const getToken = (username, password, keepConnected) => {
  return async (dispatch) => {
    try {
      const { data: tokens } = await userApi.getUserToken(username, password);
      const { access, refresh } = tokens;
      dispatch(getTokenSuccess(access, refresh, keepConnected));
    } catch (error) {
      dispatch(getTokenFailure(error.response));
    }
  };
};

const refreshTokenSuccess = (access, refresh) => {
  sessionStorage.accessToken = access;
  sessionStorage.refreshToken = refresh;
  if (localStorage.rememberLogin) {
    localStorage.accessToken = access;
    localStorage.refreshToken = refresh;
    localStorage.refreTshokenValidityTimestamp = Date.now() + 60000 * 60 * 24 * 7 - 60000;
    localStorage.accessTokenValidityTimestamp = Date.now() + 60000 * 59;
  }
  return { type: REFRESH_TOKEN_SUCCESS };
};

const refreshTokenFailure = (error) => {
  return { type: REFRESH_TOKEN_FAILURE, error };
};

export const refreshToken = () => {
  return async (dispatch) => {
    try {
      const { data: tokens } = await userApi.refreshUserToken(sessionStorage.refreshToken);
      const { access, refresh } = tokens;
      dispatch(refreshTokenSuccess(access, refresh));
    } catch (error) {
      dispatch(refreshTokenFailure(error.response));
    }
  };
};

export const clearError = {
  type: CLEAR_ERROR,
};

export const setError = (error) => {
  return { type: SET_ERROR, error };
};

const registerUserSuccess = (profile) => {
  return { type: REGISTER_USER_SUCCESS, profile };
};

const registerUserFailure = (error) => {
  if (error.status === 400) {
    let errorMessage = '';
    Object.keys(error.data).forEach((key) => {
      errorMessage += `${error.data[key][0]}\n`;
    });
    return { type: GET_TOKEN_FAILURE, error: errorMessage };
  }

  return { type: GET_TOKEN_FAILURE, error: 'Unknown Error' };
};

export const registerUser = (
  username,
  password,
  pgpPublic,
  pgpPrivate,
  twoFactorAuth,
  keepConnected,
) => {
  return async (dispatch) => {
    try {
      const { data: profile } = await userApi.registerUser(
        username,
        password,
        pgpPublic,
        pgpPrivate,
        twoFactorAuth,
      );
      dispatch(registerUserSuccess(profile));
      dispatch(getToken(username, password, keepConnected));
    } catch (error) {
      dispatch(registerUserFailure(error.response));
    }
  };
};

export const logout = {
  type: LOGOUT,
};

export default authenticationReducer;
