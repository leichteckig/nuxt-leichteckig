<template>
  <Page class="blog-detail" :title="article.title" :img="{
    path: article.img,
    alt: article.alt
  }">
    <main>
      <DetailSummary :article="article"></DetailSummary>

      <article class="blog-detail__detail-content" data-cy="BlogDetailContent">
        <nuxt-content :document="article" data-cy="BlogDetailContent" />
      </article>
    </main>
  </Page>
</template>

<script>
import DetailSummary from "@/components/DetailSummary";

export default {
  name: 'blogDetail',

  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch();

    return { article }
  },

  head() {
    return {
      title: this.article.title,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:title', hid:'og:title-detail', content: this.article.title? this.article.title : 'Ramona Schwering' },
        { property: 'og:description', hid:'og:description-detail', content: this.article.description? this.article.description : 'Ramona Schwering. Software Developer @shopware. International Speaker. Cypress Ambassador. OpenSource Lover.' },
        { hid: 'og:image-detail', property: 'og:image', content: this.article.img? `https://www.ramona.codes/${this.article.img}` : 'https://www.ramona.codes/ogimage.png'},
        { name: 'twitter:card', hid:'twitter:card-detail', content: 'summary_large_image' }
      ],
      link: [
        {
          rel: 'canoncial',
          href: this.article.author.bio.includes('smashing') ? this.article.author.bio : undefined
        },
      ],
    }
  },

  components: {
    DetailSummary
  }
}
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
      border-bottom-left-radius:15px 255px;

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
    border-bottom-left-radius:15px 255px;
  }

  .hint {
    margin: 20px;
  }
</style>
