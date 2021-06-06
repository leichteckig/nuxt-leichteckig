<template>
  <footer class="main-footer">
    <div class="container main-footer__links">
      <a class="main-footer__link" href="https://twitter.com/leichteckig" target="_blank">Twitter</a>
      <a class="main-footer__link" href="https://www.linkedin.com/in/%F0%9F%92%99-ramona-schwering-7a56b215b/" target="_blank">LinkedIn</a>
      <a class="main-footer__link" href="https://www.xing.com/profile/Ramona_Schwering2/cv" target="_blank">Xing</a>
      <a class="main-footer__link" href="https://github.com/leichteckig" target="_blank">GitHub</a>
      <a class="main-footer__link" href="#">Imprint</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
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
    color: var(--color-text-default);
    text-decoration: none;
  }
</style>
