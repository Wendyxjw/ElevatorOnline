<style  scoped lang="less">
.chart-box {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
.charts {
  width: 100%;
  height: 100%;
}
.home {
  background-color: #4f4fb9;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  .box {
    position: fixed;
    top: 0;
    display: inline-block;
    overflow-y: auto;
    height: 100%;
  }
  .left-box {
    width: 30%;
    // min-width: 800px;
    left: 0;
  }
  .right-box {
    width: 20%;
    // min-width: 500px;
    right: 0;
  }
  .point {
    width: 100%;
    .item {
      position: relative;
    }
    .dot-text {
      position: absolute;
      right: -20px;
      width: 20px;
      color: #fff;
      font-size: 12px;
      z-index: 10;
    }
    .dot-text-top {
      top: 0;
    }
    .dot-text-bottom {
      bottom: 0;
    }
  }
  .box-top {
    position: absolute;
    top: 0;
    left: 32.5%;
    width: 45%;
  }
  .box-bottom {
    position: absolute;
    bottom: 0;
    left: 32.5%;
    width: 45%;
  }
  .check {
    line-height: 50px;
  }
}
</style>
<template>

  <div class="home">
    <div class="chart-box">
      <!-- 底部地图 -->
      <div id="indexMap" class="charts"></div>
      <div class="point index-con box-top" v-if="isShow">
            <Row>
              <Col span="5" v-for="item in topData">
              <p class="text-center">
                <span class="item text-large-white">{{item.num}}
                  <Icon :type="item.class"></Icon>
                  <span class="dot-text dot-text-top">{{item.rate}}</span>
                </span>
              </p>
              <p class="text-middle-white text-center">{{item.text}}</p>
              </Col>
              
              <Col span="4">
              <p class="text-center text-superlarge-blue">
                {{indexData.fifteenElevatorsNum.num}}
              </p>
              <p class="text-middle-white text-center">15年以上电梯运行量</p>
              </Col>
            </Row>
        </div>
      <div class="index-con  text-center box-bottom"> 
        <div class="check text-center text-large-white">

              <CheckboxGroup v-model="wsParam.mapDataSelect" size="large" class="text-center" @on-change="changeEvent()">
                  <Checkbox label="电梯分布"></Checkbox>
                  <Checkbox label="维保单位"></Checkbox>
                  <Checkbox label="故障分布"></Checkbox>
              </CheckboxGroup>
            </div>
            <p class="text-middle-white text-center">蛟驰科技</p>
          <div class="text-middle-white " >
            <!-- 1.维保率在85%以上绿色,60%-85%黄绿,60%以下黄色<br>
            2.故障点显示红色。<br>
            3.故障处理完后2小时内蓝色显示 -->
            
          </div>
        </div>
      <!-- 插件 -->
       <div class="box left-box scroll">
          <left1></left1>
          <left2></left2>
          <left3></left3>
        </div>
        <div class="box right-box scroll">
            <right1></right1>
            <right2></right2>
            <right3></right3>
        </div>
    </div>
    
 
    
  </div>

