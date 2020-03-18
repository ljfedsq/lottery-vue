<template>
  <div id="home">
    <span>查询日期：</span><el-input v-model="search" size="mini" placeholder="输入日期"/>
    <el-table :data="dataList.filter(data => !search || data.kjdate.toLowerCase().includes(search.toLowerCase()))" height="400" :default-sort = "{prop: 'kjIssue', order: 'descending'}">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="期号" prop="kjIssue" sortable></el-table-column>
      <el-table-column label="日期" prop="kjdate" sortable></el-table-column>
      <el-table-column label="红球号码" prop="kjznum"></el-table-column>
      <el-table-column label="蓝球球号码" prop="kjtnum"></el-table-column>
    </el-table>
  </div>
</template>
<script>

export default {
  name: 'Home',
  components: {
    
  },
  data() {
    return {
      search:"",
      dataList: require("@/cache/data.json")
    }
  },
  mounted() {
    this.getLastFifttenData()
  },
  methods: {
    getLastFifttenData() {
      const data = this.dataList.slice(0,15);
      data.forEach(item => {
        console.log(item.kjIssue + "期篮球:" + item.kjtnum)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.home
  .el-input, input
    width 300px
</style>

