<template>
  <Page
    title="Ramona Schwering's blog"
    class="blog"
  >
    <main>
      <TagCard
        :tags="initialTags"
        :description="$t('writingDescription')"
        @filter="filterList"
        @reset="loadList">
      </TagCard>
      <LargeTile
        :contents="articles"
        slug-name="blog"
        data-cy="BlogListing"
      />
    </main>
  </Page>
</template>

<script>
import LargeTile from '@/components/LargeTile';
import TagCard from '@/components/TagCard';

export default {
  name: 'BlogIndex',
  components: {
    TagCard,
    LargeTile
  },

  async asyncData({ $content, i18n }) {
    const path = i18n.locale !== 'en' ? `articles/${i18n.locale}` : 'articles';

    const articles = await $content(path)
      .only(['title', 'description', 'img', 'slug', 'author', 'language', 'id', 'tags'])
      .sortBy('createdAt', 'desc')
      .fetch();

    return {
      articles
    }
  },

  head() {
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
  },

  data() {
    return {
      initialTags: ['system', 'light', 'dark']
    }
  },

  created() {
    let tags = [];
    this.articles?.forEach(post => {
      tags = [...tags, ...post.tags]
    });

    this.initialTags = Array.from(new Set(tags));
  },

  methods: {
    async filterList(tag) {
      this.articles = await this.$content('articles')
        .where({tags: {$containsAny: [tag]}})
        .only(['title', 'description', 'img', 'slug', 'author', 'tags'])
        .sortBy('createdAt', 'desc')
        .fetch();
    },

    async loadList() {
      this.articles = await this.$content('articles')
        .only(['title', 'description', 'img', 'slug', 'author', 'tags'])
        .sortBy('createdAt', 'desc')
        .fetch();
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
