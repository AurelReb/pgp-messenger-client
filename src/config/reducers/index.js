import produce from 'immer';
import authenticationReducer from './authentication';
import conversationsReducer from './conversations';

const TOGGLE_DARK_THEME = 'TOGGLE_DARK_THEME';

const reducer = (state, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case TOGGLE_DARK_THEME:
        draft.darkTheme = !draft.darkTheme;
        localStorage.darkTheme = draft.darkTheme;
        break;
      default:
        conversationsReducer(draft, action);
        authenticationReducer(draft, action);
        break;
    }

    draft = conversationsReducer(draft, action);
  });
};

export const toggleDarkTheme = {
  type: TOGGLE_DARK_THEME,
};

export default reducer;
