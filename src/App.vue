<template>
  <div id="app">
    <router-link to='/'>hello</router-link>
    <router-link to='/jango'>jango</router-link>
    <router-link to='/jango/child1'>child1</router-link>
    <router-link to='/jango/child2'>child2</router-link>
    <router-link :to="{name:'child3',params:{username:'jango-child3'}}">child3</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
