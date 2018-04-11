<template>
  <div id="items">
    <item v-for="item in sortedItems" :key="item.guid"  :value="item"></item>
  </div>
</template>

<script>
  'use strict';

  import item from './Item.vue';
  import { mapGetters } from 'vuex'

  export default {
    name: 'items',
    components: {
      item
    },
    computed: {
      ...mapGetters([
        'items'
      ]),
      sortedItems () {
        return this.items.sort((a, b) => b.date - a.date || a.title > b.title);
      }
    }
  };
</script>
