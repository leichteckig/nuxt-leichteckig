<template>
  <footer class="main-footer">
    <div class="container main-footer__links">
      <a class="main-footer__link" href="#">Twitter</a>
      <a class="main-footer__link" href="#">Xing</a>
      <a class="main-footer__link" href="#">GitHub</a>
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
    text-decoration: none;
  }
</style>
