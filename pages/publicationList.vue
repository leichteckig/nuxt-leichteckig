<template>
  <Page
    :title="$t('speakingPastPubs')"
    :img="{
      path: 'recording-ramona-schwering.jpg',
      alt: 'Me, recording things'
    }"
  >
    <main class="other-publications">
      <h2 data-cy="PublicationListingTitle">
        {{ $t('pubSubtitle') }}
      </h2>
      <div class="featured-posts">
        <LinkTile :contents="publications" />
      </div>
    </main>
  </Page>
</template>

<script>
import LinkTile from "@/components/LinkTile";

export default {
  name: 'PublicationList',

  components: {
    LinkTile
  },

  async asyncData({ $content, i18n }) {
    const path = i18n.locale !== 'en' ? `publications/${i18n.locale}` : 'publications';

    const publications = await $content(path)
      .only(['title', 'description', 'img', 'slug', 'author', 'tags'])
      .sortBy('createdAt', 'desc')
      .fetch();

    return {
      publications
    }
  },

  head() {
    return {
      title: "Ramona Schwering\'s guest appearances",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'publication-description',
          name: 'publication',
          content: 'Are you searching for other publication I contributed to? Look no further!'
        }
      ]
    }
  },

}
</script>

<style scoped>
h2 {
  margin: 50px 0;
  text-align: center;
}

.publication .handdraw-line {
  margin: 0;
  overflow: hidden;
  z-index: 3;
}

.publication__title {
  font-size: 60px;
  font-weight: normal;
  margin-bottom: 20px;
}

.publication__sub-title {
  font-size: 30px;
  font-weight: normal;
  margin-bottom: 30px;
  color: var(--color-primary);
}

.publication__inner {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 50px;
}

.gradient {
  height: 30px;

  background: repeating-linear-gradient(
    45deg,
    var(--border-color),
    var(--border-color) 1px,
    var(--bg) 1px,
    var(--bg) 10px
  );
}

.more__button {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 50px;
}

.speaking-hint {
  margin: 0 10%
}
</style>
