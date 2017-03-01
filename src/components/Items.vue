<template>
  <div id="items">
    <item v-for="item in items" :value="item"></item>
  </div>
</template>

<script>
  'use strict';

  import FeedsStore from '../stores/feeds';
  import item from './Item.vue';

  export default {
    name: 'items',
    components: {
      item
    },
    data () {
      return {
        items: FeedsStore.items
      };
    },
    mounted: function () {
      this.listenFeedsStore();
    },
    methods: {
      listenFeedsStore: function () {
        FeedsStore.on('update', (items) => {
          this.items = items;
        });
      }
    }
  };
</script>
