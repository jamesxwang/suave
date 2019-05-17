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
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://115.146.85.81:8080',
        ws: true,
        changeOrigin: true
      }
    }
  },
}
