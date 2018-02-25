<style  scoped lang="less">

</style>
<template>
  <div class="index-con">
    <div class="title">{{title}}</div>
    <div class="text-center">
     <!-- <RadioGroup v-model="radioval" type="button">
        <Radio label="电梯里"></Radio>
        <Radio label="故障数"></Radio>
        <Radio label="困人数"></Radio>
    </RadioGroup> -->
    <div id="right3chart1"  style="width: 100%;height:100%;min-height:250px;"></div>
    <div id="right3chart2"  style="width: 100%;height:100%;min-height:250px;"></div>
    <div id="right3chart3"  style="width: 100%;height:100%;min-height:250px;"></div>
    </div>
  </div>
  
</template>
<script>
import Filter from "../../utils/filter";
import { getTrend } from "../../service/indexnet.js";
export default {
  name: "right3",
  data() {
    return {
      title: "趋势",
      radioval: "电梯里",
      legend: [],
      series: [],
      pluginData: {}
    };
  },
  mounted() {
    //this.getData();
  },
  computed: {
    left1data() {
      return this.$store.default.state.pluginsData.trend;
    }
  },
  watch: {
    left1data(val) {
      this.pluginData = val;
      this.getData();
    }
  },
  methods: {
    getData() {
      var data = Filter.initialTolowerCase(this.pluginData);
      this.chart1 = {
        legend: this.getLegend(data.chart1.list),
        xAxis: data.chart1.xText,
        series: this.getSeries(data.chart1.list, "bar")
      };
      this.chart2 = {
        legend: this.getLegend(data.chart2.list),
        xAxis: data.chart2.xText,
        series: this.getSeries(data.chart2.list, "line")
      };
      this.chart3 = {
        legend: this.getLegend(data.chart3.list),
        xAxis: data.chart3.xText,
        series: this.getSeries(data.chart3.list, "line", "area")
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
    getSeries(data, type, area) {
      var arr = [];
      for (let i in data) {
        arr[i] = data[i];
        arr[i].barGap = 0;
        arr[i].type = type;
        if (area == "area") {
          arr[i].stack= '总量',
          arr[i].areaStyle = { normal: {} };
        }
      }
      return arr;
    },
    initChart1() {
      var myChart = echarts.init(document.getElementById("right3chart1"));
      var option = {
        //color: ["#003366", "#006699", "#4cabce", "#e5323e"],
        title: {
          text: "电梯量趋势",
          textStyle: {
            color: "#fff",
            fontSize: 16,
            align: "center"
          },
          x: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: this.chart1.legend,
          type: "scroll",
          orient: "vertical",
          right: 0,
          top: 20,
          bottom: 20,
          textStyle: {
            color: "#fff",
            fontSize: 12
          }
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center"
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: this.chart1.xAxis,
            axisLabel: {
              color: "#fff",
              fontSize: 12
            },
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "#fff",
              fontSize: 12
            },
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            }
          }
        ],
        series: this.chart1.series
      };
      myChart.setOption(option);
    },
    initChart2() {
      var myChart = echarts.init(document.getElementById("right3chart2"));
      var option = {
        title: {
          text: "故障数趋势",
          textStyle: {
            color: "#fff",
            fontSize: 16
          },
          x: "center"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          type: "scroll",
          data: this.chart2.legend,
          textStyle: {
            color: "#fff",
            fontSize: 12
          },
          top: 20
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.chart2.xAxis,
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        series: this.chart2.series
      };

      myChart.setOption(option);
    },
    initChart3() {
      var myChart = echarts.init(document.getElementById("right3chart3"));
      var option = {
        title: {
          text: "困人数趋势",
          textStyle: {
            color: "#fff",
            fontSize: 16
          },
          x: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: this.chart3.legend,
          textStyle: {
            color: "#fff",
            fontSize: 12
          },
          top: 20,
          type: "scroll"
        },

        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.chart3.xAxis,
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            }
          }
        ],
        series: this.chart3.series
      };
      myChart.setOption(option);
    }
  }
};
</script>
