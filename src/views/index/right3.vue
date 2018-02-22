<style  scoped lang="less">

</style>
<template>
  <div class="index-con">
    <div class="title">{{title}}</div>
    <div class="text-center">
     <RadioGroup v-model="radioval" type="button">
        <Radio label="电梯里"></Radio>
        <Radio label="故障数"></Radio>
        <Radio label="困人数"></Radio>
    </RadioGroup>
    <div id="right3chart1"  style="width: 100%;height:100%;min-height:300px;">

      </div>
    </div>
  </div>
  
</template>
<script>
var echarts = require("echarts");
import Filter from "../../utils/filter";
import { getTrend } from "../../service/indexnet.js";
export default {
  name: "right3",
  data() {
    return {
      title: "趋势",
      radioval: "电梯里",
      legend: [],
      series: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getTrend().then(res => {
        var data = Filter.initialTolowerCase(res);
        this.legend = this.getLegend(data);
        this.series = this.getSeries(data);
        this.initChart1();
      });
    },
    getLegend(data) {
      var arr = [];
      for (let i in data) {
        arr[i] = data[i].name;
        //console.log(data[i].name)
      }
      return arr;
    },
    getSeries(data) {
      var arr = [];
      for (let i in data) {
        arr[i] = data[i];
        arr[i].type = "bar";
        arr[i].barGap = 0;
        //console.log(data[i].name)
      }
      return arr;
    },
    initChart1() {
      var myChart = echarts.init(document.getElementById("right3chart1"));
      var option = {
        //color: ["#003366", "#006699", "#4cabce", "#e5323e"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: this.legend,
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
          // feature: {
          //   mark: { show: true },
          //   dataView: { show: true, readOnly: false },
          //   magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
          //   restore: { show: true },
          //   saveAsImage: { show: true }
          // }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: ["2012", "2013", "2014", "2015", "2016"],
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
        series: this.series
      };
      myChart.setOption(option);
    }
  }
};
</script>
