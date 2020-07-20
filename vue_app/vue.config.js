module.exports = {
  devServer: {
    proxy: {
    // proxy all requests starting with /api to jsonplaceholder
      '/api': {
        target: 'http://127.0.0.1:3000/',
        // secure: false,// 如果是https接口，需要配置这个参数
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
