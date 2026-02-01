import Link from "next/link";
import { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group bg-[var(--dark-blue)] border border-[var(--bright-blue)]/20 rounded-lg overflow-hidden hover:border-[var(--bright-blue)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--bright-blue)]/10">
      <Link href={`/blog/${post.slug}`} className="block p-6">
        <div className="flex flex-col gap-3">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono text-[var(--bright-blue)] bg-[var(--bright-blue)]/10 px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h2 className="font-mono text-2xl font-bold text-[var(--pure-white)] group-hover:text-[var(--bright-blue)] transition-colors">
            {post.title}
          </h2>

          {/* Description */}
          <p className="text-[var(--light-gray)] line-clamp-3">
            {post.description}
          </p>

          {/* Meta information */}
          <div className="flex items-center gap-4 text-sm text-[var(--medium-gray)] font-mono">
            <time dateTime={post.date}>{formattedDate}</time>
            <span>•</span>
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
