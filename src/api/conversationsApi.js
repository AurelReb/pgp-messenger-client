import httpClient from './httpClient';

import { CONVERSATIONS_API_URL } from './constants';

const getConversations = () => httpClient.get(CONVERSATIONS_API_URL);
const getConversationMessages = (id) =>
  httpClient.get(`${CONVERSATIONS_API_URL}${id}/messages/`);

const postConversationMessage = (conversationId, messageContent) =>
  httpClient.post(`${CONVERSATIONS_API_URL}${conversationId}/messages/`, { message: messageContent });

const deleteConversation = (conversationId) =>
  httpClient.delete(`${CONVERSATIONS_API_URL}${conversationId}/`);

const conversationsApi = {
  getConversations,
  getConversationMessages,
  postConversationMessage,
  deleteConversation };

export default conversationsApi;
