// 将打包好的库加入到模版中
const fs = require('fs-extra')
const path = require('path')

const dir = path.resolve(__dirname, 'dist')

// zip 包新增 index.css / index.js
fs.readdirSync(dir).forEach(d => {
  if (/(\.css|\.umd\.min\.js)$/.test(d)) {
    fs.outputFileSync(path.resolve(dir, /\.css$/.test(d) ? 'index.css' : 'index.js'), fs.readFileSync(path.resolve(dir, d), 'utf8'), 'utf8')
  }
})
