<template>
  <div id="items">
    <a class="item" v-for="item in items" :href="item.link" target="_blank">
      <figure class="itemFigure">
        <div v-bind:class="{'itemImage': true, 'itemBlank': !item.image}" v-bind:style="{'background-image': 'url(' + (item.image ? item.image : blank) + ')'}"></div>
        <figcaption class="item__caption">
          <h3 class="itemTitle">{{ item.title }}</h3>
          <p class="itemSubtitle">{{ item.date.toLocaleString() }}</p>
          <p class="itemSubtitle">{{ item.meta.title }}</p>
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
  'use strict';

  import feedsStore from '../stores/feeds';
  import blankImage from '../assets/blank2.jpg';

  export default {
    name: 'items',
    data () {
      return {
        items: feedsStore.items,
        blank: blankImage
      };
    },
    mounted: function () {
      this.listenFeedsStore();
    },
    methods: {
      listenFeedsStore: function () {
        feedsStore.on('update', (items) => {
          this.items = items;
        });
      }
    }
  };
</script>

<style>
.item {
  font-family: avenir, 'avenir next', helvetica, arial, sans-serif;
  position: relative;
  display: inline-block;
  flex: none;
  width: 400px;
  height: 300px;
  margin: 0.5em 0.5em;
  color: #FFDC00;
  perspective: 1000px;
  overflow: hidden;
}

.item * {
  pointer-events: none;
}

.item:hover,
.item:focus {
  color: #FF851B;
  outline: none;
}

.itemFigure,
.itemImage {
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  background-position: center;
  /* Make the background image cover the area of the <div>, and clip the excess */
  background-size: cover;
}

.itemImage {
  filter: brightness(50%);
}

.itemImage.itemBlank {
  width: 103%;
  height: 103%;
  filter: blur(15px);
}

.itemFigure > * {
  transform: translateZ(0px); /* Force correct stacking order */
}

.itemFigure {
  position: relative;
}

.itemFigure::before {
  content: '';
  position: absolute;
  top: 5%;
  left: 5%;
  width: 90%;
  height: 90%;
  /*box-shadow: 0 30px 20px rgba(35,32,39,0.5);*/
}

.item__caption {
  position: absolute;
  bottom: 0;
  width: 95%;
  padding: 1em;
}

.itemTitle {
  font-size: 1.3em;
  font-weight: 900;
  line-height: 1;
  margin: 0;
}

.itemSubtitle {
  font-size: 0.85em;
  margin: 1em 0 0 0;
  letter-spacing: 0.15em;
}

@media only screen and (max-width: 832px) {
  body {
    margin: 0;
  }

  .item {
    width: 100%;
    margin: 0 0 0.2em 0;
  }
}
</style>
