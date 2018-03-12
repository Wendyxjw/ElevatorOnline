<style  scoped lang="less">
@blue: #3385ff;
.left3 {
  .text1 {
    font-size: 14px;
    height: 20px;
    line-height: 20px;
  }
  .icon-man {
    font-size: 16px;
    color: #fff;
    margin-right: 5px;
  }
  .line {
    display: inline-block;
    flex: 1;
  }
  .line-percent {
    height: 8px;
    display: inline-block;
    position: relative;
    top: 0;
    left: 0;
    border-radius: 10px;
  }
  .line-yellow {
    background-color: #cccc00;
  }
  .line-blue {
    background-color: @blue;
  }
}
.leftmodal {
  .mtitle {
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    font-weight: bold;
    border-bottom: 1px solid #dddddd;
    margin-bottom: 10px;
  }
  .chart {
    width: 580px;
    height: 400px;
    padding: 10px;
  }
}
</style>
<template>
  <div class="index-con left3">
    <div class="title">{{title}}</div>
    <div>
      <Row>
      <Col span="8">
      <div>
        <p class="text1 text-small-white"><Icon type="person" class="icon-man"/>维保人员：<span class="text-large-blue">{{number.maintenancePepole}}</span></p>
        <p class="text1 text-small-white"><Icon type="person"  class="icon-man"/>维修人员：<span class="text-large-blue">{{number.repairPepole}}</span></p>  
      </div>
      <div>
        <p class="text-middle-white">维保完成情况</p>
        <div class="text-center text-large-blue">{{number.maintenanceSituation}}次</div>
      </div>
      <div  @click="leftmodalShow">
        <p class="text-middle-white">维保完成率</p>
        <div class="text-center ">
          <Circle :percent="number.maintenanceRate" :size="50" :stroke-width="13" :trail-width="13">
            <span class="demo-Circle-inner text-small-white" >{{number.maintenanceRate}}%</span>
          </Circle>
        </div>
      </div>
      </Col>
      <Col span="16" >
        <div id="map" style="width:100%;height:200px;border:1px solid yellow"></div>
      </Col>
    </Row>

    </div>
    <div class="display-flex" style="margin-top:10px">
      <div  class="flex1">
        <div  class="display-flex">
          <span class="text-small-white">计划用时：</span>
          <div class="line"><span class="line-percent line-yellow" :style="{width:number.planningTime}"></span></div>
        </div>
            <div class="display-flex">
              <span class="text-small-white">实际用时：</span>
              <div class="line"><span class="line-percent line-blue" :style="{width:number.practicalTime}"></span></div>
        </div>          
      </div>
      <div style="margin-left:10px">
        <Circle :percent="number.timeRate" :size="50" :stroke-width="13" :trail-width="13">
            <span class="demo-Circle-inner text-small-white">{{number.timeRate}}%</span>
          </Circle>
          <p class="text-small-white">用时比率</p>
      </div>

   
    </div>
    <Modal
        v-model="leftmodal1"
        width="1000"
        class-name="leftmodal">
        <header class="mtitle">
          本月维保完成率
        </header>
        <Row>
          <Col span="10">
          <Table :columns="tableTitle" :data="tableList"></Table>
          </Col>
          <Col span="14">
          <div id="left3chart1" class="chart"></div>
          </Col>
        </Row>

    </Modal>
  </div>
