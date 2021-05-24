<template>
  <div class="app">
    <Header />
    <Nuxt />
  </div>
</template>

<style>
:root {
  --color-background: #1b1c20;
  --color-background-light: #212528;
  --color-primary: #37a8dc;
  --color-text-default: #e3e3e3;
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

html {
  font-family: var(--font-family-default);
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  background-color: var(--color-background);
  color: var(--color-text-default);
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
