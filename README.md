# 卡片集合工程

![](https://img.shields.io/npm/v/xmmp-cli.svg)

请保持本地 xmmp-cli 为最新版本

- usage

```
npm run serve
```

- 添加一个卡片

```
xmmp card test-123
```

会在 `src/card-collection` 目录下新建卡片目录 `test-123`

- 预览卡片

修改 `src/main.js` 中的组件名称

```
// 当前预览的卡片组件名
const componentName = 'test-123'
```

- 打包单个卡片

```
xmmp build test-123
```

- 打包 N 个卡片，N = 字符匹配数量

```
# 匹配卡片名称包含 test- 的所有卡片
xmmp build test- -r
```

- 批量打包

```
xmmp build
```

> tips: 如果项目不需要 eslint，编辑 vue.config.js，打开注释即可

```js
// chainWebpack: config => config.module.rules.delete('eslint')
```
