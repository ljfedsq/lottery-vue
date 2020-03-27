module.exports = {
  publicPath:'./',
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
      "/schoolApi": {
        target: "http://s1.shanghaicity.openservice.kankanews.com",
        changeOrigin: true,
        pathRewrite: {
          "^/schoolApi": ""
        }
      }
    }
  }
}