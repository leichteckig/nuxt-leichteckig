<template>
  <Page title="Blog" class="blog">

    <!-- TODO: Make blog card component -->
    <article
      v-for="article of articles"
      :key="article.slug"
      class="blog-card"
    >
      <div class="blog-card__author text-muted">
        <img
          class="blog-card__author-img"
          :src="article.author.image"
        >
        {{ article.author.name }}
      </div>

      <h3 class="blog-card__title">
        <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }">
          {{ article.title }}
        </NuxtLink>
      </h3>

      <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }">
        <img
          :src="article.img"
          class="blog-card__img"
        >
      </NuxtLink>
      <p class="blog-card__description">{{ article.description }}</p>

    </article>
  </Page>
</template>

<script>
export default {
  name: 'index',

  async asyncData({ $content, params }) {
    const articles = await $content('articles')
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'asc')
      .fetch();

    return {
      articles
    }
  }
}
</script>

<style scoped>
  .blog-card {
    padding-bottom: 50px;
  }

  .blog-card__author {
    margin-bottom: 6px;
  }

  .blog-card__title {
    margin-top: 0;
  }

  .blog-card__title a {
    text-decoration: none;
    color: var(--color-text-default);
  }

  .blog-card__img {
    height: 160px;
    width: 100%;
    object-fit: cover;
    border-radius: 6px;
    display: block;
  }

  .blog-card__author {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .blog-card__author-img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
  }
</style>
