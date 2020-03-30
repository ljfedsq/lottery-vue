<template>
  <div class="lottery">
    <span>查询日期：</span><el-input v-model="search" placeholder="输入日期"/>
    <el-button class="right-btn" @click="gotoAnalysis" type="primary">蓝球分析</el-button>
   <!-- <div class="filter-panel">
      <span class="date">{{date}}</span>
      <van-button @click="showCalendar = true">选择日期</van-button>
   </div>
    <van-calendar 
      v-model="showCalendar" 
      type="range" 
      :default-date="defaultDate"
      :min-date="minDate"	
      @confirm="onConfirm" /> -->
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
let today = new Date();
const weekago = today.setTime(today.getTime()-7*24*60*60*1000);
export default {
  name: 'Lottery',
  components: {
    
  },
  computed: {
    minDate() {
      return new Date("January 2,2003");
    },
    defaultDate() {
      return [new Date(weekago), new Date()];
    }
  },
  data() {
    return {
      search:"",
      showCalendar: false,
      date: `${this.formatDate(new Date(weekago))} - ${this.formatDate(new Date())}`,
      dataList: require("@/cache/data.json")
    }
  },
  mounted() {
    
  },
  methods: {
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      const [start, end] = date;
      this.showCalendar = false;
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    },
    gotoAnalysis(){
      this.$router.push({name:'analysis'})
    }
  }
}
</script>
<style lang="stylus" scoped>
.lottery
  padding 15px
  .filter-panel
    text-align left
    line-height 44px
    button
      float right
  .el-input 
    display inline-block
    width 300px
  .right-btn
    float right
</style>

