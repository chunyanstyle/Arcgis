<template>
  <div class='hello'>
    <div ref="baseMap" class="baseMap"></div>
  </div>
</template>

<script>
import { loadModules } from 'esri-loader'
import { ServiceUrl } from './ServiceUrl'
const option = {
  url: ServiceUrl.apiUrl
}

export default {
  name: 'baseMap',
  data () {
    return {
      map: '',
      view: ''
    }
  },
  mounted () {
    loadModules(['esri/Map', 'esri/views/MapView', 'dojo/domReady!'], option).then(([Map, MapView]) => {
      this.map = new Map({
        basemap: ServiceUrl.baseMap // 底图类型，详见BaseMap类
      })
      this.view = new MapView({
        container: this.$refs.baseMap, // 视图的容器
        map: this.map, // Map的实例放入视图中
        center: [104.06, 30.67], // 初始显示的地图中心点，经纬度
        zoom: 10 // 当前地图缩放等级
      })
      console.log(this.view)
      console.log(this.map)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
<style scoped>
@import 'https://js.arcgis.com/4.7/esri/css/main.css';
.hello{
  height: 300px;
  width: 500px;
  }
.baseMap {
  height:90vh;
  width: 100vw;
}
</style>