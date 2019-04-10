module.exports = {
  lintOnSave: false,
  configureWebpack: {
    
  },
  chainWebpack: config => {

  },
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: { 
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 9018,
    proxy: {
      '/api': {
        target: 'http://g.ginakwok.com',
        ws: true,
        changeOrigin: true
      }
    }
  },
}
