import Image from "next/image"
import Link from "next/link"
import { getAuthor } from "../lib/authors"
import { Post } from "../lib/types"

interface PostCardProps {
  post: Post
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const authors = post.authors
    .map((authorId) => getAuthor(authorId))
    .filter(Boolean)

  return (
    <article
      className={`group rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] transition-shadow hover:shadow-lg ${
        featured ? "col-span-full" : ""
      }`}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {post.image && (
          <div
            className={`relative overflow-hidden rounded-t-xl ${
              featured ? "h-64 sm:h-80" : "h-48"
            }`}
          >
            <Image
              src={post.image}
              alt={post.imageAlt || post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        <div className="p-6">
          {post.tags && post.tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-medium text-[var(--color-primary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h2
            className={`font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors ${
              featured ? "text-2xl sm:text-3xl" : "text-xl"
            }`}
          >
            {post.title}
          </h2>

          <p className="mt-2 text-[var(--color-text-secondary)] line-clamp-2">
            {post.description}
          </p>

          <div className="mt-4 flex items-center gap-3 flex-wrap">
            {authors.length > 0 && (
              <>
                <div className="flex items-center gap-2">
                  {authors.map((author, index) => (
                    <div
                      key={author?.id || index}
                      className="flex items-center gap-2"
                    >
                      {author && (
                        <>
                          <div className="relative h-8 w-8 flex-shrink-0">
                            <Image
                              src={author.avatar}
                              alt={author.name}
                              fill
                              className="rounded-full object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium text-[var(--color-text)]">
                            {author.name}
                          </span>
                          {index < authors.length - 1 && (
                            <span className="text-sm text-[var(--color-text-secondary)]">
                              &
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-[var(--color-text-secondary)]">
                  ·
                </span>
              </>
            )}
            <time
              dateTime={post.date}
              className="text-sm text-[var(--color-text-secondary)]"
            >
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span className="text-sm text-[var(--color-text-secondary)]">
              ·
            </span>
            <span className="text-sm text-[var(--color-text-secondary)]">
              {post.readingTime} min read
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
