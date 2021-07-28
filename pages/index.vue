<template>
  <main class="index">
    <section class="hero handdraw-line">
      <div class="container hero__inner">
        <div class="hero__text">
          <h1 class="hero__title">Hi, I'm Ramona</h1>
          <h2 class="hero__sub-title">A frontend-developer<br> who ❤️ test automation and JavaScript</h2>
          <Button>Visit my projects</Button>
          <Button variant="secondary">Message me</Button>
        </div>
        <Polaroid imagePath="/moe.jpg" />
      </div>
    </section>
    <section class="featured-posts">
        <SmallTile
          :contents="articles"
          slugName="blog">
        </SmallTile>
    </section>
  </main>
</template>

<script>
import SmallTile from "../components/SmallTile";
import Polaroid from "../components/Polaroid";

export default {
  name: 'index',
  components: {
    Polaroid,
    SmallTile
  },
  async asyncData({ $content, params }) {
    const articles = await $content('articles')
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'asc')
      .limit(3)
      .fetch();

    return {
      articles
    }
  }
}
</script>

<style>

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.hero {
  min-height: 300px;
  padding: 100px 0;
}

.hero__title {
  font-size: 60px;
  font-weight: normal;
  margin-bottom: 20px;
}

.hero__sub-title {
  font-size: 30px;
  font-weight: normal;
  margin-bottom: 30px;
  color: var(--color-primary);
}

.hero__inner {
  display: flex;
}

.featured-posts {
  padding: 40px 0;
}

.featured-posts .container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 60px;
}

.featured-posts p {
  margin-bottom: 30px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
