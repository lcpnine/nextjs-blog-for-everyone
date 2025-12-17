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
  "john-doe": {
    id: "john-doe",
    name: "John Doe",
    bio: "Full-stack developer passionate about web technologies and open source.",
    avatar: findAuthorAvatar("john-doe"),
    social: {
      twitter: "johndoe",
      github: "johndoe",
      website: "https://johndoe.com",
    },
  },
  "jane-smith": {
    id: "jane-smith",
    name: "Jane Smith",
    bio: "Tech writer and software engineer with a focus on developer experience.",
    avatar: findAuthorAvatar("jane-smith"),
    social: {
      twitter: "janesmith",
      github: "janesmith",
      linkedin: "janesmith",
    },
  },
  // Add more authors here
}

// Alias mapping for easier lookup (case-insensitive)
const authorAliases: Record<string, string> = {
  john: "john-doe",
  "john doe": "john-doe",
  johndoe: "john-doe",
  doe: "john-doe",
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
