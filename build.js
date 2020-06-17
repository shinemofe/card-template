const fs = require('fs-extra')
const path = require('path')
const spawn = require('cross-spawn')

const dir = path.resolve(__dirname, 'dist')
const zip = path.resolve(__dirname, 'zip')
const collection = path.resolve(__dirname, 'src', 'card-collection')

build().then(() => {
  console.log('✅ 处理完成.')
})

async function build () {
  fs.ensureDirSync(zip)
  let collect = []
  const onePkg = process.argv[2]
  if (onePkg) {
    // 校验 onePkg 是否存在
    if (fs.pathExistsSync(path.resolve(collection, onePkg))) {
      collect = [onePkg]
    } else {
      console.log(`🙋‍️卡片 ${onePkg} 不存在，请检查`)
      process.exit(0)
    }
  } else {
    collect = fs.readdirSync(collection)
  }
  for (const cardName of collect) {
    console.log('📦 打包', cardName, '...')
    await mySpawn(
      './node_modules/.bin/vue-cli-service',
      ['build', '--target', 'lib', '--name', cardName, path.resolve(collection, cardName, 'index.js')]
    )
    // 改为 index.css / index.js
    for (const d of fs.readdirSync(dir)) {
      if (/(\.css|\.umd\.min\.js)$/.test(d)) {
        fs.outputFileSync(path.resolve(dir, /\.css$/.test(d) ? 'index.css' : 'index.js'), fs.readFileSync(path.resolve(dir, d), 'utf8'), 'utf8')
      }
      await mySpawn('rm', ['-f', path.resolve(dir, d)], {
        cwd: dir
      })
    }
    // 打包到 zip
    await mySpawn('zip', ['-qr', `${cardName}.zip`, './'], { cwd: dir })
    await fs.move(path.join(dir, `${cardName}.zip`), path.join(zip, `${cardName}.zip`), { overwrite: true })
  }
}

function mySpawn (cmd, args, options = {}) {
  return new Promise((resolve, reject) => {
    const handle = spawn(cmd, args, options)
    handle.stdout.setEncoding('utf8')
    handle.stdout.on('data', (data) => {
      // console.log(`${cmd} stdout: \n${data}`)
      if (/working tree clean/.test(data)) {
        reject(data)
      }
    })
    // handle.stderr.setEncoding('utf8')
    // handle.stderr.on('data', (data) => {
    //   console.error(`${cmd} stderr: \n${data}`)
    //   reject(new Error(data))
    // })
    handle.on('close', (code) => {
      if (code === 0) {
        resolve()
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(new Error(`${cmd} spawn fail !`))
      }
    })
  })
}
