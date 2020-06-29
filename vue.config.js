module.exports = {
  configureWebpack: {
    externals: process.env.NODE_ENV === 'development' ? { vue: 'Vue' } : {}
  },
  // 如果不需要 eslint，可以打开这行注释
  // chainWebpack: config => config.module.rules.delete('eslint')
}
