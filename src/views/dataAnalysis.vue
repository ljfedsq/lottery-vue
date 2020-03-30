<template>
  <div id="analysis">
    <div id="chart1"></div>
  </div>
</template>
<script>
import { Bar } from "@antv/g2plot";
export default {
  name: 'Analysis',
  components: {
    
  },
  data() {
    return {
      dataList: require("@/cache/data.json").slice(0,30)
    }
  },
  mounted() {
    this.renderBar()
  },
  methods: {
    renderBar() {
      let data = [];
      for(let i=0; i< 16; i++) {
        const obj = {}
        obj.code = i+1
        obj.count = 0
        data.push(obj)
      }
      this.dataList.forEach(item => {
        const blue = item.kjtnum
        data[blue-1].count++
      })
      const barPlot = new Bar("chart1", {
        title: {
          visible: true,
          text: '近30期蓝球'
        },
        data,
        xField: 'count',
        yField: 'code',
        colorField: 'code'
      })
      barPlot.render()
    }
  }
}
</script>
<style lang="stylus" scoped>
.home
  .el-input, input
    width 300px
</style>

