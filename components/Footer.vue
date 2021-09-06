<template>
  <footer class="main-footer" data-cy="Footer">
    <div class="container main-footer__links">
      <SocialButtonGroup class="main-footer__social-links"/>
      <a role="button" class="main-footer__link" href="/imprint" data-cy="NavToImprint">Imprint</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
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
  }

  .main-footer__social-links .button-item {
    svg {
      color: var(--color-primary);
    }
  }
</style>
