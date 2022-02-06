<template>
  <!-- eslint-disable vue/max-len -->
  <Page :title="$t('privacyTitle')">
    <main class="index">
      <section class="data-protection--german">
        <h2>{{ $t('privacyIntroduction1') }}</h2>
        <p>{{ $t('privacyIntroduction2') }}</p>
        <p>{{ $t('privacyIntroduction3') }}</p>
        <p>{{ $t('privacyIntroduction4') }}</p>
        <h2>{{ $t('privacyIntroduction5') }}</h2>
        <ul class="index">
          <li>
            <a
              class="index-link"
              href="#m14"
            >{{ $t('privacyIntroduction1') }}</a>
          </li>
          <li>
            <a
              class="index-link"
              href="#m3"
            >{{ $t('privacyResponsible1') }}</a>
          </li>
          <li>
            <a
              class="index-link"
              href="#mOverview"
            >{{ $t('privacyProcessing1') }}</a>
          </li>
          <li>
            <a
              class="index-link"
              href="#m13"
            >{{ $t('privacyLegal1') }}</a>
          </li>
          <li>
            <a
              class="index-link"
              href="#m27"
            >{{ $t('privacySafety1') }}</a>
          </li>
          <li>
            <a
              class="index-link"
              href="#m25"
            >{{ $t('privacyData1') }}</a>
          </li>
          <li>
            <a
              class="index-link"
              href="#m24"
            >{{ $t('privacyData3') }}</a>
          </li>
          <li>
            <a
              class="index-link"
              href="#m12"
            >{{ $t('privacyData6') }}</a>
          </li>
          <!--li><a class="index-link" href="#m134">{{ $t('privacyLegal1') }}Einsatz von Cookies</a></li-->
          <li>
            <a
              class="index-link"
              href="#m225"
            >{{ $t('privacyHosting1') }}</a>
          </li>
          <li>
            <a
              class="index-link"
              href="#m104"
            >{{ $t('privacyBlog1') }}</a>
          </li>
          <li>
            <a
              class="index-link"
              href="#m136"
            >{{ $t('privacySocial1') }}</a>
          </li>
          <li>
            <a
              class="index-link"
              href="#m328"
            >{{ $t('privacyPlugins1') }}</a>
          </li>
          <li>
            <a
              class="index-link"
              href="#m15"
            >{{ $t('privacyChanges1') }}</a>
          </li>
          <li>
            <a
              class="index-link"
              href="#m10"
            >{{ $t('privacyRights1') }}</a>
          </li>
          <li>
            <a
              class="index-link"
              href="#m42"
            >{{ $t('privacyWords1') }}</a>
          </li>
        </ul>
        <h2 id="m3">
          {{ $t('privacyResponsible1') }}
        </h2>
        <p>{{ $t('privacyResponsible2') }}<br>{{ $t('privacyResponsible3') }}<br>{{ $t('privacyResponsible4') }}<br>{{ $t('privacyResponsible5') }}</p>
        <p>{{ $t('privacyResponsible6') }}<span class="mail">{{ $t('privacyResponsible7') }}</span>{{ $t('privacyResponsible8') }}<br></p>

        <h2 id="mOverview">
          {{ $t('privacyProcessing1') }}
        </h2>
        <p>{{ $t('privacyProcessing2') }}</p>
        <h3>{{ $t('privacyProcessing3') }}</h3>
        <ul>
          <!--          <li>{{ $t('privacyProcessing4') }}.</li>-->
          <!--          <li>{{ $t('privacyProcessing5') }}.</li>-->
          <li>{{ $t('privacyProcessing6') }}</li>
          <li>{{ $t('privacyProcessing7') }}</li>
          <li>{{ $t('privacyProcessing8') }}</li>
        </ul>
        <h3>{{ $t('privacyProcessing9') }}</h3>
        <ul>
          <li>{{ $t('privacyProcessing10') }}</li>
          <li>{{ $t('privacyProcessing11') }}</li>
        </ul>
        <h3>{{ $t('privacyProcessing12') }}</h3>
        <ul>
          <li>{{ $t('privacyProcessing13') }}</li>
          <li>{{ $t('privacyProcessing16') }}</li>
          <li>{{ $t('privacyProcessing17') }}</li>
          <li>{{ $t('privacyProcessing18') }}</li>
          <li>{{ $t('privacyProcessing19') }}</li>
          <li>{{ $t('privacyProcessing20') }}</li>
          <!--          <li>{{ $t('privacyProcessing14') }}.</li>-->
          <!--          <li>{{ $t('privacyProcessing15') }}.</li>-->
        </ul>
        <h3 id="m13">
          {{ $t('privacyLegal1') }}
        </h3>
        <p>{{ $t('privacyLegal2') }}</p>
        <ul>
          <li><strong>{{ $t('privacyLegal3') }}</strong>{{ $t('privacyLegal4') }}</li>
          <li><strong>{{ $t('privacyLegal5') }}</strong>{{ $t('privacyLegal6') }}</li>
          <li><strong>{{ $t('privacyLegal7') }}</strong>{{ $t('privacyLegal8') }}</li>
        </ul>
        <p><strong>{{ $t('privacyLegal9') }}</strong>{{ $t('privacyLegal10') }}</p>

        <h2 id="m27">
          {{ $t('privacySafety1') }}
        </h2>
        <p>{{ $t('privacySafety2') }}</p>
        <p>{{ $t('privacySafety3') }}</p>

        <h2 id="m25">
          {{ $t('privacyData1') }}
        </h2>
        <p>{{ $t('privacyData2') }}</p>
        <h2 id="m24">
          {{ $t('privacyData3') }}
        </h2>
        <p>{{ $t('privacyData4') }} </p>
        <p>
          {{ $t('privacyData5') }}
          <a
            href="https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection_de"
            target="_blank"
          >https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection_de</a>).
        </p>
        <h2 id="m12">
          {{ $t('privacyData6') }}
        </h2>
        <p>{{ $t('privacyData7') }}</p>
        <p>{{ $t('privacyData8') }}</p>
        <p>{{ $t('privacyData9') }}</p>
        <h2 id="m134">
          {{ $t('cookieWords1') }}
        </h2>
        <p>{{ $t('cookieWords2') }}</p>
        <p><strong>{{ $t('cookieWords3') }}</strong></p>
        <ul>
          <li>
            <strong>{{ $t('cookieWords4') }}</strong>{{ $t('cookieWords5') }}
          </li>
          <li>
            <strong>{{ $t('cookieWords6') }}</strong>{{ $t('cookieWords7') }}
          </li>
          <li><strong>{{ $t('cookieWords7') }}</strong>{{ $t('cookieWords8') }}</li>
          <li>
            <strong>{{ $t('cookieWords9') }}</strong>
          </li>
          <li>
            <strong>{{ $t('cookieWords10') }}</strong>{{ $t('cookieWords11') }}
          </li>
          <li>
            <strong>{{ $t('cookieWords11') }}</strong>{{ $t('cookieWords12') }}
          </li>
        </ul>


        <p><strong>{{ $t('cookieWords15') }} </strong>{{ $t('cookieWords16') }}</p>
        <!-- Vorsicht -->
        <p><strong>{{ $t('cookieWords17') }}</strong>{{ $t('cookieWords18') }}</p>
        <p>
          <strong>{{ $t('cookieWords19') }}</strong> {{ $t('cookieWords20') }} <a
            href="https://optout.aboutads.info"
            target="_blank"
          >https://optout.aboutads.info</a>
          und <a
            href="https://www.youronlinechoices.com/"
            target="_blank"
          >https://www.youronlinechoices.com/</a>
          {{ $t('cookieWords21') }}
        </p>
        <ul class="m-elements">
          <li>
            <strong>{{ $t('privacyHosting7') }}</strong> {{ $t('cookieWords24') }} {{ $t('privacyProcessing7') }}.
          </li>
          <li><strong>{{ $t('privacyHosting26') }}:</strong> {{ $t('privacyProcessing11') }}.</li>
          <li>
            <strong>{{ $t('privacyHosting10') }}</strong> {{ $t('cookieWords27') }}
          </li>
        </ul>
        <h2 id="m225">
          {{ $t('privacyHosting1') }}
        </h2>
        <p>{{ $t('privacyHosting2') }}</p>
        <p>{{ $t('privacyHosting3') }}</p>
        <p><strong>{{ $t('privacyHosting4') }}</strong>{{ $t('privacyHosting5') }}</p>
        <p>{{ $t('privacyHosting6') }}</p>
        <ul class="m-elements">
          <li>
            <strong>{{ $t('privacyHosting7') }}</strong> {{ $t('privacyProcessing5') }}, {{ $t('privacyProcessing8') }}, {{ $t('privacyProcessing7') }}
          </li>
          <li><strong>{{ $t('privacyHosting8') }}</strong> {{ $t('privacyProcessing11') }}.</li>
          <li>
            <strong>{{ $t('privacyHosting9') }}</strong> {{ $t('privacyProcessing13') }}.
          </li>
          <li><strong>{{ $t('privacyHosting10') }}</strong> {{ $t('privacyLegal7') }}</li>
        </ul>
        <h2 id="m104">
          {{ $t('privacyBlog1') }}
        </h2>
        <p>{{ $t('privacyBlog2') }}</p>
        <p><strong>{{ $t('privacyBlog3') }}</strong>: {{ $t('privacyBlog4') }}{{ $t('privacyBlog5') }}</p>
        <p>{{ $t('privacyBlog6') }}</p>
        <p>{{ $t('privacyBlog7') }}</p>
        <ul class="m-elements">
          <li><strong>{{ $t('privacyHosting7') }}</strong> {{ $t('privacyProcessing4') }}, {{ $t('privacyProcessing5') }}, {{ $t('privacyProcessing6') }}, {{ $t('privacyProcessing8') }}, {{ $t('privacyProcessing7') }}.</li>
          <li><strong>{{ $t('privacyHosting8') }}</strong> {{ $t('privacyProcessing11') }}.</li>
          <li><strong>{{ $t('privacyHosting9') }}</strong> {{ $t('privacyProcessing19') }}, {{ $t('privacyProcessing15') }}, {{ $t('privacyProcessing18') }}, {{ $t('privacyProcessing20') }}</li>
          <li><strong>{{ $t('privacyHosting10') }}</strong> {{ $t('privacyLegal5') }}, {{ $t('privacyLegal7') }}</li>
        </ul>
        <h2 id="m136">
          {{ $t('privacySocial1') }}
        </h2>
        <p>{{ $t('privacySocial2') }}</p>
        <p>{{ $t('privacySocial3') }}</p>
        <p>{{ $t('privacySocial4') }}</p>
        <p>{{ $t('privacySocial5') }}</p>
        <p>{{ $t('privacySocial6') }}</p>
        <ul class="m-elements">
          <li>
            <strong>{{ $t('privacyHosting7') }}</strong> {{ $t('privacyProcessing6') }}, {{ $t('privacyProcessing5') }}, {{ $t('privacyProcessing8') }}, {{ $t('privacyProcessing7') }}.
          </li>
          <li><strong>{{ $t('privacyHosting8') }}</strong> {{ $t('privacyProcessing11') }}.</li>
          <li>
            <strong>{{ $t('privacyHosting9') }}</strong> {{ $t('privacyProcessing17') }}, {{ $t('privacyProcessing15') }}, {{ $t('privacyProcessing16') }}.
          </li>
          <li><strong>{{ $t('privacyHosting10') }}</strong> {{ $t('privacyLegal7') }}</li>
        </ul>
        <p><strong>{{ $t('privacySocial7') }}</strong></p>
        <ul class="m-elements">
          <li>
            <strong>{{ $t('privacySocial8') }}</strong> {{ $t('privacySocial9') }}: LinkedIn Ireland Unlimited Company, Wilton
            Place, Dublin 2, Irland; {{ $t('privacySocial10') }} <a
              href="https://www.linkedin.com"
              target="_blank"
            >https://www.linkedin.com</a>;
            {{ $t('privacySocial11') }} <a
              href="https://www.linkedin.com/legal/privacy-policy"
              target="_blank"
            >https://www.linkedin.com/legal/privacy-policy</a>;
            {{ $t('privacySocial12') }} <a
              href="https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out"
              target="_blank"
            >https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out</a>.
          </li>
          <li>
            <strong>Twitter:</strong> {{ $t('privacySocial9') }} Twitter International Company, One Cumberland
            Place, Fenian Street, Dublin 2 D02 AX07, Irland, Mutterunternehmen: Twitter Inc., 1355 Market Street, Suite
            900, San Francisco, CA 94103, USA; {{ $t('privacySocial11') }}: <a
              href="https://twitter.com/de/privacy"
              target="_blank"
            >https://twitter.com/de/privacy</a>,
            {{ $t('privacySocial13') }} <a
              href="https://twitter.com/personalization"
              target="_blank"
            >https://twitter.com/personalization</a>.
          </li>
          <li>
            <strong>Xing:</strong> {{ $t('privacySocial9') }}: XING AG, Dammtorstraße 29-32, 20354 Hamburg,
            Deutschland; {{ $t('privacySocial10') }}: <a
              href="https://www.xing.de"
              target="_blank"
            >https://www.xing.de</a>;
            {{ $t('privacySocial11') }}: <a
              href="https://privacy.xing.com/de/datenschutzerklaerung"
              target="_blank"
            >https://privacy.xing.com/de/datenschutzerklaerung</a>.
          </li>
        </ul>
        <h2 id="m328">
          {{ $t('privacyPlugins1') }}
        </h2>
        <p>{{ $t('privacyPlugins2') }}</p>
        <p>{{ $t('privacyPlugins3') }}</p>
        <p><strong>{{ $t('privacyPlugins4') }}</strong> {{ $t('privacyPlugins5') }}</p>
        <ul class="m-elements">
          <li>
            <strong>{{ $t('privacyHosting7') }}</strong> {{ $t('privacyProcessing8') }}, {{ $t('privacyProcessing7') }}, {{ $t('privacyProcessing4') }}, {{ $t('privacyProcessing6') }}, {{ $t('privacyProcessing5') }}.
          </li>
          <li><strong>{{ $t('privacyHosting8') }}</strong> {{ $t('privacyProcessing11') }}.</li>
          <li>
            <strong>{{ $t('privacyHosting9') }}</strong> {{ $t('privacyProcessing13') }},
            {{ $t('privacyProcessing19') }}.
          </li>
          <li>
            <strong>{{ $t('privacyHosting10') }}</strong> {{ $t('privacyLegal7') }}, Einwilligung (Art. 6 Abs. 1 S. 1 lit. a. DSGVO), Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b. DSGVO).
          </li>
        </ul>
        <p><strong>{{ $t('privacySocial7') }}</strong></p>
        <ul class="m-elements">
          <li>
            <strong>Google Fonts:</strong> {{ $t('privacyPlugins7') }}
            Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland, Mutterunternehmen: Google LLC, 1600
            Amphitheatre Parkway, Mountain View, CA 94043, USA; Website: <a
              href="https://fonts.google.com/"
              target="_blank"
            >https://fonts.google.com/</a>;
            {{ $t('privacySocial11') }}: <a
              href="https://policies.google.com/privacy"
              target="_blank"
            >https://policies.google.com/privacy</a>.
          </li>
          <li>
            <strong>YouTube-Videos:</strong> {{ $t('privacyPlugins8') }}: Google Ireland Limited, Gordon House,
            Barrow Street, Dublin 4, Irland, Mutterunternehmen: Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA
            94043, USA; Website: <a
              href="https://www.youtube.com"
              target="_blank"
            >https://www.youtube.com</a>;
            Datenschutzerklärung: <a
              href="https://policies.google.com/privacy"
              target="_blank"
            >https://policies.google.com/privacy</a>;
            Widerspruchsmöglichkeit (Opt-Out): Opt-Out-Plugin: <a
              href="https://tools.google.com/dlpage/gaoptout?hl=de"
              target="_blank"
            >https://tools.google.com/dlpage/gaoptout?hl=de</a>,
            Einstellungen für die Darstellung von Werbeeinblendungen: <a
              href="https://adssettings.google.com/authenticated"
              target="_blank"
            >https://adssettings.google.com/authenticated</a>.
          </li>
        </ul>
        <h2 id="m15">
          {{ $t('privacyChanges1') }}
        </h2>
        <p>{{ $t('privacyChanges2') }}</p>
        <p>{{ $t('privacyChanges3') }}</p>

        <h2 id="m10">
          {{ $t('privacyRights1') }}
        </h2>
        <p>{{ $t('privacyRights2') }}</p>
        <ul>
          <li><strong>{{ $t('privacyRights3') }}</strong></li>
          <li>
            <strong>{{ $t('privacyRights4') }}</strong> {{ $t('privacyRights5') }}
          </li>
          <li>
            <strong>{{ $t('privacyRights6') }}</strong> {{ $t('privacyRights7') }}
          </li>
          <li>
            <strong>{{ $t('privacyRights8') }}</strong> {{ $t('privacyRights9') }}
          </li>
          <li>
            <strong>{{ $t('privacyRights10') }}</strong> {{ $t('privacyRights11') }}
          </li>
          <li>
            <strong>{{ $t('privacyRights12') }}</strong> {{ $t('privacyRights13') }}
          </li>
          <li>
            <strong>{{ $t('privacyRights14') }}</strong> {{ $t('privacyRights15') }}
          </li>
        </ul>
        <h2 id="m42">
          {{ $t('privacyWords1') }}
        </h2>
        <p>{{ $t('privacyWords2') }}</p>
        <ul class="glossary">
          <li>
            <strong>{{ $t('privacyWords3') }}</strong> {{ $t('privacyWords4') }}
          </li>
          <li>
            <strong>{{ $t('privacyWords5') }}</strong> {{ $t('privacyWords6') }}
          </li>
          <li>
            <strong>{{ $t('privacyWords7') }}</strong>{{ $t('privacyWords8') }}
          </li>
        </ul>
        <p class="seal">
          <a
            href="https://datenschutz-generator.de/?l=de"
            title="Rechtstext von Dr. Schwenke - für weitere Informationen bitte anklicken."
            target="_blank"
            rel="noopener noreferrer nofollow"
          >Erstellt mit kostenlosem
            Datenschutz-Generator.de von Dr. Thomas Schwenke</a>
        </p>
      </section>
    </main>
  </Page>
</template>

<script>
export default {
  name: 'DataProtection',

  head() {
    return {
      title: 'Data protection',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'robots', name: 'robots', content: 'noindex' },
        {
          hid: 'data-protection-description',
          name: 'data-protection',
          content: 'This is the data protection page of my site.'
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

@media screen and (max-width: 700px) {
  .hint {
    display: none;
  }
}
</style>
