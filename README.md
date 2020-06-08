# 卡片 your-card-name

在小程序里的使用方式

```vue
<template>
  <xmcard-render name="your-card-name" :data="data" />
</template>

<script>
export default {
  created () {
    xm.sourceCheck({ ids: ['your-card-name'] })
  }
}
</script>
```

本地开发

```
npm run serve
```

打包卡片

```
npm run build
```
