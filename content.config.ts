import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const author = z.object({
  name: z.string(),
  bio: z.string().optional(),
  image: z.string().optional()
})

const otherLanguage = z.object({
  locale: z.string(),
  name: z.string(),
  path: z.string().optional()
})

const schema = z.object({
  img: z.string().optional(),
  alt: z.string().optional(),
  createdAt: z.string(),
  author: author.optional(),
  tags: z.array(z.string()).optional(),
  otherLanguages: z.array(otherLanguage).optional()
})

const docs = (include: string) => defineCollection({
  type: 'page',
  source: { include },
  schema
})

export default defineContentConfig({
  collections: {
    articles_en: docs('articles/*.md'),
    articles_de: docs('articles/de/*.md'),
    talks_en: docs('talks/*.md'),
    talks_de: docs('talks/de/*.md'),
    publications_en: docs('publications/*.md'),
    publications_de: docs('publications/de/*.md'),
    conferences: docs('conferences/*.md')
  }
})
