<template>
  <Page
    :title="$t('speakingTitle')"
    :img="{
      path: 'vuejsamsterdam.jpeg',
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
            :contents="talks"
            slug-name="talks"
          />
        </div>
        <div class="more__button">
          <Button
            data-cy="ButtonToTalks"
            @click.native="$router.push(localePath({ name: 'talkList' }))"
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
              @click.native="openLink('https://speakerdeck.com/leichteckig')"
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
            @click.native="$router.push(localePath({ name: 'publicationList' }))"
          >
            {{ $t('speakingMore') }}
          </Button>
        </div>
      </section>
    </main>
  </Page>
</template>

<script lang="ts" setup>
import type { Talk, Publication } from '@/types'

const { locale } = useI18n();
const route = useRoute()

const localePath = useLocalePath();

function getContent<T>(type: 'talks' | 'publications') {
  const path = locale.value !== 'en' ? `${type}/${locale.value}` : 'articles';
  return queryContent<T>(path + route.params.slug)
    .only(['title', 'description', 'img', 'slug', 'author', 'alt', 'tags'])
    .sort({ createdAt: -1 })
    .limit(6)
    .find();
}

const [talks, publications] = await Promise.all([
  getContent<Talk>('talks'),
  getContent<Publication>('publications'),
]);

useHead(() => ({
  title: 'Speaking',
  meta: [{
    charset: 'utf-8'
  }, {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1'
  }, {
    hid: 'speaking-description',
    name: 'speaking',
    content: 'These are all speaking contributions of me, Ramona.'
  }]
}))

function  openLink(link: string) {
  window.open(link, '_blank',  'noopener');
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
