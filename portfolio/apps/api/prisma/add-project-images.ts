import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Generate placeholder images with different colors based on tech stack
function generateImageUrl(title: string, techStack: string[]): string {
  const colors: Record<string, { bg: string; fg: string }> = {
    'JavaScript': { bg: 'F7DF1E', fg: '000000' },
    'TypeScript': { bg: '3178C6', fg: 'FFFFFF' },
    'Python': { bg: '3776AB', fg: 'FFFFFF' },
    'PHP': { bg: '777BB4', fg: 'FFFFFF' },
    'HTML': { bg: 'E34F26', fg: 'FFFFFF' },
    'CSS': { bg: '1572B6', fg: 'FFFFFF' },
    'React': { bg: '61DAFB', fg: '000000' },
    'Vue': { bg: '4FC08D', fg: 'FFFFFF' },
    'Angular': { bg: 'DD0031', fg: 'FFFFFF' },
    'Node': { bg: '339933', fg: 'FFFFFF' },
    'Java': { bg: '007396', fg: 'FFFFFF' },
    'C++': { bg: '00599C', fg: 'FFFFFF' },
    'Ruby': { bg: 'CC342D', fg: 'FFFFFF' },
    'Go': { bg: '00ADD8', fg: 'FFFFFF' },
    'Rust': { bg: '000000', fg: 'FFFFFF' },
    'default': { bg: '0C1111', fg: '22C55E' }
  };

  // Find the primary tech from the stack
  const primaryTech = techStack[0] || 'Code';
  const colorScheme = colors[primaryTech] || colors['default'];
  
  // URL encode the title for the placeholder
  const encodedTitle = encodeURIComponent(title);
  
  // Use placeholder.com with custom colors
  return `https://via.placeholder.com/800x450/${colorScheme.bg}/${colorScheme.fg}?text=${encodedTitle}`;
}

// Alternative: Use Unsplash for more professional looking images
function generateUnsplashUrl(techStack: string[]): string {
  const keywords: Record<string, string> = {
    'JavaScript': 'javascript,code,programming',
    'TypeScript': 'typescript,code,developer',
    'Python': 'python,code,coding',
    'PHP': 'php,web,development',
    'HTML': 'web,design,html',
    'CSS': 'design,css,web',
    'React': 'react,web,app',
    'Vue': 'vue,javascript,web',
    'default': 'coding,computer,tech'
  };
  
  const primaryTech = techStack[0] || 'Code';
  const query = keywords[primaryTech] || keywords['default'];
  
  // Unsplash Source API - returns random images based on keywords
  return `https://source.unsplash.com/800x450/?${query}`;
}

async function main() {
  console.log('[images] Adding cover images to projects...\n');
  
  const projects = await prisma.project.findMany({
    where: {
      coverImageUrl: null
    }
  });
  
  console.log(`[images] Found ${projects.length} projects without images\n`);
  
  for (const project of projects) {
    // Use placeholder images (more reliable than Unsplash)
    const imageUrl = generateImageUrl(project.title, project.techStack);
    
    // Alternative: Use Unsplash for real photos
    // const imageUrl = generateUnsplashUrl(project.techStack);
    
    await prisma.project.update({
      where: { id: project.id },
      data: { coverImageUrl: imageUrl }
    });
    
    console.log(`  ✓ ${project.title}: ${imageUrl.substring(0, 80)}...`);
  }
  
  console.log(`\n✅ Successfully added images to ${projects.length} projects!`);
  
  // Show summary
  const allProjects = await prisma.project.findMany({
    select: { title: true, coverImageUrl: true }
  });
  
  const withImages = allProjects.filter(p => p.coverImageUrl).length;
  console.log(`\n📊 Summary: ${withImages}/${allProjects.length} projects have images`);
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

