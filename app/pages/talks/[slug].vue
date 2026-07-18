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
      <ContentRenderer
        :value="talk"
        data-cy="TalkDetailContent"
      />
    </main>
  </Page>
</template>

<script setup>
const route = useRoute()
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const { data: talk } = await useAsyncData(
  `talk-${locale.value}-${route.params.slug}`,
  () => {
    const prefix = locale.value === 'en' ? '/talks' : `/talks/${locale.value}`
    return queryCollection(localizedCollection('talks', locale.value))
      .path(`${prefix}/${route.params.slug}`)
      .first()
  }
)

if (!talk.value) {
  throw createError({ statusCode: 404, statusMessage: 'Talk not found', fatal: true })
}

const otherLanguages = computed(() => talk.value?.otherLanguages || [])

const talkImg = computed(() => {
  if (!talk.value?.img) return null

  return {
    path: talk.value.img,
    alt: talk.value.alt
  }
})

useHead(() => ({
  title: talk.value?.title ? talk.value.title : 'Ramona Schwering\'s Blog',
  meta: [
    {
      name: 'description',
      content: talk.value?.description ? talk.value.description : 'Frontend Developer'
    },
    {
      property: 'og:title',
      content: talk.value?.title ? talk.value.title : 'Ramona Schwering\'s Blog'
    },
    {
      property: 'og:description',
      content: talk.value?.description ? talk.value.description : 'Frontend Developer'
    }
  ]
}))
</script>

<style scoped>
  .talk--content p code,
  .talk--content pre {
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
