<style  scoped lang="less">
.flex {
  display: flex;
}
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
  background-color: #18579a;
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
.elevatorInfoModal {
  .left-dom {
    width: 500px;
    margin: 10px;
    .box {
      border: 1px solid #999;
    }
    .title {
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      border-bottom: 1px solid #999;
    }
    .inner {
      height: 400px;
      .left {
        width: 240px;
        text-align: center;
      }
      .right {
        width: 225px;
        .state-box {
          margin-top: 20px;
          .name {
            font-weight: bold;
            text-align: left;
          }
          .value {
            width: 150px;
            text-align: center;
          }
        }
        .bottom-btn {
          position: relative;
          bottom: -60px;
          right: -110px;
        }
      }
    }
  }
  .right-dom {
    width: 860px;
    margin: 10px;
    .table-box {
      border: 1px solid #999;
      .title {
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
        border-bottom: 1px solid #999;
      }
      .inner {
        height: 400px;
      }
    }
  }
}
.theFaultModal {
  padding: 10px;
  .title {
    background-color: #eee;
    text-align: center;
    padding: 10px;
  }
  .pt-10 {
    padding-top: 30px;
  }
  .mr-100 {
    margin-right: 100px;
  }
  .m-0-20 {
    margin: 0 20px;
  }
  .bold {
    font-weight: bold;
  }
  .time-box {
    .title-name {
      width: 200px;
    }
    .img-box {
      max-width: 500px;
      max-height: 500px;
    }
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
                <span class="item text-large-white" >{{item.num}}
                  <Icon :type="item.class" :style="{color:item.color}"></Icon>
                  <span :class="[item.type=='up'? 'dot-text-top' : 'dot-text-bottom', 'dot-text']" >{{item.rate}}</span>
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
    
 
        <!-- <Modal
        v-model="indexmapModal"
        width="1000"
        class-name="leftmodal">
        <header class="mtitle">
            <br> <br>
        </header>
         <Table :columns="tableTitle" :data="tableList"></Table>

        </Modal> -->


        <!-- 电梯运行信息 -->
        <Modal
        v-model="elevatorInfoModal"
        width="1400"
        class-name="elevatorInfoModal">
        <header class="mtitle" >
            电梯监控
        </header>
        <div class="flex">
          <div class="left-dom">
            <div class="box" style="margin-bottom:10px;">
              <div class="title">电梯视频监控</div>
              <div class="inner"></div>
            </div>
            <div class="box">
              <div class="title">电梯运行状态</div>
              <div class="inner flex">
                <div class="left">Adobe</div>
                <div class="right">
                  <div style="border-bottom: 1px solid #999;padding:10px;">设备在线</div>
                  <div class="flex state-box">
                    <div class="name">当前状态</div>
                    <div class="value">-</div>
                  </div>
                  <div class="flex state-box">
                    <div class="name">运行方式</div>
                    <div class="value">-</div>
                  </div>
                  <div class="flex state-box">
                    <div class="name">运行状态</div>
                    <div class="value">-</div>
                  </div>   
                  <div class="flex state-box">
                    <div class="name">运行速度</div>
                    <div class="value">-</div>
                  </div>
                  <div class="flex state-box">
                    <div class="name">更新时间</div>
                    <div class="value">-</div>
                  </div>
                  <div class="bottom-btn">
                    <Button>查看详情</Button> 
                  </div>               
                </div>
              </div>
            </div>
          </div>
          <div class="right-dom">
            <div class="table-box" style="margin-bottom:10px;">
              <div class="title">电梯故障记录</div>
              <div class="inner table-dom">
                <Table :height="348" :columns="elevatorInfo.errorData.tableTitle" :data="elevatorInfo.errorData.tableListShow"  stripe></Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="elevatorInfo.errorData.tableList.length" :page-size="5" show-total :current="1" @on-change="getElevatorErrorData"></Page>
                    </div>
                </div>
              </div>
            </div>
            <div class="table-box" >
              <div class="title">电梯基本信息</div>
              <div class="inner">
                <Table :height="400" :columns="elevatorInfo.basicData.tableTitle" :data="elevatorInfo.basicData.tableList" :show-header="false" stripe></Table>
              </div>
            </div>
          </div>
        </div>

        </Modal>      


        <!-- 故障实时进展 -->
        <Modal
        v-model="theFaultModal"
        width="1800"
        class-name="theFaultModal">
        <header class="mtitle pt-10" style="padding-left:40px;">
            故障实时进展
        </header>
         <div style="padding:20px 40px;">
           <div class="title">
             报修信息
           </div>
           <div class="flex pt-10">
             <div class="mr-100">
               故障类型:    
              <Select v-model="theFaultInfo.reportData.errorType" :value="theFaultInfo.reportData.errorType" disabled style="width:150px;margin:0 20px;">
                <Option v-for="item in [theFaultInfo.reportData.errorType]" :value="item" :key="item">{{ item }}</Option>
              </Select>
             </div>
            <div>
               报修来源:    
              <Select v-model="theFaultInfo.reportData.errorSource" :value="theFaultInfo.reportData.errorSource" disabled style="width:150px;margin:0 20px;">
                <Option v-for="item in [theFaultInfo.reportData.errorSource]" :value="item" :key="item">{{ item }}</Option>
              </Select>
             </div>
           </div>
           <div class="flex pt-10">
             <div class="mr-100">
                报修人：{{theFaultInfo.reportData.applyPerson}}
             </div>
             <div class="mr-100">
                联系方式：{{theFaultInfo.reportData.phone}}
             </div>
             <div class="mr-100">
                报修时间：{{theFaultInfo.reportData.applyDate}}
             </div>             
           </div>
           <div class="flex pt-10">
              故障描述：<Input style="width:800px;" v-model="theFaultInfo.reportData.errorDesc" type="textarea" disabled></Input>
           </div>
         </div>
         <div class="pt-10" style="padding:20px 40px;">
            <div class="title">
              维修信息
            </div>
            <div class="pt-10 time-box">
              <Tabs type="card">
                  <TabPane :label="item.tabName" v-for="item in theFaultInfo.repairDataList" style="padding:20px 150px;">
                    <div>
                      <Timeline>
                        <TimelineItem v-for="ele in item.timeDataList">
                          <div class="flex">
                            <div class="m-0-20 bold">
                              {{ele.time}}
                              <div style="text-align:center;">
                                {{ele.timeDifference}}
                              </div>
                            </div>
                            <div class="m-0-20 bold title-name">
                              {{ele.title}}  
                            </div>
                            <div v-if="ele.type==='text'" >
                                <div v-if="ele.infoList" v-for="el in ele.infoList" class="flex m-0-20">
                                  <div>{{el.name}}：</div>
                                  <div>{{el.value}}</div>
                                </div>
                            </div>
                            <div v-if="ele.type==='img'">
                              <img :src="ele.imgUrl" alt="" class="img-box">
                            </div>
                            <div v-if="ele.type==='detail'">
                              <Button type="primary" class="m-0-20">详情</Button>
                            </div>
                          </div>

                        </TimelineItem>
                      </Timeline>
                    </div>
                  </TabPane>
              </Tabs>
            </div>
         </div>
        </Modal>
  </div>

</template>
<script>
const moment = require("moment");
import { getMapData, getElevatorMonitoring } from "../../service/indexnet.js";
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
        geoCoordMap: {},
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
        mapZoom: 14, //地图缩放
        mapDataSelect: ["电梯分布"], //标注类型
        cityElevatorInfor: "全市"
      },
      res: {},
      indexmapModal: true,
      elevatorInfoModal: true,
      theFaultModal: true,
      tableTitle: [
        {
          title: "电梯编号",
          key: "SNo",
          align: "center"
        },
        {
          title: "所属区域",
          key: "Code",
          align: "center"
        },
        {
          title: "详细地址",
          key: "AD",
          align: "center",
          width: 300
        },
        {
          title: "事件信息",
          key: "eventInfor",
          align: "center"
        },
        {
          title: "是否困人",
          key: "isTrapped",
          align: "center"
        },
        {
          title: "报警电话",
          key: "alarmTel",
          align: "center",
          width: 120
        },
        {
          title: "状态",
          key: "state",
          align: "center"
        },
        {
          title: "处理结果",
          key: "resoult",
          align: "center"
        }
      ],
      tableList: [
        {
          SNo: 1, //电梯编号
          Code: "2", //所属区域
          AD: "浙江省杭州市西湖区文三路华星时代广场A坐1111", //详细地址
          eventInfor: "12", //事件信息
          isTrapped: 1, //是否困人：1 是 ，0 否
          alarmTel: 13412341234, //报警电话
          state: "12", //状态
          resoult: "12" //处理结果
        },
        {
          SNo: 1, //电梯编号
          Code: "2", //所属区域
          AD: "浙江省杭州市西湖区文三路华星时代广场A坐1111", //详细地址
          eventInfor: "12", //事件信息
          isTrapped: 1, //是否困人：1 是 ，0 否
          alarmTel: 13412341234, //报警电话
          state: "12", //状态
          resoult: "12" //处理结果
        },
        {
          SNo: 1, //电梯编号
          Code: "2", //所属区域
          AD: "浙江省杭州市西湖区文三路华星时代广场A坐1111", //详细地址
          eventInfor: "12", //事件信息
          isTrapped: 1, //是否困人：1 是 ，0 否
          alarmTel: 13412341234, //报警电话
          state: "12", //状态
          resoult: "12" //处理结果
        }
      ],
      elevatorInfo: {
        stateData: {
          //电梯状态
        },
        errorData: {
          //电梯错误信息
          tableTitle: [
            {
              title: "序号",
              key: "id"
            },
            {
              title: "告警时间",
              key: "time"
            },
            {
              title: "事故类型",
              key: "eventType"
            },
            {
              title: "故障描述",
              key: "errorDesc"
            },
            {
              title: "处理阶段",
              key: "phase"
            },
            {
              title: "状态",
              key: "state"
            },
            {
              title: "操作",
              key: "action",
              width: 150,
              render: (h, params) => {
                return h("div", [
                  h(
                    "Button",
                    {
                      props: {
                        type: "primary",
                        size: "small"
                      },
                      style: {},
                      on: {
                        click: () => {
                          this.elevatorErrorDataOperate(params.index);
                        }
                      }
                    },
                    "操作"
                  )
                ]);
              }
            }
          ],
          showTableList: [],
          tableList: [
            {
              id: 123,
              time: "2016-5-21 14:22",
              eventType: "困人",
              errorDesc: "遁地",
              phase: "已接警",
              state: "处理中"
            },
            {
              id: 123,
              time: "2016-5-21 14:22",
              eventType: "困人",
              errorDesc: "遁地",
              phase: "已接警",
              state: "处理中"
            },
            {
              id: 123,
              time: "2016-5-21 14:22",
              eventType: "困人",
              errorDesc: "遁地",
              phase: "已接警",
              state: "处理中"
            },
            {
              id: 4,
              time: "2016-5-21 14:22",
              eventType: "困人",
              errorDesc: "遁地",
              phase: "已接警",
              state: "处理中"
            },
            {
              id: 5,
              time: "2016-5-21 14:22",
              eventType: "困人",
              errorDesc: "遁地",
              phase: "已接警",
              state: "处理中"
            },
            {
              id: 6,
              time: "2016-5-21 14:22",
              eventType: "困人",
              errorDesc: "遁地",
              phase: "已接警",
              state: "处理中"
            },
            {
              id: 7,
              time: "2016-5-21 14:22",
              eventType: "困人",
              errorDesc: "遁地",
              phase: "已接警",
              state: "处理中"
            },
            {
              id: 8,
              time: "2016-5-21 14:22",
              eventType: "困人",
              errorDesc: "遁地",
              phase: "已接警",
              state: "处理中"
            },
            {
              id: 9,
              time: "2016-5-21 14:22",
              eventType: "困人",
              errorDesc: "遁地",
              phase: "已接警",
              state: "处理中"
            },
            {
              id: 10,
              time: "2016-5-21 14:22",
              eventType: "困人",
              errorDesc: "遁地",
              phase: "已接警",
              state: "处理中"
            },
            {
              id: 11,
              time: "2016-5-21 14:22",
              eventType: "困人",
              errorDesc: "遁地",
              phase: "已接警",
              state: "处理中"
            }
          ]
        },
        basicData: {
          //电梯基本信息
          tableTitle: [
            {
              title: "",
              key: "name1",
              align: "center"
            },
            {
              title: "",
              key: "value1",
              align: "center"
            },
            {
              title: "",
              key: "name2",
              align: "center"
            },
            {
              title: "",
              key: "value2",
              align: "center"
            }
          ],
          tableList: [
            {
              name1: "电梯注册编号：",
              value1: 3303872299118,
              name2: "电梯救援识别码:",
              value2: null
            },
            {
              name1: "电梯安装地址：",
              value1: "天蓝心广场-1",
              name2: "所在区域:",
              value2: "天蓝心广场"
            },
            {
              name1: "电梯所在省市县（区）：",
              value1: "柯桥区",
              name2: "电梯类型:",
              value2: "乘客电梯"
            },
            {
              name1: "电梯品牌：",
              value1: "",
              name2: "电梯型号:",
              value2: ""
            },
            {
              name1: "使用单位：",
              value1: "绍兴市华联物业有限公司（天蓝心广场-1）",
              name2: "电梯维保单位:",
              value2: "绍兴市华联物业有限公司"
            },
            {
              name1: "制造单位：",
              value1: "",
              name2: "电梯安装单位:",
              value2: ""
            },
            {
              name1: "电梯地址：",
              value1: "",
              name2: "电梯使用状态:",
              value2: "正常"
            }
          ]
        }
      },
      theFaultInfo: {
        reportData: {
          errorType: "困人",
          errorSource: "电话保修",
          applyPerson: "LLL",
          phone: "13812345678",
          applyDate: "2015-2-12 19:23",
          errorDesc: "十年生死两茫茫，不思量，自难忘。"
        },
        repairDataList: [
          {
            tabName: "张三",
            timeDataList: [
              {
                time: "20:10",
                type: "text",
                title: "报修",
                timeDifference: "3分"
              },
              {
                time: "20:13",
                type: "text",
                title: "自动派单",
                timeDifference: "4分"
              },
              {
                time: "20:17",
                type: "text",
                title: "自动派单成功自动派单成功",
                timeDifference: "3分",
                infoList: [
                  { name: "维修人", value: "123455" },
                  { name: "联系方式", value: "123455" },
                  { name: "出发时间", value: "2015-2-12 20:12" },
                  { name: "到达时间", value: "2015-2-12 20:24" }
                ]
              },
              {
                time: "20:20",
                type: "text",
                title: "报修",
                timeDifference: "",
                infoList: [
                  { name: "维修人", value: "123455" },
                  { name: "联系方式", value: "123455" },
                  { name: "出发时间", value: "2015-2-12 20:12" },
                  { name: "到达时间", value: "2015-2-12 20:24" }
                ]
              },
              {
                time: "20:13",
                type: "detail",
                title: "自动派单",
                timeDifference: "4分"
              },
              {
                time: "20:11",
                type: "img",
                title: "报修",
                timeDifference: "",
                imgUrl:
                  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528040650451&di=84e6990325f136dbf25ebb964b533ec3&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F120727%2F201995-120HG1030762.jpg"
              }
            ]
          },
          {
            tabName: "李四",
            timeDataList: [
              {
                time: "20:11",
                type: "img",
                title: "报修",
                timeDifference: "",
                imgUrl:
                  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528040650451&di=84e6990325f136dbf25ebb964b533ec3&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F120727%2F201995-120HG1030762.jpg"
              }
            ]
          },
          {
            tabName: "哈哈哈",
            timeDataList: [
              {
                time: "20:13",
                type: "text"
              }
            ]
          }
        ]
      }
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
    this.elevatorInfo.errorData.tableListShow = this.elevatorInfo.errorData.tableList.slice(
      0,
      5
    );
    this.websocketEvent();
    //this.getData();
    this.$on("changeParam", this.onParamChange);
    this.myChart = echarts.init(document.getElementById("indexMap"));
    this.myChart.on("click", function(params) {
      console.log(params);
    });
  },
  methods: {
    getData() {
      getindex().then(res => {
        this.res = res;
        this.formatData(res);
      });
    },
    formatData(res) {
      var data = Filter.initialTolowerCase(res.data);
      this.res = Object.assign(this.res, data);
      this.$store.default.dispatch("getPluginsData", this.res);
      //debugger
      this.topData = [];
      for (let i in this.res.indexData) {
        var item = this.res.indexData[i];
        if (i == "cityFaultIndex") {
          item.text = "全市故障指数";
          item.color = item.type != "up" ? "#09cc09" : "red";
        } else if (i == "cityMaintenanceIndex") {
          item.text = "全市维保指数";
          item.color = item.type != "up" ? "#09cc09" : "red";
        } else if (i == "residenceElevatorsNum") {
          item.text = "住宅电梯运行量";
          item.color = item.type == "up" ? "#09cc09" : "red";
        } else if (i == "businessElevatorsNum") {
          item.text = "商业电梯运行量";
          item.color = item.type == "up" ? "#09cc09" : "red";
        } else {
          continue;
        }
        item.class = item.type == "up" ? "arrow-up-a" : "arrow-down-a";
        this.topData.push(item);
      }

      this.indexData = this.res.indexData;

      if (data.map) {
        this.mapConfig.data = this.res.map.data;
        var geoCoordMap = {};
        for (let j in this.res.map.data) {
          let item = this.res.map.data[j];
          geoCoordMap[item.name] = item.xys;
        }

        this.mapConfig.geoCoordMap = geoCoordMap;
        this.mapConfig.center = this.getmapCenter(this.mapConfig.geoCoordMap);
        console.log(data.map);
        //第一条有故障时 勾选中故障分布
        if (
          this.res.map.data[0].isError &&
          this.wsParam.mapDataSelect.indexOf("故障分布") == -1
        ) {
          this.wsParam.mapDataSelect.push("故障分布");
          this.mapConfig.typeStyle.type.push(3);
          this.changeEvent();
        } else {
          this.initmap();
        }
      }

      this.isShow = true;
    },
    getmapCenter(map) {
      for (let i in map) {
        return map[i];
      }
    },
    initmap() {
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
        if (type === 3 && this.mapConfig.typeStyle.type.length === 0) {
          dataList = [];
        }
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
            data: convertData(_this.mapConfig.data, 3),
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
        this.$emit("changeParam", { mapZoom: this.mapConfig.zoom });
      });
      bmap.addEventListener("click", function(type) {
        return false;
      });
    },
    websocketEvent() {
      //this.ws = new WebSocket("wss://echo.websocket.org");
      this.ws = new WebSocket("ws://117.50.27.64:86/webhiter");
      this.ws.onopen = evt => {
        this.ws.send(JSON.stringify(this.wsParam));
        // setInterval(() => {
        //   this.ws.send("北京时间：" + moment().format("YY-HH-dd hh:mm:ss"));
        // }, 1000);
      };
      this.ws.onmessage = evt => {
        //debugger;
        // console.log(evt.data);
        try {
          var wsres = eval("(" + evt.data + ")");
          if (wsres.success) {
            this.formatData(wsres);
          }
        } catch (e) {
          console.log(e);
        }

        //this.formatData(this.res); //evt.data
      };

      this.ws.onclose = evt => {};
    },
    onParamChange(data) {
      this.wsParam = Object.assign(this.wsParam, data);
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
      this.initmap();
      //this.$emit("changeParam");
    },
    qColorEvent(val) {
      if (this.mapConfig.typeStyle.type.indexOf(3) !== -1) {
      }
      return "#fff";
    },
    showElevatorMonitoring() {},
    elevatorErrorDataOperate(index) {
      console.log(index);
    },
    getElevatorErrorData(pageIndex) {
      console.log(pageIndex);
      this.elevatorInfo.errorData.tableListShow = this.elevatorInfo.errorData.tableList.slice(
        pageIndex * 5 - 5,
        pageIndex * 5
      );
    }
  }
};
</script>
