const ENDPOINT = `${process.env.API_ENDPOINT || 'http://localhost:8000'}`;

export const CONVERSATIONS_API_URL = `${ENDPOINT}/conversations/`;

export const USER_API_URL = `${ENDPOINT}/user/`;

export const GET_TOKEN_URL = `${ENDPOINT}/user/token/`;

export const REFRESH_TOKEN_URL = `${ENDPOINT}/user/token/refresh/`;
