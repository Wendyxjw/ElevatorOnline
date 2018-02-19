<style  scoped lang="less">

</style>

<template>
  <div class="index-con left1">
    <div class="title">{{title}}</div>

  <Row>
        <Col span="12">
        <div>
           <Row>
              <Col span="12"><span class="text-middle-white">日事件报警总数：</span><br><span class="text-large-blue"><router-link :to="{ path: 'dayevent'}" target="_blank">25600起</router-link></span></Col>
              <Col span="12"><span class="text-middle-white">日事件已处理数：</span><br><span class="text-large-blue">25595起</span></Col>
          </Row>
          <Row>
              <Col span="12"><span class="text-middle-white">日事件困人数：</span><br><span class="text-large-blue">30起</span></Col>
              <Col span="12"><span class="text-middle-white">困人故障平均处理时长：</span><br><span class="text-large-blue">10分钟</span></Col>
          </Row>

      </div>
      <div id="chart1"  style="width: 100%;height:100%;min-height:200px;">

      </div>
        </Col>
        <Col span="12">
        <div>视频</div>

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
    </div>
  </div>
</template>
<script>
var echarts = require("echarts");
export default {
  name: "left1",
  data() {
    return {
      title: "日事件感知与智能处理"
    };
  },
  mounted() {
    this.initChart1();
    this.initChart2();
    this.initChart3();
  },
  methods: {
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
          data: ["直接访问", "邮件营销", "联盟广告"],
          textStyle: {
                  color: "#fff",
                  fontSize: 12
                }
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "70%"],
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
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
            ]
          }
        ],
        
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
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "sssss"],
          textStyle: {
                  color: "#fff",
                  fontSize: 14  
                }
        },
        series: [
          {
            name: "故障分类",
            type: "pie",
            radius: "55%",
            center: ["60%", "50%"],
           data: [
              { value: 335, name: "直接访问", label: { fontSize: 14 } },
              { value: 310, name: "邮件营销", label: { fontSize: 14 } },
              { value: 234, name: "联盟广告", label: { fontSize: 14 } },
              { value: 135, name: "视频广告", label: { fontSize: 14 } },
              { value: 1548, name: "视频广告", label: { fontSize: 14 } }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            label:{
              color:"#fff",
              fontSize:12
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
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "sssss"],
          textStyle: {
                  color: "#fff",
                  fontSize: 12
                }
        },
        series: [
          {
            name: "故障部件",
            type: "pie",
            radius: "55%",
            center: ["40%", "50%"],
           data: [
              { value: 335, name: "直接访问", label: { fontSize: 14 } },
              { value: 310, name: "邮件营销", label: { fontSize: 14 } },
              { value: 234, name: "联盟广告", label: { fontSize: 14 } },
              { value: 135, name: "视频广告", label: { fontSize: 14 } },
              { value: 1548, name: "sssss", label: { fontSize: 14 } }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            label:{
              color:"#fff",
              fontSize:12
            }
          }
        ]
      };

      myChart.setOption(option);
     
    }
  }
};
</script>
