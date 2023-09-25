<template>
  <header
    class="header-main"
    data-cy="HeaderMain"
  >
    <nav class="header-main__inner container">
      <button
        class="header-main__hamburger"
        :class="{ 'is--active': isMobileMenuActive }"
        aria-label="Open menu"
        @click="toggleMobileMenu"
      >
        <span class="top" />
        <span class="center" />
        <span class="bottom" />
      </button>
      <div
        class="header-main__nav-links"
        :class="{ 'is--active': isMobileMenuActive }"
      >
        <nuxt-link
          class="header-main__link first__link"
          :to="localePath('/')"
          data-cy="Home"
          @click.native="toggleMobileMenu"
        >
          {{ $t('home') }}
        </nuxt-link>
        <nuxt-link
          class="header-main__link second__link"
          :to="localePath('/about/')"
          data-cy="About"
          @click.native="toggleMobileMenu"
        >
          {{ $t('aboutMenuTitle') }}
        </nuxt-link>
        <nuxt-link
          class="header-main__link"
          :to="localePath('/blog/')"
          data-cy="Writing"
          @click.native="toggleMobileMenu"
        >
          {{ $t('writingMenuTitle') }}
        </nuxt-link>
        <nuxt-link
          class="header-main__link"
          :to="localePath('/talks/')"
          data-cy="Speaking"
          @click.native="toggleMobileMenu"
        >
          {{ $t('speakingMenuTitle') }}
        </nuxt-link>
        <nuxt-link
          class="header-main__link"
          :to="localePath('/conferences/')"
          data-cy="Attending"
          @click.native="toggleMobileMenu"
        >
          {{ $t('attendingMenuTitle') }}
        </nuxt-link>
      </div>
      <ColorModePicker class="color-mode__button-group" />
      <LanguagePicker
        v-if="!isContentPage"
        class="locale-mode__button-group" />
    </nav>
  </header>
</template>

<script lang="ts" setup>
const localePath = useLocalePath();
const router = useRouter();
const isMobileMenuActive = ref(false);

const isContentPage = computed(() => {
  const currentRouteName = router.currentRoute.value.name;

  if(typeof currentRouteName !== 'string') {
    return false;
  }

  return currentRouteName.includes('slug');
});

function toggleMobileMenu() {
  isMobileMenuActive.value = !isMobileMenuActive.value;
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
  color: #d0604d;

  &.nuxt-link-exact-active {
    border-bottom: 3px solid var(--color-primary);
    color: #d0604d;
  }

  &.first__link.nuxt-link-exact-active {
    border-bottom-left-radius: 255px 15px;
    color: #d0604d;
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
    height: 400px;
  }
}

.color-mode__button-group {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 57px;
  margin-left: auto;
  margin-right: 4px;
}

@media (max-width: 600px) {
    .header-main__link {

      &.nuxt-link-exact-active {
        border-bottom: 3px solid var(--color-primary);
        border-bottom-left-radius: 255px 15px;
      }
    }
  }

  @media screen and (min-width: 800px) {
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
