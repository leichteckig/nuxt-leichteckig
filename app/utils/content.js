/**
 * Maps a content base name ('articles', 'talks', 'publications') and the
 * current locale to the matching collection defined in content.config.ts.
 * English content lives at the collection root, other locales in a subfolder.
 */
export function localizedCollection(base, locale) {
  if (base === 'conferences') {
    return 'conferences'
  }
  return locale === 'en' ? `${base}_en` : `${base}_de`
}

/**
 * Nuxt Content 1 exposed a `slug` for every document; v3 only provides the
 * file `stem`. The components still work with slugs, so derive it here.
 */
export function withSlug(docs) {
  return (docs ?? []).map(doc => ({
    ...doc,
    slug: doc.stem.split('/').pop()
  }))
}
