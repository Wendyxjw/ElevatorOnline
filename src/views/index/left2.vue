<template>
  <div class="index-con">
    <div class="title">{{title}}</div>
    <Table :columns="tableTitle" :data="tableList"></Table>
  </div>
</template>
<script>
import Filter from "../../utils/filter";
import { getWarnEventList } from "../../service/indexnet.js";
export default {
  name: "left2",
  data() {
    return {
      title: "报警事件列表",
      tableTitle: [],
      tableList: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getWarnEventList().then(res => {
        var data = Filter.initialTolowerCase(res);
        this.tableTitle=data.tableTitle
        this.tableList=data.tableList
      });
    }
  }
};
</script>
