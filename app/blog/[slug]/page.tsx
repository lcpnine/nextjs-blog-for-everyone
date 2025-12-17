import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import AuthorCard from "../../../components/AuthorCard"
import Comments from "../../../components/Comments"
import Markdown from "../../../components/Markdown"
import PostCard from "../../../components/PostCard"
import { getAuthor } from "../../../lib/authors"
import { getAllPosts, getPostBySlug, getRelatedPosts } from "../../../lib/posts"
import {
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
  generatePostMetadata,
} from "../../../lib/seo"

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return generatePostMetadata(post)
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const authors = post.authors
    .map((authorId) => getAuthor(authorId))
    .filter(Boolean)
  const relatedPosts = getRelatedPosts(post, 3)

  const blogPostingSchema = generateBlogPostingSchema(post)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ])

  // Determine layout class
  const layoutClass = {
    default: "max-w-3xl",
    wide: "max-w-4xl",
    full: "max-w-6xl",
  }[post.layout || "default"]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className={`mx-auto px-4 py-16 ${layoutClass}`}>
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-[var(--color-text-secondary)]">
          <Link href="/" className="hover:text-[var(--color-text)]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-[var(--color-text)]">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--color-text)]">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          {post.tags && post.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag}`}
                  className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-sm font-medium text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          <h1 className="text-3xl font-bold text-[var(--color-text)] sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 text-xl text-[var(--color-text-secondary)]">
            {post.description}
          </p>

          <div className="mt-6 flex items-center gap-4 flex-wrap">
            {authors.length > 0 && (
              <div className="flex items-center gap-3">
                {authors.map((author, index) => (
                  <div
                    key={author?.id || index}
                    className="flex items-center gap-3"
                  >
                    {author && (
                      <>
                        <div className="relative h-12 w-12 flex-shrink-0">
                          <Image
                            src={author.avatar}
                            alt={author.name}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-[var(--color-text)]">
                            {author.name}
                          </p>
                        </div>
                      </>
                    )}
                    {index < authors.length - 1 && (
                      <span className="text-sm text-[var(--color-text-secondary)] font-medium">
                        &
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2">
              <time
                dateTime={post.date}
                className="text-sm text-[var(--color-text-secondary)]"
              >
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
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
        </header>

        {/* Content */}
        <div className="prose-container">
          <Markdown content={post.content} />
        </div>

        {/* Author Bio */}
        {authors.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">
              {authors.length > 1 ? "About the authors" : "About the author"}
            </h2>
            <div className="space-y-4">
              {authors.map(
                (author) =>
                  author && <AuthorCard key={author.id} author={author} />
              )}
            </div>
          </div>
        )}

        {/* Comments */}
        <Comments />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 border-t border-[var(--color-border)] pt-8">
            <h2 className="mb-8 text-2xl font-bold text-[var(--color-text)]">
              Related Posts
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  )
}