</template>
<script>
const moment = require("moment");
import { getMapData } from "../../service/indexnet.js";
import left1 from "./left1.vue";
import left2 from "./left2.vue";
import left3 from "./left3.vue";
import right1 from "./right1.vue";
import right2 from "./right2.vue";
import right3 from "./right3.vue";
import Filter from "../../utils/filter";
import { getindex } from "../../service/indexnet.js";
export default {
  data() {
    return {
      name: "电梯物联网标题",
      ws: null,
      myChart: null,
      mapConfig: {
        zoom: 12,
        center: [121.628572, 29.866033],
        data: [],
        geoCoordMap: [],
        typeStyle: {
          qColorNomal: "blue",
          qColorError: "red",
          bColorNomal: "#fff",
          type: [1]
        }
      },
      topData: [],
      indexData: {},
      isShow: false,
      wsParam: {
        mapZoom: 14,//地图缩放
        mapDataSelect: ["电梯分布"],//标注类型
        cityElevatorInfor: "全市"
      },
      res:{}
    };
  },
  components: {
    left1,
    left2,
    left3,
    right1,
    right2,
    right3
  },
  mounted() {
    this.websocketEvent();
    this.getData();
    this.initmap();
    this.$on("changeParam", this.onParamChange);
  },
  methods: {
    getData() {
      getindex().then(res => {
        this.res=res
        this.formatData(res)
      });
    },
    formatData(res){
      var data = Filter.initialTolowerCase(res);
        this.$store.default.dispatch("getPluginsData", data);
        //debugger
        this.topData=[];
        for (let i in data.indexData) {
          var item = data.indexData[i];
          if (i == "cityFaultIndex") {
            item.text = "全市故障指数";
          } else if (i == "cityMaintenanceIndex") {
            item.text = "全市维保指数";
          } else if (i == "residenceElevatorsNum") {
            item.text = "住宅电梯运行量";
          } else if (i == "businessElevatorsNum") {
            item.text = "商业电梯运行量";
          } else {
            continue;
          }
          item.class = item.type == "up" ? "arrow-up-a" : "arrow-up-a";
          this.topData.push(item);
        }
        this.indexData = data.indexData;
        this.mapConfig.data = this.indexData.map.data;
        this.mapConfig.geoCoordMap = this.indexData.map.geoCoordMap;
        this.isShow = true;
        this.initmap();
    },
    initmap() {
      this.myChart = echarts.init(document.getElementById("indexMap"));

      const convertData = (data, type) => {
        var res = [];
        let dataList = data.slice();
        if (this.mapConfig.typeStyle.type.indexOf(3) !== -1) {
          if (type === 2) {
            dataList = dataList.filter(ele => {
              return ele.isError;
            });
          } else if (type === 1) {
            dataList = dataList.filter(ele => {
              return !ele.isError;
            });
          }
        } else {
          dataList = type === 2 ? [] : dataList;
        }
        dataList =
          type === 1 && this.mapConfig.typeStyle.type.indexOf(1) === -1
            ? []
            : dataList;
        for (let i = 0; i < dataList.length; i++) {
          let geoCoord = this.mapConfig.geoCoordMap[dataList[i].name];
          if (geoCoord) {
            res.push({
              name: dataList[i].name,
              value: geoCoord.concat([dataList[i].value, dataList[i].num])
            });
          }
        }
        return res;
      };
      let _this = this;
      let option = {
        backgroundColor: "#404a59",
        title: {
          text: "",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            let num = (params.data.value[2] * 100).toFixed(2);
            let temp = `${params.data.name} <br/>
            维保率：${num}%`;
            return temp;
          }
        },
        bmap: {
          center: this.mapConfig.center,
          zoom: this.mapConfig.zoom, //地图放大级别
          roam: true,
          silent: true,
          mapStyle: {
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#044161"
                }
              },
              {
                featureType: "land",
                elementType: "all",
                stylers: {
                  color: "#004981"
                }
              },
              {
                featureType: "boundary",
                elementType: "geometry",
                stylers: {
                  color: "#064f85"
                }
              },
              {
                featureType: "railway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "highway",
                elementType: "geometry",
                stylers: {
                  color: "#004981"
                }
              },
              {
                featureType: "highway",
                elementType: "geometry.fill",
                stylers: {
                  color: "#005b96",
                  lightness: 1
                }
              },
              {
                featureType: "highway",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry",
                stylers: {
                  color: "#004981"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#00508b"
                }
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "green",
                elementType: "all",
                stylers: {
                  color: "#056197",
                  visibility: "off"
                }
              },
              {
                featureType: "subway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "local",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "arterial",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "boundary",
                elementType: "geometry.fill",
                stylers: {
                  color: "#029fd4"
                }
              },
              {
                featureType: "building",
                elementType: "all",
                stylers: {
                  color: "#1a5787"
                }
              },
              {
                featureType: "label",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              }
            ]
          }
        },
        series: [
          {
            name: "蓝", //气球
            type: "scatter",
            coordinateSystem: "bmap",
            symbol: "pin", //气泡
            symbolSize: 50,
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  return params.data.value[3];
                },
                textStyle: {
                  color: "#fff",
                  fontSize: 9
                }
              }
            },
            itemStyle: {
              normal: {
                color: _this.mapConfig.typeStyle.qColorNomal
                //气球颜色
              }
            },
            zlevel: 101,
            data: convertData(_this.mapConfig.data, 1)
          },
          {
            name: "红", //气球
            type: "scatter",
            coordinateSystem: "bmap",
            symbol: "pin", //气泡
            symbolSize: 50,
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  return params.data.value[3];
                },
                textStyle: {
                  color: "#fff",
                  fontSize: 9
                }
              }
            },
            itemStyle: {
              normal: {
                color: _this.mapConfig.typeStyle.qColorError
                //气球颜色
              }
            },
            zlevel: 102,
            data: convertData(_this.mapConfig.data, 2)
          },
          {
            name: "Top", //底部
            type: "effectScatter",
            coordinateSystem: "bmap",
            data: convertData(_this.mapConfig.data),
            symbolSize: function(val) {
              let size =
                _this.mapConfig.typeStyle.type.indexOf(2) !== -1
                  ? val[2] * 35
                  : 20;
              return size;
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: function(args) {
                  let [color, val] = ["", args.data.value[2]];
                  if (_this.mapConfig.typeStyle.type.indexOf(2) !== -1) {
                    color =
                      val < 0.6
                        ? "#f4e925"
                        : val > 0.85 ? "#007236" : "#ccff33";
                  } else {
                    color = _this.mapConfig.typeStyle.bColorNomal;
                  }

                  return color;
                },
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            zlevel: 100
          }
        ]
      };
      this.myChart.setOption(option, true);
      setTimeout(() => {
        this.bindMapListen();
      }, 500);
    },
    bindMapListen() {
      var bmap = this.myChart
        .getModel()
        .getComponent("bmap")
        .getBMap();
      bmap.addControl(new BMap.MapTypeControl());
      bmap.addControl(new BMap.ScaleControl());

      bmap.enableAutoResize();
      bmap.addEventListener("zoomend", (type, target) => {
        this.mapConfig.zoom = bmap.getZoom();
        this.mapConfig.center = [bmap.getCenter().lng, bmap.getCenter().lat];
        this.$emit("changeParam",{mapZoom:this.mapConfig.zoom});
      });
      bmap.addEventListener("click", function(type) {
        return false;
      });
    },
    websocketEvent() {
      this.ws = new WebSocket("wss://echo.websocket.org");//ws:/117.50.27.64:86/webhiter
      this.ws.onopen = evt => {
        this.ws.send(
          JSON.stringify(this.wsParam)
        );
        // setInterval(() => {
        //   this.ws.send("北京时间：" + moment().format("YY-HH-dd hh:mm:ss"));
        // }, 1000);
      };
      this.ws.onmessage = evt => {
        console.log("getinfor")
        this.formatData(this.res)//evt.data
      };

      this.ws.onclose = evt => {};
    },
    onParamChange(data) {
      this.wsParam=Object.assign(this.wsParam,data)
      this.ws.send(JSON.stringify(this.wsParam));
    },
    changeEvent() {
      this.mapConfig.typeStyle.type = [];
      this.wsParam.mapDataSelect.forEach(ele => {
        switch (ele) {
          case "电梯分布":
            this.mapConfig.typeStyle.type.push(1);
            break;
          case "维保单位":
            this.mapConfig.typeStyle.type.push(2);
            break;
          case "故障分布":
            this.mapConfig.typeStyle.type.push(3);
            break;

          default:
            break;
        }
      });
      this.$emit("changeParam");
    },
    qColorEvent(val) {
      if (this.mapConfig.typeStyle.type.indexOf(3) !== -1) {
      }
      return "#fff";
    }
  }
};
</script>
