const user = {
  state: {
    userId: '',
    username: '', // 登陆用户名
    avator: '',
  },
  getters: {
    userName: (state) => {
      let { username } = state;
      if (!username) {
        username = JSON.parse(window.localStorage.getItem('userName') || null);
      }
      return username;
    },
    userId: (state) => {
      let { userId } = state;
      if (!userId) {
        userId = JSON.parse(window.localStorage.getItem('userId') || null);
      }
      return userId;
    },
  },

  mutations: {
    setUserName: (state, username) => {
      state.username = username;
      window.localStorage.setItem('userName', JSON.stringify(username));
    },
    setUserId: (state, userId) => {
      state.userId = userId;
      window.localStorage.setItem('userId', JSON.stringify(userId));
    },
  },
  actions: {},
};

export default user;
