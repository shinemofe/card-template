module.exports = {
  configureWebpack: {
    externals: process.env.NODE_ENV === 'development' ? { vue: 'Vue' } : {}
  }
}
