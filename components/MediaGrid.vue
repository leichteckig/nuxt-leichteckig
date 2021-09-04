<template>
  <div class="video-grid container">
    <div
      v-for="entry in media">
      <div class="video">
        <h3 v-if="entry.name">{{ entry.name }}</h3>
        <iframe width="560" height="315" :src="entry.url" title="YouTube video player" frameborder="0" allowfullscreen></iframe>
      </div>
   </div>
  </div>
</template>

<script>
export default {
  name: "MediaGrid",

  props: {
    media: {
      type: Array,
      required: true
    }
  },
}
</script>

<style scoped>
.video-grid {
  display: flex;
}

.video {
  margin: 15px;
}
</style>
