import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'react-tracked';
import reducer from './reducers';
import checkAuthMiddleware from './middleware';

const initialState = {
  profile: {},
  conversations: [],
  currentConversation: null,
  messages: {},
  convUsers: [],
  // Get user's device theme mode (light/dark)
  darkTheme:
    localStorage.darkTheme === 'true'
    || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches),
  isAuthenticated: Boolean(
    sessionStorage.accessToken
    || localStorage.refreshTokenValidityTimestamp > Date.now(),
  ),
  error: null,
};

const useValue = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchWithCallback = (cycle) => (dispatcher) => {
    if (typeof dispatcher === 'function') dispatcher(dispatchWithCallback(false));
    else if (!cycle) {
      checkAuthMiddleware(state, dispatchWithCallback(true), dispatcher);
      // eslint-disable-next-line no-console
      console.log(state);
    } else dispatch(dispatcher);
  };
  return [state, dispatchWithCallback(false)];
};

const {
  Provider,
  useTracked,
  useSelector,
  useTrackedState,
  useUpdate: useDispatch,
} = createContainer(useValue);

const StateProvider = ({ children }) => <Provider>{children}</Provider>;
StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useTracked, useDispatch, useSelector, useTrackedState };

export default StateProvider;
