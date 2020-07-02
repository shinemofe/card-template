# 卡片集合工程

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

- 批量打包

```
xmmp build
```

> tips: 如果项目不需要 eslint，编辑 vue.config.js，打开注释即可

```js
// chainWebpack: config => config.module.rules.delete('eslint')
```
