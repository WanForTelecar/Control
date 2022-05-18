<template>
  <div class="maps" @click="changeMap" :style="MapStyle">
    <el-amap :zoom="Option.zoom" :center="Option.position">
      <!-- 当前坐标 -->
      <el-amap-circle-marker
        :center="Option.position"
        :radius="5"
        fillColor="#3E86F1"
        :strokeWeight="0"
      />
    </el-amap>
  </div>
</template>
<script>
import Vue from "vue";
import VueAMap from "vue-amap";
VueAMap.initAMapApiLoader({
  key: "99f684b9a7773a40ca224894816f7c68",
  plugin: [
    "AMap.Autocomplete",
    "AMap.Geolocation",
    "Geocoder",
    "AMap.OverView",
  ],
  v: "1.4.15",
});
Vue.use(VueAMap);
export default {
  props: {
    Option: {
      type: Object,
      defualt: () => {
        return {
          position: [104.056608, 30.695942],
          zoom: 5,
        };
      },
    },
  },
  data () {
    return {
      num: 0,
      MapStyle: {
        top: "5px",
        left: "5px",
        width: "50px",
        height: "50px",
      },  
    }
  },
  methods: {
    // 切换地图
    changeMap() {
      this.num++;
      if (this.num % 2) {
        this.MapStyle = {
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "400px",
          height: "200px",
          borderRadius: "10px",
        };
      } else {
        this.MapStyle = {
          top: "5px",
          left: "5px",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
        };
      }
    },
  },
};
</script>
<style scoped>
.maps {
  position: fixed;
  overflow: hidden;
  z-index: 99;  
  top: 5px;
  left: 5px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>