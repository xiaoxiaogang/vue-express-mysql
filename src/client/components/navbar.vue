<template>
  <div>
    <van-tabs @change="gotoPage">
      <van-tab v-for="(item, index) in navArray" :title="item" :key="index" >
      </van-tab>
    </van-tabs>
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
          navArray: ['义诊', '物流', '义诊'],
      }
  },
    created() {
    },
    methods: {
        gotoPage (name, title) {
            console.log('name:', name);
            switch (name) {
                case '义诊':
                    this.$router.push('free')
                    break;
                case '物流':
                    this.$router.push('bb')
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
<style scoped>
  .list{
    float: left;
    width: 100%;
    text-align: center;
    padding: 3px 0;
  }

</style>