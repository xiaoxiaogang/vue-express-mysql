<template>
  <div>
    <h1>{{ message }}</h1>
    <div class="list">
      <router-link to="/game">开始游戏</router-link>
    </div>
    <div class="list">
      <router-link  to="/ranking">游戏排行</router-link>
    </div>
    <router-view ></router-view>

  </div>
</template>f

<script>

export default {
    data () {
      return {
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial state.
          message:'龙船游qq戏'
      }
  },
    created() {
        this.$axios({
            method: 'get',
            url: '/users/getAllData',
            data:{

            }
        })
            .then(function (res) {
                console.log('ret', res);
            })
            .catch(function (err) {
                console.log(err);
            });
    },
    components: { }
}
</script>
<style>
  .list{
    float: left;
    width: 100%;
    text-align: center;
    padding: 3px 0;
  }

</style>