<template>
  <header class="header-main">
    <div class="header-main__inner container">
      <nuxt-link class="header-main__link" to="/">
        Home
      </nuxt-link>
      <nuxt-link class="header-main__link" to="/blog">
        Blog
      </nuxt-link>
      <nuxt-link class="header-main__link" to="/projects">
        Projects
      </nuxt-link>
      <nuxt-link class="header-main__link" to="/contact">
        Contact
      </nuxt-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
  .header-main {
    background-color: var(--color-background-light);
    height: 80px;
    border-bottom: 1px solid var(--color-border);
  }

  .header-main__link {
    display: block;
    line-height: 57px;
    padding: 10px 20px;
    color: var(--color-text-default);
    text-decoration: none;
  }

  .header-main__link.nuxt-link-active {
    border-bottom: 3px solid var(--color-primary);
  }

  .header-main__inner {
    display: flex;
  }
</style>
