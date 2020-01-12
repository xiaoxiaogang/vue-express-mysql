<template>
  <div>
    <h2 class="title">{{ msg }}</h2>
     <span class="numbers" v-text="numbers"></span>
    <div class="river">
        <div id="bomb" class="animate"  :style="{top:topValue+'px', left:leftValue+'px'}">
            <Icon class="icon-big" fontclass="#icon-zhadan1"></Icon>
        </div>

    </div>
      <div class="bottom-options">
          <div class="options icon-left"  @click="goToLeft">
              <Icon class="" fontclass="#icon-iconset0437"></Icon>
          </div>
          <div class="ship" :style="{bottom:shipBot+'px', left:shipLeft+'px'}">
              <Icon class="icon-big" fontclass="#icon-chuan"></Icon>
          </div>
          <div class="options icon-right"  @click="goToRight">
              <Icon class="" fontclass="#icon-iconset0437"></Icon>
          </div>
      </div>
  </div>
</template>

<script>
    import Icon from '../components/Icon.vue'

export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
        msg: '游戏主页面',
        topValue:1,
        leftValue:1,
        shipBot:30,
        shipLeft:180,
        numbers:0,
        times:null
    }
  },
    created:function(){
        this.random();
    },
    components: { Icon},
    methods:{
        initAnimate:function ({left, v}) {
            this.leftValue = left;
            this.topValue =60;

            this.times = setInterval(()=>{
                this.topValue = this.topValue+100*v;
                console.log('this.topValue', this.topValue);

                if(this.topValue > 600){
                    if(this.leftValue > this.shipLeft-50 && this.leftValue < this.shipLeft+150){
                        this.numbers = 0;
                        this.topValue = 60;
                        clearInterval(this.times)
                        this.times = null;
                        console.error('游戏结束');
                        return;
                    }else{
                        this.numbers = this.numbers+ 9;
                    }
                }

                if(this.topValue > 600){
                    clearInterval(this.times)
                    this.times = null;
                    this.random();
                }

            }, 1000)
        },
        random:function () {
            let v = Math.random().toFixed(2);
            v = 0.99;
            let left = Math.random().toFixed(2)*100*3.6;
            this.initAnimate({left, v});
        },
        goToLeft:function () {
            console.log("this.shipLeft:", this.shipLeft);
            this.shipLeft = this.shipLeft -10;
        },
        goToRight:function () {
            this.shipLeft = this.shipLeft +10;
        }
    }
}
</script>
<style scoped lang="less">
  @import  "../static/common.less";
  .icon-big{
    font-size:50px;
  }
  .title{
    top:0;
    left:30%;
     position: fixed;
  }
  .river{
    border: 1px solid gray;
    position: fixed;
    bottom: 10px;
    display: inline;
    right: 10px;
    left: 10px;
    top: 10px;
  }
  .ship{
    position: fixed;
  }
    .animate{
        position: fixed;
    }
    .numbers{
        position: relative;
        float: right;
        margin-top: 13px;
        margin-right: 31px;
        font-size: 26px;
        color: green;
    }
    .options{
        font-size: 40px;
        float: left;
        padding:30px;
    }
    .bottom-options{
        position: absolute;
        margin: 0;
        width: 100%;
        height: 100px;
        bottom: 0;
    }
  .icon-right{
      float: right;
      transform: rotate(180deg);
  }
</style>
