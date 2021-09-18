<template>
  <Page
    :title="$t('aboutTitle')"
    :img="{
      path: 'stickers.jpeg',
      alt: 'stickers'
    }"
  >
    <main class="about-content">
      <section class="about__section about__polaroid-grid--reversed">
        <Polaroid
          class="about__scribble"
          image-path="/moe.webp"
        />
        <div class="about__text">
          <h2 data-cy="AboutTitle">
            {{ $t('aboutIntroTitle') }}
          </h2>
          <p
            class="about-titles"
            data-cy="WelcomeDescription"
          >
            {{ $t('aboutIntroDescription') }}
          </p>
          <Hint
            class="about-hint"
            type="error"
          >
            {{ $t('aboutIntroHint') }}
          </Hint>
        </div>
      </section>
      <section class="about__section about__featured-stack">
        <div>
          <div class="handdraw-line" />
          <div class="gradient" />
        </div>
        <h2 data-cy="AboutProjectsListingTitle">
          {{ $t('aboutActsTitle') }}
        </h2>
        <div class="about__featured-stack--container">
          <div class="about__experience--specials">
            <p data-cy="WelcomeDescription">
              {{ $t('aboutActDescription') }}
            </p>
          </div>
          <div
            class="about__featured-stack--list"
            data-cy="FeaturedStack"
          >
            <component
              :is="`icon-${image}`"
              v-for="image in stack"
              :key="image"
            />
          </div>
        </div>
        <div class="handdraw-line" />
      </section>
      <section class="about__section about__extended-bio">
        <div data-cy="ExtendedBio">
          <h2>{{ $t('aboutBioExtendedTitle') }}</h2>
          <div class="about__polaroid-grid about__extended-bio--column">
            <div class="about__experience--specials about__experience--specials-1">
              <p data-cy="AboutBioFirst">
                {{ $t('aboutBioExtendedFirst') }}
              </p>
              <p>
                {{ $t('aboutBioExtendedSecond') }}
              </p>
            </div>
            <Polaroid
              class="about__scribble about__experience--specials-2"
              type="purple"
              image-path="/Moe-presents.webp"
            />
            <div class="about__experience--specials about__experience--specials-3">
              <p data-cy="AboutBioSecond">
                {{ $t('aboutBioExtendedThird') }}
              </p>
              <p data-cy="AboutBioThird">
                {{ $t('aboutBioExtendedFourth') }}
              </p>
            </div>
            <div class="about__experience--specials-moe-presents about__experience--specials-4">
              <Polaroid
                class="about__scribble"
                type="rose"
                image-path="/Moe-Coding.webp"
              />
            </div>
            <div class="about__experience--specials about__experience--specials-5">
              <h2 data-cy="AboutProjectsListingTitle">
                {{ $t('aboutSpecialTitle') }}
              </h2>
              <ul
                class="about-titles"
                data-cy="WelcomeDescription"
              >
                <li>{{ $t('aboutSpecialFirst') }}</li>
                <li>{{ $t('aboutSpecialSecond') }}</li>
                <li>{{ $t('aboutSpecialThird') }}</li>
              </ul>
            </div>
            <div class=" about__experience--specials-6">
              <ProjectTile
                v-if="projects"
                :title="$t('aboutContributions')"
                :contents="projects"
              />
              <div class="handdraw-line" />
              <div class="gradient" />
            </div>
          </div>
        </div>
      </section>
    </main>
  </Page>
</template>

<script>
import LinkTile from "@/components/LinkTile";
import ProjectTile from "@/components/ProjectTile";
import Hint from "@/components/Hint";

import IconHtml from '@/assets/icons/html.svg?inline';
import IconCss from '@/assets/icons/css.svg?inline';
import IconJavaScript from '@/assets/icons/js.svg?inline';
import IconVue from '@/assets/icons/vue.svg?inline';
import IconCypress from '@/assets/icons/cypress.svg?inline';
import IconJest from '@/assets/icons/jest.svg?inline';
import IconSymfony from '@/assets/icons/symfony.svg?inline';
import IconTwig from '@/assets/icons/twig.svg?inline';
import IconSass from '@/assets/icons/sass.svg?inline';
import IconNuxt from '@/assets/icons/nuxt.svg?inline';
import IconPHP from '@/assets/icons/php.svg?inline';
import IconGit from '@/assets/icons/git.svg?inline';

