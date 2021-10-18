<template>
  <img
    class="hero-image"
    :src="img.path"
    :alt="img.alt"
  >
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Hero',

  props: {
    img: {
      type: Object,
      required: true
    }
  }
})
</script>

<style scoped>
.hero-image {
  /* Set a specific height */
  max-height: 500px;
  width: 100%;
  object-fit: cover;
  object-position: 30% 70%;

  /* Position and center the image to scale nicely on all screens */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
</style>
