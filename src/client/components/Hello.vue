<template>
  <div>
    <h1>{{ msg }}</h1>
    <span>这是一个组件的例www子</span>
  </div>
</template>

<script>
  //定义了一个组件，然后全局注册，使用的地方可以直接使用
export default {
  name: 'hello',
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  }
}
</script>
