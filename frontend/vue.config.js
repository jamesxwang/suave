module.exports = {
  lintOnSave: false,
  configureWebpack: {
    
  },
  // chainWebpack: config => {},
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? 'http://www.suavechat.com/' : '/',
  devServer: { 
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://www.suavechat.com:8081',
        ws: true,
        changeOrigin: true
      }
    }
  },
}
