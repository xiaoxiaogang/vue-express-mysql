<template>
  <div>
    <van-sticky>
    <van-tabs @change="gotoPage" class="navbar-style" title-active-color="#07c160" color="#07c160" v-model="active">
      <van-tab v-for="(item, index) in navArray" :title="item" :key="index" >
      </van-tab>
    </van-tabs>
    </van-sticky>
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
          message:'',
          navArray: ['信息上报', '信息汇总' ,'义诊',  '其他'],
          active: 0
      }
  },
    watch: {

    },
    created() {
        if (this.$route.name === 'fresh22') {
            this.active = 1
        }
    },
    methods: {
        gotoPage (name, title) {
            console.log('name:', title);
            switch (title) {
                case '义诊':
                    this.$router.push('free')
                    break;
                case '信息上报':
                    this.$router.push('child')
                    break;
                case '信息汇总':
                    this.$router.push('infoList')
                    break;
                case '其他':
                    this.$router.push('fresh22')
                    break;
                default:
                    break;
            }
            console.log('title:', title);
           // this.$router.push('a')
        }
    }
}
</script>
<style lang="less">
  @import  "../../client/static/color.less";
  .navbar-style{
    /*position: fixed;*/
  }

</style>