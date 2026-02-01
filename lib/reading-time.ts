export function calculateReadingTime(content: string): string {
  // Remove markdown syntax and count words
  const text = content
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/`[^`]*`/g, "") // Remove inline code
    .replace(/#{1,6}\s/g, "") // Remove headers
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links but keep text
    .replace(/[*_~]/g, "") // Remove markdown formatting
    .replace(/---/g, ""); // Remove horizontal rules

  const words = text.trim().split(/\s+/).length;
  const wordsPerMinute = 200; // Average reading speed
  const minutes = Math.ceil(words / wordsPerMinute);

  return `${minutes} min read`;
}
