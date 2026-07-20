<template>
  <img
    v-if="img"
    class="hero-image"
    :src="mediaSrc(img.path)"
    :srcset="img.srcset"
    :sizes="img.srcset ? '100vw' : undefined"
    :alt="img.alt"
    fetchpriority="high"
  >
</template>

<script setup>
defineProps({
  img: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.hero-image {
  /* Fixed banner ratio: reserves the space before the image loads (no CLS)
     and keeps the hero crop consistent across pages */
  aspect-ratio: 3 / 1;
  max-height: 500px;
  width: 100%;
  object-fit: cover;
  object-position: 30% 70%;
  position: relative;

  /* Calm placeholder in the site's handdraw stripe motif, shown on the
     image's own background until the (high-priority) hero paints over it */
  background: repeating-linear-gradient(
    45deg,
    var(--border-color),
    var(--border-color) 1px,
    var(--bg) 1px,
    var(--bg) 10px
  );
}
</style>
