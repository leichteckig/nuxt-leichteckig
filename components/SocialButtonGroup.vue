<template>
  <section class="social-button-group">
    <ul>
      <li
        v-for="icon of socialIcons"
        :key="icon.name"
        class="button-item"
        role="button"
        aria-label="SocialMediaButtons"
        @click.prevent="openSocialLink('https://twitter.com/leichteckig')"
      >
        <nuxt-icon :name="icon.name" />
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
const socialIcons = [{
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
}];

function openSocialLink(link: string) {
  window.open(link, '_blank', 'noopener');
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
