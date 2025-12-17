import fs from "fs"
import matter from "gray-matter"
import path from "path"
import config from "../blog.config"
import { Post, PostFrontmatter } from "./types"

const postsDirectory = path.join(process.cwd(), "public/_posts")

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md"))
}

export function getPostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.md$/, "")
  const fullPath = path.join(postsDirectory, `${realSlug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)
  const frontmatter = data as PostFrontmatter

  // Skip drafts in production
  if (frontmatter.draft && process.env.NODE_ENV === "production") {
    return null
  }

  // Skip unpublished posts
  if (frontmatter.published === false) {
    return null
  }

  // Extract date from filename if not in frontmatter (format: YYYY-MM-DD-Title.md)
  let postDate = frontmatter.date
  if (!postDate) {
    const dateMatch = realSlug.match(/^(\d{4}-\d{2}-\d{2})/)
    if (dateMatch) {
      postDate = dateMatch[1]
    }
  }

  // Handle both single author and multiple authors
  let authors: string[] = []
  if (frontmatter.authors && Array.isArray(frontmatter.authors)) {
    authors = frontmatter.authors
  } else if (frontmatter.author) {
    authors = [frontmatter.author]
  } else {
    authors = [config.defaultAuthor]
  }

  // Generate description from content if not provided
  const description =
    frontmatter.description ||
    content
      .slice(0, 160)
      .replace(/[#*`\n]/g, " ")
      .trim() + "..."

  return {
    ...frontmatter,
    slug: realSlug,
    content,
    date: postDate || new Date().toISOString().split("T")[0],
    description,
    authors,
    readingTime: calculateReadingTime(content),
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1))

  return posts
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter((post) => post.featured)
}

export function getPostsByAuthor(authorId: string): Post[] {
  return getAllPosts().filter((post) => post.authors.includes(authorId))
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) => post.tags?.includes(tag))
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set<string>()
  posts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
}

export function getRelatedPosts(currentPost: Post, limit: number = 3): Post[] {
  const allPosts = getAllPosts().filter(
    (post) => post.slug !== currentPost.slug
  )

  // Score posts by matching tags
  const scoredPosts = allPosts.map((post) => {
    const matchingTags =
      post.tags?.filter((tag) => currentPost.tags?.includes(tag)).length || 0
    return { post, score: matchingTags }
  })

  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post)
}
