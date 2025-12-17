import { Author } from "./types"

const authors: Record<string, Author> = {
  "amey-pathak": {
    id: "ap425q",
    name: "Amey Pathak",
    bio: "Security researcher and blogger sharing insights on cybersecurity and technology.",
    avatar: "/images/authors/amey.jpeg",
    social: {
      linkedin: "https://www.linkedin.com/in/amey-pathak/",
    },
  },
  "tanu-chauhan": {
    id: "tanu-chauhan",
    name: "Tanu Chauhan",
    bio: "Contributor to cybersecurity research and technical writing.",
    avatar: "/images/authors/tanu.jpg",
    social: {
      linkedin: "https://www.linkedin.com/in/tanu-chauhan-741b01230/",
    },
  },
}

export function getAuthor(id: string): Author | undefined {
  return authors[id]
}

export function getAllAuthors(): Author[] {
  return Object.values(authors)
}

export default authors
