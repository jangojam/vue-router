<template>
  <div class="child3">
    <h1>{{ msg }}</h1>
    <h1>参数：{{ $route.params.username }}</h1>
    
  </div>
</template>

<script>
export default {
  name: 'child3',
  data () {
    return {
      msg: 'this is child3 page'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
