<template>
  <div>
    <van-collapse v-model="activeNames">
      <van-collapse-item name="1">
        <div slot="title">
          <div class="f-platform">下单平台：“食享会”微信小程序或者公众号 </div>
          <div class="sub-title">配送范围：武汉三镇</div>
          <van-divider :style="{ color: 'rgb(177, 177, 177)', borderColor: 'rgb(177, 177, 177)', margin: '5px 0' }">
          </van-divider>
        </div>
        <div class="f-content">
          <div class="f-item">操作流程：微信搜索“食享会”小程序或者公众号——选择定位附近的团长——线上下单购买——联系团长后线下到团长处取货。</div>
          <div class="f-item">下单时间：24小时全天。</div>
          <div class="f-item">配送时限：每周二、四、六配送。 </div>
          <div class="f-item">配送费用：0元/单。 </div>
        </div>
      </van-collapse-item>
      <van-collapse-item title="标题2" name="2" icon="shop-o">
        内容
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import Navbar from '@/client/components/navbar.vue'
export default {
    data () {
      return {
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial state.
          message:'龙船游qq戏',
          activeNames: ['1', '2'],
      }
  },
    created() {
       this.getAllPlatform()
    },
    components: { 'navbar': Navbar},
    methods: {
         getAllPlatform: function () {
             this.$axios({
                 method: 'get',
                 url: '/users/getAllData',
                 data:{}
             })
                 .then(function (res) {
                     console.log('retddd', res);
                 })
                 .catch(function (err) {
                     console.log(err);
                 });
         }
      }
}
</script>
<style>
 .f-platform {
   font-size: 14px;
   font-weight: bold;
   color: green;
 }
 .f-content{
   margin-top: -15px;
   color: #666666;
 }
  .sub-title{

  }
  .f-item{
    line-height: 25px;
    padding: 0px 5px 5px 5px;
  }

</style>