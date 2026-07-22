import { queryCollection } from '@nuxt/content/server'

const SITE_URL = 'https://www.ramona.codes'

// Republished/syndicated articles point their canonical at the original
// publication and are kept out of search indexing (see robots config in
// nuxt.config.ts). Keep them out of the feed too, matched by the same slug
// prefixes so the feed stays consistent with what we ask crawlers to index.
const SYNDICATED_PREFIXES = ['smashing-', 'auth0-', 'devto-']

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export default defineEventHandler(async (event) => {
  const articles = await queryCollection(event, 'articles_en')
    .select('title', 'description', 'stem', 'createdAt')
    .order('createdAt', 'DESC')
    .all()

  const items = articles
    .map(article => ({ ...article, slug: article.stem.split('/').pop() as string }))
    .filter(article => !SYNDICATED_PREFIXES.some(prefix => article.slug.startsWith(prefix)))

  const feedItems = items.map((article) => {
    const url = `${SITE_URL}/blog/${article.slug}/`
    return `    <item>
      <title>${escapeXml(article.title ?? '')}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(article.createdAt).toUTCString()}</pubDate>
      <description>${escapeXml(article.description ?? '')}</description>
    </item>`
  }).join('\n')

  const lastBuildDate = items.length
    ? new Date(items[0].createdAt).toUTCString()
    : new Date(0).toUTCString()

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ramona Schwering — Writing</title>
    <link>${SITE_URL}/blog/</link>
    <description>Articles by Ramona Schwering on frontend development, test automation and accessibility.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${feedItems}
  </channel>
</rss>`

  setResponseHeader(event, 'Content-Type', 'application/rss+xml; charset=utf-8')
  return feed
})
