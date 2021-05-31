<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    return { article }
  },

  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
}
</script>

<template>
  <Page :title="article.title">
    <h5 class="text-muted">{{ article.description }}</h5>
    <div class="text-muted">{{ article.author.name }}</div>
    <p class="text-muted">{{ formatDate(article.createdAt) }}</p>

    <nuxt-content :document="article" />
  </Page>
</template>

<style>
  .text-muted {
    color: var(--color-text-muted);
  }
</style>
