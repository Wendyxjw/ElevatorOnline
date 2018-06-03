<style  scoped lang="less">

</style>

<template>
  <div class="index-con left1">
    <div class="title">{{title}}</div>

      <Row>
        <Col span="12">
        <div>
           <Row>
              <Col span="12"><span class="text-middle-white">日事件报警总数：</span><br><span class="text-large-blue"><router-link :to="{ path: 'dayevent'}" target="_blank">{{list.dayEventWarn}}起</router-link></span></Col>
              <Col span="12"><span class="text-middle-white">日事件已处理数：</span><br><span class="text-large-blue">{{list.dayEventHandle}}起</span></Col>
          </Row>
          <Row>
              <Col span="12"><span class="text-middle-white">日事件困人数：</span><br><span class="text-large-blue">{{list.dayEventTrapped}}起</span></Col>
              <Col span="12"><span class="text-middle-white">困人故障平均处理时长：</span><br><span class="text-large-blue">{{list.dayEventAverageTime}}分钟</span></Col>
          </Row>

      </div>
      <div id="chart1"  style="width: 100%;height:100%;min-height:200px;">

      </div>
        </Col>
        <Col span="12">
        <div id="myvideo">
  
        </div>

        </Col>
    </Row>
    <Row>
        <Col span="12">
        <div  id="chart2"  style="width: 100%;height:100%;min-height:200px;"></div>
        </Col>
        <Col span="12">
         <div  id="chart3"  style="width: 100%;height:100%;min-height:200px;"></div>
        </Col>
    </Row>
  </div>
</template>
<script>
import Filter from "../../utils/filter";
import { getDayHandleData } from "../../service/indexnet.js";
var $ = require("jquery");
export default {
  name: "left1",
  data() {
    return {
      title: "日事件感知与智能处理",
      list: {},
      chart1: {},
      chart2: {},
      chart3: {},
      oldVideoSrc: "",
      leftdata: ""
    };
  },
  props: ["myMessage"],
  computed: {
    left1data() {
      return this.$store.default.state.pluginsData.dayHandleData;
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
      var data = this.leftdata;
      //动态插入video 直接插入渲染有问题
      // autoplay="autoplay"  loop="loop"
      if (this.oldVideoSrc != data.videoSrc) {
        this.oldVideoSrc = data.videoSrc;
        var _dom =
          `
                <video  width="100%" height="100%" autoplay="autoplay" loop="loop" controls="controls">
            
            <source src="` +
          data.videoSrc +
          `" type="video/mp4">
           你的浏览器暂不支持视频播放！
          </video>`;
        var element = $("#myvideo");
        //element.html(_dom);
      }

      var listData = {};
      for (let i in data.list) {
        var item = data.list[i];
        listData[item.name] = item.num;
      }
      this.list = Filter.initialTolowerCase(listData);
      this.chart1 = {
        legend: this.getLegend(data.chart1),
        list: data.chart1
      };
      this.chart2 = {
        legend: this.getLegend(data.chart2),
        list: data.chart2
      };
      this.chart3 = {
        legend: this.getLegend(data.chart3),
        list: data.chart3
      };
      this.initChart1();
      this.initChart2();
      this.initChart3();
    },
    getLegend(data) {
      var arr = [];
      for (let i in data) {
        arr[i] = data[i].name;
        //console.log(data[i].name)
      }
      return arr;
    },
    initChart1() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("chart1"));
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          top: 0,
          data: this.chart1.legend,
          textStyle: {
            color: "#fff",
            fontSize: 12
          }
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["30%", "60%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: "{d}%",
                textStyle: {
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 14
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "14",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.chart1.list
          }
        ]
      };

      // 绘制图表
      myChart.setOption(option);
    },
    initChart2() {
      var myChart = echarts.init(document.getElementById("chart2"));
      var option = {
        title: {
          text: "故障分类",
          x: "center",
          textStyle: {
            color: "#fff",
            fontSize: 16
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          left: 0,
          top: 20,
          bottom: 20,
          data: this.chart2.legend,
          textStyle: {
            color: "#fff",
            fontSize: 12
          }
        },
        series: [
          {
            name: "故障分类",
            type: "pie",
            radius: "40%",
            center: ["60%", "50%"],
            data: this.chart2.list,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            label: {
              color: "#fff",
              fontSize: 12
            }
          }
        ]
      };

      myChart.setOption(option);
    },
    initChart3() {
      var myChart = echarts.init(document.getElementById("chart3"));
      var option = {
        title: {
          text: "故障部件",
          x: "center",
          textStyle: {
            color: "#fff",
            fontSize: 16
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 0,
          top: 20,
          bottom: 20,
          data: this.chart3.legend,
          textStyle: {
            color: "#fff",
            fontSize: 12
          }
        },
        series: [
          {
            name: "故障部件",
            type: "pie",
            radius: "40%",
            center: ["40%", "50%"],
            data: this.chart3.list,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            label: {
              color: "#fff",
              fontSize: 12
            }
          }
        ]
      };

      myChart.setOption(option);
    }
  }
};
</script>
