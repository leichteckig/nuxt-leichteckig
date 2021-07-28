<template>
  <Page title="My content and other publications">
    <section>
    </section>
    <section class="container">
      <h2>Guest contributions and appearances</h2>
      <div class="featured-posts">
        <LinkTile :contents="publications">
        </LinkTile>
      </div>
    </section>
  </Page>
</template>

<script>
import LinkTile from "@/components/LinkTile";
import Hero from "@/components/Hero";

export default {
  name: 'publicationList',
  components: {
    LinkTile
  },

  async asyncData({ $content, params }) {
    const pastTalks = await $content('talks')
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'asc').limit(6)
      .fetch();


    const publications = await $content('publications')
      .only(['title', 'description', 'img', 'slug', 'author', 'tags'])
      .sortBy('createdAt', 'asc')
      .limit(6)
      .fetch();

    return {
      pastTalks, publications
    }
  },

}
</script>

<style scoped>

h2 {
  margin: 50px 0;
  text-align: center;
}

.publication .handdraw-line {
  margin: 0;
  overflow: hidden;
  z-index: 3;
}

.publication__title {
  font-size: 60px;
  font-weight: normal;
  margin-bottom: 20px;
}

.publication__sub-title {
  font-size: 30px;
  font-weight: normal;
  margin-bottom: 30px;
  color: var(--color-primary);
}

.publication__inner {
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

.more__button {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 50px;
}
</style>
