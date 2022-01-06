<template>
  <section class="media-grid">
    <div
      v-for="entry in media"
      :key="entry.name"
      class="media-grid__recording-links"
    >
      <div
        v-if="entry.url.includes('youtube')"
        class="media-grid__video"
      >
        <h3 v-if="entry.name">
          {{ entry.name }}
        </h3>
        <iframe
          :src="entry.url"
          title="YouTube video player"
          frameborder="0"
          allowfullscreen
        />
      </div>
      <div
        v-else
        class="media-grid__link handdraw-border"
      >
        <h3 v-if="!entry.url.includes('speakerdeck')">
          {{ entry.name }}
        </h3>
        <p>{{ entry.description }}</p>
        <Button
          class="media-grid__btn"
          variant="secondary"
          data-cy="OpenSlides"
          @click.native="openSlideLink(entry.url)"
        >
          {{ entry.name }}
        </Button>
      </div>
    </div>
  </section>
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
    openSlideLink(link) {
      window.open(link, '_blank');

      this.$emit('open');
    }
  }
}
</script>

<style lang="scss" scoped>
.media-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;

  .media-grid__video {
    margin: 15px;

    iframe {
      border: solid 3px var(--border-color);

      border-top-left-radius: 255px 15px;
      border-top-right-radius: 15px 255px;
      border-bottom-right-radius: 225px 15px;
      border-bottom-left-radius:15px 255px;
    }
  }

  .media-grid__recording-links {

    .media-grid__link {
      padding: 25px;
    }
  }

  .media-grid__btn {
    display: flex;
    margin: 0 auto;
  }
}

@media (min-width: 800px) {
  .media-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;

    iframe {
      width: 600px;
      height: 300px;
    }


    .media-grid__recording-links {

      .media-grid__link {
        padding: 25px;
      }
    }
  }
}
</style>
