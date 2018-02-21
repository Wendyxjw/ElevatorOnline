<style  scoped lang="less">

</style>
<template>
  <div class="index-con">
    <div class="title">{{title}}</div>
    <div class="text-center">
      <ButtonGroup >
        <Button type="primary">
            电梯里
        </Button>
        <Button >
            故障数
        </Button>
        <Button >
            困人数
        </Button>
    </ButtonGroup>
    <div id="right3chart1"  style="width: 100%;height:100%;min-height:300px;">

      </div>
    </div>
  </div>
  
</template>
<script>
var echarts = require("echarts");
export default {
  name: "right3",
  data() {
    return {
      title: "趋势"
    };
  },
  mounted() {
    this.initChart1();
  },
  methods: {
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
          data: ["Forest", "Steppe", "Desert", "Wetland"],
          type: "scroll",
          orient: "vertical",
          right:0,
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
          top: "center",
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
            axisLabel:{
              color:"#fff",
              fontSize:12,
            },
            axisLine:{
              lineStyle:{
                color:"#fff"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel:{
              color:"#fff",
              fontSize:12,
            },
            axisLine:{
              lineStyle:{
                color:"#fff"
              }
            }
          }
        ],
        series: [
          {
            name: "Forest",
            type: "bar",
            barGap: 0,
            //label: labelOption,
            data: [320, 332, 301, 334, 390]
          },
          {
            name: "Steppe",
            type: "bar",
            //label: labelOption,
            data: [220, 182, 191, 234, 290]
          },
          {
            name: "Desert",
            type: "bar",
           // label: labelOption,
            data: [150, 232, 201, 154, 190]
          },
          {
            name: "Wetland",
            type: "bar",
          //  label: labelOption,
            data: [98, 77, 101, 99, 40]
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>
