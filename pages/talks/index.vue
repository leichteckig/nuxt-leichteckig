<template>
  <Page title="My talks">
    <h2>Meet me at...</h2>
    <section class="container upcoming-talks">
      <div class="image-container">
        <img alt="Moe giving talks" src="~/assets/images/talks.jpeg" class=" img-header"/>
      </div>
      <TableOverview :contents="currentTalks"/>
    </section>
    <section class="container past-talks">
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
import TableOverview from "@/components/TableOverview";

export default {
  name: 'talks',
  components: {
    TableOverview
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
      .sortBy('createdAt', 'asc')
      .fetch();

    return {
      pastTalks
    }
  }
}
</script>

<style scoped>

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.upcoming-talks {
  display: flex;
  flex-wrap: wrap;
  margin: 50px;
}

h2 {
  margin: 50px 0;
  text-align: center;
}

.img-header {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin-right: 75px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.talk {
  padding: 20px;
}
</style>
