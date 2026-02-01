import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllBlogSlugs, getBlogPost } from "@/lib/blog";
import { MDXComponents } from "@/app/components/MDXComponents";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://buynet.ai";
  const socialPreviewImage = `${siteUrl}/images/blog-social-preview.png`;

  return {
    title: `${post.title} | BuyNet Blog`,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url: `${siteUrl}/blog/${slug}`,
      images: [
        {
          url: socialPreviewImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [socialPreviewImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-[var(--deep-navy)]">
      {/* Back button */}
      <div className="py-6 px-4 border-b border-[var(--bright-blue)]/20">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[var(--bright-blue)] hover:text-[var(--pure-white)] transition-colors font-mono text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to blog
          </Link>
        </div>
      </div>

      {/* Article header */}
      <article className="py-12 px-4">
        <header className="max-w-3xl mx-auto mb-12">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono text-[var(--bright-blue)] bg-[var(--bright-blue)]/10 px-3 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="font-mono text-4xl md:text-5xl font-bold text-[var(--pure-white)] mb-6">
            {post.title}
          </h1>

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--medium-gray)] font-mono pb-6 border-b border-[var(--bright-blue)]/20">
            <time dateTime={post.date}>{formattedDate}</time>
            <span>•</span>
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
        </header>

        {/* Article content */}
        <div className="max-w-3xl mx-auto prose prose-invert prose-lg">
          <MDXRemote
            source={post.content}
            components={MDXComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
              },
            }}
          />
        </div>

        {/* Article footer */}
        <footer className="max-w-3xl mx-auto mt-16 pt-8 border-t border-[var(--bright-blue)]/20">
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="text-[var(--bright-blue)] hover:text-[var(--pure-white)] transition-colors font-mono text-sm"
            >
              ← Back to all posts
            </Link>
            <div className="flex gap-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  post.title
                )}&url=${encodeURIComponent(
                  `https://buynet.ai/blog/${slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--medium-gray)] hover:text-[var(--bright-blue)] transition-colors"
                aria-label="Share on Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}
