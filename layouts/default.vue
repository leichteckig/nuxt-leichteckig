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

.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.wrapper {
  flex-grow: 1;
  border-bottom: 1px solid var(--color-border);
}

p {
  line-height: 22px;
  margin-bottom: 20px;
}

a {
  color: var(--color-primary);
}

h1 { font-weight: normal; font-size: 45px; margin-bottom: 20px; }
h2 { font-weight: normal; font-size: 40px; margin-bottom: 20px; }
h3 { font-weight: normal; font-size: 35px; margin-bottom: 20px; }
h4 { font-weight: normal; font-size: 30px; margin-bottom: 20px; }
h5 { font-weight: normal; font-size: 25px; margin-bottom: 20px; }
h6 { font-weight: normal; font-size: 20px; margin-bottom: 20px; }
</style>
