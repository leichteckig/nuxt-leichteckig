<template>
  <div class="video-grid">
    <div
      v-for="entry in media"
      :key="entry.name">
      <div v-if="entry.name.includes('Slides')" class="slides">
        <p v-if="media.length === 1">You can find the slides on speakerdeck:</p>
        <Button
          class="slide-btn"
          variant="secondary"
          @click.native="openSocialLink(entry.url)">
          {{ entry.name }}
        </Button>
      </div>
      <div v-else class="video">
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

  methods: {
    openSocialLink(link) {
      window.open(link, '_blank');
    }
  }
}
</script>

<style scoped>
.video-grid {
  display: flex;
}

.video {
  margin: 15px;
}

iframe {
  border: solid 3px var(--border-color);

  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-bottom-left-radius:15px 255px;
}

.link-tile {
  display: flex;
}

.post {
  padding: 25px;
}

.slide-btn {
  margin: 0 20px;
}
</style>
