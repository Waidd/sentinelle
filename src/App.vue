<template>
  <div id="app">
    <items></items>
    <favicon></favicon>
  </div>
</template>

<script>
  'use strict';

  import items from './components/Items.vue';
  import favicon from './components/Favicon.vue';

  export default {
    name: 'app',
    components: {
      items,
      favicon
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      };
    }
  };
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

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
