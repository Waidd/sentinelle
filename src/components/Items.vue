<template>
  <div id="items">
    <Item
      v-for="item in sortedItems"
      :key="item.guid"
      :value="item"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Item from './Item.vue';

export default {
  name: 'Items',
  components: {
    Item,
  },
  computed: {
    ...mapGetters([
      'items',
    ]),
    sortedItems() {
      return Array.from(this.items).sort((a, b) => b.date - a.date || a.title > b.title);
    },
  },
};
</script>
