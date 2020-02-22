<template>
  <div class="info-content">
    <van-loading v-show="loading"/>
    <span class="child-title info-title">疫情信息显示系统【PC端显示】）</span>
    <div class="" :style="{marginLeft: listPosition+'px'}">
      <div class="info-list" id="list" >
        <div v-for="(item, j) in headers" v-text="item" :class="setClass(j)">
        </div>
      </div>
      <div class="content-list info-list" v-for="item in list">
          <div class="list-header" v-text="item.user_name"></div>
        <div class="list-header" v-text="item.tel"></div>
        <div class="list-header" v-text="item.health_status"></div>
        <div class="list-header" v-text="item.department"></div>
        <div class="list-header large-width" v-text="item.address"></div>
        <div class="list-header" v-text="item.work_status"></div>
      </div>
    </div>
  </div>
</template>

<script>
 import { Toast } from 'vant'
 import areaListVal from '@/client/static/area.js'
export default {
    data () {
      return {
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial state.
          message:'龙船游qq戏',
          loading: false,
          list: [],
          listPosition: '',
          headers: ['姓名','电话', '体温', '部门', '住址', '是否上班']
      }
  },
    created() {
        this.getAllPlatform();
    },
    mounted(){
        this.listPosition= (screen.width - document.getElementById("list").offsetWidth) / 2;
    },
    methods: {
        getAllPlatform: function () {
            // `user_name`, `tel`, `health_status`, `department`, `address`, `work_status`, `longitude`
            this.$http({
                method: 'get',
                url: '/users/getAllData',
                params:{}
            })
                .then( (res) => {
                    console.log('retddqd', res);
                    this.list = res.result;
                })
                .catch( (err) => {
                    console.log(err);
                });
        },
        setClass: function (key) {
            if(key === 4){
                return 'list-header large-width'
            } else {
                return 'list-header'
            }
        }
    }
}
</script>
<style  lang="less">
  @import  "../../client/static/color.less";

  .info-content{
    margin: auto;
  }
  .radio-item{
    margin: 5px 10px 5px 0px;
    float: left;
  }

  .large-width{
    width: 300px;
  }
  .list-header{
    border-right: 1px solid #cccccc;;
    border-bottom: 1px solid #cccccc;;
    min-width: 150px;
    height: 50px;
    padding: 5px;
    float: left;
  }

  .info-list{
    text-align: center;
    float: left;
    height: 60px;
    line-height: 60px;
  }

  .child-title{
    text-align: center;
    color: @blue-theme;
  }

  .info-title{
    width:  300px;
    display: block;
     margin: 30px auto;
  }
  #list{
    float: left;
    border-top:1px solid #cccccc;
    border-left: 1px solid #cccccc;
  }
  .content-list{
    border-left: 1px solid #cccccc;
  }
</style>