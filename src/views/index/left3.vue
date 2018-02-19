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
  .chart{
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
        <p class="text1 text-small-white"><Icon type="person" class="icon-man"/>维保人员：<span class="text-large-blue">20</span></p>
        <p class="text1 text-small-white"><Icon type="person"  class="icon-man"/>维修人员：<span class="text-large-blue">20</span></p>  
      </div>
      <div>
        <p class="text-middle-white">维保完成情况</p>
        <div class="text-center text-large-blue">5000次</div>
      </div>
      <div  @click="leftmodalShow">
        <p class="text-middle-white">维保完成率</p>
        <div class="text-center ">
          <Circle :percent="40" :size="50" :stroke-width="13" :trail-width="13">
            <span class="demo-Circle-inner text-small-white" >80%</span>
          </Circle>
        </div>
      </div>
      </Col>
      <Col span="16">小地图
      </Col>
    </Row>

    </div>
    <div class="display-flex">
      <div  class="flex1">
        <div  class="display-flex">
          <span class="text-small-white">计划用时：</span>
          <div class="line"><span class="line-percent line-yellow" style="width:50%"></span></div>
        </div>
            <div class="display-flex">
              <span class="text-small-white">实际用时：</span>
              <div class="line"><span class="line-percent line-blue" style="width:100%"></span></div>
        </div>          
      </div>
      <div style="margin-left:10px">
        <Circle :percent="40" :size="50" :stroke-width="13" :trail-width="13">
            <span class="demo-Circle-inner text-small-white">80%</span>
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
          <Table :columns="columns1" :data="data1"></Table>
          </Col>
          <Col span="14">
          <div id="left3chart1" class="chart"></div>
          </Col>
        </Row>

    </Modal>
  </div>
</template>
<script>
var echarts = require("echarts");

export default {
  name: "left3",
  data() {
    return {
      title: "维保情况",
      leftmodal1: false,
      columns1: [
        {
          title: "区域",
          key: "name"
        },
        {
          title: "计划",
          key: "age"
        },
        {
          title: "实际",
          key: "address"
        },
        {
          title: "完成率",
          key: "date"
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ]
    };
  },
  methods: {
    leftmodalShow() {
      this.leftmodal1 = true;
      this.initchart();
    },
    initchart() {
      var myChart = echarts.init(document.getElementById("left3chart1"));
      var option = {
        title:{
          text:"图表标题",
           x: "center",
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
        toolbox: {
          // feature: {
          //   dataView: { show: true, readOnly: false },
          //   magicType: { show: true, type: ["line", "bar"] },
          //   restore: { show: true },
          //   saveAsImage: { show: true }
          // }
        },
        legend: {
          data: ["蒸发量", "降水量", "平均温度"],
          bottom:0
        },
        xAxis: [
          {
            type: "category",
            data: [
              "华北",
              "华东",
              "华南",
              "东北",
              "西南西北"
            ],
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
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
            ]
          },
          {
            name: "实际",
            type: "bar",
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7
            ]
          },
          {
             name: "完成率",
            type: "line",
            yAxisIndex: 1,
            data: [
              2.0,
              2.2,
              3.3,
              4.5,
              6.3
            ]
          }
        ]
      };
      // 绘制图表
      myChart.setOption(option);
    }
  }
};
</script>
