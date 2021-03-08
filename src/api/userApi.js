import { httpClient } from './httpClient';

import { USER_API_URL } from './constants';

const getMyProfile = async () => httpClient.get(`${USER_API_URL}me/`);

const userApi = { getMyProfile };

export default userApi;
