<template>
  <Page :title="talk.title">
    <main class="talk--content">
      <DetailSummary :article="talk"></DetailSummary>
      <nuxt-content :document="talk" />
    </main>
  </Page>
</template>

<script>
import DetailSummary from "@/components/DetailSummary";

export default {
  async asyncData({ $content, params }) {
    const talk = await $content('talks', params.slug).fetch()

    return { talk }
  },

  components: {
    DetailSummary
  },

  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
}
</script>

<style scoped>
  .text-muted {
    color: var(--color-text-muted);
  }

  .talk--content iframe {
    border: solid 3px var(--border-color);
    margin: 10px auto;

    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 255px;
    border-bottom-right-radius: 225px 15px;
    border-bottom-left-radius:15px 255px;
  }

  .talk--content p code,
  .talk--content .nuxt-content-highlight pre[class*="language-"] {
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
  h3 {
    color: var(--color);
  }
</style>
