<template>
  <Page title="Events I attend">
    <h2>Meet me at...</h2>
    <main
      class="conference-talks"
      data-cy="EventAppearances"
    >
      <div class="image-container">
        <img
          alt="Moe giving talks"
          src="/ramona-schwering-talks-small.jpeg"
          class=" img-header"
        >
      </div>
      <TableOverview :contents="appearances" />
    </main>

    <section
      class="talks-refer handdraw-line"
      data-cy="PastTalks"
    >
      <div class="handdraw-line" />
      <div class="gradient" />
      <div class="talks__inner">
        <div class="talks__text">
          <h2 class="talks__title">
            Looking for my past talks?
          </h2>
          <p class="talks__sub-title">
            Head over to the talks site for an overview!
          </p>
          <Button
            variant="secondary"
            data-cy="ButtonToTalks"
            @click.native="$router.push({ name: 'talkList' })"
          >
            Talks
          </Button>
        </div>
      </div>
    </section>
  </Page>
</template>

<script>
import TableOverview from "@/components/TableOverview";

export default {
  name: 'Conferences',
  components: {
    TableOverview
  },

  async asyncData({ $content }) {
    const appearances = await $content('conferences')
      .only(['title', 'description', 'img', 'alt', 'createdAt'])
      .sortBy('createdAt', 'asc')
      .fetch();

    return {
      appearances
    }
  },

  head() {
    return {
      title: 'Attending',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'conferences-description',
          name: 'conferences',
          content: 'Take a look at all events I\'ll visit or attended before.'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

.conference-talks {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-gap: 60px;
  margin-bottom: 60px;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

h2 {
  margin: 50px 0;
  text-align: center;
}

.image-container {
  display: flex;
  justify-content: center;
}

.img-header {
  width: 250px;
  height: 250px;
  border-radius: 50%;
}

h2 {
  margin: 50px 0;
  text-align: center;
}

.talks .handdraw-line {
  margin: 0;
  overflow: hidden;
  z-index: 3;
}

.talks__title {
  font-size: 60px;
  font-weight: normal;
  margin-bottom: 20px;
}

.talks__sub-title {
  font-size: 30px;
  font-weight: normal;
  margin-bottom: 30px;
}

.talks__inner {
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
</style>
