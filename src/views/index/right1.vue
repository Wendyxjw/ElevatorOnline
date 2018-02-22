<template>
  <div class="index-con">
    <div class="title">{{title}}</div>
    <p class="clearfix">
      <Select class="right" v-model="selectVal" style="width:100px" @on-change="setSelect()">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    </p>
    <div class="clearfix">
      <Row>
        <Col span="12">
        <p class="text-middle-white text-center">电梯总量</p>
        <p class="text-large-blue text-center">1000</p>
        </Col>
        <Col span="12">
        <p class="text-middle-white text-center">投保数</p>
        <p class="text-large-blue text-center">1000</p>
        </Col> 
      </Row>
      <Row>
        <Col span="8">
        <p class="text-middle-white text-center">电梯品牌</p>
        <p class="text-large-blue text-center">30</p>
        </Col>
        <Col span="8">
        <p class="text-middle-white text-center">物业单位</p>
        <p class="text-large-blue text-center">200</p>
        </Col> 
        <Col span="8">
        <p class="text-middle-white text-center">维保单位</p>
        <p class="text-large-blue text-center">100</p>
        </Col> 
      </Row>
    </div>
  </div>
</template>
<script>
import Filter from "../../utils/filter";
import { getWarnEventList } from "../../service/indexnet.js";
export default {
  name:"right1",
  data(){
      return{
          title:"全市电梯总况",
          cityList: [
                    {
                        value: '全市',
                        label: '全市'
                    },
                    {
                        value: '北仑区',
                        label: '北仑区'
                    },
                    {
                        value: '海曙区',
                        label: '海曙区'
                    }
                ],
        selectVal:"全市"
      }
  },
  methods:{
    setSelect(){
      console.log(this.selectVal)
    }
  }
}
</script>
