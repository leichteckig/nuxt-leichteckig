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
          class="img-header img-skeleton"
          width="250"
          height="250"
          decoding="async"
        >
      </div>
      <TableOverview :contents="futureEvents"/>
      <div></div>
      <div v-if="pastEvents" class="talks__past-conference">
        <h3
          class="talks__past-conference--title"
          :class="{ talks__active: !pastHidden }"
          role="button"
          tabindex="0"
          :aria-expanded="!pastHidden"
          @click="pastHidden = !pastHidden"
          @keydown.enter.prevent="pastHidden = !pastHidden"
          @keydown.space.prevent="pastHidden = !pastHidden"
        >
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
            :to="localePath({ name: 'talkList' })"
          >
            {{ $t('pastTalkButton') }}
          </Button>
        </div>
      </div>
    </section>
  </Page>
</template>

<script setup>
const localePath = useLocalePath()

const { data: appearances } = await useAsyncData(
  'conferences',
  () => queryCollection('conferences')
    .select('title', 'description', 'img', 'alt', 'createdAt')
    .order('createdAt', 'ASC')
    .all()
)

const futureEvents = computed(() =>
  (appearances.value ?? []).filter(event => Date.now() < Date.parse(event.createdAt))
)
const pastEvents = computed(() =>
  (appearances.value ?? []).filter(event => Date.now() > Date.parse(event.createdAt))
)

const pastHidden = ref(true)

useHead({
  title: 'Attending',
  meta: [
    {
      name: 'description',
      content: 'Take a look at all events I\'ll visit or attended before.'
    }
  ]
})
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
    // Fallback (Firefox/Safari): animate max-height with a value
    // which is unlikely to happen, since `height: auto` can't
    // be interpolated there yet
    max-height: 5000px;
    opacity: 1;
  }
}

// Browsers with interpolate-size can animate to the real content
// height instead of guessing with max-height
@supports (interpolate-size: allow-keywords) {
  .talks__past-inner {
    interpolate-size: allow-keywords;
    max-height: none;
    block-size: 0;
    transition: block-size 0.5s ease-in-out, opacity 0.5s ease-in-out;

    &.talks__active {
      max-height: none;
      block-size: auto;
    }
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
