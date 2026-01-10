import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("[update] Deleting old projects...");
  await prisma.project.deleteMany({});
  
  console.log("[update] Adding GitHub projects...");
  await prisma.project.createMany({
    data: [
      {
        title: "Weather App",
        slug: "weather-app",
        summary: "A weather application handling API requests, managing loading and error states, with dynamic forms and rendering.",
        techStack: ["JavaScript", "API Integration", "HTML", "CSS"],
        repoUrl: "https://github.com/malcomic/Weather-App",
        publishedAt: new Date(),
      },
      {
        title: "Travelier",
        slug: "travelier",
        summary: "A beautiful and responsive travelling website showcasing destinations and travel experiences.",
        techStack: ["HTML", "CSS", "JavaScript"],
        repoUrl: "https://github.com/malcomic/travelier",
        publishedAt: new Date(),
      },
      {
        title: "EdTech Solution",
        slug: "edtech-solution",
        summary: "An educational technology platform providing real-time access for students and educators with interactive features.",
        techStack: ["HTML", "CSS", "JavaScript", "Education Platform"],
        repoUrl: "https://github.com/malcomic/edtechsolution",
        publishedAt: new Date(),
      },
      {
        title: "Paswsome Veterinary",
        slug: "paswsome",
        summary: "A veterinary website providing information and services for pet care and animal health.",
        techStack: ["HTML", "CSS", "JavaScript"],
        repoUrl: "https://github.com/malcomic/paswsome",
        publishedAt: new Date(),
      },
    ],
  });
  
  console.log("[update] ✅ Successfully updated projects!");
  
  const projects = await prisma.project.findMany();
  console.log(`[update] Total projects: ${projects.length}`);
  projects.forEach(p => console.log(`  - ${p.title}`));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

