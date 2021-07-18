<template>
  <div class="app">
    <div class="wrapper">
      <Header />
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<style>
:root {
  --color-background: #1b1c20;
  --color-background-light: #212528;
  --color-primary: #37a8dc;
  --color-text-default: #e3e3e3;
  --color-text-muted: #aaaaaa;
  --color-border: #2b2c31;

  --font-family-default:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
}

.wrapper {
  min-height: calc(100vh - 80px);
}
</style>
