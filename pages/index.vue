<template>
  <main class="index">
    <section class="hero handdraw-line">
      <div class="container hero__inner">
        <div class="hero__text">
          <h1
            class="hero__title"
            data-cy="Welcome"
          >
            Hi, I'm Ramona
          </h1>
          <p
            class="hero__sub-title"
            data-cy="WelcomeDescription"
          >
            A frontend-developer<br> who ❤️ Test Automation and JavaScript
          </p>
          <SocialButtonGroup />
        </div>
        <Polaroid
          image-path="/Moe-portrait.webp"
          type="rose"
        />
      </div>
    </section>
    <section class="moe-refer">
      <div class="container moe__inner">
        <div class="moe__text">
          <h2 class="moe__title">
            Who dis?
          </h2>
          <p class="moe__sub-title">
            Ramona Schwering. Software Developer @shopware. International Speaker. Cypress Ambassador.
            OpenSource Lover ❤️
          </p>
          <p class="moe__description">
            After my education as an application developer, I contributed to product development at shopware AG for
            about six years now: First in quality assurance
            and now, as Software Developer. I own both views of the product - that of a tester and that of a
            developer: I use this primarily to strengthen trust in test automation and to support the testers.
            The automation in the end-to-end area of shopware originates from my pen, and I continue to push it firmly.
          </p>
        </div>
      </div>
      <div class="gradient" />
      <div class="handdraw-line" />
    </section>
    <section
      class="featured-posts"
      data-cy="FeaturedPosts"
    >
      <div class="container">
        <h2>Featured Posts</h2>
        <SmallTile
          :contents="articles"
          slug-name="blog"
        />
      </div>
    </section>
  </main>
</template>

<script>
import SmallTile from "../components/SmallTile";
import Polaroid from "../components/Polaroid";
import SocialButtonGroup from "~/components/SocialButtonGroup";

export default {
  name: 'Index',

  components: {
    Polaroid,
    SmallTile,
    SocialButtonGroup
  },

  async asyncData({ $content }) {
    const articles = await $content('articles')
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'desc')
      .limit(3)
      .fetch();

    return {
      articles
    }
  },

  head() {
    return {
      title: 'Ramona Schwering',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'index-description',
          name: 'index',
          content: 'Hi, I\'m Ramona. ' +
            'Software Developer @shopware. International Speaker. Cypress Ambassador. OpenSource Lover'
        }
      ]
    }
  }
}
</script>

<style>
.hero {
  min-height: 300px;
  padding-bottom: 40px;
}

.hero__text {
  margin-top: 40px;
  margin-bottom: 40px;
}

.hero__title {
  font-size: 60px;
  font-weight: normal;
  margin-top: 0;
  margin-bottom: 20px;
}

.hero__sub-title {
  font-size: 30px;
  font-weight: normal;
  margin-bottom: 30px;
  color: var(--color);
}

.hero__inner {
  display: grid;
  grid-template-columns: 1fr;
}

.featured-posts {
  padding: 40px 0;
}

.featured-posts p {
  margin-bottom: 30px;
}

.container {
  max-width: 1280px;
  padding: 0 40px;
  margin: 0 auto;
}

.moe__title {
  margin-bottom: 20px;
}

.moe__sub-title {
  font-size: 30px;
  font-weight: normal;
  margin-bottom: 30px;
}

.moe__description {
  line-height: 1.75;
}

.moe__inner {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 50px;
}

.gradient {
  height: 30px;

  background: repeating-linear-gradient(
    45deg,
    var(--border-color),
    var(--border-color) 1px,
    var(--bg) 1px,
    var(--bg) 10px
  );
}

@media screen and (min-width: 800px) {
  .hero__inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .hero {
    min-height: 300px;
    padding: 100px 0;
  }
}
</style>
