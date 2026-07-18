// All styles are inlined into the HTML (features.inlineStyles), so the
// remaining stylesheet link only exists for client-side navigation. Load it
// asynchronously instead of render-blocking: with media="print" the browser
// fetches it at low priority, and onload flips it to a regular stylesheet.
export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:html', (html) => {
    html.head = html.head.map(section =>
      section.replace(
        /<link rel="stylesheet"([^>]*?href="\/_nuxt\/[^"]+\.css"[^>]*?)>/g,
        '<link rel="stylesheet"$1 media="print" onload="this.media=\'all\'">'
      )
    )
  })
})
