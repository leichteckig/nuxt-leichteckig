<template>
  <Page title="Blog">
    <article
      v-for="article of articles"
      :key="article.slug">

      <div class="text-muted">{{ article.author.name }}</div>
      <h3>
        <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }">
          {{ article.title }}
        </NuxtLink>
      </h3>
      <p>{{ article.description }}</p>

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

</style>
