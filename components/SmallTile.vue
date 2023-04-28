<template>
  <div class="small-tile">
    <article
      v-for="article in contents"
      :key="article.title"
      class="post handdraw-border"
      data-cy="SingleArticle"
      @click="$router.push(localePath({ name: `${slugName}-slug`, params: { slug: article.slug } }))"
    >
      <h3 class="post__title">
        <NuxtLink :to="localePath({ name: `${slugName}-slug`, params: { slug: article.slug } })">
          {{ article.title }}
        </NuxtLink>
      </h3>
      <p>{{ article.description }}</p>
    </article>
  </div>
</template>

<script lang="ts" setup>
const localePath = useLocalePath();

defineProps<{
  contents: {
    title: string
    description: string
    slug: string
  }[]
  slugName: string
}>()
</script>

<style scoped>
.small-tile {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 60px;
}

.post {
  padding: 50px 25px;
  max-height: 570px;
}

.post p {
  margin-bottom: 30px;
}

.post__title {
  font-size: 30px;
  font-weight: normal;
  margin-bottom: 20px;
  color: var(--color-primary);
  top: 0;
}

.post__title a {
  text-decoration: none;
}

.post:hover {
  border: solid 3px var(--color-primary);
}

@media (max-width: 800px) {
  summary-detail__tag {
    flex-basis: 30%;
  }
}
</style>
