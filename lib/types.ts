export interface Author {
  id: string
  name: string
  bio: string
  avatar: string
  social?: {
    twitter?: string
    github?: string
    linkedin?: string
    website?: string
  }
}

export interface PostFrontmatter {
  title: string
  description?: string
  date?: string
  author?: string
  authors?: string[]
  tags?: string[]
  image?: string
  imageAlt?: string
  draft?: boolean
  published?: boolean
  featured?: boolean
  layout?: "default" | "wide" | "full"
}

export interface Post extends PostFrontmatter {
  slug: string
  content: string
  readingTime: number
  date: string
  description: string
  authors: string[]
}

export interface BlogConfig {
  site: {
    title: string
    description: string
    url: string
    language: string
    locale: string
  }
  defaultAuthor: string
  nav: Array<{ label: string; href: string }>
  social: {
    twitter?: string
    github?: string
    linkedin?: string
  }
  giscus: {
    repo: string
    repoId: string
    category: string
    categoryId: string
    mapping: string
    reactionsEnabled: boolean
    emitMetadata: boolean
    inputPosition: "top" | "bottom"
    theme: string
    lang: string
  }
  postsPerPage: number
  features: {
    comments: boolean
    darkMode: boolean
    search: boolean
    rss: boolean
  }
}

export interface SEOProps {
  title: string
  description: string
  canonical?: string
  openGraph?: {
    title?: string
    description?: string
    type?: string
    url?: string
    images?: Array<{
      url: string
      width?: number
      height?: number
      alt?: string
    }>
    article?: {
      publishedTime?: string
      modifiedTime?: string
      authors?: string[]
      tags?: string[]
    }
  }
  twitter?: {
    card?: "summary" | "summary_large_image" | "player" | "app"
    site?: string
    creator?: string
  }
}
