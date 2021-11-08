<template>
  <section class="large-tile">
    <article
      v-for="article of contents"
      :key="article.slug"
      class="blog-card handdraw-border"
      @click="$router.push({ name: `${slugName}-slug`, params: { slug: article.slug } })"
      data-cy="SinglePost"
    >
      <div class="blog-card__author text-muted">
        <img
          class="blog-card__author-img"
          :src="article.author.image"
        >
        {{ article.author.name }}
      </div>

      <h3 class="blog-card__title">
        <NuxtLink :to="{ name: `${slugName}-slug`, params: { slug: article.slug } }">
          {{ article.title }}
        </NuxtLink>
      </h3>

      <NuxtLink :to="{ name: `${slugName}-slug`, params: { slug: article.slug } }">
        <img
          :src="`/${article.img}`"
          class="blog-card__img"
        >
      </NuxtLink>
      <p class="blog-card__description">{{ article.description }}</p>

    </article>
  </section>
</template>

<script>
export default {
  name: "LargeTile",

  props: {
    contents: {
      type: Array,
      required: true
    },
    slugName: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

.blog-card {
  padding: 50px;
  margin: 25px 0;
}

.blog-card:hover {
  border: solid 3px var(--color-primary);
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
