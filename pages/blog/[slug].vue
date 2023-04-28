<template>
  <Page
    class="blog-detail"
    :title="article.title ?? 'Ramona Schwering'"
    :img="{
      path: article.img,
      alt: article.alt
    }"
  >
    <main>
      <DetailSummary :article="article">
        <p v-if="otherLanguages.length" class="blog-detail__lang">
          {{ $t('alsoAvailableIn') }}
          <NuxtLink
            class="uppercase text-teal-600 hover:text-teal-800"
            v-for="lang in otherLanguages"
            :key="lang.locale"
            :to="switchLocalePath(lang.locale)"
          >
            {{ lang.name }}
          </NuxtLink>
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

<script lang="ts" setup>
import type { Article } from '@/types'

import DetailSummary from "@/components/DetailSummary.vue";
import Page from "@/components/Page.vue";

const { locale } = useI18n();
const route = useRoute()

const switchLocalePath = useSwitchLocalePath()

const path = locale.value !== 'en' ? `articles/${locale.value}` : 'articles/';
console.log(path + route.params.slug)
const article = await queryContent<Article>(path + route.params.slug).findOne();

const canonicalLink = computed(() => {
  if (!article.author.bio?.includes('smashing')) {
    return {}
  }

  return {
    rel: 'canonical',
    href: article.author.bio?.includes('smashing') ? article.author.bio : undefined
  };
});

const otherLanguages = computed(() => {
  return article.otherLanguages || [];
});

useHead(() => {
  return {
  title: article?.title ?? 'Ramona Schwering\'s Blog',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          property: 'og:title',
          hid:'og:title-detail',
          content: article?.title ?? 'Ramona Schwering'
        },
        {
          property: 'og:description',
          hid:'og:description-detail',
          content: article?.description ?? 'Ramona Schwering.'
        },
        { hid: 'og:image-detail',
          property: 'og:image',
          content: `https://www.ramona.codes/${article.img ?? 'ogimage.png'}`},
        { name: 'twitter:card', hid:'twitter:card-detail', content: 'summary_large_image' }
      ],
      link: [
        canonicalLink
      ],
    };
})
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
  .nuxt-content-highlight pre[class*="language-"] {
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
  font-family: 'Amatic SC';
  font-size: xx-large;
}
</style>
