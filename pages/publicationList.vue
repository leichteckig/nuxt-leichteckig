<template>
  <Page title="Ramona Schwering's content">
    <main class="other-publications">
      <h2 data-cy="PublicationListingTitle">
        Guest contributions and appearances
      </h2>
      <div class="featured-posts">
        <LinkTile :contents="publications" />
      </div>
    </main>
  </Page>
</template>

<script lang="ts">
import Vue from 'vue'
import LinkTile from '@/components/LinkTile.vue'

export default Vue.extend({
  name: 'PublicationList',

  components: {
    LinkTile
  },

  async asyncData ({ $content }) {
    const pastTalks = await $content('talks')
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'asc').limit(6)
      .fetch()

    const publications = await $content('publications')
      .only(['title', 'description', 'img', 'slug', 'author', 'tags'])
      .sortBy('createdAt', 'desc')
      .fetch()

    return {
      pastTalks, publications
    }
  },

  head () {
    return {
      title: 'Ramona Schwering\'s guest appearances',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'publication-description',
          name: 'publicatoin',
          content: 'Are you searching for other publication I contributed to? Look no further!'
        }
      ]
    }
  }
})
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
</style>
