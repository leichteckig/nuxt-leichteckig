<template>
  <Page title="My content and other publications" :img="{
        path: 'recording-ramona-schwering.jpg',
        alt: 'Me, recording things'
      }">
    <main>
      <section class="past-talks" data-cy="PastTalkOverview">
        <h2>Talks I held in the past</h2>
        <div class="featured-posts">
          <SmallTile
            :contents="pastTalks"
            slugName="talks"
          />
        </div>
        <div class="more__button">
          <Button
          @click.native="$router.push({ name: 'talkList' })"
          data-cy="ButtonToTalks">
            See more
          </Button>
        </div>
      </section>
      <section class="talks-refer handdraw-line" data-cy="PastTalks">
        <div class="handdraw-line"></div>
        <div class="gradient"></div>
        <div class="talks__inner">
          <div class="gradient"></div>
          <div class="talks__text">
            <h2 class="talks__title">See my Speakerdeck!</h2>
            <p class="talks__sub-title">Here you can see all of my slides in one place! 🙌 </p>
            <Button
              variant="secondary"
              @click.native="openLink('https://speakerdeck.com/leichteckig')"
              data-cy="ButtonToSlideDeck">
              Talks
            </Button>
          </div>
        </div>
      </section>
      <section class="guest-contributions" data-cy="PublicationOverview">
        <h2>Guest contributions and appearances</h2>
        <div class="featured-posts">
          <LinkTile :contents="publications">
          </LinkTile>
        </div>
        <div class="more__button">
          <Button
          @click.native="$router.push({ name: 'publicationList' })"
          data-cy="ButtonToPublications">
            See more
          </Button>
        </div>
      </section>
    </main>
  </Page>
</template>

<script>
import LinkTile from "@/components/LinkTile";
import Hero from "@/components/Hero";

export default {
  name: 'speaking',
  components: {
    LinkTile,
    Hero
  },

  head() {
    return {
      title: 'Speaking',
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {
          hid: 'speaking-description',
          name: 'speaking',
          content: 'These are all speaking contributions of me, Ramona.'
        }
      ]
    }
  },

  async asyncData({ $content }) {
    const pastTalks = await $content('talks')
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('updatedAt', 'desc')
      .limit(3)
      .fetch();


    const publications = await $content('publications')
      .only(['title', 'description', 'img', 'slug', 'author', 'tags'])
      .sortBy('createdAt', 'desc')
      .limit(3)
      .fetch();

    return {
      pastTalks, publications
    }
  },

  methods: {
    openLink(link) {
      window.open(link, '_blank',  'noopener');
    }
  }
}
</script>

<style scoped>

h2 {
  margin: 50px 0;
  text-align: center;
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
