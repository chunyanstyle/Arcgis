<template>
  <div class="map-container">
    <div ref="baseMap" class="baseMap"></div>
  </div>
</template>

<script>
import { loadModules } from "esri-loader";
import { ServiceUrl } from "./ServiceUrl";
const option = {
  url: ServiceUrl.apiUrl
};
window.dojoConfig = {
  has: {
    "esri-featurelayer-webgl": 1
  }
};

export default {
  name: "baseMap",
  data() {
    return {
      map: "",
      view: "",
      timer: null,
      Polyline: null,
      Graphic: null,
      pointIndex: 0,
      markerPoints: [
        {
          marker: { lng: 113.2613624448, lat: 22.9955053028 },
          name: "地点1",
          show: false,
          icon:require('../assets/icons/1.png'),
          leader:'小陈',
          group:'小吴'
        },
        {
          marker: { lng: 113.2609762067, lat: 22.9936485128 },
          name: "地点2",
          show: false,
          icon:require('../assets/icons/2.png'),
          leader:'陈晨',
          group:'陈心'
        },
        {
          marker: { lng: 113.2634438390, lat: 22.9939250576 },
          name: "地点3",
          show: false,
          icon:require('../assets/icons/3.png'),
          leader:'吴忠忠',
          group:'小忠忠'
        },
        {
          marker: { lng: 113.2598604078, lat: 22.9957818438 },
          name: "地点4",
          show: false,
          icon:require('../assets/icons/4.png'),
          leader:'西西',
          group:'香香'
        },
        {
          marker: { lng: 113.2651389951, lat: 22.9889866721 },
          name: "地点5",
          show: false,
          icon:require('../assets/icons/5.png'),
          leader:'佩奇',
          group:'乔治'
        },
        {
          marker: { lng: 113.2651389951, lat: 22.9879594653 },
          name: "地点6",
          show: false,
          icon:require('../assets/icons/6.png'),
          leader:'小莹莹',
          group:'红红'
        },
        {
          marker: { lng: 113.2622743959, lat: 22.9934361655 },
          name: "地点7",
          show: false,
          icon:require('../assets/icons/7.png'),
          leader:'美美',
          group:'美眉'
        }
      ],
      pictureGraphicArr:[],
      paths: [
        { lng: 113.2621241922, lat: 22.9936781426 },
        { lng: 113.2619739885, lat: 22.9939053044 },
        { lng: 113.2618452424, lat: 22.9940830829 },
        { lng: 113.2617915983, lat: 22.9945176517 },
        { lng: 113.2616199369, lat: 22.9948238243 },
        { lng: 113.2614482755, lat: 22.9951793787 },
        { lng: 113.2612444276, lat: 22.9955151793 }
      ],
      pathPoints: [
        [113.2621241922, 22.9936781426],
        [113.2619739885, 22.9939053044],
        [113.2618452424, 22.9940830829]
      ],
      pathArr: [
        [113.2617915983, 22.9945176517],
        [113.2616199369, 22.9948238243],
        [113.2614482755, 22.9951793787],
        [113.2612444276, 22.9955151793],
        [113.26110082, 22.99578348],
        [113.26099282, 22.99587248],
        [113.26089082, 22.99598148],
        [113.26105182, 22.99620848]
      ],
      navActive: -1,
      popupInfo:{
        // leader:'',
        // groupMembers:'',
        // workTime:'',
        // workContent:''
      }
    };
  },
  mounted() {
    loadModules(
      [
        "esri/Map",
        "esri/views/MapView",
        "esri/views/SceneView",
        "esri/layers/TileLayer",
        "esri/geometry/Polyline",
        "esri/layers/FeatureLayer",
        "esri/Graphic",
        "esri/widgets/Popup"
      ],
      option
    )
      .then(
        ([
          Map,
          MapView,
          SceneView,
          TileLayer,
          Polyline,
          FeatureLayer,
          Graphic,
          Popup
        ]) => {
          this.Polyline = Polyline;
          this.Graphic = Graphic;
          this.map = new Map({
            basemap: "satellite",
            ground: "world-elevation"
          });

          
          this.view = new SceneView({
            container: this.$refs.baseMap, // 视图的容器
            map: this.map, // Map的实例放入视图中
            center: [113.2622743959, 22.9934361655], // 初始显示的地图  中心点，经纬度
            zoom: 16 // 当前地图缩放等级
          });

          for(let i=0; i< this.markerPoints.length; i++){
            let picSymbol = {
              type: "picture-marker",
              url:  this.markerPoints[i].icon,
              width: "25px",
              height: "25px"
            };
            let pictureGraphic = new Graphic({
              type: "pic-point", //定义点类型，便于事件判断
              geometry: {
                type: "point",
                longitude:  this.markerPoints[i].marker.lng,
                latitude:  this.markerPoints[i].marker.lat
              },
              symbol: picSymbol,
              name: this.markerPoints[i].name,
              leader:this.markerPoints[i].leader,
              group:this.markerPoints[i].group
            });

            this.pictureGraphicArr.push(pictureGraphic)
            this.view.graphics.add(pictureGraphic);
          }

          // 画线
          // var simpleLineSymbol = {
          //   type: "simple-line",
          //   color: [226, 119, 40], // orange
          //   width: 5
          // };
          // var polyline = new Polyline({
          //   paths: this.pathPoints
          // });
          // var polylineGraphic = new Graphic({
          //   type: 'line',
          //   geometry: polyline,
          //   symbol: simpleLineSymbol
          // })
          // this.view.graphics.add(polylineGraphic);

          this.view.on("click", event => {
            var screenPoint = {
              x: event.x,
              y: event.y
            };

            this.view.hitTest(screenPoint).then(response => {
              var result = response.results[0];

              if (result) {
                if(result.graphic.type == 'pic-point')
                {
                  console.log(result.graphic)
                  this.view.popup.open({
                    title: result.graphic.name,
                    location: result.mapPoint,
                    content:`
                      <div class="group-info-box">
                        <p class="group-info-p" style="margin-bottom: 4px;">
                          <span class="group-info-item">组长：</span>`+ result.graphic.leader +`
                        </p>
                        <p class="group-info-p" style="margin-bottom: 4px;">
                          <span class="group-info-item">组员：</span>`+ result.graphic.group +`
                        </p>
                      </div>
                      <button id="viewVedio" >视频</button>
                    `
                  });
                  
                }
                



              }
            });
          });
        }
      )
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    drawPath() {
      var simpleLineSymbol = {
        type: "simple-line",
        color: [226, 119, 40], // orange
        width: 5
      };
      this.timer = setInterval(() => {
        if (this.pointIndex < this.pathArr.length) {
          this.pathPoints.push(this.pathArr[this.pointIndex]);
        }

        var polyline = new this.Polyline({
          paths: this.pathPoints
        });
        var polylineGraphic = new this.Graphic({
          geometry: polyline,
          symbol: simpleLineSymbol
        });
        this.view.graphics.add(polylineGraphic);
        this.pointIndex++;

        if (this.pointIndex == this.pathArr.length) {
          clearInterval(this.timer);
          this.timer = null;
          this.pointIndex = 0;
          this.pathPoints = [];
          return false;
        }
      }, 500);
      // 画线
    },
    stopDraw() {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
};

</script>

<style lang="scss">
/*引入css*/
@import url('https://js.arcgis.com/4.12/esri/css/main.css');
.esri-view-width-xlarge .esri-popup__main-container {
    width: 300px;
}
.map-container {
  position: absolute;
  top: 48px;
  left: 0;
  right: 0;
  bottom: 0;
}
.baseMap {
  position: absolute;
  top: 0;
  bottom: 10px;
  left: 2px;
  right: 2px;
  box-sizing: border-box;
  overflow-y: hidden;
  overflow-x: hidden;
}

.group-info-box {
  margin: 10px 0;

  .group-info-p {
    margin: 3px 5px;

    .group-info-item {
      font-size: 14px;
    }
  }
}

.esri-popup__content p{
  font-size: 14px;
}

</style>
