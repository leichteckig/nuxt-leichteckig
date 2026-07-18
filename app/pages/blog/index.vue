<template>
  <Page
    title="Ramona Schwering's blog"
    class="blog"
  >
    <main>
      <LargeTile
        :contents="articles"
        slug-name="blog"
        data-cy="BlogListing"
      />
    </main>
  </Page>
</template>

<script setup>
const { locale } = useI18n()

const { data } = await useAsyncData(
  `blog-articles-${locale.value}`,
  () => queryCollection(localizedCollection('articles', locale.value))
    .select('title', 'description', 'img', 'stem', 'author')
    .order('createdAt', 'DESC')
    .all()
)

const articles = computed(() => withSlug(data.value))

useHead({
  title: 'Writing',
  meta: [
    {
      name: 'description',
      content: 'Sometimes I write article and stuff. Head over to this list if you want to read them.'
    }
  ]
})
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
