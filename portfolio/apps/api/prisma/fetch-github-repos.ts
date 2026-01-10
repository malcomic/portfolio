import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  fork: boolean;
}

async function fetchAllGitHubRepos(username: string): Promise<GitHubRepo[]> {
  let page = 1;
  let allRepos: GitHubRepo[] = [];
  
  console.log(`[github] Fetching repositories for ${username}...`);
  
  while (true) {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&page=${page}&sort=updated`,
      {
        headers: {
          'Accept': 'application/vnd.github+json',
          'User-Agent': 'Portfolio-App'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    
    const repos: GitHubRepo[] = await response.json();
    
    if (repos.length === 0) break;
    
    allRepos = allRepos.concat(repos);
    console.log(`[github] Fetched page ${page}: ${repos.length} repos`);
    
    if (repos.length < 100) break;
    page++;
  }
  
  return allRepos;
}

function generateSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function extractTechStack(repo: GitHubRepo): string[] {
  const stack: string[] = [];
  
  // Add primary language
  if (repo.language) {
    stack.push(repo.language);
  }
  
  // Add topics (GitHub tags)
  if (repo.topics && repo.topics.length > 0) {
    stack.push(...repo.topics.map(t => 
      t.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    ));
  }
  
  return stack.length > 0 ? stack : ['Code'];
}

async function main() {
  const username = 'malcomic';
  
  try {
    // Fetch all repos from GitHub
    const repos = await fetchAllGitHubRepos(username);
    
    // Filter out forks if desired (optional)
    const ownRepos = repos.filter(repo => !repo.fork);
    
    console.log(`\n[github] Found ${repos.length} total repositories`);
    console.log(`[github] Found ${ownRepos.length} non-fork repositories\n`);
    
    // Delete existing projects
    console.log('[db] Deleting existing projects...');
    await prisma.project.deleteMany({});
    
    // Convert GitHub repos to project data
    const projectsData = ownRepos.map(repo => ({
      title: repo.name.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      slug: generateSlug(repo.name),
      summary: repo.description || `A ${repo.language || 'software'} project showcasing development skills and problem-solving abilities.`,
      techStack: extractTechStack(repo),
      repoUrl: repo.html_url,
      liveUrl: repo.homepage || null,
      publishedAt: new Date(repo.updated_at),
    }));
    
    // Create projects in batches to avoid issues
    console.log('[db] Adding projects to database...');
    for (const project of projectsData) {
      try {
        await prisma.project.create({ data: project });
        console.log(`  ✓ Added: ${project.title}`);
      } catch (error) {
        console.error(`  ✗ Failed to add ${project.title}:`, error);
      }
    }
    
    console.log(`\n✅ Successfully added ${projectsData.length} projects!`);
    
    // Display summary
    const finalCount = await prisma.project.count();
    console.log(`\n📊 Portfolio Summary:`);
    console.log(`   Total projects: ${finalCount}`);
    
    const projects = await prisma.project.findMany({
      select: { title: true, techStack: true },
      orderBy: { publishedAt: 'desc' }
    });
    
    console.log(`\n📋 Projects added:`);
    projects.forEach((p, i) => {
      console.log(`   ${i + 1}. ${p.title} [${p.techStack.slice(0, 3).join(', ')}]`);
    });
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

