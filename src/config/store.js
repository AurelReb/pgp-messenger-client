import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'react-tracked';
import reducer from './reducers';

const initialState = {
  profile: {},
  conversations: [],
  currentConversation: null,
  messages: {},
  // Get user's device theme mode (light/dark)
  darkTheme:
    localStorage.darkTheme === 'true'
    || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches),
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
StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useTracked, useDispatch, useSelector, useTrackedState };

export default StateProvider;
