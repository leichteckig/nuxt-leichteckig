<template>
  <Page
    :title="$t('speakingPastTalks')"
    class="talk-list"
    :img="{
      path: 'scuc.jpg',
      alt: 'Me, sitting in front of one of my slides during a panel discussion'
    }"
  >
    <main class="past-talks">
      <h2 data-cy="PastTalkHeader">
        {{ $t('talkSubtitle') }}
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

<script>
import SmallTile from "@/components/SmallTile";

export default {
  name: 'TalkList',
  components: {
    SmallTile
  },

  async asyncData({ $content, i18n }) {
    const path = i18n.locale !== 'en' ? `talks/${i18n.locale}` : 'talks';

    const pastTalks = await $content(path)
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'desc')
      .fetch();

    return {
      pastTalks
    }
  },

  head() {
    return {
      title: "Ramona Schwering\'s Talks",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'past-talk-description',
          name: 'past-talks',
          content: 'If you want to re-watch my past talks, you can find all of them here.'
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

.talk-list .hero-image {
  object-position: 70% 30%;
}

.speaking-hint {
  margin: 0 10%
}
</style>
