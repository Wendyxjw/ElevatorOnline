
<style  scoped lang="less">
.left2 {
  .ulBox {
    max-height: 300px;
    width: 100%;
    background-color: #fff;
    overflow: hidden;
    .idiv {
      display: inline-block;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 32%;
    }
    .tTitle {
      font-weight: bold;
      background-color: #f8f8f9;
      border-bottom: 1px solid;
      width: 33.3%;
    }
  }
  #box {
    width: 100%;
    height: 130px;
    overflow: hidden;
  }
  .anim {
    transition: all 1s;
    margin-top: -30px;
  }
  #con1 li {
    display: inline-block;
    width: 100%;
    line-height: 40px;
    height: 40px;
  }
}
</style>
<template>
  <div class="index-con left2">
    <div class="title">{{title}}</div>
    <div class="ulBox">
      <div>
        <div class="idiv tTitle" v-for="item in tableTitle" :key="item.id">
          {{item.title}}
        </div>
      </div>
      <div id="box" @mouseover="stopT()" @mouseout="beginT()">
        <ul id="con1" ref="con1" :class="{anim:animate==true}">
          <li v-for="item in tableList" :key="item.id">
            <div class="idiv" :title="item.time">{{item.time}}</div>
            <div class="idiv" :title="item.address">{{item.address}}</div>
            <div class="idiv" :title="item.type">{{item.type}}</div>
          </li>
        </ul>
      </div>

      <hr>
    </div>
  </div>
</template>
<script>
const $ = require("jquery");
import Filter from "../../utils/filter";
import { getWarnEventList } from "../../service/indexnet.js";
export default {
  name: "left2",
  data() {
    return {
      animate: false,
      title: "报警事件列表",
      tableTitle: [],
      tableList: []
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getWarnEventList().then(res => {
        var data = Filter.initialTolowerCase(res);
        this.tableTitle = data.tableTitle;
        this.tableList = data.tableList;
        this.$nextTick(() => {
          // 在这里面去获取DOM
          this.doIt = setInterval(this.scroll, 2000);
        });
      });
    },
    scroll() {
      this.animate = true; // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
      setTimeout(() => {
        //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
        this.tableList.push(this.tableList[0]); // 将数组的第一个元素添加到数组的
        this.tableList.shift(); //删除数组的第一个元素
        this.animate = false; // margin-top 为0 的时候取消过渡动画，实现无缝滚动
      }, 500);
    },
    stopT() {
      clearInterval(this.doIt);
    },
    beginT() {
      this.doIt = setInterval(this.scroll, 2000);
    }
  }
};
</script>
