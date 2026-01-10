import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Generate themed blog post images based on title/topic
function generateBlogImageUrl(title: string, slug: string): string {
  // Map topics to appropriate keywords for images
  const topicKeywords: Record<string, string> = {
    'javascript': 'javascript,code,programming',
    'code': 'coding,developer,programming',
    'design': 'design,ui,ux',
    'web': 'web,development,internet',
    'career': 'career,business,professional',
    'freelance': 'freelance,work,business',
    'tips': 'tips,advice,learning',
    'tutorial': 'tutorial,learning,education',
    'guide': 'guide,howto,learning',
    'color': 'colors,design,art',
    'psychology': 'psychology,mind,brain',
    'default': 'technology,computer,digital'
  };
  
  // Find relevant topic from title
  const lowerTitle = title.toLowerCase();
  let topic = 'default';
  
  for (const [key, value] of Object.entries(topicKeywords)) {
    if (lowerTitle.includes(key) || slug.includes(key)) {
      topic = key;
      break;
    }
  }
  
  const keywords = topicKeywords[topic] || topicKeywords['default'];
  
  // Use Unsplash Source API for real, relevant images
  return `https://source.unsplash.com/800x500/?${keywords}`;
}

// Alternative: Use placeholder with themed colors
function generatePlaceholderUrl(title: string): string {
  const colors = [
    { bg: '6366F1', fg: 'FFFFFF' }, // Indigo
    { bg: 'EC4899', fg: 'FFFFFF' }, // Pink
    { bg: '8B5CF6', fg: 'FFFFFF' }, // Purple
    { bg: '06B6D4', fg: 'FFFFFF' }, // Cyan
    { bg: 'F59E0B', fg: 'FFFFFF' }, // Amber
    { bg: '10B981', fg: 'FFFFFF' }, // Emerald
  ];
  
  // Pick color based on title length
  const colorIndex = title.length % colors.length;
  const color = colors[colorIndex];
  
  const encodedTitle = encodeURIComponent(title.substring(0, 50));
  return `https://via.placeholder.com/800x500/${color.bg}/${color.fg}?text=${encodedTitle}`;
}

async function main() {
  console.log('[blog-images] Adding cover images to blog posts...\n');
  
  const posts = await prisma.post.findMany();
  
  console.log(`[blog-images] Found ${posts.length} blog posts\n`);
  
  // Add more engaging blog posts with publishedAt dates
  const additionalPosts = [
    {
      title: "Building Scalable Web Applications with React",
      slug: "building-scalable-web-apps-react",
      excerpt: "Learn the best practices and architectural patterns for building large-scale React applications that are maintainable and performant.",
      publishedAt: new Date('2024-01-15'),
    },
    {
      title: "Modern CSS Techniques You Should Know",
      slug: "modern-css-techniques",
      excerpt: "Explore the latest CSS features including Grid, Flexbox, Custom Properties, and Container Queries that will revolutionize your styling workflow.",
      publishedAt: new Date('2024-02-10'),
    },
    {
      title: "The Complete Guide to API Development",
      slug: "complete-guide-api-development",
      excerpt: "From REST to GraphQL, learn how to design, build, and document robust APIs that developers love to use.",
      publishedAt: new Date('2024-01-28'),
    },
    {
      title: "Cybersecurity Best Practices for Web Developers",
      slug: "cybersecurity-best-practices",
      excerpt: "Essential security measures every developer should implement to protect applications and user data from common vulnerabilities.",
      publishedAt: new Date('2024-02-20'),
    },
    {
      title: "Database Design Fundamentals",
      slug: "database-design-fundamentals",
      excerpt: "Master the principles of database normalization, indexing, and optimization to build efficient data storage solutions.",
      publishedAt: new Date('2024-01-05'),
    },
    {
      title: "Introduction to DevOps and CI/CD",
      slug: "intro-devops-cicd",
      excerpt: "Streamline your development workflow with continuous integration and deployment practices that save time and reduce errors.",
      publishedAt: new Date('2024-02-15'),
    },
  ];
  
  // Add new posts if they don't exist
  for (const postData of additionalPosts) {
    const existing = await prisma.post.findUnique({
      where: { slug: postData.slug }
    });
    
    if (!existing) {
      await prisma.post.create({ data: postData });
      console.log(`  + Created: ${postData.title}`);
    }
  }
  
  // Get all posts including new ones
  const allPosts = await prisma.post.findMany();
  
  // Add cover images to all posts
  for (const post of allPosts) {
    const imageUrl = generateBlogImageUrl(post.title, post.slug);
    
    await prisma.post.update({
      where: { id: post.id },
      data: { 
        coverImageUrl: imageUrl,
        publishedAt: post.publishedAt || new Date()
      }
    });
    
    console.log(`  ✓ ${post.title}`);
  }
  
  console.log(`\n✅ Successfully updated ${allPosts.length} blog posts!`);
  
  // Show summary
  const finalPosts = await prisma.post.findMany({
    orderBy: { publishedAt: 'desc' }
  });
  
  console.log(`\n📋 Blog Posts:`);
  finalPosts.forEach((p, i) => {
    const date = p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : 'Draft';
    console.log(`   ${i + 1}. ${p.title} (${date})`);
  });
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

