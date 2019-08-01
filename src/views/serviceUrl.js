export const ServiceUrl = {
  baseMap: 'satellite', // 这里可以定义自己服务器上的底图的地址，也可以使用ArcGis提供的底图，详见Basemap类
  apiUrl: 'https://js.arcgis.com/4.12/', // 使用官网提供的api，但是更建议使用离线部署的地址
  // apiUrl: 'http://hujiahua.site:8002/4.6/dojo/dojo.js', // 使用官网提供的api，但是更建议使用离线部署的地址
  tileLayer: [{
    id: 'TL0',
    url: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer'
  }],
  featureLayer: [
    {
      url: 'http://192.168.1.211:6080/arcgis/rest/services/test/test/MapServer/0'
    },
    {
      url: 'http://192.168.1.211:6080/arcgis/rest/services/CD_SLServer/CD_FeatureInfo/MapServer/8'
    }
  ]
}