export default {
  name: 'About',

  components: {
    Hint,
    LinkTile,
    ProjectTile,
    IconHtml,
    IconCss,
    IconJavaScript,
    IconVue,
    IconCypress,
    IconJest,
    IconSymfony,
    IconTwig,
    IconSass,
    IconNuxt,
    IconPHP,
    IconGit
  },

  data() {
    return {
      stack: [
        'html',
        'css',
        'JavaScript',
        'Vue',
        'Cypress',
        'Jest',
        'Symfony',
        'Twig',
        'Sass',
        'Nuxt',
        'PHP',
        'Git',
      ],
      projectUrl: 'https://api.github.com/users/leichteckig',
      projects: []
    };
  },

  head() {
    return {
      title: "This is Ramona Schwering",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'publication-description',
          name: 'publication',
          content: 'Are you searching for other publication I contributed to? Look no further!'
        }
      ]
    }
  },

  created() {
    this.getGithubProjects();
  },

  methods: {
    getGithubProjects() {
      const ownRepoUrl = `${this.projectUrl}/repos?type=public`;
      const ownStarsUrl = `${this.projectUrl}/starred`;

      fetch(ownRepoUrl)
        .then((resp) => resp.json())
        .then((data) => {
          this.projects = data.filter(project => !project.fork
            && !project.description?.includes('example')
            && !project.description?.includes('Leichteckig')
          );
        })
        .then(() => {
          fetch(ownStarsUrl)
            .then((resp) => resp.json())
            .then((data) => {
              let someStars = data.filter(project => project.full_name.includes('3stadt')
                || project.full_name.includes('platform')
                || project.full_name.includes('FriendsOfShopware')
              );
              this.projects = [ ...this.projects, ...someStars]
            });
        });
    }
  },
}
</script>

<style lang="scss" scoped>
.about-content {
  line-height: 1.5em;

  h2 {
    line-height: 1em;
  }

  .about__section {
    margin-bottom: 50px;
  }

  .about__scribble {
    margin:  0 auto;
  }

  .project-tile h2 {
    margin-bottom: 10px;
  }
}

.about__featured-stack {
  .about__featured-stack--list {
    svg {
      width: 75px;
      height: 75px;
    }

    .about__stack-img {
      width: 100px;
      height: 100px;
    }
  }

  .about__stack-disclaimer {
    padding: 10px;
    height: 200px;
    width: 200px;
    color: var(--border-color);
  }
}

@media screen and (min-width: 400px) {
  .about__polaroid-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
  }

  .about__polaroid-grid--reversed {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

.about__polaroid-grid {
    display: block;
  }

.about__polaroid-grid--reversed {
  display: block;
}

@media screen and (min-width: 800px) {
  .about__featured-stack--container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
    margin: 20px 0;

    .about__featured-stack--list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
      grid-gap: 10px;
      margin: 10px;
    }
  }

  .about__polaroid-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;

    .about__experience--specials-1 {
      grid-row: 2;
    }

    .about__experience--specials-2 {
      grid-row: 1;
    }
  }

  .about__polaroid-grid--reversed {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (min-width: 1200px) {
  .about__featured-stack--container {
    display: grid;
    grid-template-columns: 300px 1fr;
    grid-gap: 30px;
    margin: 20px 0;

    .about__featured-stack--list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
      grid-gap: 10px;
      margin: 10px;
    }
  }

  .about__polaroid-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;

    .about__experience--specials-1 {
      grid-row: 1;
    }

    .about__experience--specials-2 {
      grid-row: 2;
    }
  }

  .about__polaroid-grid--reversed {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
</style>
