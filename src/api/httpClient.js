import axios from 'axios';

const getAxiosInstance = () => {
  const token = sessionStorage.getItem('accessToken');
  if (token) {
    return axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return axios.create();
};

const post = (url = '', data = '', config = {}) =>
  getAxiosInstance().post(url, data, config);

const get = (url) => getAxiosInstance().get(url);

const put = (url = '', data = '', config = {}) =>
  getAxiosInstance().put(url, data, config);

const del = (url = '', config = {}) => getAxiosInstance().delete(url, config);

const httpClient = {
  post,
  get,
  put,
  delete: del,
};

export default httpClient;
