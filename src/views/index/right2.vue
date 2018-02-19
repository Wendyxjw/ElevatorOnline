<style  scoped lang="less">

</style>
<template>
  <div class="index-con right2">
    <div class="title">{{title}}</div>
    <div class="">
      <ul>
        <li class="text-small-white">累计运行次数：<span class="text-middle-blue">11次</span></li>
        <li class="text-small-white">累计监管运行时长：<span class="text-middle-blue">11次</span></li>
        <li class="text-small-white">平均日运行时间：<span class="text-middle-blue">11次</span></li>
        <li class="text-small-white">高峰期运行占比：<span class="text-middle-blue">11次</span></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name:"right2",
  data(){
      return{
          title:"电梯物联网感知 300安装物联网电梯列表"
      }
  }
}
</script>
