<template>
  <div>
    <navbar></navbar>
    <router-view></router-view>
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
          message:'龙船游qq戏'
      }
  },
    created() {

    },
    components: { 'navbar': Navbar}
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