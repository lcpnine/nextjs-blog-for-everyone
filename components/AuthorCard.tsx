import Image from "next/image"
import Link from "next/link"
import { Author } from "../lib/types"

interface AuthorCardProps {
  author: Author
  showBio?: boolean
}

export default function AuthorCard({
  author,
  showBio = true,
}: AuthorCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="relative h-16 w-16 flex-shrink-0">
        <Image
          src={author.avatar}
          alt={author.name}
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-[var(--color-text)]">
          {author.name}
        </h3>
        {showBio && (
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {author.bio}
          </p>
        )}
        {author.social && (
          <div className="mt-3 flex items-center gap-3">
            {author.social.twitter && (
              <Link
                href={`https://twitter.com/${author.social.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-primary)] hover:underline"
              >
                Twitter
              </Link>
            )}
            {author.social.github && (
              <Link
                href={`https://github.com/${author.social.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-primary)] hover:underline"
              >
                GitHub
              </Link>
            )}
            {author.social.linkedin && (
              <Link
                href={`https://linkedin.com/in/${author.social.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-primary)] hover:underline"
              >
                LinkedIn
              </Link>
            )}
            {author.social.website && (
              <Link
                href={author.social.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-primary)] hover:underline"
              >
                Website
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
