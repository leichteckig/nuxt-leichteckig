<template>
  <div class="container">
    <article
      v-for="article in contents"
      class="post handdraw-border"
      @click="$router.push({ name: `${slugName}-slug`, params: { slug: article.slug } })"
    >
      <h3 class="post__title">
        <NuxtLink :to="{ name: `${slugName}-slug`, params: { slug: article.slug } }">
          {{ article.title }}
        </NuxtLink>
      </h3>
      <p>{{ article.description }}</p>
    </article>
  </div>
</template>

<script>

export default {
  name: "SmallTile",

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
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 60px;
}

.post {
  padding: 50px 25px;
}

.post p {
  margin-bottom: 30px;
}

.post__title {
  font-size: 22px;
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

</style>
