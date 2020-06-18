<template>
  <xmcard-panel
    label=""
    label-pre-bg=""
    :item="{
      id: '123',
      componentName: 'aaa-123'
    }"
  >
  </xmcard-panel>
</template>

<script>
export default {
  name: 'aaa-123',
  props: {
    data: Object
  }
}
</script>

<style lang="less">
.asas {
  color: red;
}
</style>
