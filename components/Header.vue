<template>
  <header class="header-main" data-cy="HeaderMain">
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
        <nuxt-link
          class="header-main__link first__link"
          to="/"
          data-cy="Home">
          Home
        </nuxt-link>
        <nuxt-link
          class="header-main__link second__link"
          to="/blog"
          data-cy="Writing">
          Writing
        </nuxt-link>
        <nuxt-link
          class="header-main__link"
          to="/talks"
          data-cy="Speaking">
          Speaking
        </nuxt-link>
        <nuxt-link
          class="header-main__link"
          to="/conferences"
          data-cy="Attending">
          Attending
        </nuxt-link>
      </div>
      <ColorModePicker class="color-mode__container"/>
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
    }
  }
}
</script>

<style lang="scss" scoped>
.header-main {
  height: 80px;
  border-bottom: solid 3px var(--border-color);
  border-bottom-right-radius: 255px 15px;
  border-bottom-left-radius: 255px 15px;
}

.header-main__inner {
  height: 80px;
  display: flex;
  align-items: center;
}

.header-main__link {
  display: block;
  line-height: 57px;
  padding: 10px 20px;
  text-decoration: none;

  &.nuxt-link-exact-active {
    border-bottom: 3px solid var(--color-primary);
  }

  &.first__link.nuxt-link-exact-active {
    border-bottom-left-radius: 255px 15px;
  }
}

.header-main__hamburger {
  width: 40px;
  height: 40px;
  cursor: pointer;
  position: relative;
  padding: 0;
  color: red;
  border: 0 none;
  background: transparent;

  span {
    height: 4px;
    background-color: var(--color);
    width: 100%;
    position: absolute;
    top: 8px;
    left: 0;
    right: 0;
    transition: all 0.3s ease-in-out;
  }

  .center {
    top: 18px;
  }

  .bottom {
    top: 28px;
  }

  &.is--active {
    .top {
      transform: rotate(45deg);
      top: 18px;
    }

    .center {
      width: 0;
      opacity: 0;
    }

    .bottom {
      top: 18px;
      transform: rotate(-45deg);
    }
  }
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
  z-index: 2;

  &.is--active {
    display: flex;
    flex-direction: column;
    opacity: 1;
    height: 320px;
  }
}

.color-mode__container {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 57px;
  margin-left: auto;
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

    &.is--active {
      flex-direction: row;
      opacity: 1;
      height: auto;
      transition: none;
    }
  }

  .header-main__hamburger {
    display: none;
  }
}
</style>
