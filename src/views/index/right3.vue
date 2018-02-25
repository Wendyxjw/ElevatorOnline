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
        this.initChart2();
        this.initChart3();
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
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
          textStyle: {
            color: "#fff",
            fontSize: 12
          },
          top: 20
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
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
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
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
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
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
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
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
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>
