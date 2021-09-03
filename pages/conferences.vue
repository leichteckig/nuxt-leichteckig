<template>
  <Page title="Events I attend">
    <h2>Conferences 2021: Meet me at...</h2>
    <section class="conference-talks">
      <div class="image-container">
        <img alt="Moe giving talks" src="~/assets/images/talks.jpeg" class=" img-header"/>
      </div>
      <TableOverview :contents="currentTalks"/>
    </section>

    <section class="talks-refer handdraw-line">
      <div class="handdraw-line"></div>
      <div class="gradient"></div>
      <div class="talks__inner">
        <div class="talks__text">
          <h2 class="talks__title">Looking for my past talks?</h2>
          <h3 class="talks__sub-title">Head over to the talks site for an overview!</h3>
          <Button
            variant="secondary"
            @click.native="$router.push({ name: 'talkList' })">
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
  name: 'conferences',
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
      },{
        placeholder: true
      },{
        title: 'Symfony User Group Osnabrück #10',
        link: 'https://www.meetup.com/de-DE/sfugos/events/275765097/',
        eventTitle: 'Symfony Usergroup Osnabrück',
        date: '28.01.2021',
        old: true
      },{
        title: 'PHP UG Darmstadt 1/21',
        link: 'https://www.meetup.com/de-DE/Darmstadt-PHP-Meetup-Gruppe/events/275064690/',
        eventTitle: 'Darmstadt PHP Meetup Gruppe',
        date: '10.02.2021',
        old: true
      },{
        title: 'CityJS London 2021',
        link: 'https://cityjsconf.org/',
        eventTitle: 'CityJS London 2021',
        date: '24.03.2021 - 26.03.2021',
        old: true
      },{
        title: 'SymfonyLive Online, German Edition',
        link: 'https://live.symfony.com/2021-germany/',
        eventTitle: 'SymfonyLive Online, German Edition',
        date: '16.04.2021',
        old: true
      },{
        title: 'TechFAIR Live 2021',
        link: 'https://www.techfairlive.com/',
        eventTitle: 'TechFAIR Live 2021',
        date: '30.04.2021',
        old: true
      },{
        title: 'WEUc Online Session: Flaky Tests - Fighting Nightmares',
        link: 'https://ti.to/phpuceu/may21?fbclid=IwAR10jWrm5zKarJPMSkP6tHWo3FSsT8_DHFKb93G_yl5aOxEBYZ7jQhc3Aj8',
        eventTitle: 'WEUc Online Session',
        date: '05.05.2021',
        old: true
      },{
        title: 'Front-End Test Fest | June 2021',
        link: 'https://applitools.com/on-demand-videos/front-end-test-fest-june-2021/',
        eventTitle: 'Front-End Test Fest',
        date: '08.06.2021',
        old: true
      },{
        title: 'Developer Week 2021',
        link: 'https://applitools.com/on-demand-videos/front-end-test-fest-june-2021/',
        eventTitle: 'Developer Week 2021',
        date: '28.06.2021 - 02.07.2021',
        old: true
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
