import fs from "fs"
import path from "path"
import { Author } from "./types"

// Helper function to find author avatar with any supported extension
function findAuthorAvatar(authorId: string): string {
  const extensions = ["jpg", "jpeg", "png", "webp", "gif", "svg"]
  const authorsDir = path.join(process.cwd(), "public", "images", "authors")

  for (const ext of extensions) {
    const filePath = path.join(authorsDir, `${authorId}.${ext}`)
    if (fs.existsSync(filePath)) {
      return `/images/authors/${authorId}.${ext}`
    }
  }

  // Fallback to default avatar or return a placeholder
  return "/images/authors/default-avatar.jpg"
}

const authors: Record<string, Author> = {
  "amey-pathak": {
    id: "amey-pathak",
    name: "Amey Pathak",
    bio: "Security researcher and blogger sharing insights on cybersecurity and technology.",
    avatar: findAuthorAvatar("amey-pathak"),
    social: {
      twitter: "ap425q",
      github: "ap425q",
      linkedin: "amey-pathak",
    },
  },
  "tanu-chauhan": {
    id: "tanu-chauhan",
    name: "Tanu Chauhan",
    bio: "Contributor to cybersecurity research and technical writing.",
    avatar: findAuthorAvatar("tanu-chauhan"),
    social: {
      linkedin: "tanu-chauhan-741b01230",
    },
  },
}

// Alias mapping for easier lookup (case-insensitive)
const authorAliases: Record<string, string> = {
  amey: "amey-pathak",
  "amey pathak": "amey-pathak",
  ap425q: "amey-pathak",
  tanu: "tanu-chauhan",
  "tanu chauhan": "tanu-chauhan",
}

export function getAuthor(id: string): Author | undefined {
  if (!id) return undefined

  // Normalize the input
  const normalizedId = id.toLowerCase().trim()

  // Try direct lookup first
  if (authors[normalizedId]) {
    return authors[normalizedId]
  }

  // Try alias lookup
  const aliasedId = authorAliases[normalizedId]
  if (aliasedId && authors[aliasedId]) {
    return authors[aliasedId]
  }

  return undefined
}

export function getAllAuthors(): Author[] {
  return Object.values(authors)
}

export default authors
