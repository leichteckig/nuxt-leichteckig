<template>
  <Page :title="$t('attendingTitle')">
    <h2>{{ $t('attendingSubtitle') }}</h2>
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
      <TableOverview :contents="futureEvents"/>
      <div></div>
      <div v-if="pastEvents" class="talks__past-conference">
        <h3 class="talks__past-conference--title" @click="pastHidden = !pastHidden" :class="{ talks__active: !pastHidden }">
          {{ $t('pastEventsTitle') }}
        </h3>
        <div class="talks__past-inner" :class="{ talks__active: !pastHidden }">
          <TableOverview :contents="pastEvents"/>
        </div>
      </div>
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
            {{ $t('pastTalkTitle') }}
          </h2>
          <p class="talks__sub-title">
            {{ $t('pastTalkSubtitle') }}
          </p>
          <Button
            variant="secondary"
            data-cy="ButtonToTalks"
            @click.native="$router.push(localePath({ name: 'talkList' }))"
          >
            {{ $t('pastTalkButton') }}
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

    let futureEvents = appearances.filter(event => Date.now() < Date.parse(event.createdAt));
    let pastEvents = appearances.filter(event => Date.now() > Date.parse(event.createdAt));

    return {
      futureEvents, pastEvents
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
  },

  data() {
    return {
      years: [2020, 2021],
      pastHidden: true,
      futureEvents: [],
    }
  },

  computed: {
    getAccordionClasses() {
      if (this.hidden) {
        return 'talks__block';
      }
      return '.talks__hidden';
    },
  },

  methods: {
    characterItemClick() {
      this.hidden = !this.hidden;
      console.log('this.hidden', this.hidden)
    },
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

.talks__past-conference--title {
  cursor: pointer;
  padding: 18px 0;
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
  color: var(--color-primary);
}

.talks__past-conference--title:after {
  content: '+'; /* Unicode character for "plus" sign (+) */
  color: var(--color-primary);
  float: left;
  margin-right: 10px;
  font-size: 46px;
  line-height: 46px;
}

.talks__past-inner {
  transition: all 0.5s ease-in-out;
  overflow: hidden;
  max-height: 0;
  opacity: 0;

  &.talks__active {
    // Workaround to animate height with CSS only
    // Set max-height to a value which is unlikely to happen
    // Otherwise the real height needs to be grabbed by JS
    max-height: 5000px;
    opacity: 1;
  }
}

.talks__active:after {
  content: "-"; /* Unicode character for "minus" sign (-) */
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
