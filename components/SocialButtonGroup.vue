<template>
  <section class="social-button-group">
    <ul>
      <li
        v-for="icon of socialIcons"
        :key="icon.key"
        class="button-item"
        role="button"
        aria-label="SocialMediaButtons"
        @click.prevent="openSocialLink(icon.link)"
      >
        <component
          :is="`icon-${icon.name}`"
        />
      </li>
    </ul>
  </section>
</template>

<script>
import IconTwitter from '@/assets/icons/twitter.svg?inline';
import IconGithub from '@/assets/icons/github.svg?inline';
import IconLinkedin from '@/assets/icons/linkedin.svg?inline';
import IconXing from '@/assets/icons/xing.svg?inline';

export default {
  name: 'SocialButtonGroup',

  components: {
    IconTwitter,
    IconGithub,
    IconLinkedin,
    IconXing
  },

  data() {
    return {
      socialIcons: [{
        name: 'twitter',
        link: 'https://twitter.com/leichteckig'
      }, {
        name: 'github',
        link: 'https://github.com/leichteckig'
      }, {
        name: 'linkedin',
        link: 'https://www.linkedin.com/in/ramona-schwering/'
      }, {
        name: 'xing',
        link: 'https://www.xing.com/profile/Ramona_Schwering2/cv'
      }]
    }
  },

  methods: {
    openSocialLink(link) {
      window.open(link, '_blank', 'noopener');
    }
  }
}
</script>

<style lang="scss">
.social-button-group {
  margin: auto 0;

  .button-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
    margin: auto 0;
    height: 40px;
    width: 40px;
    cursor: pointer;

    svg {
      margin: 7px;

      &:hover {
        color: var(--color-primary);
      }
    }

    svg:hover {
      color: var(--color-primary);
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 5px;
  }

  p {
    margin: 0;
    padding-top: 5px;
    padding-bottom: 20px;
  }
}
</style>
