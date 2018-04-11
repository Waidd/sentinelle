<template><div/></template>

<script>
import { mapGetters } from 'vuex';
import faviconOn from '../assets/favicon_black_on.png';
import faviconOff from '../assets/favicon_black_off.png';

export default {
  name: 'Favicon',
  data() {
    return {
      favicon: document.querySelector('link[rel="shortcut icon"]'),
    };
  },
  computed: {
    ...mapGetters([
      'connected',
    ]),
  },
  watch: {
    connected() {
      this.favicon.href = this.connected ? faviconOn : faviconOff;
    },
  },
};
</script>
