<template>
  <Page title="Imprint">
    <main class="index">
      <section class="imprint--english">
        <h2>🇺🇸 Imprint</h2>
        <h3>Data in accordance with § 5 TMG</h3>
        <p>Ramona Schwering<br/>
          Hochstraße 67<br/>
          42105 Wuppertal<br/>
        </p>
        <h3>Contact</h3><br/>
        <p>
          E-Mail: hello@<span class="mail">schwering</span>ramona.codes<br/>
          Source: https://www.e-recht24.de/impressum-generator.html<br/>
        </p>
      </section>
      <section class="imprint--english">
        <h2>🇩🇪 Impressum</h2>
        <h3>Angaben gemäß § 5 TMG</h3>
        <p>Ramona Schwering<br/>
          Hochstraße 67<br/>
          42105 Wuppertal<br/>
        </p>
        <h3>Kontakt</h3><br/>
        <p>
          E-Mail: hello@<span class="mail">schwering</span>ramona.codes<br/>
          Quelle: https://www.e-recht24.de/impressum-generator.html<br/>
        </p>
      </section>
      <section>
          <h2>Disclaimer</h2>
          <h3>Fontawesome icons</h3>
          <p>A couple of icons were taken from <a href="https://fontawesome.com/">Fontawesome</a>, so the copyright is theirs. Their free icons are
          published under Creative Commons Attribution 4.0 International license. Read more on Fontawesome's own
          <a href="https://fontawesome.com/license">licence</a> as well, no changes were made.</p>
      </section>
    </main>
  </Page>
</template>

<script>
export default {
  name: 'imprint',

  head() {
    return {
      title: 'Imprint and contact',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'imprint-description',
          name: 'imprint',
          content: 'This is the imprint of my site.'
        }
      ]
    }
  },
}
</script>

<style scoped>
p span.mail {
  display: none;
}
</style>
