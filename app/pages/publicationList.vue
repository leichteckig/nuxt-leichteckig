<template>
  <Page
    :title="$t('speakingPastPubs')"
    :img="{
      path: 'recording-ramona-schwering.webp',
      srcset: '/recording-ramona-schwering-800.webp 800w, /recording-ramona-schwering.webp 1280w',
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

<script setup>
const { locale } = useI18n()

const { data } = await useAsyncData(
  `publication-list-${locale.value}`,
  () => queryCollection(localizedCollection('publications', locale.value))
    .select('title', 'description', 'img', 'stem', 'author', 'tags')
    .order('createdAt', 'DESC')
    .all()
)

const publications = computed(() => withSlug(data.value))

useHead({
  title: 'Ramona Schwering\'s guest appearances',
  meta: [
    {
      name: 'description',
      content: 'Are you searching for other publication I contributed to? Look no further!'
    }
  ]
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

.speaking-hint {
  margin: 0 10%
}
</style>
