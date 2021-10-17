<template>
  <Page title="Ramona Schwering's blog" class="blog">
    <main>
      <LargeTile
        :contents="articles"
        slug-name="blog"
        data-cy="BlogListing"
      />
    </main>
  </Page>
</template>

<script>
import LargeTile from '@/components/LargeTile'

export default {
  name: 'BlogIndex',
  components: {
    LargeTile
  },

  async asyncData ({ $content }) {
    const articles = await $content('articles')
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'desc')
      .fetch()

    return {
      articles
    }
  },

  head () {
    return {
      title: 'Writing',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'writing-description',
          name: 'writing',
          content: 'Sometimes I write article and stuff. Head over to this list if you want to read them.'
        }
      ]
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
  color: var(--color-text-default);
}

.blog-card__title a {
  text-decoration: none;
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
