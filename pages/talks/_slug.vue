<template>
  <Page :title="talk.title">
    <main class="talk--content" data-cy="TalkDetailContent">
      <DetailSummary :article="talk"></DetailSummary>
      <nuxt-content :document="talk" data-cy="TalkDetailContent" />
    </main>
  </Page>
</template>

<script>
import DetailSummary from "@/components/DetailSummary";

export default {
  name: 'talkDetail',

  head() {
    return {
      title: this.talk.title,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: this.talk.title.replace(' ', '-'),
          name: this.talk.title,
          content: this.talk.description
        },
        { name: 'og:title', hid:'og:title', content: this.talk.title },
        { name: 'og:description', hid:'og:description', content: this.talk.description },
      ],
      link: [
        {
          rel: 'canoncial',
          href: this.talk.author.bio.includes('speakerdeck') ? this.talk.author.bio : undefined
        },
      ],
    }
  },

  components: {
    DetailSummary
  },

  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  },

  async asyncData({ $content, params }) {
    const talk = await $content('talks', params.slug).fetch();

    return { talk }
  },
}
</script>

<style scoped>
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

  @media (min-width: 800px) {
    summary-detail__tag {
      flex-basis: 30%;
    }
  }
</style>
