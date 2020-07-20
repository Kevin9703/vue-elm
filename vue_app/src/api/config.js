import axios from 'axios';
import qs from 'qs';

// axios.defaults.baseURL = 'api/';

axios.defaults.timeout = 10000;

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = (data) => qs.stringify(data);

// 请求拦截
axios.interceptors.request.use((config) => {
  const Obj = config;
  const token = localStorage.getItem('session_id');
  if (token) {
    Obj.headers.Authorization = token;
  }
  return Obj;
}, (error) => Promise.reject(error));

// 响应拦截
axios.interceptors.response.use((response) => response, (error) => {
  const { response } = error;
  if (response) {
    console.log(response);
    switch (response.status) {
      default:
        console.log('error');
        break;
      case 401:
        console.log('401');
        break;
      case 403:
        console.log('403');
        break;
    }
  } else {
    if (!window.navigator.onLine) {
      console.log('断网');
      return;
    // eslint-disable-next-line consistent-return
    } return Promise.reject(error);
  }
});

export default axios;
