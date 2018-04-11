<template>
  <a
    :href="value.link"
    class="item"
    target="_blank"
  >
    <figure class="itemFigure">
      <div
        :class="{'itemImage': true, 'itemBlank': !loadedImage}"
        :style="{'background-image': 'url(' + (loadedImage ? loadedImage : blankImage) + ')'}"
      />
      <figcaption class="item__caption">
        <h3 class="itemTitle">{{ value.title }}</h3>
        <p class="itemSubtitle">{{ value.date.toLocaleString() }}</p>
        <p class="itemSubtitle">{{ value.meta.title }}</p>
      </figcaption>
    </figure>
  </a>
</template>

<script>
import blankImage from '../assets/blank2.jpg';

export default {
  name: 'Item',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loadedImage: null,
      blankImage,
    };
  },
  watch: {
    value() {
      this.updateImage();
    },
  },
  mounted() {
    this.updateImage();
  },
  methods: {
    updateImage() {
      if (this.value.image && this.value.image !== this.loadedImage) {
        this.loadImage();
      } else if (!this.value.image) {
        this.setImage(null);
      }
    },
    setImage(imageURL) {
      this.loadedImage = imageURL;
    },
    loadImage() {
      const img = new window.Image();
      img.onload = () => {
        if (this.value.image === img.src) {
          this.setImage(img.src);
        }
      };
      img.src = this.value.image;
    },
  },
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
    background-size: cover;
  }

  .itemImage:not(.itemBlank) {
    animation: sharpen .5s both;
  }

  @keyframes sharpen {
    from {
      filter: brightness(50%) blur(15px);
    }
    to {
      filter: brightness(50%) blur(0px);
    }
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
