<template>
  <xmcard-panel
    label="讯盟小程序开发"
    label-pre-bg="rgba(49,181,144,1) linear-gradient(142deg,rgba(255,255,255,0.25) 0%,rgba(255,255,255,0) 100%)"
    :item="{
      id: 'appid',
      componentName: 'component-name-appid'
    }"
  >
    <div
      ref="chart"
      :style="{
        height: height + 'px'
      }"
    />
  </xmcard-panel>
</template>

<script>
const defaultOp = {
  title: {
    text: ''
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '邮件营销',
      type: 'line',
      stack: '总量',
      areaStyle: {},
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '联盟广告',
      type: 'line',
      stack: '总量',
      areaStyle: {},
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '视频广告',
      type: 'line',
      stack: '总量',
      areaStyle: {},
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: '直接访问',
      type: 'line',
      stack: '总量',
      areaStyle: {},
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: '搜索引擎',
      type: 'line',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
      areaStyle: {},
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
}

export default {
  name: 'component-name-appid',
  props: {
    height: {
      type: [String, Number],
      default: 230
    },
    config: {
      type: Object,
      default () {
        return defaultOp
      }
    }
  },
  data () {
    return {
      myChart: null
    }
  },
  mounted () {
    this.myChart = window.echarts.init(this.$refs.chart, null, { renderer: 'svg' })
    this.myChart.setOption(this.config, true)
    window.addEventListener('resize', function () {
      this.myChart.resize()
    })
  },
  watch: {
    config (val) {
      this.myChart && this.myChart.setOption(val, true)
    }
  },
  methods: {
  }
}
</script>

<style lang="less">
</style>
