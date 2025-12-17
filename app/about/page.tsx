import config from "../../blog.config"
import AuthorCard from "../../components/AuthorCard"
import { getAllAuthors } from "../../lib/authors"
import { generateMetadata as generateSEO } from "../../lib/seo"

export const metadata = generateSEO({
  title: "About",
  description: `Learn more about ${config.site.title} and the team behind it`,
  path: "/about",
})

export default function AboutPage() {
  const authors = getAllAuthors()

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-(--color-text)">About</h1>
        <p className="mt-4 text-xl text-(--color-text-secondary)">
          {config.site.description}
        </p>
      </header>

      <section className="prose prose-lg max-w-none dark:prose-invert">
        <h3>Hi There 👋👋</h3>

        <h4>$ Whoami</h4>
        <ul>
          <li>A Passionate Security Researcher.</li>
          <li>
            <strong>OSED</strong> and <strong>PNPT</strong> Certified.
          </li>
          <li>
            Enjoy learning <strong>Exploit Development</strong>,{" "}
            <strong>Malware Analysis</strong> and{" "}
            <strong>Reverse Engineering</strong>.
          </li>
        </ul>

        <h4>$ What am I doing?</h4>
        <ul>
          <li>
            🎓 Studying <strong>MSCS</strong> at <strong>NTU Singapore</strong>.
          </li>
          <li>
            📚 Currently learning about <strong>AI in Security</strong>.
          </li>
        </ul>

        <p>Feel free to contact me with any questions!</p>
      </section>

      {/* Authors Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {authors.map((author) => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </div>

      <section className="mt-12 prose prose-lg max-w-none dark:prose-invert">
        <h2>Get in Touch</h2>
        <p>
          Have questions or want to collaborate? Feel free to reach out through
          our social media channels or drop us an email.
        </p>
      </section>
    </div>
  )
}
