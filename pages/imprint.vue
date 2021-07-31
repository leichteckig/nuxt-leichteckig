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
          E-Mail: rschwering19@gmail.com<br/>
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
          E-Mail: rschwering19@gmail.com<br/>
          Quelle: https://www.e-recht24.de/impressum-generator.html<br/>
        </p>
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
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
}
</script>

<style scoped>

</style>
