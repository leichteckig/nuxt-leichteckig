<template>
  <header class="header-main">
    <nav class="header-main__inner container">
      <button
        @click="toggleMobileMenu"
        class="header-main__hamburger"
        :class="{ 'is--active': isMobileMenuActive }"
        aria-label="Open menu"
      >
        <span class="top"></span>
        <span class="center"></span>
        <span class="bottom"></span>
      </button>
      <div
        class="header-main__nav-links"
        :class="{ 'is--active': isMobileMenuActive }"
      >
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
      </div>
      <ColorModePicker class="color-mode__container" />
    </nav>
  </header>
</template>

<script>
import ColorModePicker from '@/components/ColorModePicker'

export default {
  name: 'Header',

  components: {
    ColorModePicker
  },

  data() {
    return {
      isMobileMenuActive: false
    }
  },

  methods: {
    toggleMobileMenu() {
      this.isMobileMenuActive = !this.isMobileMenuActive;

      console.log(this.isMobileMenuActive);
    }
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

  .header-main__hamburger {
    width: 40px;
    height: 40px;
    cursor: pointer;
    margin-left: 10px;
    position: relative;
    padding: 0;
    color: red;
    border: 0 none;
    background: transparent;
  }

  .header-main__hamburger span {
    height: 4px;
    background-color: var(--color);
    width: 100%;
    position: absolute;
    top: 8px;
    left: 0;
    right: 0;
    transition: all 0.3s ease-in-out;
  }

  .header-main__hamburger .center {
    top: 18px;
  }

  .header-main__hamburger .bottom {
    top: 28px;
  }

  .header-main__hamburger.is--active .top {
    transform: rotate(45deg);
    top: 18px;
  }

  .header-main__hamburger.is--active .center {
    width: 0;
    opacity: 0;
  }

  .header-main__hamburger.is--active .bottom {
    top: 18px;
    transform: rotate(-45deg);
  }

  .header-main__nav-links {
    position: absolute;
    width: 100%;
    top: 80px;
    left: 0;
    right: 0;
    background: var(--bg);
    opacity: 0;
    height: 0;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.4);
  }

  .header-main__nav-links.is--active {
    display: flex;
    flex-direction: column;
    opacity: 1;
    height: 320px;
  }

  .header-main__link.nuxt-link-exact-active {
    border-bottom: 3px solid var(--color-primary);
  }

  .first__link.nuxt-link-exact-active {
    border-bottom-left-radius: 255px 15px;
  }

  .header-main__inner {
    height: 80px;
    display: flex;
    align-items: center;
  }

  .color-mode__container {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 57px;
    margin: 0 5px 0 auto;
  }

  @media screen and (min-width: 600px) {
    .header-main__nav-links {
      position: static;
      width: auto;
      top: auto;
      left: auto;
      right: auto;
      background: var(--color-background);
      display: flex;
      flex-direction: row;
      background: transparent;
      opacity: 1;
      height: auto;
      box-shadow: none;
      transition: none;
    }

    .header-main__nav-links.is--active {
      flex-direction: row;
      opacity: 1;
      height: auto;
      transition: none;
    }

    .header-main__hamburger {
      display: none;
    }
  }
</style>
