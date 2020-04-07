<template>
  <div class="school">
    <span>搜索名称：</span><el-input v-model="search" placeholder="输入学校名称"/>
   <el-table 
    :data="dataList.filter(data => !search || data.label.toLowerCase().includes(search.toLowerCase()))" 
    height="400" 
    :row-class-name="tableRowClassName"
    :default-sort = "{prop: 'level', order: 'ascending'}"
    @expand-change="expandChange">
      <el-table-column type="expand" width="30">
      <template slot-scope="props">
        <el-table class="road-detail" :data="props.row.roads">
          <el-table-column label="小区名称" prop="vill"></el-table-column>
          <el-table-column label="小区地址" width="140" prop="roadarea"></el-table-column>
          <el-table-column label="街道名称" width="120" prop="strarea"></el-table-column>
        </el-table>
      </template>
      </el-table-column>
      <el-table-column type="index" label="NO" width="45"></el-table-column>
      <el-table-column label="学校名称" width="140" prop="label"></el-table-column>
      <el-table-column label="梯队" prop="level" sortable></el-table-column>
      <el-table-column label="详情" width="50">
        <template slot-scope="props">
          <a class="link" @click="gotoMap(props.row)">查看</a>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
import axios from "axios";
const levels = require("@/const/pdSchoolLevel.js").pdSchoolLevel;
export default {
  name: 'School',
  components: {
    
  },
  computed: {
    dataList() {
      let arr = []
      if(this.allSchools.length > 0) {
        const levelArray = levels.level1.concat(levels.level2).concat(levels.level3);
        arr = this.allSchools.map(item=> {
          levelArray.forEach(levelItem=> {
            if(item.label.indexOf(levelItem.name) > -1) {
              item.level = levelItem.level
            }
          })
          if(!item.level) {
            item.level = 4
          }
          return item
        })
      }
      return arr
    }
  },
  data() {
    return {
      search: '',
      allSchools: [],
      // 要展开的行，数值的元素是row的key值
      expands: []
    }
  },
  mounted() {
    this.getAllSchoolData()
  },
  methods: {
    getAllSchoolData() {
      // level: 小学397;初中396
      // condition: 学校school;小区road
      // area: 浦东新区420
      const url = '/searchschool/schoolsearch.php';
      axios({
          method: 'get',
          url,
          params: {
            act: "sel",
            condition: "school",
            level: 397,
            area: 420,
            number: 0.7645129191726197
          }
        }).then(res => {
        this.allSchools = res.data

      })
      .catch( (error) => {
        console.log(error);
      });
    },
    expandChange(row) {
      if(!row.roads) {
        const url = `/searchschool/schoolsearch.php`
        axios({
          method: 'get',
          url,
          params: {
            act: "getresult",
            condition: "school",
            getid: row.value,
            level: 397,
            area: 420,
            number: 0.8143918661444449
          }
        }).then(res => {
            row.roads = res.data
        })
        .catch( (error) => {
          console.log(error);
        });
      }
    },
    tableRowClassName({row}) {
      return 'level-' + row.level;
    },
    gotoMap(school) {
      this.$router.push({
        name: 'schoolMap',
        query: {
          id: school.value,
          name: encodeURI(school.label) 
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.school
  padding 15px
  .filter-panel
    text-align left
    line-height 44px
    button
      float right
  .el-input 
    display inline-block
    width 200px
  .el-table .level-1
    background #f56c6c
  .el-table .level-2
    background #e6a23c
  .el-table .level-3
    background #67c23a
  .link
    color #1185ff
</style>
<style lang="stylus" >
.school
  .el-table .level-1 
    color #f56c6c
  .el-table .level-2 
    color #e6a23c
  .el-table .level-3 
    color #67c23a
  .el-table__expanded-cell[class*=cell]
    padding 0
    background #f1f4f8
  
</style>
