<template>
  <Page :title="$t('kitTitle')">
    <main
      class="kit"
      data-cy="SpeakerKit"
    >
      <!-- Intro / quick facts -->
      <section
        class="kit__section kit__intro"
        data-cy="KitIntro"
      >
        <div class="kit__intro-grid">
          <Polaroid
            class="kit__intro-photo"
            type="dark"
            image-path="/ramona-schwering-square.webp"
          />
          <div class="kit__intro-text">
            <p class="kit__lead">
              {{ $t('kitIntroLead') }}
            </p>
            <dl class="kit__facts">
              <div class="kit__fact">
                <dt>{{ $t('kitFactNameLabel') }}</dt>
                <dd>{{ $t('kitFactName') }}</dd>
              </div>
              <div class="kit__fact">
                <dt>{{ $t('kitFactPronounceLabel') }}</dt>
                <dd>{{ $t('kitFactPronounce') }}</dd>
              </div>
              <div class="kit__fact">
                <dt>{{ $t('kitFactPronounsLabel') }}</dt>
                <dd>{{ $t('kitFactPronouns') }}</dd>
              </div>
              <div class="kit__fact">
                <dt>{{ $t('kitFactRoleLabel') }}</dt>
                <dd>{{ $t('kitFactRole') }}</dd>
              </div>
              <div class="kit__fact">
                <dt>{{ $t('kitFactBasedLabel') }}</dt>
                <dd>{{ $t('kitFactBased') }}</dd>
              </div>
              <div class="kit__fact">
                <dt>{{ $t('kitFactLanguagesLabel') }}</dt>
                <dd>{{ $t('kitFactLanguages') }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <ul
          class="kit__stats"
          data-cy="KitStats"
        >
          <li
            v-for="stat in stats"
            :key="stat.label"
            class="kit__stat handdraw-border"
          >
            <span class="kit__stat-number">{{ stat.number }}</span>
            <span class="kit__stat-label">{{ stat.label }}</span>
          </li>
        </ul>

        <Hint
          class="kit__usage-hint"
          type="success"
        >
          {{ $t('kitUsageHint') }}
        </Hint>
      </section>

      <div class="handdraw-line" />
      <div class="gradient" />

      <!-- Speaking world map -->
      <section
        class="kit__section"
        data-cy="KitMap"
      >
        <h2>{{ $t('kitMapTitle') }}</h2>
        <p class="kit__section-intro">
          {{ $t('kitMapIntro') }}
        </p>
        <SpeakingMap />
      </section>

      <div class="handdraw-line" />
      <div class="gradient" />

      <!-- Copy-paste bios -->
      <section
        class="kit__section"
        data-cy="KitBios"
      >
        <h2>{{ $t('kitBiosTitle') }}</h2>
        <p class="kit__section-intro">
          {{ $t('kitBiosIntro') }}
        </p>
        <CopyText
          :title="$t('kitBioShortTitle')"
          :text="$t('kitBioShort')"
          data-cy="CopyBioShort"
        />
        <CopyText
          :title="$t('kitBioMediumTitle')"
          :text="$t('kitBioMedium')"
          data-cy="CopyBioMedium"
        />
        <CopyText
          :title="$t('kitBioLongTitle')"
          :text="$t('kitBioLong')"
          data-cy="CopyBioLong"
        />
      </section>

      <div class="handdraw-line" />
      <div class="gradient" />

      <!-- Photo downloads -->
      <section
        class="kit__section"
        data-cy="KitPhotos"
      >
        <h2>{{ $t('kitPhotosTitle') }}</h2>
        <p class="kit__section-intro">
          {{ $t('kitPhotosIntro') }}
        </p>
        <ul class="kit__photo-grid">
          <li
            v-for="photo in photos"
            :key="photo.file"
            class="kit__photo"
          >
            <img
              class="kit__photo-img img-skeleton"
              :src="photo.file"
              :alt="photo.alt"
              loading="lazy"
              decoding="async"
              width="320"
              height="320"
            >
            <a
              class="kit__photo-download"
              :href="photo.file"
              :download="photo.download"
            >
              {{ $t('kitPhotoDownload') }}
            </a>
          </li>
        </ul>
        <p class="kit__credit">
          {{ $t('kitPhotosCredit') }}
        </p>
      </section>

      <div class="handdraw-line" />
      <div class="gradient" />

      <!-- Signature talks & topics -->
      <section
        class="kit__section"
        data-cy="KitTalks"
      >
        <h2>{{ $t('kitTalksTitle') }}</h2>
        <p class="kit__section-intro">
          {{ $t('kitTopicsIntro') }}
        </p>
        <ul class="kit__topics">
          <li
            v-for="topic in topics"
            :key="topic"
            class="kit__topic handdraw-border"
          >
            {{ topic }}
          </li>
        </ul>

        <h3 class="kit__subtitle">
          {{ $t('kitSignatureTitle') }}
        </h3>
        <ul class="kit__talks">
          <li
            v-for="talk in signatureTalks"
            :key="talk.title"
            class="kit__talk handdraw-line"
          >
            <span class="kit__talk-title">{{ talk.title }}</span>
            <span class="kit__talk-desc">{{ $t(talk.descKey) }}</span>
          </li>
        </ul>

        <div class="kit__button-row">
          <Button
            variant="secondary"
            data-cy="ButtonToTalks"
            :to="localePath({ name: 'talkList' })"
          >
            {{ $t('kitAllTalks') }}
          </Button>
          <Button
            variant="secondary"
            href="https://speakerdeck.com/leichteckig"
            target="_blank"
            rel="noopener"
          >
            {{ $t('kitSpeakerdeck') }}
          </Button>
        </div>
      </section>

      <div class="handdraw-line" />
      <div class="gradient" />

      <!-- Achievements -->
      <section
        class="kit__section"
        data-cy="KitAchievements"
      >
        <h2>{{ $t('kitAchievementsTitle') }}</h2>
        <ul class="kit__achievements">
          <li
            v-for="item in achievements"
            :key="item"
            class="kit__achievement"
          >
            {{ item }}
          </li>
        </ul>
      </section>

      <div class="handdraw-line" />
      <div class="gradient" />

      <!-- Tech rider & contact -->
      <section
        class="kit__section kit__contact"
        data-cy="KitContact"
      >
        <div class="kit__contact-grid">
          <div>
            <h2>{{ $t('kitRiderTitle') }}</h2>
            <ul class="kit__rider">
              <li
                v-for="item in rider"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <div>
            <h2>{{ $t('kitContactTitle') }}</h2>
            <p class="kit__section-intro">
              {{ $t('kitContactIntro') }}
            </p>
            <p class="kit__contact-mail">
              <ObfuscatedEmail
                user="hello"
                domain="ramona.codes"
              />
            </p>
            <SocialButtonGroup />
          </div>
        </div>
      </section>
    </main>
  </Page>
</template>

<script setup>
const { t, locale } = useI18n()
const localePath = useLocalePath()

const stats = computed(() => [
  { number: '100+', label: t('kitStatTalks') },
  { number: '22', label: t('kitStatCountries') },
  { number: t('kitStatSinceValue'), label: t('kitStatSince') }
])

const photos = [
  { file: '/ramona-schwering-square.webp', download: 'ramona-schwering-square.webp', alt: 'Ramona Schwering speaking at NDC Copenhagen (square)' },
  { file: '/ramona-schwering-ndc-copenhagen.webp', download: 'ramona-schwering-ndc-copenhagen.webp', alt: 'Ramona Schwering speaking at NDC Copenhagen' },
  { file: '/ramona-schwering-headshot.webp', download: 'ramona-schwering-headshot.webp', alt: 'Portrait of Ramona Schwering' },
  { file: '/ramona-schwering-world-congress-2023.webp', download: 'ramona-schwering-world-congress-2023.webp', alt: 'Ramona Schwering at WeAreDevelopers World Congress 2023' }
]

const topics = computed(() => [
  t('kitTopicTesting'),
  t('kitTopicA11y'),
  t('kitTopicAuth'),
  t('kitTopicVue'),
  t('kitTopicCypress'),
  t('kitTopicDevrel'),
  t('kitTopicSketchnoting')
])

// A curated three spanning Ramona's core themes: accessibility, AI/security
// and testing. Swap any entry for another talk from the talks collection.
const signatureTalks = [
  { title: 'The Cake Is a Lie… And So Is Your Login\'s Accessibility', descKey: 'kitTalkCake' },
  { title: 'Dangerous Reactivity: Why AI Output Is the New XSS', descKey: 'kitTalkReactivity' },
  { title: 'Flaky tests - Fighting nightmares', descKey: 'kitTalkFlaky' }
]

const achievements = computed(() => [
  t('kitAchievementGde'),
  t('kitAchievementWtm'),
  t('kitAchievementCypress'),
  t('kitAchievementStages'),
  t('kitAchievementWriting'),
  t('kitAchievementNt2')
])

const rider = computed(() => [
  t('kitRiderLaptop'),
  t('kitRiderAdapters'),
  t('kitRiderMic'),
  t('kitRiderAudio'),
  t('kitRiderInternet'),
  t('kitRiderSlides')
])

useHead(() => ({
  title: 'Speaker Kit',
  meta: [
    {
      name: 'description',
      content: locale.value === 'de'
        ? 'Speaker Kit von Ramona Schwering: Bios, Fotos, Talks, Achievements und Tech-Rider für Konferenz-Organisator:innen.'
        : 'Speaker kit for Ramona Schwering: bios, photos, talks, achievements and tech rider for conference organizers.'
    }
  ]
}))
</script>

<style lang="scss" scoped>
.kit {
  line-height: 1.5em;
}

.kit__section {
  margin: 40px 0;
}

.kit__section-intro {
  font-size: 18px;
  margin-bottom: 24px;
}

.kit h2 {
  margin-bottom: 20px;
}

.kit__subtitle {
  margin: 40px 0 20px;
}

/* Intro */
.kit__intro-grid {
  display: grid;
  gap: 30px;
  align-items: center;
  margin-bottom: 40px;

  @media screen and (min-width: 800px) {
    grid-template-columns: 300px 1fr;
    gap: 60px;
  }
}

.kit__lead {
  font-size: 22px;
  line-height: 1.5;
  margin-top: 0;
}

.kit__facts {
  display: grid;
  gap: 6px 20px;
  margin: 0;

  @media screen and (min-width: 500px) {
    grid-template-columns: max-content 1fr;
  }
}

.kit__fact {
  display: contents;

  dt {
    font-weight: bold;
    color: var(--color-primary);
  }

  dd {
    margin: 0;
  }
}

/* Stats */
.kit__stats {
  list-style: none;
  padding: 0;
  margin: 0 0 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.kit__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px 12px;
  background: var(--bg);
}

.kit__stat-number {
  font-family: var(--font-family-secondary);
  font-size: 54px;
  line-height: 1;
  color: var(--color-primary);
}

.kit__stat-label {
  margin-top: 8px;
  font-size: 16px;
}

.kit__usage-hint {
  margin-top: 10px;
}

/* Photos */
.kit__photo-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
}

