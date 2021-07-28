<template>
  <Page class="blog-detail" :title="article.title">
    <main>
      <img v-if="article.img"
           class="blog-detail__img"
           :src="article.img"
           alt="article.title"
      />

      <DetailSummary :article="article"></DetailSummary>

      <article class="blog-detail__detail-content">
        <nuxt-content :document="article" />
      </article>
    </main>
  </Page>
</template>

<script>
import DetailSummary from "@/components/DetailSummary";

export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    return { article }
  },

  components: {
    DetailSummary
  },

  created() {
    console.log('article', this.article)
  }
}
</script>
<style>
  .blog-detail__img {
    height: 160px;
    width: 100%;
    object-fit: cover;
    border-radius: 6px;
    display: block;
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

  .blog-detail p {
    line-height: 1.75;
  }

  .blog-detail p code,
  .blog-detail .nuxt-content-highlight pre[class*="language-"] {
    border: solid 3px var(--border-color);
    background: var(--border-color);
    color: var(--color);
    text-shadow: none;

    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 255px;
    border-bottom-right-radius: 225px 15px;
    border-bottom-left-radius:15px 255px;
  }

  .blog-detail .nuxt-content-highlight pre[class*="language-"] .keyword {
    color: var(--color-primary);
  }

  .blog-detail .nuxt-content-highlight pre[class*="language-"] .token.boolean {
    color: var(--color);
  }

  .blog-detail blockquote {
    color: var(--color-primary);
    font-style: italic;
  }

  .blog-detail__detail-content iframe {
    border: solid 3px var(--border-color);
    margin: 0 auto;

    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 255px;
    border-bottom-right-radius: 225px 15px;
    border-bottom-left-radius:15px 255px;
  }
</style>
