<template>
  <Page
    title="Ramona Schwering's Past talks"
    class="talk-list"
  >
    <main class="past-talks">
      <h2 data-cy="PastTalkHeader">
        Talks I held in the past
      </h2>
      <div class="featured-posts">
        <SmallTile
          :contents="pastTalks"
          slug-name="talks"
        />
      </div>
    </main>
  </Page>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TalkList',

  async asyncData ({ $content }) {
    const pastTalks = await $content('talks')
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('updatedAt', 'desc')
      .fetch()

    return {
      pastTalks
    }
  },

  head () {
    return {
      title: 'Ramona Schwering\'s Talks',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'past-talk-description',
          name: 'past-talks',
          content: 'If you want to rewatch my past talks, you can find all of them here.'
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

.talk-list .hero-image {
  object-position: 70% 30%;
}
</style>
