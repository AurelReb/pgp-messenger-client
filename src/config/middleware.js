import history from './history';
import { GET_TOKEN_SUCCESS, LOGOUT } from './reducers/authentication';

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

function dispatchInitialGets(store) {
  if (
    (!localStorage.accessToken_validity_timestamp
        || localStorage.accessToken_validity_timestamp > Date.now())
        && !store.getState().assets.assets.length
  ) {
    stopAllIntervals();
    store.dispatch(getAssets());
    store.dispatch(recordAssets(Date.now() - 7200000));
  }
}
*/
const checkAuthMiddleware = (state, next, action) => {
  switch (action.type) {
    case GET_TOKEN_SUCCESS:
    // case REGISTER_SUCCESS:
      // dispatchInitialGets(store);
      history.replace('/');
      break;

      // case REFRESH_TOKEN_SUCCESS:
      // dispatchInitialGets();

    case LOGOUT:
      stopAllIntervals();
      history.push('/login');
      break;

    default:
      break;
  }
  /*
    if (
      action.response !== undefined
            && (action.response.status === 403 || action.response.status === 401)
    ) {
      if (!localStorage.refreshToken) store.dispatch(logout());
      else if (!store.getState().user.pending_refresh)
        store.dispatch(refreshToken());
    } */
  // eslint-disable-next-line no-console
  console.log(action);
  next(action);
};

export default checkAuthMiddleware;
