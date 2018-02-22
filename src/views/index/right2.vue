<style  scoped lang="less">

</style>
<template>
  <div class="index-con right2">
    <div class="title">{{title}}</div>
    <div class="">
      <ul>
        <li class="text-small-white">累计运行次数：<span class="text-middle-blue">{{dataList.operationTimes}}次</span></li>
        <li class="text-small-white">累计监管运行时长：<span class="text-middle-blue">{{dataList.supervisionRunTime}}次</span></li>
        <li class="text-small-white">平均日运行时间：<span class="text-middle-blue">{{dataList.averageDailyRunningTime}}次</span></li>
        <li class="text-small-white">高峰期运行占比：<span class="text-middle-blue">{{dataList.peakRunningRatio}}次</span></li>
      </ul>
    </div>
  </div>
</template>
<script>
import Filter from "../../utils/filter";
import { getElevatorIOTPerception } from "../../service/indexnet.js";
export default {
  name: "right2",
  data() {
    return {
      title: "电梯物联网感知 300安装物联网电梯列表",
      dataList:{}
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getElevatorIOTPerception().then(res => {
        this.dataList = Filter.initialTolowerCase(res);
        //this.dataList = data.cityList;
      });
    }
  }
};
</script>
