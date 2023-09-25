import type { MarkdownParsedContent } from '@nuxt/content/dist/runtime/types'

type OtherLanguage = {
    locale: string,
    name: string,
    path: string
}

export type Article = MarkdownParsedContent & {
    title: string,
    description: string,
    img: string,
    createdAt: string,
    alt: string,
    author: {
        name: string,
        image: string,
        bio: string?,
    },
    tags: string[],
    otherLanguages: OtherLanguage[]?
}

export type Conference = MarkdownParsedContent & {
    title: string,
    description: string,
    img: string,
    alt: string,
    createdAt: string,
}

export type Publication = MarkdownParsedContent & {
    title: string,
    description: string,
    img: string,
    createdAt: string,
    tags: string[]?,
    otherLanguages: OtherLanguage[]?
}

export type Talk = MarkdownParsedContent & {
    title: string,
    description: string,
    createdAt: string,
    author: {
        name: string,
        image: string,
    },
    tags: string[]?,
    otherLanguages: OtherLanguage[]?
}

export interface Media {
    path: string,
    alt: string
}

export interface SocialMediaEmbed {
    name: string,
    url: string,
    description: string
}

export interface Project {
    full_name: string
    html_url: string
    description: string
    fork: boolean
}