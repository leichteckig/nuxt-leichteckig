<template>
  <Page class="blog-detail" :title="article.title" :img="{
    path: article.img,
    alt: article.alt
  }">
    <main>
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
    const article = await $content('articles', params.slug).fetch();

    return { article }
  },

  head() {
    return {
      title: this.article.title,
      link: [
        {
          rel: 'canoncial',
          href: this.article.author.bio.includes('smashing') ? this.article.author.bio : undefined
        },
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },

  components: {
    DetailSummary
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

  .blog-detail ul {
    line-height: 1.75;
  }

  .blog-detail p {
    line-height: 1.75;
  }

  .blog-detail li {
    line-height: 1.75;
  }

  .blog-detail li::marker {
    color: var(--color-primary);
  }

  .blog-detail code,
  .blog-detail .nuxt-content-highlight pre[class*="language-"] {
    border: solid 3px var(--bg-secondary);
    background: var(--bg-secondary);
    color: var(--color);
    text-shadow: none;
    width: 100%;
    margin: 0 auto;
    font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;

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

  .blog-detail .nuxt-content-highlight pre[class*="language-"] .token.operator {
    background-color: var(--bg-secondary);
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
