import httpClient from './httpClient';

import { USER_API_URL, GET_TOKEN_URL, REFRESH_TOKEN_URL } from './constants';

const getUserToken = (username, password) => {
  return httpClient.post(GET_TOKEN_URL, { username, password });
};

const refreshUserToken = () => {
  const refresh = sessionStorage.refreshToken;
  return httpClient.post(REFRESH_TOKEN_URL, { refresh });
};

const registerUser = (username, password, pgpPublic, pgpPrivate, twoFactorAuth) => {
  return httpClient.post(USER_API_URL, {
    username,
    password,
    pgp_public: pgpPublic,
    pgp_private: pgpPrivate,
    two_factor_auth: twoFactorAuth,
  });
};

const getUserInfo = () => httpClient.get(USER_API_URL);

const userApi = {
  registerUser,
  getUserToken,
  refreshUserToken,
  getUserInfo,
};

export default userApi;
