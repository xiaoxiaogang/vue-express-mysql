<template>
    <svg class="icon icon-style" aria-hidden="true">
      <use :xlink:href=fontclass></use>
    </svg>
</template>

<script>
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'icon---icon!'
    }
  },
   props: {
       fontclass:String
   }
}
</script>

<style  scoped lang="less">

    .icon-style{

    }
</style>
