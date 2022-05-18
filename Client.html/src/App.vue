<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from './page/index'
export default {
  name: 'App',
  components: {
    Home,
  },
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  user-select: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  user-select: none;
}
/*去除下标*/
.amap-logo{
display: none!important;
}
.amap-copyright{
opacity:0;
}
</style>
