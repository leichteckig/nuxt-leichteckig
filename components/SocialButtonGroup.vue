<template>
  <div>
    <ul>
      <li
        v-for="icon of socialIcons"
        :key="icon"
        @click.prevent="openSocialLink(icon.link)"
        class="button-item"
      >
          <component
            :is="`icon-${icon.key}`"
          >
          </component>
      </li>
    </ul>
  </div>
</template>

<script>
import IconTwitter from '@/assets/icons/twitter.svg?inline';
import IconGithub from '@/assets/icons/github.svg?inline';
import IconLinkedin from '@/assets/icons/linkedin.svg?inline';
import IconXing from '@/assets/icons/xing.svg?inline';

export default {
  name: "SocialButtonGroup",
  components: {
    IconTwitter,
    IconGithub,
    IconLinkedin,
    IconXing
  },

  data() {
    return {
      socialIcons: [
        {
          key: 'twitter',
          link: 'https://twitter.com/leichteckig'
        },
        {
          key: 'github',
          link: 'https://github.com/leichteckig'
        },
        {
          key: 'linkedin',
          link: 'https://www.linkedin.com/in/ramona-schwering-7a56b215b/'
        },
        {
          key: 'xing',
          link: 'https://www.xing.com/profile/Ramona_Schwering2/cv'
        }
      ]
    }
  },

  methods: {
    openSocialLink(link) {
      window.open(link, '_blank');
    }
  }
}
</script>

<style scoped>
.button-item svg {
  color: var(--color);

}

.button-item svg:hover {
  color: var(--color-primary);

}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 5px;
}

.button-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  margin: auto 0;
  height: 50px;
  width: 50px;
  cursor: pointer;

  background: repeating-linear-gradient(
    45deg,
    var(--color-secondary),
    var(--color-secondary) 1px,
    var(--bg) 1px,
    var(--bg) 10px
  );
}

svg {
  margin: 7px;
}

p {
  margin: 0;
  padding-top: 5px;
  padding-bottom: 20px;
}
</style>
