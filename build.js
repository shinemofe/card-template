const fs = require('fs-extra')
const path = require('path')
const spawn = require('cross-spawn')
const JSZip = require('jszip')

const dir = path.resolve(__dirname, 'dist')
const zip = path.resolve(__dirname, 'zip')
const distTmp = path.resolve(__dirname, 'dist-tmp')
const collection = path.resolve(__dirname, 'src', 'card-collection')
const isMac = process.platform === 'darwin'

build().then(async () => {
  // 删除 dist-tmp 及 dist
  await rmDir(dir)
  await rmDir(distTmp)
  console.log('✅ 处理完成.')
})

function doZip (cardName) {
  return new Promise(async (resolve) => {
    if (isMac) {
      console.log('🔧 使用 zip 压缩...')
      await mySpawn('zip', ['-qr', `${cardName}.zip`, './'], { cwd: distTmp })
      console.log('🔧 zip 压缩完成，处理收尾...')
      resolve()
    } else {
      console.log('🔧 使用 jszip 压缩...')
      const winZip = new JSZip()
      for (const f of fs.readdirSync(distTmp)) {
        winZip.file(f, fs.readFileSync(path.resolve(distTmp, f)))
      }
      winZip
        .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
        .pipe(fs.createWriteStream(path.resolve(distTmp, `${cardName}.zip`)))
        .on('finish', function () {
          console.log('🔧 jszip 压缩完成，处理收尾...')
          resolve()
        })
    }
  })
}

async function build () {
  fs.ensureDirSync(zip)
  fs.ensureDirSync(distTmp)
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
    // 输出 index.css / index.js 到 dist-tmp 目录
    for (const d of fs.readdirSync(dir)) {
      if (/(\.css|\.umd\.min\.js)$/.test(d)) {
        fs.outputFileSync(path.resolve(distTmp, /\.css$/.test(d) ? 'index.css' : 'index.js'), fs.readFileSync(path.resolve(dir, d), 'utf8'), 'utf8')
      }
    }
    await doZip(cardName)
    // 打包到 zip
    // await mySpawn('zip', ['-qr', `${cardName}.zip`, './'], { cwd: distTmp })
    await fs.move(path.join(distTmp, `${cardName}.zip`), path.join(zip, `${cardName}.zip`), { overwrite: true })
  }
}

async function rmDir (dir) {
  await mySpawn('rm', ['-rf', dir], {
    cwd: process.cwd()
  }).catch(err => {
    console.log(`删除 ${dir} 目录失败！`, err)
  })
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
