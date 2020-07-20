import axios from './config';

export default {
  /**
       * @msg: 登录
       * @param {String} username
       * @param {String} password
       * @return: {Promise}
       */
  loginIn(username, password) {
    const params = new URLSearchParams();
    params.append('userName', username);
    params.append('password', password);
    return axios.post('/user/userLogin', params);
  },

  /**
       * @msg: 注册
       * @param {String} username
       * @param {String} password
       * @param {String} email
       * @return: {Promise}
       */
  signUp(username, password, email) {
    const params = new URLSearchParams();
    params.append('userName', username);
    params.append('password', password);
    params.append('email', email);
    return axios.post('/user/userRegister', params);
  },
};
