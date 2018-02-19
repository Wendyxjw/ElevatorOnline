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
  .line{
    display: inline-block;
    flex: 1;
  }
  .line-percent{
    height: 8px;
    display: inline-block;
    position: relative;
    top: 0;
    left: 0;
    border-radius: 10px;
  }
  .line-yellow{
    background-color: #CCCC00;
  }
  .line-blue{
    background-color: @blue;
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
      <div>
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
  </div>
</template>
<script>
export default {
  name: "left3",
  data() {
    return {
      title: "维保情况"
    };
  }
};
</script>
