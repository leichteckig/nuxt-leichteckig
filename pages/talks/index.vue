<template>
  <Page title="My content and other publications" :img="{
        path: 'recording-moe.jpg',
        alt: 'Me, recording things'
      }">
    <section>
    </section>
    <section class="container past-talks handdraw-line">
      <h2>Talks I held in the past</h2>
      <div class="featured-posts">
        <SmallTile
          :contents="pastTalks"
          slugName="talks"
        />
      </div>
      <div class="more__button">
        <Button @click.native="$router.push({ name: 'talkList' })">
          See more
        </Button>
      </div>
    </section>

    <section class="container">
      <h2>Guest contributions and appearances</h2>
      <div class="featured-posts">
        <LinkTile :contents="publications">
        </LinkTile>
      </div>
      <div class="more__button">
        <Button @click.native="$router.push({ name: 'publicationList' })">
          See more
        </Button>
      </div>
    </section>
  </Page>
</template>

<script>
import LinkTile from "@/components/LinkTile";
import Hero from "@/components/Hero";

export default {
  name: 'talks',
  components: {
    TableOverview
  },

  head() {
    return {
      title: 'My conference appearances and talks',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },

  data() {
    return {
      currentTalks: [{
        title: 'How to survive conferences as an introvert',
        link: 'https://scd.shopware.com/',
        eventTitle: 'Shopware Community Day 2020',
        date: '02.09.2021'
      },{
        title: 'How to survive conferences as an introvert',
        link: 'https://femtechconf.com/',
        eventTitle: 'How to survive conferences as an introvert',
        date: '24. - 25.09.2021'
      },{
        title: 'Let\'s get visual',
        link: 'https://www.codetalks.de/home',
        eventTitle: 'code.talks',
        date: '28. - 29.10.2021'
      },{
        placeholder: true
      },{
        title: 'Not always as a speaker, but it\'s our Cypress Germany meetup! ❤️',
        link: 'https://www.meetup.com/de-DE/cypress-de-community/',
        eventTitle: 'Cypress DE Community',
        date: 'Once in a quarter'
      }]
    }
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
