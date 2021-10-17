<template>
  <footer class="main-footer" data-cy="Footer">
    <div class="container main-footer__links">
      <SocialButtonGroup class="main-footer__social-links" />
      <nuxt-link
        to="/imprint"
        class="main-footer__link"
        data-cy="NavToImprint"
        role="button"
        aria-label="ImprintLink"
      >
        Imprint
      </nuxt-link>
      <nuxt-link
        to="/privacy"
        class="main-footer__link"
        data-cy="NavToDP"
        role="button"
        aria-label="DataProtectionLink"
      >
        Data protection
      </nuxt-link>
    </div>
  </footer>
</template>

<script>
import SocialButtonGroup from '@/components/SocialButtonGroup'

export default {
  name: 'Footer',

  components: {
    SocialButtonGroup
  }
}
</script>

<style lang="scss">
  .main-footer {
    height: 80px;
    line-height: 80px;
  }

  .main-footer__links {
    display: flex;
    gap: 20px;
    justify-content: flex-end;
  }

  .main-footer__link {
    display: inline-block;
    text-decoration: none;
    color: #d0604d;
  }

  .main-footer__social-links .button-item {
    svg {
      color: #d0604d;
    }
  }

  @media screen and (max-width: 700px) {
    .main-footer__links {
      display: block;
    }

    .social-button-group ul {
      display: block;
    }

    .main-footer__link {
      margin: 0 10px;
    }
  }
</style>
