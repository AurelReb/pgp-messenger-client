import { useReducer } from "react";
import { createContainer } from "react-tracked";
import produce from "immer";
import userApi from "../api/userApi";

const TOGGLE_DARK_THEME = "TOGGLE_DARK_THEME";
const GET_USER_PROFILE_SUCCESS = "GET_USER_PROFILE_SUCESS";
const GET_USER_PROFILE_FAILURE = "GET_USER_PROFILE_FAILURE";

const initialState = {
  profile: {},
  conversations: {},
  // Get user's device theme mode (light/dark)
  darkTheme:
    localStorage.darkTheme === "true" ||
    (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches),
};

const reducer = (state, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case TOGGLE_DARK_THEME:
        draft.darkTheme = !draft.darkTheme;
        localStorage.darkTheme = draft.darkTheme;
        break;
      case GET_USER_PROFILE_SUCCESS:
        draft.profile = action.profile;
        break;
      case GET_USER_PROFILE_FAILURE:
        draft.profile.error = action.error;
        break;

      default:
        break;
    }
  });
};

const getUserProfile = () => {
  return async (dispatch) => {
    try {
      const response = await userApi.getUserInfo();
      const { data: profile } = response;
      dispatch(getUserProfileSuccess(profile));
    } catch (error) {
      dispatch(getUserProfileFailure(error.error));
    }
  };
};

const getUserProfileSuccess = (profile) => {
  return { type: GET_USER_PROFILE_SUCCESS, profile };
};

const getUserProfileFailure = (error) => {
  return { type: GET_USER_PROFILE_FAILURE, error };
};

const toggleDarkTheme = {
  type: TOGGLE_DARK_THEME,
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
  getUserProfile,
};

export default StateProvider;
