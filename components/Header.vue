<template>
  <header class="header-main">
    <nav class="header-main__inner container">
      <nuxt-link class="header-main__link first__link" to="/">
        Home
      </nuxt-link>
      <nuxt-link class="header-main__link second__link" to="/blog">
        Blog
      </nuxt-link>
      <nuxt-link class="header-main__link" to="/talks">
        Talks
      </nuxt-link>
      <nuxt-link class="header-main__link" to="/contact">
        Contact
      </nuxt-link>
      <ColorModePicker class="color-mode__container" />
    </nav>
  </header>
</template>

<script>
import ColorModePicker from '@/components/ColorModePicker'

export default {
  name: "Header",
  components: {
    ColorModePicker
  }
}
</script>

<style scoped>
  .header-main {
    height: 80px;

    border-bottom: solid 3px var(--border-color);
    border-bottom-right-radius: 255px 15px;
    border-bottom-left-radius: 255px 15px;
  }

  .header-main__link {
    display: block;
    line-height: 57px;
    padding: 10px 20px;
    text-decoration: none;
  }

  .header-main__link.nuxt-link-exact-active {
    border-bottom: 3px solid var(--color-primary);
  }

  .first__link.nuxt-link-exact-active {
    border-bottom-left-radius: 255px 15px;
  }

  .header-main__inner {
    display: flex;
  }

  .color-mode__container {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 57px;
    margin: 0 5px 0 auto;
  }
</style>
