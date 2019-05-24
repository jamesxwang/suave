module.exports = {
  lintOnSave: false,
  configureWebpack: {
    
  },
  // chainWebpack: config => {},
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: { 
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://47.74.66.156:8081',
        ws: true,
        changeOrigin: true
      }
    }
  },
}
