<template>
  <Page title="Past talks"
      class="talk-list">
    <section>
    </section>
    <section class="past-talks">
      <h2>Talks I held in the past</h2>
      <div class="featured-posts">
        <SmallTile
          :contents="pastTalks"
          slugName="talks"
        />
      </div>
    </section>
  </Page>
</template>

<script>
import LinkTile from "@/components/LinkTile";

export default {
  name: 'talkList',
  components: {
    LinkTile
  },

  async asyncData({ $content, params }) {
    const pastTalks = await $content('talks')
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'asc')
      .fetch();

    return {
      pastTalks
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

.talk-list .hero-image {
  object-position: 70% 30%;
}
</style>
