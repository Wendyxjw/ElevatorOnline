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
    min-width: 800px;
    left: 0;
  }
  .right-box {
    width: 20%;
    min-width: 500px;
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
  .box-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
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
      <div class="box text-center point">
        <div class="index-con " style="width:50%;display: inline-block;">
            <Row>
              <Col span="4">
              <p class="text-center">
                <span class="item text-large-white">0.8
                  <Icon type="arrow-up-a"></Icon>
                  <span class="dot-text dot-text-top">0.1</span>
                </span>
              </p>
              <p class="text-middle-white text-center">全市故障指数</p>
              </Col>
              <Col span="4">
              <p class="text-center">
                <span class="item text-large-white">0.8
                  <Icon type="arrow-up-a"></Icon>
                  <span class="dot-text dot-text-bottom">0.1</span>
                </span>
              </p>
              <p class="text-middle-white text-center">全市维保指数</p>
              </Col>
              <Col span="5">
              <p class="text-center">
                <span class="item text-large-white">0.8
                  <Icon type="arrow-down-a"></Icon>
                  <span class="dot-text dot-text-top">0.1</span>
                </span>
              </p>
              <p class="text-middle-white text-center">住宅电梯运行量</p>
              </Col>
              <Col span="5">
              <p class="text-center">
                <span class="item text-large-white">0.8
                  <Icon type="arrow-down-a"></Icon>
                  <span class="dot-text dot-text-bottom">0.1</span>
                </span>
              </p>
              <p class="text-middle-white text-center">商业电梯运行量</p>
              </Col>
              <Col span="6">
              <p class="text-center text-superlarge-blue">
                2560
              </p>
              <p class="text-middle-white text-center">15年以上电梯运行量</p>
              </Col>
            </Row>
        </div>
        <div class="text-center box-bottom"> 
          <div class="index-con text-middle-white "  style="width:50%;display: inline-block;">
            1.维保率在85%以上绿色,60%-85%黄绿,60%以下黄色<br>
            2.故障点显示红色。<br>
            3.故障处理完后2小时内蓝色显示
            <div class="check text-center text-large-white">
              <RadioGroup v-model="disabledGroup" size="large">
                  <Radio label="电梯分布"></Radio>
                  <Radio label="维保单位"></Radio>
                  <Radio label="故障分布"></Radio>
              </RadioGroup>
            </div>
            <p class="text-middle-white text-center">公司logo图标</p>
          </div>
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
import left1 from "./left1.vue";
import left2 from "./left2.vue";
import left3 from "./left3.vue";
import right1 from "./right1.vue";
import right2 from "./right2.vue";
import right3 from "./right3.vue";

export default {
  data() {
    return {
      name: "电梯物联网标题",
      disabledGroup: "维保单位"
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
    this.initmap();
  },
  methods: {
    initmap() {
      var myChart = echarts.init(document.getElementById("indexMap"));
      var data = [
        {
          name: "月湖公园",
          value: 0.88
        },
        {
          name: "宁波东站",
          value: 0.38
        },
        {
          name: "宁波体育中心",
          value: 0.95
        },
        {
          name: "科技公园",
          value: 0.6
        },
        {
          name: "四安文化乐园",
          value: 0.5
        },
        {
          name: "体育馆",
          value: 1.0
        }
      ];

      var geoCoordMap = {
        月湖公园: [121.549234, 29.874051],
        宁波东站: [121.591921, 29.854131],
        宁波体育中心: [121.588328, 29.877307],
        科技公园: [121.637771, 29.880564],
        四安文化乐园: [121.681177, 29.848743],
        体育馆: [121.612762, 29.918887]
      };

      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };

      var option = {
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
            //console.log(params);
            let num = (params.data.value[2] * 100).toFixed(2);
            let temp = `${params.data.name} <br/>
            维保率：${num}%`;
            return temp;
          }
        },
        bmap: {
          center: [121.628572, 29.866033],
          zoom: 13, //地图放大级别
          roam: true,
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
            name: "Top 5",
            type: "effectScatter",
            coordinateSystem: "bmap",
            data: convertData(
              data
                .sort(function(a, b) {
                  return b.value - a.value;
                })
                .slice(0, 6)
            ),
            symbolSize: function(val) {
              console.log(val);
              return val[2] * 35;
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
                  color =
                    val < 0.6 ? "#f4e925" : val > 0.85 ? "#007236" : "#ccff33";
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
      myChart.setOption(option);
    }
  }
};
</script>
