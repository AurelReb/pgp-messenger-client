import { useReducer } from 'react';
import { createContainer } from 'react-tracked';
import produce from 'immer';

const TOGGLE_DARK_THEME = 'TOGGLE_DARK_THEME';

const initialState = {
  profile: {},
  conversations: {},
  // Get user's device theme mode (light/dark)
  darkTheme:
    localStorage.darkTheme === 'true' ||
    (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches),
};

const reducer = (state, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case TOGGLE_DARK_THEME:
        draft.darkTheme = !draft.darkTheme;
        localStorage.darkTheme = draft.darkTheme;
        break;

      default:
        break;
    }
  });
};

const toggleDarkTheme = {
  type: TOGGLE_DARK_THEME,
};

const useValue = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchWithCallback = (dispatcher) => {
    if (typeof dispatcher === 'function') dispatcher(dispatchWithCallback);
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
};

export default StateProvider;
