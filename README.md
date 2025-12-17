# Next.js Blog Starter Template

A feature-rich, SEO-optimized blog starter template built with Next.js 16, Tailwind CSS v4, and TypeScript. Perfect for developers, writers, and teams who want a fast, customizable blog.

## Features

- 📝 **Markdown Posts** - Write posts in Markdown files with frontmatter
- 👥 **Multiple Authors** - Support for multiple authors with profiles
- 🔍 **SEO Optimized** - Meta tags, OpenGraph, Twitter Cards, Schema.org
- 🌙 **Dark Mode** - Automatic system preference detection with toggle
- 💬 **Comments** - GitHub-based comments using Giscus
- 📊 **RSS Feed** - Automatic RSS feed generation
- 🗺️ **Sitemap** - Auto-generated sitemap for search engines
- 📱 **Responsive** - Mobile-first design
- ⚡ **Fast** - Optimized for performance
- 🎨 **Customizable** - Easy theming with CSS variables and Tailwind

## Quick Start

### Installation

1. **Clone or download the template**

```bash
# Using git
git clone https://github.com/lcpnine/nextjs-blog-starter.git my-blog
cd my-blog

# Or download and extract the ZIP
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Open [http://localhost:3000](http://localhost:3000)**

## Configuration

### Site Configuration (`blog.config.ts`)

Edit `blog.config.ts` to customize your blog:

```typescript
const config: BlogConfig = {
  site: {
    title: "My Blog",
    description: "A blog about technology",
    url: "https://yourdomain.com", // Your production URL
    language: "en",
    locale: "en_US",
  },
  
  defaultAuthor: "john-doe", // Author ID for posts without author
  
  nav: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ],
  
  social: {
    twitter: "yourusername",
    github: "yourusername",
    linkedin: "yourusername",
  },
  
  // See Giscus section below
  giscus: { ... },
  
  postsPerPage: 10,
  
  features: {
    comments: true,
    darkMode: true,
    search: false,
    rss: true,
  },
};
```

### Adding Authors (`lib/authors.ts`)

Add authors to `lib/authors.ts`:

```typescript
const authors: Record<string, Author> = {
  "your-id": {
    id: "your-id",
    name: "Your Name",
    bio: "Your bio here",
    avatar: "/images/authors/your-avatar.jpg",
    social: {
      twitter: "yourtwitter",
      github: "yourgithub",
      linkedin: "yourlinkedin",
      website: "https://yoursite.com",
    },
  },
};
```

### Setting Up Giscus Comments

> **Note for Jekyll Users**  
> If you're migrating from Jekyll, remove any existing comment includes like `{% include comment.html %}` from your layouts. This Next.js template uses a React-based Giscus component instead.

1. **Visit [https://giscus.app/](https://giscus.app/)**

2. **Configure your settings on the giscus website:**
   - Enter your GitHub repository (must be public)
   - Make sure the giscus app is installed on your repository
   - Enable Discussions in your repository settings
   - Choose your preferred category (Announcements recommended)
   - Select your mapping option (pathname recommended)
   - Configure features (reactions, metadata, etc.)
   - Choose your theme and language

3. **Copy the generated script values**  
   The site will generate a `<script>` tag like this:
   
   ```html
   <script src="https://giscus.app/client.js"
           data-repo="username/repo"
           data-repo-id="R_xxxxx"
           data-category="Announcements"
           data-category-id="DIC_xxxxx"
           data-mapping="pathname"
           data-strict="0"
           data-reactions-enabled="1"
           data-emit-metadata="0"
           data-input-position="bottom"
           data-theme="preferred_color_scheme"
           data-lang="en"
           crossorigin="anonymous"
           async>
   </script>
   ```

4. **Update `blog.config.ts` with your values**  
   You **don't need to add the script tag** to your site. Instead, just update the giscus configuration in `blog.config.ts`:

   ```typescript
   giscus: {
     repo: "username/repo",              // from data-repo
     repoId: "R_xxxxx",                  // from data-repo-id
     category: "Announcements",          // from data-category
     categoryId: "DIC_xxxxx",            // from data-category-id
     mapping: "pathname",                // from data-mapping
     reactionsEnabled: true,             // true if data-reactions-enabled="1"
     emitMetadata: false,                // true if data-emit-metadata="1"
     inputPosition: "bottom",            // from data-input-position
     theme: "preferred_color_scheme",    // from data-theme
     lang: "en",                         // from data-lang
   },
   ```

5. **Enable comments in features**
   
   ```typescript
   features: {
     comments: true,  // Make sure this is true
     // ... other features
   },
   ```

That's it! Comments will now appear at the bottom of each blog post.

## Writing Posts

### Creating a New Post

1. Create a new `.md` file in `public/_posts/`:

```
public/_posts/my-new-post.md
```

2. Add frontmatter and content:

```markdown
---
title: "My New Post"
description: "A brief description for SEO"
date: "2024-12-15"
author: "john-doe"
tags: ["tag1", "tag2"]
image: "/images/posts/my-post.jpg"
imageAlt: "Description of the image"
featured: false
draft: false
layout: "default"
---

