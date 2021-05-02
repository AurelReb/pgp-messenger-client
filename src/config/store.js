import { useReducer } from "react";
import { createContainer } from "react-tracked";
import produce from "immer";
import conversationsApi from "../api/conversationsApi";

const TOGGLE_DARK_THEME = "TOGGLE_DARK_THEME";
const GET_CONVERSATIONS_SUCCESS = "GET_CONVERSATIONS_SUCCESS";
const GET_CONVERSATIONS_FAILURE = "GET_CONVERSATIONS_FAILURE";
const GET_CONVERSATION_MESSAGES_SUCCESS = "GET_CONVERSATION_MESSAGES_SUCCESS";
const GET_CONVERSATION_MESSAGES_FAILURE = "GET_CONVERSATION_MESSAGES_FAILURE";
const CHANGE_CURRENT_CONVERSATION = "CHANGE_CURRENT_CONVERSATION";

const initialState = {
  profile: {},
  conversations: [],
  currentConversation: null,
  messages: {},
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

      case GET_CONVERSATIONS_SUCCESS:
        draft.conversations = action.conversations;
        if(action.conversations.length)
          draft.currentConversation = action.conversations[0].id;
        break;

      case GET_CONVERSATIONS_FAILURE:
        //draft.conversations.error = action.error;
        break;

      case GET_CONVERSATION_MESSAGES_SUCCESS:
        draft.messages[action.conversationId] = action.messages;
        break;
      case GET_CONVERSATION_MESSAGES_FAILURE:
        //draft.conversations.error = action.error;
        break;
      case CHANGE_CURRENT_CONVERSATION:
        draft.currentConversation = action.newConvId;
        break;

      default:
        break;
    }
  });
};

const getConversations = () => {
  return async (dispatch) => {
    try {
      const { data: conversations } = await conversationsApi.getConversations();
      dispatch(getConversationsSuccess(conversations));
    } catch (error) {
      dispatch(getConversationsFailure(error));
    }
  };
};

const getConversationsSuccess = (conversations) => {
  return { type: GET_CONVERSATIONS_SUCCESS, conversations };
};

const getConversationsFailure = (error) => {
  return { type: GET_CONVERSATIONS_FAILURE, error };
};

const getConversationMessages = (id) => {
  return async (dispatch) => {
    try {
      const { data: messages } = await conversationsApi.getConversationMessages(
        id
      );
      dispatch(getConversationMessagesSuccess(messages, id));
    } catch (error) {
      dispatch(getConversationMessagesFailure(error));
    }
  };
};

const getConversationMessagesSuccess = (messages, conversationId) => {
  return { type: GET_CONVERSATION_MESSAGES_SUCCESS, messages, conversationId };
};

const getConversationMessagesFailure = (error) => {
  return { type: GET_CONVERSATION_MESSAGES_FAILURE, error };
};

const changeCurrentConversation = (newConvId) => {
  return { type: CHANGE_CURRENT_CONVERSATION, newConvId };
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
  getConversations,
  getConversationMessages,
  changeCurrentConversation,
};

export default StateProvider;
