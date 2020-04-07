<template>
  <div id="analysis">
    <div>
      <span class="label">统计期数</span>
      <el-input-number v-model="number" :max="maxNum" :min="1" :step="5"></el-input-number>
      <el-button @click="getDataList" type="primary">确认</el-button>
    </div>
    <div id="chart1"></div>
  </div>
</template>
<script>
import axios from "axios";
import { Bar } from "@antv/g2plot";
export default {
  name: 'Analysis',
  components: {
    
  },
  data() {
    return {
      number: 30,
      maxNum: 1000,
      dataList: []
      // dataList: require("@/cache/data.json").slice(0,30)
    }
  },
  mounted() {
    this.getDataList()
  },
  methods: {
    renderBar() {
      let data = [];
      const self = this;
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
      if(document.querySelector("canvas")) {
        const anaEle = document.getElementById("analysis")
        anaEle.removeChild(document.getElementById("chart1"));
        const ele = document.createElement("div")
        ele.setAttribute("id","chart1");
        anaEle.appendChild(ele)
      }
      const barPlot = new Bar("chart1", {
        title: {
          visible: true,
          text: `近${self.number}期蓝球`
        },
        data,
        xField: 'count',
        yField: 'code',
        colorField: 'code'
      })
      barPlot.render()
    },
    getDataList() {
      const url = '/clienth5.do';
      axios({
        method: 'get',
        url,
        params: {
          lottery: "FC_SSQ",
          pageSize: this.number,
          pageNo: 1,
          transactionType: 300301,
          src: "0000100001%7C6000003060"
        }   
      }).then(res => {
        if(res.data) {
          const result = {...res.data}
          this.dataList = result.dataList
          this.maxNum = result.pageSize * result.totalPage
          this.renderBar()
        } 
      })
      .catch( (error) => {
        console.log(error);
      });
    }
  }
}
</script>
<style lang="stylus" scoped>
#analysis
  .el-button
    margin-left 10px
  .label
    margin-right 10px
</style>