Your markdown content here...

## Heading

Paragraph text with **bold** and *italic*.

- List item 1
- List item 2

\`\`\`javascript
const code = "highlighted";
\`\`\`
```

### Frontmatter Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `title` | string | Yes | Post title |
| `description` | string | Yes | Brief description for SEO (< 160 chars) |
| `date` | string | Yes | Publication date (YYYY-MM-DD) |
| `author` | string | No | Author ID from `lib/authors.ts` |
| `tags` | string[] | No | Array of tags for categorization |
| `image` | string | No | Featured image path |
| `imageAlt` | string | No | Alt text for the image |
| `featured` | boolean | No | Show in featured section |
| `draft` | boolean | No | Hide from production build |
| `layout` | string | No | `"default"`, `"wide"`, or `"full"` |

### Post Layouts

- **default** - Standard reading width (max-w-3xl)
- **wide** - More space for images (max-w-4xl)
- **full** - Maximum width (max-w-6xl)

## Customization

### Styling with CSS Variables

Edit `app/globals.css` to change colors:

```css
:root {
  --color-primary: #2563eb;      /* Primary brand color */
  --color-primary-dark: #1d4ed8; /* Darker shade for hover */
  --color-bg: #ffffff;           /* Background color */
  --color-text: #1e293b;         /* Main text color */
  /* ... more variables */
}
```

### Dark Mode Colors

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0f172a;
    --color-text: #f1f5f9;
    /* ... more variables */
  }
}
```

### Tailwind CSS

The template uses Tailwind CSS v4. Modify components directly or add custom styles in `globals.css`.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables if needed
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import your repository on [Netlify](https://netlify.com)
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. For static export, uncomment in `next.config.ts`:
   ```typescript
   output: 'export',
   images: { unoptimized: true },
   ```

### Other Platforms

The template works with any platform that supports Next.js:
- AWS Amplify
- Railway
- Render
- Self-hosted

## Project Structure

```
├── app/
│   ├── about/
│   │   └── page.tsx          # About page
│   ├── blog/
│   │   ├── [slug]/
│   │   │   └── page.tsx      # Individual post page
│   │   ├── tag/
│   │   │   └── [tag]/
│   │   │       └── page.tsx  # Tag filter page
│   │   └── page.tsx          # Blog listing
│   ├── rss.xml/
│   │   └── route.ts          # RSS feed
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   ├── not-found.tsx         # 404 page
│   ├── page.tsx              # Homepage
│   ├── robots.ts             # robots.txt
│   └── sitemap.ts            # Sitemap
├── components/
│   ├── AuthorCard.tsx        # Author profile card
│   ├── Comments.tsx          # Giscus comments
│   ├── Footer.tsx            # Site footer
│   ├── Header.tsx            # Site header with nav
│   ├── Markdown.tsx          # Markdown renderer
│   └── PostCard.tsx          # Post preview card
├── lib/
│   ├── authors.ts            # Author data
│   ├── posts.ts              # Post utilities
│   ├── seo.ts                # SEO utilities
│   └── types.ts              # TypeScript types
├── public/
│   ├── _posts/               # Markdown posts
│   └── images/               # Static images
├── blog.config.ts            # Blog configuration
├── next.config.ts            # Next.js configuration
└── package.json
```

## SEO Features

### Automatic Meta Tags

Every page generates:
- Title and description
- OpenGraph tags (Facebook, LinkedIn)
- Twitter Card tags
- Canonical URL
- robots directives

### Default OG Image Support

The template automatically supports multiple image formats for the default OpenGraph image:
- `og-default.jpg` (preferred)
- `og-default.jpeg`
- `og-default.png`
- `og-default.webp`

Place your default OG image in `public/images/` with one of these names. The system will automatically use the available format.

### Schema.org Markup

Structured data for:
- `WebSite` - Homepage
- `BlogPosting` - Each post
- `BreadcrumbList` - Navigation
- `Person` - Authors

### Generated Files

- `/sitemap.xml` - Auto-generated sitemap
- `/robots.txt` - Search engine directives
- `/rss.xml` - RSS feed for subscribers

## Tips

### Images

- Place post images in `public/images/posts/`
- Place author avatars in `public/images/authors/`
- Recommended size for featured images: 1200x630px
- Use descriptive filenames for SEO

### Performance

- Images are automatically optimized by Next.js
- Code is automatically split per page
- Markdown is rendered at build time

### Writing

- Use descriptive titles (< 60 chars)
- Write compelling descriptions (< 160 chars)
- Add alt text to all images
- Use proper heading hierarchy (H1 > H2 > H3)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this template for any purpose.

## Support

If you have questions or need help:
- Open an issue on GitHub
- Check existing documentation
- Review the example posts

---

Built for my friend Amey Pathak using Next.js, Tailwind CSS, and TypeScript
