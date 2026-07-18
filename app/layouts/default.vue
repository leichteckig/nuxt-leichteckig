<template>
  <div class="app">
    <div class="wrapper">
      <Header />
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style>

.wrapper {
  min-height: calc(100vh - 80px);
}
</style>
