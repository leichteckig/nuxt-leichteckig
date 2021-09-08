<template>
  <footer class="main-footer" data-cy="Footer">
    <div class="container main-footer__links">
      <SocialButtonGroup class="main-footer__social-links"/>
      <a href="/imprint"
         class="main-footer__link"
         data-cy="NavToImprint"
         role="button"
         aria-label="ImprintLink">
        Imprint
      </a>
    </div>
  </footer>
</template>

<script>
import SocialButtonGroup from '@/components/SocialButtonGroup';

export default {
  name: "Footer",

  components: {
    SocialButtonGroup
  },
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
    color: var(--color-primary);
  }

  .main-footer__social-links .button-item {
    svg {
      color: var(--color-primary);
    }
  }
</style>
