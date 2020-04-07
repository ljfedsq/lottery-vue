module.exports = {
  publicPath:'/',
  configureWebpack:{
      resolve: {
          alias: {
            'assets': '@/assets',
            'common': '@/common',
            'components': '@/components',
            'network': '@/network',
            'views': '@/views',
            'plugins': '@/plugins',
          }
        }
  },
  devServer: {
    proxy: {
      "/searchschool": {
        target: "http://s1.shanghaicity.openservice.kankanews.com",
        changeOrigin: true,
        // pathRewrite: {
        //   "^/searchschool": ""
        // }
      },
      "/clienth5.do": {
        target: "http://m.zhcw.com",
        changeOrigin: true,
        // pathRewrite: {
        //   "^/searchschool": ""
        // }
      }
    }
  }
}