.kit__photo {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.kit__photo-img {
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 4px;
}

.kit__photo-download {
  align-self: flex-start;
  font-size: 14px;
  padding: 6px 18px;
  color: var(--color-primary);
  border: solid 3px var(--color-primary);
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-bottom-left-radius: 15px 255px;

  &:hover,
  &:focus-visible {
    background: var(--color-primary);
    color: var(--bg);
  }
}

.kit__credit {
  margin-top: 16px;
  font-size: 13px;
  color: var(--color-text-muted);
}

/* Topics & talks */
.kit__topics {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.kit__topic {
  padding: 8px 18px;
  background: var(--bg);
  font-size: 16px;
}

.kit__talks {
  list-style: none;
  padding: 0;
  margin: 0;
}

.kit__talk {
  /* Extra bottom padding keeps the description clear of the hand-drawn
     bottom border, whose curve otherwise crowds the text; the left padding
     insets the text from where that curve rises on the left. */
  padding: 18px 0 34px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.kit__talk-title {
  font-family: var(--font-family-secondary);
  font-size: 26px;
  color: var(--color-primary);
}

.kit__talk-desc {
  font-size: 16px;
}

.kit__button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 30px;
}

/* Achievements */
.kit__achievements {
  padding-left: 0;
  list-style: none;
  display: grid;
  gap: 12px;

  @media screen and (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
}

.kit__achievement {
  padding-left: 30px;
  position: relative;
  line-height: 1.5;

  &::before {
    content: '★';
    position: absolute;
    left: 0;
    color: var(--color-primary);
  }
}

/* Rider & contact */
.kit__contact-grid {
  display: grid;
  gap: 40px;

  @media screen and (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
}

.kit__rider {
  padding-left: 20px;

  li {
    margin-bottom: 10px;
    line-height: 1.5;
  }
}

.kit__contact-mail {
  font-size: 20px;
  margin-bottom: 16px;
}
</style>
