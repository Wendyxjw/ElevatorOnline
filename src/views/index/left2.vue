<template>
  <div class="index-con">
    <div class="title">{{title}}</div>
    <Table :columns="columns1" :data="data1"></Table>
  </div>
</template>
<script>
export default {
  name:"left2",
  data(){
      return{
          title:"报警事件列表",
          columns1: [
                    {
                        title: '时间',
                        key: 'time'
                    },
                    {
                        title: '地点',
                        key: 'address'
                    },
                    {
                        title: '类型',
                        key: 'type'
                    }
                ],
                data1: [
                    {
                        time: 'John Brown',
                        address: 18,
                        type: 'New York No. 1 Lake Park',
                    },
                    {
                        time: 'John Brown',
                        address: 18,
                        type: 'New York No. 1 Lake Park',
                    },
                    {
                        time: 'John Brown',
                        address: 18,
                        type: 'New York No. 1 Lake Park',
                    }
                ]
      }
  }
}
</script>
