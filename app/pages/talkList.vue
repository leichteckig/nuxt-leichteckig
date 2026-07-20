<template>
  <Page
    :title="$t('speakingPastTalks')"
    class="talk-list"
    :img="{
      path: 'scuc-1600.webp',
      srcset: '/scuc-800.webp 800w, /scuc-1600.webp 1600w',
      alt: 'Me, sitting in front of one of my slides during a panel discussion'
    }"
  >
    <main
      class="past-talks"
      ref="listing"
      tabindex="-1"
    >
      <h2 data-cy="PastTalkHeader">
        {{ $t('talkSubtitle') }}
      </h2>
      <div class="featured-posts">
        <SmallTile
          :contents="pagedTalks"
          slug-name="talks"
        />
      </div>
      <Pagination
        v-if="totalPages > 1"
        :current-page="currentPage"
        :total-pages="totalPages"
      />
    </main>
  </Page>
</template>

<script setup>
// Talks are compact tiles in a dense grid, so a generous page size keeps the
// full breadth visible and only paginates once the list grows substantially.
const PAGE_SIZE = 12

const { locale } = useI18n()

const { data } = await useAsyncData(
  `talk-list-${locale.value}`,
  () => queryCollection(localizedCollection('talks', locale.value))
    .select('title', 'description', 'img', 'stem', 'author')
    .order('createdAt', 'DESC')
    .all()
)

const pastTalks = computed(() => withSlug(data.value))

const { currentPage, totalPages, pagedItems: pagedTalks } = usePagination(pastTalks, PAGE_SIZE)

useHead({
  title: 'Ramona Schwering\'s Talks',
  meta: [
    {
      name: 'description',
      content: 'If you want to re-watch my past talks, you can find all of them here.'
    }
  ]
})
</script>

<style scoped>

/* Programmatic focus target on page change; no ring for this non-interactive region */
main:focus {
  outline: none;
}

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
