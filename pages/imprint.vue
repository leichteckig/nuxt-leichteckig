<template>
  <Page :title="$t('imprintTitle')">
    <main class="index">
      <section class="imprint--english">
        <h2>{{ $t('imprintSubtitle') }}</h2>
        <p>
          {{ $t('imprintAddressName') }}<br>
          {{ $t('imprintAddressStreet') }}<br>
          {{ $t('imprintAddressCity') }}<br>
          {{ $t('imprintAddressCounty') }}
        </p>
        <h2>{{ $t('imprintContactTitle') }}</h2>
        <p>
          {{ $t('imprintContactMail') }}<span class="mail">{{ $t('imprintContactLastname') }}</span>{{ $t('imprintContactDomain') }}<br>
          {{ $t('imprintSource') }}<br>
        </p>
      </section>
      <section>
        <h2>{{ $t('faDisclaimer') }}</h2>
        <h3>{{ $t('faDisclaimerTitle') }}</h3>
        <p>
          {{ $t('faText1') }} <a href="https://fontawesome.com/">Fontawesome</a>, {{ $t('faText2') }}
          <a href="https://fontawesome.com/license">{{ $t('faText3') }}</a>, {{ $t('faText4') }}
        </p>
      </section>
    </main>
  </Page>
</template>

<script>
export default {
  name: "Imprint",

  head() {
    return {
      title: 'Imprint and contact',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'robots', name: 'robots', content: 'noindex' },
        {
          hid: 'imprint-description',
          name: 'imprint',
          content: 'This is the imprint of my site.'
        }
      ]
    };
  }
};
</script>

<style scoped>
p span.mail {
  display: none;
}
</style>
