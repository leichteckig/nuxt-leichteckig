<template>
  <div class="container">
    <article
      v-for="article in contents"
      class="post handdraw-border"
    >
      <h3 class="post__title">
        <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }">
          {{ article.title }}
        </NuxtLink>
      </h3>
      <p>{{ article.description }}</p>
      <Button class="btn handdraw-border" variant="secondary" @click.native="$router.push({ name: 'blog-slug', params: { slug: article.slug } })">Read more...</Button>
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
  padding: 25px;
  border: solid 3px var(--bg);
}

.post p {
  margin-bottom: 30px;
}

.post__title {
  font-size: 22px;
  font-weight: normal;
  margin-bottom: 20px;
  color: var(--color-primary);
  text-decoration: none;
}

.post__title a {
  text-decoration: none;
}

.post:hover {
  border: solid 3px var(--color-primary);
}

.btn {
  bottom: 0;
  margin: 50px auto 0 auto;
  display: block;
}

</style>
