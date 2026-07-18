<template>
  <section class="social-button-group">
    <ul>
      <li
        v-for="icon of socialIcons"
        :key="icon.name"
        class="button-item"
      >
        <a
          :href="icon.link"
          target="_blank"
          rel="noopener"
          :aria-label="icon.label"
        >
          <component :is="icons[icon.name]" />
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup>
import IconTwitter from '~/assets/icons/twitter.svg'
import IconGithub from '~/assets/icons/github.svg'
import IconLinkedin from '~/assets/icons/linkedin.svg'
import IconXing from '~/assets/icons/xing.svg'

const icons = {
  twitter: IconTwitter,
  github: IconGithub,
  linkedin: IconLinkedin,
  xing: IconXing
}

const socialIcons = [{
  name: 'twitter',
  label: 'Ramona on Twitter',
  link: 'https://twitter.com/leichteckig'
}, {
  name: 'github',
  label: 'Ramona on GitHub',
  link: 'https://github.com/leichteckig'
}, {
  name: 'linkedin',
  label: 'Ramona on LinkedIn',
  link: 'https://www.linkedin.com/in/ramona-schwering/'
}, {
  name: 'xing',
  label: 'Ramona on Xing',
  link: 'https://www.xing.com/profile/Ramona_Schwering2/cv'
}]
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

    a {
      display: inline-flex;
      color: inherit;
    }

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
