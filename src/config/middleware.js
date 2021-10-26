import history from './history';
import {
  LOGOUT,
  GET_TOKEN_SUCCESS,
  JUST_LOGGED_IN,
  REGISTER_USER_SUCCESS,
  REFRESH_TOKEN_SUCCESS,
  getCurrentUser,
  refreshToken,
  logout,
} from './reducers/authentication';
import { getConversations } from './reducers/conversations';

function stopAllIntervals() {
  const index = setInterval(() => null, 10000);
  for (let i = 0; i <= index; i += 1) {
    clearInterval(i);
  }
}
/*
function getLastEventTimestamp() {
  BotApi.getLastEventTimestamp()
    .then((response) => {
      if (response.data !== 'no event') {
        const { bots } = store.getState().bot;
        let last_timestamp = 0;
        for (let i = 0; i < bots.length; i++) {
          if (bots[i].events.length) {
            const last_event = bots[i].events.sort((a, b) =>
              (a.timestamp > b.timestamp ? -1 : 1))[0];
            if (last_event.timestamp > last_timestamp)
              last_timestamp = last_event.timestamp;
          }
        }
        if (response.data > last_timestamp) store.dispatch(getBots());
      }
    })
    .catch((err) => {
      store.dispatch(getBots());
    });
}
*/
function dispatchInitialGets(state, dispatch) {
  if (
    (!localStorage.accessTokenValidityTimestamp
      || localStorage.accessTokenValidityTimestamp > Date.now())
      && !state.profile.username
  ) {
    stopAllIntervals();
    dispatch(getCurrentUser());
    dispatch(getConversations());
  }
  if (localStorage.rememberLogin && localStorage.refreshTokenValidityTimestamp > Date.now()) {
    setInterval(() => dispatch(refreshToken()), localStorage.accessTokenValidityTimestamp);
  }
}

const checkAuthMiddleware = (state, next, action) => {
  switch (action.type) {
    case JUST_LOGGED_IN:
    case GET_TOKEN_SUCCESS:
    case REGISTER_USER_SUCCESS:
      history.replace('/');
      dispatchInitialGets(state, next);
      break;

      // case REFRESH_TOKEN_SUCCESS:
      // dispatchInitialGets();

    case LOGOUT:
      stopAllIntervals();
      history.push('/login');
      break;

    case REFRESH_TOKEN_SUCCESS:
      dispatchInitialGets(state, next);
      break;

    default:
      break;
  }
  if (
    action.error !== undefined
    && (action.error.status === 403 || action.error.status === 401)
  ) {
    next(logout);
  }
  // eslint-disable-next-line no-console
  console.log(action);
  next(action);
};

export default checkAuthMiddleware;
