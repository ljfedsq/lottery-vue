<template>
  <div class="school">
   
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: 'School',
  components: {
    
  },
  computed: {
   
  },
  data() {
    return {
      allSchools: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getAllSchoolData() {
      // level: 小学397;初中396
      // condition: 学校school;小区road
      // area: 浦东新区420
      const url = '/schoolApi/searchschool/schoolsearch.php?act=sel&condition=school&level=397&area=420&number=0.7645129191726197';
      axios.get(url).then(res => {
        this.allSchools = res.data
      })
      .catch( (error) => {
        console.log(error);
      });
    },
    getRoadData(){
      const url = '/schoolApi/searchschool/schoolsearch.php?act=getresult&condition=school&getid=10344&level=397&area=420&number=0.8143918661444449'
      console.log(url)
    }
  }
}
</script>
<style lang="stylus" scoped>
.home
  padding 15px
  .filter-panel
    text-align left
    line-height 44px
    button
      float right
</style>

