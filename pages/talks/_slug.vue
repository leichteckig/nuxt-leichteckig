<template>
  <Page
    :title="talk.title"
    :img="talkImg">
    <main
      class="talk--content"
      data-cy="TalkDetailContent"
    >
      <DetailSummary :article="talk">
        <p class="talk-detail__lang">
          {{ $t('alsoAvailableIn') }}
          <nuxt-link
            class="uppercase text-teal-600 hover:text-teal-800"
            v-for="lang in otherLanguages"
            :key="lang.locale"
            :to="switchLocalePath(lang.locale)"
          >
            {{ lang.name }}
          </nuxt-link>
        </p>
        {{ talk.description }}
      </DetailSummary>
      <nuxt-content
        :document="talk"
        data-cy="TalkDetailContent"
      />
    </main>
  </Page>
</template>

<script lang="ts" setup>

import type { Talk } from '@/types'

import DetailSummary from "@/components/DetailSummary.vue";
import Page from "@/components/Page.vue";

const { locale } = useI18n();
const route = useRoute()

const switchLocalePath = useSwitchLocalePath()

const path = locale.value !== 'en' ? `talks/${locale.value}` : 'talks';
const talk = await queryContent<Talk>(path + route.params.slug).findOne();

useHead(() => ({
  title: talk?.title ? talk.title : 'Ramona Schwering\'s Blog',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: talk?.title ? talk.title.replace(' ', '-') : 'Ramona-Schwering-Blog',
      name: talk?.title ? talk.title : 'Ramona Schwering\'s Blog',
      content: talk?.description ? talk.description : 'Frontend Developer',
    },
    { name: 'og:title', hid:'og:title', content: talk?.title ? talk.title : 'Ramona Schwering\'s Blog' },
    {
      name: 'og:description',
      hid:'og:description',
      content: talk?.description ? talk.description : 'Frontend Developer'
    },
  ]
}));

const otherLanguages = computed(() => talk.otherLanguages || []);


const talkImg = computed(() => {
  if (!talk.img) return undefined;

  return {
    path: talk.img,
    alt: talk.alt,
  };
});
</script>

<style scoped>
  .talk--content p code,
  .talk--content .nuxt-content-highlight pre[class*="language-"] {
    border: solid 3px var(--border-color);
    background: var(--border-color);
    color: var(--color);
    text-shadow: none;

    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 255px;
    border-bottom-right-radius: 225px 15px;
    border-bottom-left-radius:15px 255px;
  }

  .talk--content .nuxt-content-highlight pre[class*="language-"] .keyword {
    color: var(--color-primary);
  }

  .talk--content .nuxt-content-highlight pre[class*="language-"] .token.boolean {
    color: var(--color);
  }

  .talk--content blockquote {
    color: var(--color-primary);
    font-style: italic;
  }

  .talk-detail__lang {
    font-family: 'Amatic SC';
    font-size: xx-large;
  }

  @media (min-width: 800px) {
    summary-detail__tag {
      flex-basis: 30%;
    }
  }
</style>
