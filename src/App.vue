<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
import "@/assets/css/default.css";

import "@/assets/images/sprite.css";


export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
#app {
  min-width:1200px;
}

</style>
