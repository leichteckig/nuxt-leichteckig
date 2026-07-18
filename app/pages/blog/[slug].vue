<template>
  <Page
    class="blog-detail"
    :title="article.title"
    :img="{
      path: article.img,
      alt: article.alt
    }"
  >
    <main>
      <DetailSummary :article="article">
        <p v-if="otherLanguages.length" class="blog-detail__lang">
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
        {{ article.description }}
      </DetailSummary>

      <article
        class="blog-detail__detail-content"
        data-cy="BlogDetailContent"
      >
        <ContentRenderer
          :value="article"
          data-cy="BlogDetailContent"
        />
      </article>
    </main>
  </Page>
</template>

<script setup>
const route = useRoute()
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const { data: article } = await useAsyncData(
  `article-${locale.value}-${route.params.slug}`,
  () => {
    const prefix = locale.value === 'en' ? '/articles' : `/articles/${locale.value}`
    return queryCollection(localizedCollection('articles', locale.value))
      .path(`${prefix}/${route.params.slug}`)
      .first()
  }
)

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
}

const otherLanguages = computed(() => article.value?.otherLanguages || [])

useHead(() => ({
  title: article.value?.title ? article.value.title : 'Ramona Schwering\'s Blog',
  meta: [
    {
      property: 'og:title',
      content: article.value?.title ? article.value.title : 'Ramona Schwering'
    },
    {
      property: 'og:description',
      content: article.value?.description ? article.value.description : 'Ramona Schwering.'
    },
    {
      property: 'og:image',
      content: article.value?.img
        ? `https://www.ramona.codes/${article.value.img}`
        : 'https://www.ramona.codes/ogimage.png'
    },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: article.value?.author?.bio?.includes('smashing')
    ? [{ rel: 'canonical', href: article.value.author.bio }]
    : []
}))
</script>

<style lang="scss">
.blog-detail {
  ul {
    line-height: 1.75;
  }

  p {
    line-height: 1.75;
  }

  li {
    line-height: 1.75;

    &::marker {
      color: var(--color-primary);
    }
  }

  blockquote {
    color: var(--color-primary);
    font-style: italic;
  }

  code,
  pre {
    border: solid 3px var(--bg-secondary);
    background: var(--bg-secondary);
    color: var(--color);
    text-shadow: none;
    width: 100%;
    margin: 0 auto;
    font-family: var(--font-family-mono);
    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 255px;
    border-bottom-right-radius: 225px 15px;
    border-bottom-left-radius: 15px 255px;

    .keyword {
      color: var(--color-primary);
    }

    .token.boolean {
      color: var(--color);
    }

    .token.operator {
      background-color: var(--bg-secondary);
    }

    .token.entity {
      background-color: var(--bg-secondary);
    }

    .token.string {
      color: var(--color);
    }
  }
}

.blog-detail__img {
  height: 160px;
  width: 100%;
  object-fit: cover;
  border-radius: 6px;
  display: block;
}

.blog-detail__detail-content img {
  max-width: 800px;
  width: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.blog-detail__author-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}

.blog-detail__author-card {
  display: flex;
}

.blog-detail__author-name {
  margin: auto 10px;
}

.blog-detail__text-muted {
  color: var(--color-text-muted);
}

.blog-detail__summary-card {
  padding: 30px;
}

.blog-detail__detail-content iframe {
  border: solid 3px var(--border-color);
  margin: 0 auto;

  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-bottom-left-radius: 15px 255px;
}

.hint {
  margin: 20px;
}

.blog-detail__lang {
  font-family: var(--font-family-secondary);
  font-size: xx-large;
}
</style>
