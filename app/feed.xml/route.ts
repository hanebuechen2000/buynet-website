import { NextResponse } from "next/server";
import { getAllBlogPosts } from "@/lib/blog";

// Convert markdown to plain text for RSS (simple approach)
function markdownToPlainText(markdown: string): string {
  return markdown
    // Remove frontmatter if any leaked through
    .replace(/^---[\s\S]*?---/, "")
    // Remove headings but keep the text
    .replace(/^#{1,6}\s+/gm, "")
    // Remove emphasis markers
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    // Remove links but keep the text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Remove images
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "")
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    // Remove blockquotes
    .replace(/^>\s+/gm, "")
    // Remove list markers
    .replace(/^[\*\-\+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    // Remove horizontal rules
    .replace(/^[\-\*_]{3,}$/gm, "")
    // Clean up extra whitespace
    .replace(/\n\s*\n/g, "\n\n")
    .trim();
}

// Convert markdown to basic HTML for RSS
function markdownToHTML(markdown: string): string {
  let html = markdown
    // Remove frontmatter if any leaked through
    .replace(/^---[\s\S]*?---/, "")
    // Convert headings
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    // Convert bold and italic
    .replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\_\_\_(.*?)\_\_\_/g, "<strong><em>$1</em></strong>")
    .replace(/\_\_(.*?)\_\_/g, "<strong>$1</strong>")
    .replace(/\_(.*?)\_/g, "<em>$1</em>")
    // Convert links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Convert images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    // Convert code blocks (basic)
    .replace(/```([^\n]*)\n([\s\S]*?)```/g, "<pre><code>$2</code></pre>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // Convert blockquotes
    .replace(/^>\s+(.*)$/gm, "<blockquote>$1</blockquote>")
    // Convert unordered lists (simplified)
    .replace(/^\* (.*)$/gm, "<li>$1</li>")
    .replace(/^- (.*)$/gm, "<li>$1</li>")
    // Convert ordered lists (simplified)
    .replace(/^\d+\. (.*)$/gm, "<li>$1</li>")
    // Convert line breaks to paragraphs
    .split("\n\n")
    .map((para) => {
      para = para.trim();
      if (!para) return "";
      if (
        para.startsWith("<h") ||
        para.startsWith("<li>") ||
        para.startsWith("<pre>") ||
        para.startsWith("<blockquote>")
      ) {
        return para;
      }
      return `<p>${para}</p>`;
    })
    .join("\n");

  // Wrap consecutive list items in ul tags
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

  return html;
}

// Escape XML special characters
function escapeXML(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllBlogPosts();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://buynet.ai";

  // Generate RSS feed
  const rssItems = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();

      // Convert content to HTML for the feed
      const contentHtml = markdownToHTML(post.content);

      // Create a description (first 200 chars of plain text or use the description field)
      const description = post.description ||
        markdownToPlainText(post.content).slice(0, 200) + "...";

      return `    <item>
      <title>${escapeXML(post.title)}</title>
      <link>${escapeXML(postUrl)}</link>
      <guid isPermaLink="true">${escapeXML(postUrl)}</guid>
      <description>${escapeXML(description)}</description>
      <content:encoded><![CDATA[${contentHtml}]]></content:encoded>
      <dc:creator>${escapeXML(post.author)}</dc:creator>
      <pubDate>${pubDate}</pubDate>
      ${post.tags.map((tag) => `<category>${escapeXML(tag)}</category>`).join("\n      ")}
    </item>`;
    })
    .join("\n");

  const currentDate = new Date().toUTCString();

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>BuyNet Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Insights on AI agents, business automation, and the future of autonomous operations. Learn how BuyNet uses AI to market itself.</description>
    <language>en-us</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <generator>BuyNet RSS Generator</generator>
    <copyright>Copyright ${new Date().getFullYear()} BuyNet. All rights reserved.</copyright>
    <ttl>60</ttl>
${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
    },
  });
}
