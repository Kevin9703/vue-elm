const configure = {
  state: {
    islogin: '', // 登陆状态
    address: '', // 定位信息
    currentCity: '', // 当前所在城市
  },
  getters: {
    loginIn: (state) => state.islogin,
    City: (state) => state.currentCity,
  },
  mutations: {
    login: (state, n) => {
      // 传入登录状态islogin
      const islogin = JSON.parse(n);
      // 将登陆状态保存到loacl storage中
      localStorage.setItem('islogin', JSON.stringify(islogin));
      state.islogin = islogin;
    },
    addressInfo: (state, address) => {
      state.address = address;
      window.localStorage.setItem('address', JSON.stringify(address));
    },
    currentCity: (state, City) => {
      state.currentCity = City;
      // console.log('>>>>>>>', state.currentCity);
    },
  },
  actions: {
  },
  modules: {
  },
};

export default configure;
