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

<script lang="ts" setup>
import SmallTile from "@/components/SmallTile.vue";

const { locale } = useI18n();
const path = locale.value !== 'en' ? `talks/${locale.value}` : 'talks';

const pastTalks = await queryContent(path)
  .only(['title', 'description', 'img', 'slug', 'author', 'createdAt'])
  .sort({ createdAt: -1 })
  .find();

useHead(() => ({
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
}));
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
