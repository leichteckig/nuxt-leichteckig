<template>
  <Page title="About Ramona Schwering" :img="{
        path: 'stickers.jpeg',
        alt: 'stickers'
      }">
    <main class="about-content">
      <section class="about__section about__polaroid-grid--reversed">
        <Polaroid class="about__scribble" imagePath="/moe.webp" />
        <div class="about__text">
          <h2 data-cy="PublicationListingTitle">It's nice to meet you here! 👋</h2>
          <p class="about-titles" data-cy="WelcomeDescription">
            I love to share my knowledge and expertise, as well as my great love for
            frontend development and design to others as a speaker at major conferences with a lot of power.
            For me, one thing counts above all: I very much hope that I can become that role model that
            I would have wished for myself.
          </p>
          <Hint
            class="about-hint"
            type="error"
            message="❤️ ~ Especially in love with VueJS, Cypress and Jest.️
            Passionate about open source.
            Trying to get back to sketch noting and drawing at times.
            By the way, I'm open for speaking opportunities. 👩‍🏫 " >
          </Hint>
        </div>
      </section>
      <section class="about__section about__featured-stack">
        <div>
          <div class="handdraw-line"></div>
          <div class="gradient"></div>
        </div>
        <h2 data-cy="AboutProjectsListingTitle">What I do</h2>
        <div class="about__featured-stack--container">
          <div class="about__experience--specials">
            <p data-cy="WelcomeDescription">
              Currently, I'm working as a <span class="marked">Software Developer</span> at <span class="marked">shopware AG</span>.
              💙 <br/>
              There, I focus on the frontend area: I contribute to building high quality open source applications in Symfony and VueJS projects.
            </p>
          </div>
          <div class="about__featured-stack--list" data-cy="FeaturedStack">
            <component
              v-for="image in stack"
              :key="image"
              :is="`icon-${image}`"
            />
          </div>
        </div>
        <div class="handdraw-line"></div>
      </section>
      <section class="about__section about__extended-bio">
        <div data-cy="ExtendedBio">
          <h2>Bio - Extended edition!?</h2>
          <div class="about__polaroid-grid about__extended-bio--column">
            <div class="about__experience--specials">
              <p data-cy="WelcomeDescription">
                I decided to turn my hobby into a profession: In the creative field, I have been involved with IT for a long time, I have done a lot of
                drawing and painting back then and to present my work I built my own pages.
              </p>
              <p>
                I have then
                started an apprenticeship as an IT specialist for application development, being able to shorten my
                training period because of my performance.
                I already knew my current employer Shopware, since I grew up in the same town. I applied in
                Quality assurance to use my education effectively.
              </p>
            </div>
            <Polaroid class="about__scribble" type="purple" imagePath="/Moe-presents.webp" />
            <div class="about__experience--specials">
              <p data-cy="WelcomeDescription">
                However,
                it was then quickly determined that I was capable of more and that my abilities were
                and that my skills lie particularly in the design side of frontend development. I have been a
                frontend developer for a couple of years now. In addition, the field of public learning is an
                important topic for me. I write a lot of blog posts, go to conferences and give talks.
              </p>
              <p data-cy="WelcomeDescription">
                I'm learning, writing and speaking about FrontEnd: It fascinates me, "how" things can function best:
                Especially Frontend Testing, performance and a11y are MVT. In addition, I'm working hard on the
                open-source to create more value for the web community.
              </p>
            </div>
            <div class="about__experience--specials-moe-presents">
              <Polaroid class="about__scribble" type="rose" imagePath="/Moe-Coding.webp" />
            </div>
            <div class="about__experience--specials">
              <h2 data-cy="AboutProjectsListingTitle">Special experience</h2>
              <ul class="about-titles" data-cy="WelcomeDescription">
                <li>🌲 Cypress ambassador.</li>
                <li>🛠️ ISTQB: Foundation Tester Certificate.</li>
                <li>👩‍💼 Certified Scrum Master.</li>
                <li>🇳🇱 NT2 certificate: Dutch as second language.</li>
              </ul>
            </div>
            <div>
              <ProjectTile v-if="projects" title="GitHub contributions" :contents="projects">
              </ProjectTile>
              <div class="handdraw-line"></div>
              <div class="gradient"></div>
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
  name: 'about',

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
      const ownRepoUrl =  `${this.projectUrl}/repos?type=public`;
      const ownStarsUrl = `${this.projectUrl}/starred`;

      fetch(ownRepoUrl)
        .then((resp) => resp.json())
        .then((data) => {
          this.projects = data.filter(project => !project.fork
            && !project.description?.includes('example')
            && !project.description?.includes('Leichteckig')
          );
        });

      fetch(ownStarsUrl)
        .then((resp) => resp.json())
        .then((data) => {
          let someStars = data.filter(project => project.full_name.includes('3stadt')
            || project.full_name.includes('platform')
            || project.full_name.includes('FriendsOfShopware')
          );
          this.projects = [ ...this.projects, ...someStars]
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
    width: auto;
    max-height: 500px;
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

@media screen and (min-width: 440px) {
  .about__scribble {
    max-width: 330px;
    margin: 0;
  }
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
    grid-gap: 30px;
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
  }

  .about__polaroid-grid--reversed {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
</style>