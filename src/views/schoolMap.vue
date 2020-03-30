<template>
  <div class="school-map">
    <div class="amap-wrapper">
      <el-amap-search-box 
        class="search-box"
        :default="schoolName" 
        :search-option="searchOption" 
        :on-search-result="onSearchResult"></el-amap-search-box>
      <el-amap 
        class="amap-box" 
        :vid="'amap-vue'"
        :center="mapCenter"
        :zoom="zoom">
        <div v-if="markers">
          <el-amap-marker 
          v-for="(marker,index) in markers" 
          :key="index" 
          :position="marker.position"
          :events="marker.events" ></el-amap-marker>
         <el-amap-info-window 
          v-if="window" 
          :position="window.position" 
          :visible="window.visible" 
          :content="window.content"></el-amap-info-window>
        </div>
        </el-amap>
    </div>
  </div>
</template>
<script>

export default {
  name: 'SchoolMap',
  components: {
    
  },
  data() {
    return {
      schoolName: decodeURI(this.$route.query.name),
      zoom: 13,
      mapCenter: [121.59996, 31.197646],
      markers: [],
      searchOption: {
        city: '上海',
        citylimit: true
      },
      windows: [],
      window: ''
    }
  },
  mounted() {
   
  },
  methods: {
    onSearchResult(pois) {
      let latSum = 0;
      let lngSum = 0;
      
      if (pois && pois.length > 0) {
        const self = this;
        pois.forEach((poi,i) => {
          let {lng, lat} = poi;
          lngSum += lng;
          latSum += lat;
          this.markers.push({
            position:[lng, lat],
            events: {
              click() {
                self.windows.forEach(window => {
                  window.visible = false;
                });

                self.window = self.windows[i];
                self.$nextTick(() => {
                  self.window.visible = true;
                });
              }
            }
          });
          this.windows.push({
            position: [lng, lat],
            content: `<div class="prompt">${ poi.name }</div><div class="prompt">地址：${ poi.address }</div>`,
            visible: false
          });
        });
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        };
        this.mapCenter = [center.lng, center.lat];
      }
    }
   
  }
}
</script>
<style lang="stylus" scoped>
.school-map
  width 100%
  .amap-wrapper
    width 100%
    height 400px

</style>

