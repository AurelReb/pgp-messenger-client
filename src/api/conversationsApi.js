import { httpClient } from "./httpClient";

import { CONVERSATIONS_API_URL } from "./constants";

const getConversations = () => httpClient.get(CONVERSATIONS_API_URL);
const getConversationMessages = (id) =>
  httpClient.get(`${CONVERSATIONS_API_URL}${id}/messages/`);

const conversationsApi = { getConversations, getConversationMessages };

export default conversationsApi;
