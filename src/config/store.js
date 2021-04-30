import { useReducer } from "react";
import { createContainer } from "react-tracked";
import produce from "immer";
import userApi from "../api/userApi";

const TOGGLE_DARK_THEME = "TOGGLE_DARK_THEME";
const GET_TOKEN_FAILURE = "GET_TOKEN_FAILURE";
const GET_TOKEN_SUCCESS = "GET_TOKEN_SUCCESS";

const initialState = {
  profile: {},
  conversations: {},
  // Get user's device theme mode (light/dark)
  darkTheme:
    localStorage.darkTheme === "true" ||
    (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches),
  isAuthenticated: false,

  error: null,
};

const reducer = (state, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case TOGGLE_DARK_THEME:
        draft.darkTheme = !draft.darkTheme;
        localStorage.darkTheme = draft.darkTheme;
        break;
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
  });
};

const toggleDarkTheme = {
  type: TOGGLE_DARK_THEME,
};

const getToken = (username, password) => {
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

const getTokenSuccess = (access, refresh) => {
  sessionStorage.access_token = access;
  sessionStorage.refresh_token = refresh;
  return { type: GET_TOKEN_SUCCESS };
};

const getTokenFailure = (error) => {
  return { type: GET_TOKEN_FAILURE, error };
};

const useValue = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchWithCallback = (dispatcher) => {
    if (typeof dispatcher === "function") dispatcher(dispatchWithCallback);
    else dispatch(dispatcher);
  };
  return [state, dispatchWithCallback];
};

const {
  Provider,
  useTracked,
  useSelector,
  useTrackedState,
  useUpdate: useDispatch,
} = createContainer(useValue);

const StateProvider = ({ children }) => <Provider>{children}</Provider>;

export {
  useTracked,
  useDispatch,
  useSelector,
  useTrackedState,
  toggleDarkTheme,
  getToken,
};

export default StateProvider;
