<template>
  <div class="index-con">
    <div class="title">{{title}}</div>
    <p class="clearfix">
      <Select class="right" v-model="selectVal" style="width:100px" @on-change="setSelect()">
        <Option v-for="item in dataList.cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    </p>
    <div class="clearfix">
      <Row>
        <Col span="12">
        <p class="text-middle-white text-center">电梯总量</p>
        <p class="text-large-blue text-center">{{dataList.totalElevator}}</p>
        </Col>
        <Col span="12">
        <p class="text-middle-white text-center">投保数</p>
        <p class="text-large-blue text-center">{{dataList.insuranceNumber}}</p>
        </Col> 
      </Row>
      <Row>
        <Col span="8">
        <p class="text-middle-white text-center">电梯品牌</p>
        <p class="text-large-blue text-center">{{dataList.elevatorBrand}}</p>
        </Col>
        <Col span="8">
        <p class="text-middle-white text-center">物业单位</p>
        <p class="text-large-blue text-center">{{dataList.propertyUnit}}</p>
        </Col> 
        <Col span="8">
        <p class="text-middle-white text-center">维保单位</p>
        <p class="text-large-blue text-center">{{dataList.maintenanceUnit}}</p>
        </Col> 
      </Row>
    </div>
  </div>
</template>
<script>
import Filter from "../../utils/filter";
import { getCityElevator } from "../../service/indexnet.js";
export default {
  name: "right1",
  data() {
    return {
      title: "全市电梯总况",
      dataList: [],
      selectVal: "全市"
    };
  },
  computed: {
    left1data() {
      return this.$store.default.state.pluginsData.cityElevator;
    }
  },
  watch: {
    left1data(val) {
      this.dataList = val;
    }
  },
  mounted() {
    //this.getData();
  },
  methods: {
    // getData() {
    //   this.dataList  = Filter.initialTolowerCase(res);
    // },
    setSelect() {
     // Filter.dispatch("changeParam",'{cityElevatorInfor:this.selectVal}')
      this.$parent.$emit("changeParam",{cityElevatorInfor:this.selectVal})
    }
  }
};
</script>
