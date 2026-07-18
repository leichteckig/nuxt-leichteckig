<template>
  <Page
    :title="$t('speakingTitle')"
    :img="{
      path: 'vuejsamsterdam.webp',
      srcset: '/vuejsamsterdam-800.webp 800w, /vuejsamsterdam.webp 1500w',
      alt: 'Me, being about to speak at Vue.js Amsterdam',
    }"
  >
    <main>
      <section
        class="past-talks"
        data-cy="PastTalkOverview"
      >
        <h2>{{ $t('talkSubtitle') }}</h2>
        <div class="featured-posts">
          <SmallTile
            :contents="pastTalks"
            slug-name="talks"
          />
        </div>
        <div class="more__button">
          <Button
            data-cy="ButtonToTalks"
            @click="$router.push(localePath({ name: 'talkList' }))"
          >
            {{ $t('speakingMore') }}
          </Button>
        </div>
      </section>
      <section
        class="talks-refer handdraw-line"
        data-cy="PastTalks"
      >
        <div class="handdraw-line" />
        <div class="gradient" />
        <div class="talks__inner">
          <div class="gradient" />
          <div class="talks__text">
            <h2 class="talks__title">
              {{ $t('speakingDeckTitle') }}
            </h2>
            <p class="talks__sub-title">
              {{ $t('speakingDeckDescription') }}
            </p>
            <Button
              variant="secondary"
              data-cy="ButtonToSlideDeck"
              @click="openLink('https://speakerdeck.com/leichteckig')"
            >
              {{ $t('speakingMore') }}
            </Button>
          </div>
        </div>
      </section>
      <section
        class="guest-contributions"
        data-cy="PublicationOverview"
      >
        <h2>{{ $t('pubSubtitle') }}</h2>
        <div class="featured-posts">
          <LinkTile :contents="publications" />
        </div>
        <div class="more__button">
          <Button
            data-cy="ButtonToPublications"
            @click="$router.push(localePath({ name: 'publicationList' }))"
          >
            {{ $t('speakingMore') }}
          </Button>
        </div>
      </section>
    </main>
  </Page>
</template>

<script setup>
const { locale } = useI18n()
const localePath = useLocalePath()

const { data: talkData } = await useAsyncData(
  `speaking-talks-${locale.value}`,
  () => queryCollection(localizedCollection('talks', locale.value))
    .select('title', 'description', 'img', 'stem', 'author', 'alt')
    .order('createdAt', 'DESC')
    .limit(6)
    .all()
)

const { data: publicationData } = await useAsyncData(
  `speaking-publications-${locale.value}`,
  () => queryCollection(localizedCollection('publications', locale.value))
    .select('title', 'description', 'img', 'stem', 'author', 'tags')
    .order('createdAt', 'DESC')
    .limit(6)
    .all()
)

const pastTalks = computed(() => withSlug(talkData.value))
const publications = computed(() => withSlug(publicationData.value))

useHead({
  title: 'Speaking',
  meta: [
    {
      name: 'description',
      content: 'These are all speaking contributions of me, Ramona.'
    }
  ]
})

function openLink(link) {
  window.open(link, '_blank', 'noopener')
}
</script>

<style scoped>

h2 {
  margin: 50px 0;
  text-align: center;
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

.speaking-hint {
 margin: 0 10%
}

.more__button {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 50px;
}

.talks__title {
  font-size: 60px;
  font-weight: normal;
  margin-bottom: 20px;
}

.talks__sub-title {
  font-size: 30px;
  font-weight: normal;
  margin-bottom: 30px;
}

.talks__inner {
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
</style>
