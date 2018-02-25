<style  scoped lang="less">
.dayevent {
  padding: 10px 0;
  .con {
    width: 70%;
    margin: auto;
  }
  .mar-b10 {
    margin-bottom: 10px;
  }
}
</style>
<template>
<div class="dayevent">
<p class="text-center text-large-black mar-b10">{{title}}</p>
<div class="con">
    <div class="mar-b10">
        <Select v-model="param.selectInfor" style="width:100px" @on-change="selectData()" placeholder="信息来源">
            <Option v-for="item in inforList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="param.selectHandel" style="width:100px" @on-change="selectData()" placeholder="处理状态">
            <Option v-for="item in handelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
    </div>
    <Table :columns="tableTitle" :data="tableList" class="mar-b10"></Table>
    <div>
        <Page :total="pageTotle" class="right" show-sizer @on-change="getData()"></Page>
    </div>
    
</div>
<div>

</div>
</div>
</template>
<script>
import Filter from "../../utils/filter";
import { getDayHandleDetail } from "../../service/indexnet.js";
export default {
  data() {
    return {
      title: "电梯物联网标题",
      disabledGroup: "维保单位",
      inforList: [],
      handelList: [],
      tableTitle: [],
      tableList: [],
      pageTotle: 100, //列表总数
      param: {
        pageSize: 10,
        pageIndex: 0, //第几页
        selectInfor: "",
        selectHandel: ""
      }
    };
  },

  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      console.log(this.param);
      getDayHandleDetail(this.param).then(res => {
        var data = Filter.initialTolowerCase(res);
        this.inforList = data.sourceInfor;
        this.handelList = data.handelStatus;
        this.tableTitle = data.tableTitle;
        this.tableList = data.tableList;
        this.pageTotle = data.pageTotle;
        this.param.pageIndex+=1;
      });
    },
    selectData(){
      //筛选数据时 页数置为1
      this.param.pageIndex=0;
      this.getData()
    }
  }
};
</script>