</template>
<script>
import Filter from "../../utils/filter";
import {
  getMaintenanceSituation,
  getMaintenanceRate
} from "../../service/indexnet.js";
export default {
  name: "left3",
  data() {
    return {
      title: "维保情况",
      leftmodal1: false,
      tableTitle: [],
      tableList: [],
      number: {},
      xAxis: [], //图标的X坐标
      //图标的具体数据
      series: {
        palnData: [],
        actualData: [],
        rateData: []
      },
      leftdata: {},
      oldmapCenter: "" //记录地图中心 值改变时在初始化地图
    };
  },
  computed: {
    left1data() {
      return this.$store.default.state.pluginsData.maintenanceSituation;
    }
  },
  watch: {
    left1data(val) {
      this.leftdata = val;
      this.getData();
    }
  },
  mounted() {
    //this.getData();
  },
  methods: {
    getData() {
      this.number = Filter.initialTolowerCase(this.leftdata);
      this.number.timeRate = parseFloat(
        (this.number.practicalTime / this.number.planningTime * 100).toFixed(2)
      );
      if (this.number.timeRate > 100) {
        this.number.timeRate = parseFloat(
          (this.number.planningTime / this.number.practicalTime * 100).toFixed(
            2
          )
        );
        this.number.practicalTime = "100%";
        this.number.planningTime = this.number.timeRate + "%";
      } else {
        this.number.planningTime = "100%";
        this.number.practicalTime = this.number.timeRate + "%";
      }
      if (this.oldmapCenter != this.number.mapCenter) {
        this.initMap();
        this.oldmapCenter = this.number.mapCenter;
      }
    },
    leftmodalShow() {
      this.leftmodal1 = true;
      this.getMaintenance();
    },
    initchart() {
      var myChart = echarts.init(document.getElementById("left3chart1"));
      var option = {
        title: {
          text: "图表标题",
          x: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        legend: {
          data: ["蒸发量", "降水量", "平均温度"],
          bottom: 0
        },
        xAxis: [
          {
            type: "category",
            data: this.xAxis,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value} "
            }
          },
          {
            type: "value",
            name: "",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value} %"
            }
          }
        ],
        series: [
          {
            name: "计划",
            type: "bar",
            data: this.series.planData
          },
          {
            name: "实际",
            type: "bar",
            data: this.series.actualData
          },
          {
            name: "完成率",
            type: "line",
            yAxisIndex: 1,
            data: this.series.rateData
          }
        ]
      };
      // 绘制图表
      myChart.setOption(option);
    },
    initMap() {
      // 百度地图API功能
      var map = new BMap.Map("map"); // 创建Map实例
      map.centerAndZoom(new BMap.Point(121.628572, 29.866033), 13); // 初始化地图,设置中心点坐标和地图级别
      var styleData = [
        {
          featureType: "land",
          elementType: "geometry",
          stylers: {
            color: "#e7f7fc"
          }
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: {
            color: "#96b5d6"
          }
        },
        {
          featureType: "green",
          elementType: "all",
          stylers: {
            color: "#b0d3dd"
          }
        },
        {
          featureType: "highway",
          elementType: "geometry.fill",
          stylers: {
            color: "#a6cfcf"
          }
        },
        {
          featureType: "highway",
          elementType: "geometry.stroke",
          stylers: {
            color: "#7dabb3"
          }
        },
        {
          featureType: "arterial",
          elementType: "geometry.fill",
          stylers: {
            color: "#e7f7fc"
          }
        },
        {
          featureType: "arterial",
          elementType: "geometry.stroke",
          stylers: {
            color: "#b0d5d4"
          }
        },
        {
          featureType: "local",
          elementType: "labels.text.fill",
          stylers: {
            color: "#7a959a"
          }
        },
        {
          featureType: "local",
          elementType: "labels.text.stroke",
          stylers: {
            color: "#d6e4e5"
          }
        },
        {
          featureType: "arterial",
          elementType: "labels.text.fill",
          stylers: {
            color: "#374a46"
          }
        },
        {
          featureType: "highway",
          elementType: "labels.text.fill",
          stylers: {
            color: "#374a46"
          }
        },
        {
          featureType: "highway",
          elementType: "labels.text.stroke",
          stylers: {
            color: "#e9eeed"
          }
        }
      ];
      map.setMapStyle({
        styleJson: styleData
      });
      //添加地图类型控件
      map.addControl(
        new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
        })
      );
      map.setCurrentCity(this.number.mapCenter); // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    },
    getMaintenance() {
      getMaintenanceRate().then(res => {
        var data = Filter.initialTolowerCase(res);
        this.tableTitle = data.tableTitle;
        this.tableList = data.tableList;
        var planData = [],
          actualData = [],
          rateData = [];
        for (let i in data.tableList) {
          this.xAxis[i] = data.tableList[i].address;
          planData[i] = data.tableList[i].plan;
          actualData[i] = data.tableList[i].actual;
          rateData[i] = data.tableList[i].rate;
        }
        this.series = {
          planData: planData,
          actualData: actualData,
          rateData: rateData
        };
        this.initchart();
      });
    }
  }
};
</script>
