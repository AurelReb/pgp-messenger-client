import conversationsApi from '../../api/conversationsApi';

const GET_CONVERSATIONS_SUCCESS = 'GET_CONVERSATIONS_SUCCESS';
const GET_CONVERSATIONS_FAILURE = 'GET_CONVERSATIONS_FAILURE';
const GET_CONVERSATION_MESSAGES_SUCCESS = 'GET_CONVERSATION_MESSAGES_SUCCESS';
const GET_CONVERSATION_MESSAGES_FAILURE = 'GET_CONVERSATION_MESSAGES_FAILURE';
const CHANGE_CURRENT_CONVERSATION = 'CHANGE_CURRENT_CONVERSATION';
const POST_CONVERSATION_MESSAGES_SUCCESS = 'POST_CONVERSATION_MESSAGES_SUCCESS';
const POST_CONVERSATION_MESSAGES_FAILURE = 'POST_CONVERSATION_MESSAGES_FAILURE';
const DELETE_CONVERSATION_SUCCESS = 'DELETE_CONVERSATION_SUCESS';
const DELETE_CONVERSATION_FAILURE = 'DELETE_CONVERSATION_FAILURE';

const conversationsReducer = (draft, action) => {
  let index;
  switch (action.type) {
    case GET_CONVERSATIONS_SUCCESS:
      draft.conversations = action.conversations;
      if (action.conversations.length)
        draft.currentConversation = action.conversations[0].id;
      break;

    case GET_CONVERSATIONS_FAILURE:
      // draft.conversations.error = action.error;
      break;

    case GET_CONVERSATION_MESSAGES_SUCCESS:
      draft.messages[action.conversationId] = action.messages;
      break;
    case GET_CONVERSATION_MESSAGES_FAILURE:
      // draft.conversations.error = action.error;
      break;
    case CHANGE_CURRENT_CONVERSATION:
      draft.currentConversation = action.newConvId;
      break;
    case POST_CONVERSATION_MESSAGES_SUCCESS:
      draft.messages[action.conversationId].push(action.message);
      break;
    case POST_CONVERSATION_MESSAGES_FAILURE:
      // handle error here
      break;
    case DELETE_CONVERSATION_SUCCESS:
      delete draft.messages[action.conversationId];
      index = draft.conversations.findIndex((x) => x.id === action.conversationId);
      draft.conversations.splice(index, 1);
      if (draft.conversations.length === 0) {
        draft.currentConversation = null;
      } else {
        draft.currentConversation = draft.conversations[0].id;
      }
      break;
    case DELETE_CONVERSATION_FAILURE:
      break;
    default:
      break;
  }
};

const getConversationsSuccess = (conversations) => {
  return { type: GET_CONVERSATIONS_SUCCESS, conversations };
};

const getConversationsFailure = (error) => {
  return { type: GET_CONVERSATIONS_FAILURE, error };
};

export const getConversations = () => async (dispatch) => {
  try {
    const { data: conversations } = await conversationsApi.getConversations();
    dispatch(getConversationsSuccess(conversations));
  } catch (error) {
    dispatch(getConversationsFailure(error.response));
  }
};

const getConversationMessagesSuccess = (messages, conversationId) => {
  return { type: GET_CONVERSATION_MESSAGES_SUCCESS, messages, conversationId };
};

const getConversationMessagesFailure = (error) => {
  return { type: GET_CONVERSATION_MESSAGES_FAILURE, error };
};

export const getConversationMessages = (id) => {
  return async (dispatch) => {
    try {
      const { data: messages } = await conversationsApi.getConversationMessages(
        id,
      );
      dispatch(getConversationMessagesSuccess(messages, id));
    } catch (error) {
      dispatch(getConversationMessagesFailure(error.response));
    }
  };
};

export const changeCurrentConversation = (newConvId) => {
  return { type: CHANGE_CURRENT_CONVERSATION, newConvId };
};

export const postConversationMessageSuccess = (conversationId, message) => {
  return { type: POST_CONVERSATION_MESSAGES_SUCCESS, conversationId, message };
};

export const postConversationMessageFailure = (error) => {
  return { type: POST_CONVERSATION_MESSAGES_FAILURE, error };
};

export const postConversationMessage = (conversationId, messageContent) => {
  return async (dispatch) => {
    try {
      const { data: message } = await conversationsApi.postConversationMessage(
        conversationId,
        messageContent,
      );
      dispatch(postConversationMessageSuccess(conversationId, message));
    } catch (error) {
      dispatch(postConversationMessageFailure(error.response));
    }
  };
};

export const deleteConversationSuccess = (conversationId) => {
  return { type: DELETE_CONVERSATION_SUCCESS, conversationId };
};

export const deleteConversationFailure = (error) => {
  return { type: DELETE_CONVERSATION_FAILURE, error };
};

export const deleteConversation = (conversationId) => {
  return async (dispatch) => {
    try {
      await conversationsApi.deleteConversation(
        conversationId,
      );
      dispatch(deleteConversationSuccess(conversationId));
    } catch (error) {
      dispatch(deleteConversationFailure(error.response));
    }
  };
};

export default conversationsReducer;
