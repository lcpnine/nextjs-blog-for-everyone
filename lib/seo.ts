import { Metadata } from "next"
import config from "../blog.config"
import { getAuthor } from "./authors"
import { Post } from "./types"

interface GenerateMetadataOptions {
  title?: string
  description?: string
  path?: string
  image?: string
  imageAlt?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
}

export function generateMetadata(options: GenerateMetadataOptions): Metadata {
  const {
    title,
    description = config.site.description,
    path = "",
    image,
    imageAlt,
    type = "website",
    publishedTime,
    authors,
    tags,
  } = options

  const fullTitle = title
    ? `${title} | ${config.site.title}`
    : config.site.title
  const url = `${config.site.url}${path}`
  // Support multiple formats for default OG image (jpg, jpeg, png, webp)
  // The system will use the first available format
  const ogImage = image || `${config.site.url}/images/og-default.jpg`

  const metadata: Metadata = {
    title: fullTitle,
    description,
    metadataBase: new URL(config.site.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: config.site.title,
      locale: config.site.locale,
      type: type === "article" ? "article" : "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt || fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      creator: config.social.twitter ? `@${config.social.twitter}` : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }

  // Add article-specific metadata
  if (type === "article" && metadata.openGraph) {
    ;(metadata.openGraph as Record<string, unknown>).publishedTime =
      publishedTime
    ;(metadata.openGraph as Record<string, unknown>).authors = authors
    ;(metadata.openGraph as Record<string, unknown>).tags = tags
  }

  return metadata
}

export function generatePostMetadata(post: Post): Metadata {
  const author = getAuthor(post.authors?.[0] || "")

  return generateMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: post.image,
    imageAlt: post.imageAlt,
    type: "article",
    publishedTime: post.date,
    authors: author ? [author.name] : undefined,
    tags: post.tags,
  })
}

export function generateBlogPostingSchema(post: Post) {
  const author = getAuthor(post.authors?.[0] || "")
  const postImage = post.image || "/images/og-default.jpg"

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${config.site.url}${postImage}`,
    datePublished: post.date,
    dateModified: post.date,
    author: author
      ? {
          "@type": "Person",
          name: author.name,
          url: author.social?.website,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: config.site.title,
      url: config.site.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${config.site.url}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(", "),
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readingTime}M`,
  }
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: config.site.title,
    description: config.site.description,
    url: config.site.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${config.site.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${config.site.url}${item.url}`,
    })),
  }
}
