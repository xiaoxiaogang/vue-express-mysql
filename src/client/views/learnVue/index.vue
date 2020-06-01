<template>
  <div>
    <h1 style="width: 100%;text-align: center">{{ message }}</h1>
    <!--<hello></hello>-->
    <van-button type="primary" @click="changeStroe" class="btn-cla">改变store</van-button>
    <van-button type="primary" @click="actionChange" class="btn-cla">改变store</van-button>
    <div class="list">
      <p>changeData:{{changeData}}</p>
      <p>name:{{count}}</p>
      <p>actionData:{{actionData}}</p>
    </div>
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
          message:'这是一个学习store的状态管理的例子',
          // changeData: '',
          // actionData: ''
      }
  },
   computed: {
       count: function () {
           return  this.$store.state.user.name
       },
       changeData: function () {
           return  this.$store.getters.getName
       },
       actionData: function () {
           return  this.$store.getters.getOtherName
       }
   },
    created() {
        this.$http({
            method: 'get',
            url: '/users/getAllData',
            data:{}
        })
            .then(function (res) {
                console.log('ret', res);
            })
            .catch(function (err) {
                console.log(err);
            });

        this.$yunce.test()
       // this.changeData = this.$store.getters.getName;
       //  this.actionData = this.$store.getters.getName;
    },
    mounted () {
        console.log('state.user.name:', this.$store.state.user.name);
    },
    components: { },
    methods: {
        changeStroe: function () {
            this.$store.commit('setUser',{name: 'mutations='})
        },
        actionChange: function () {
            this.$store.dispatch('addSetUser',{name: 'actions='})
        }
    }
}
</script>
<style>
  .btn-cla{
    margin-left: 30px;
  }
  .list{
    border: 1px solid #efefef;
    margin: 10px;
    box-shadow: 3px 3px 3px #efefef;
    width: 300px;
    height: 300px;
    padding: 10px;
  }
</style>