<style  scoped lang="less">
.dayevent {
    padding: 10px 0;
  .con {
    width: 70%;
    margin: auto;
  }
  .mar-b10{
      margin-bottom: 10px;
  }
}
</style>
<template>
<div class="dayevent">
<p class="text-center text-large-black mar-b10">{{title}}</p>
<div class="con">
    <div class="mar-b10">
        <Select v-model="selectInfor" style="width:100px" @on-change="setInfor()" placeholder="信息来源">
            <Option v-for="item in inforList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="selectHandel" style="width:100px" @on-change="setHandel()" placeholder="处理状态">
            <Option v-for="item in handelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
    </div>
    <Table :columns="columns1" :data="data1" class="mar-b10"></Table>
    <div>
        <Page :total="100" class="right" show-sizer></Page>
    </div>
    
</div>
<div>

</div>
</div>
</template>
<script>
export default {
  data() {
    return {
      title: "电梯物联网标题",
      disabledGroup: "维保单位",
      inforList: [
        {
          value: "物业",
          label: "物业"
        },
        {
          value: "北仑区",
          label: "北仑区"
        },
        {
          value: "海曙区",
          label: "海曙区"
        }
      ],
      handelList: [
        {
          value: "待响应",
          label: "待响应"
        },
        {
          value: "处理中",
          label: "处理中"
        },
        {
          value: "已完成",
          label: "已完成"
        }
      ],
      selectInfor: "",
      selectHandel: "",
      columns1: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
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

  mounted() {},
  methods: {}
};
</script>
