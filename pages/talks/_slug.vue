<script>
export default {
  async asyncData({ $content, params }) {
    const talk = await $content('talks', params.slug).fetch()

    return { talk }
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
  <Page :title="talk.title">
    <h5 class="text-muted">{{ talk.description }}</h5>
    <div class="text-muted">{{ talk.author.name }}</div>
    <p class="text-muted">{{ formatDate(talk.createdAt) }}</p>

    <nuxt-content :document="talk" />
  </Page>
</template>

<style>
  .text-muted {
    color: var(--color-text-muted);
  }
</style>
