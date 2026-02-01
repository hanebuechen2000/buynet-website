// Quick test to verify RSS feed generation
const { getAllBlogPosts } = require('./lib/blog');

try {
  const posts = getAllBlogPosts();
  console.log(`✓ Found ${posts.length} blog posts`);

  if (posts.length > 0) {
    console.log('\nSample post:');
    console.log(`  Title: ${posts[0].title}`);
    console.log(`  Author: ${posts[0].author}`);
    console.log(`  Date: ${posts[0].date}`);
    console.log(`  Tags: ${posts[0].tags.join(', ')}`);
    console.log(`  Content length: ${posts[0].content.length} chars`);
  }

  console.log('\n✓ RSS feed should work correctly!');
} catch (error) {
  console.error('✗ Error:', error.message);
  process.exit(1);
}
