<template></template>

<script>
  'use strict';

  import { mapGetters } from 'vuex';
  import faviconOn from '../assets/favicon_black_on.png';
  import faviconOff from '../assets/favicon_black_off.png';

  export default {
    name: 'favicon',
    data: function () {
      return {
        favicon: document.querySelector('link[rel="shortcut icon"]')
      };
    },
    computed: {
      ...mapGetters([
        'connected'
      ]),
    },
    watch: {
      connected: function () {
        this.favicon.href = this.connected ? faviconOn : faviconOff;
      }
    }
  }
</script>
