import httpClient from './httpClient';

import { CONVERSATIONS_API_URL, USER_API_URL } from './constants';

const getConversations = () => httpClient.get(CONVERSATIONS_API_URL);
const getOneConversation = (id) => httpClient.get(`${CONVERSATIONS_API_URL}${id}/`);
const getConversationMessages = (id) =>
  httpClient.get(`${CONVERSATIONS_API_URL}${id}/messages/`);

const getCurrentUser = () => httpClient.get(USER_API_URL);

const postConversationMessage = (conversationId, messageContent) =>
  httpClient.post(`${CONVERSATIONS_API_URL}${conversationId}/messages/`, { message: messageContent });

const postConversation = (conversationName, usersList) =>
  httpClient.post(`${CONVERSATIONS_API_URL}`, {
    name: conversationName,
    users: usersList,
  });

const deleteConversation = (conversationId) =>
  httpClient.delete(`${CONVERSATIONS_API_URL}${conversationId}/`);

const conversationsApi = {
  getConversations,
  getConversationMessages,
  postConversationMessage,
  deleteConversation,
  postConversation,
  getOneConversation,
  getCurrentUser,
};

export default conversationsApi;
