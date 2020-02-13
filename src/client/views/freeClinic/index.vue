<template>
  <div>
    <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.name" class="list-item">
        <div class="clinic-platform">{{item.name}}</div>
        <div class="clinic-methods">{{item.user_method}}</div>
        <van-divider :style="{ color: 'rgb(177, 177, 177)', borderColor: 'rgb(177, 177, 177)', margin: '5px 0' }">
        </van-divider>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
    data () {
      return {
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial state.
          list: [],
          loading: false,
          finished: false
      }
  },
    created() {
       this.getAllPlatform()
    },
    components: {  },
    methods: {
         getAllPlatform: function () {
             this.$http({
                 method: 'get',
                 url: '/clinic/getClinicList',
                 data:{}
             })
                 .then( (res) => {
                     console.log('retddd', res);
                     this.list = res.result;
                 })
                 .catch( (err) => {
                     console.log(err);
                 });
         },
        onLoad() {

        }
      }
}
</script>
<style>
 .clinic-platform {
   font-size: 16px;
   font-weight: bold;
   margin-bottom: 5px;
 }
  .list-item{

  }
 </style>