import { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import BlogCard from "@/app/components/BlogCard";

export const metadata: Metadata = {
  title: "Blog | BuyNet",
  description:
    "Insights on AI agents, business automation, and the future of autonomous operations. Learn how BuyNet uses AI to market itself.",
  openGraph: {
    title: "Blog | BuyNet",
    description:
      "Insights on AI agents, business automation, and the future of autonomous operations.",
    type: "website",
    url: "https://buynet.ai/blog",
    images: [
      {
        url: "https://buynet.ai/images/blog-social-preview.png",
        width: 1200,
        height: 630,
        alt: "BuyNet Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | BuyNet",
    description:
      "Insights on AI agents, business automation, and the future of autonomous operations.",
    images: ["https://buynet.ai/images/blog-social-preview.png"],
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="min-h-screen bg-[var(--deep-navy)]">
      {/* Header */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-mono text-5xl md:text-6xl font-bold text-[var(--pure-white)] mb-6">
            Blog
          </h1>
          <p className="text-xl text-[var(--light-gray)] max-w-2xl">
            Insights on AI agents, business automation, and the future of
            autonomous operations. See how we use our own technology to run our
            marketing.
          </p>
        </div>
      </section>

      {/* Blog posts grid */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[var(--medium-gray)] text-lg">
                No blog posts yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid gap-8">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
