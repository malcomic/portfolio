import bcrypt from "bcryptjs";
import { prisma } from "../src/prisma";
async function main() {
    const adminEmail = (process.env.ADMIN_EMAIL ?? "admin@local.dev").toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
    const existingAdmin = await prisma.adminUser.findUnique({ where: { email: adminEmail } });
    if (!existingAdmin) {
        const passwordHash = await bcrypt.hash(adminPassword, 12);
        await prisma.adminUser.create({ data: { email: adminEmail, passwordHash } });
        console.log(`[seed] created admin user: ${adminEmail}`);
    }
    else {
        console.log(`[seed] admin user exists: ${adminEmail}`);
    }
    const existingProfile = await prisma.profile.findFirst();
    if (!existingProfile) {
        await prisma.profile.create({
            data: {
                heroHello: "Hello, I'm",
                heroName: "Malcom Rono",
                heroTitle: "Professional Web Developer",
                heroTagline: "I create beautiful, functional digital experiences that help businesses grow and succeed online.",
                bio: "I'm a passionate web developer and designer focused on building fast, accessible, and modern web products.",
                contactEmail: "malcom@example.com",
                socialLinks: [
                    { platform: "github", url: "https://github.com/" },
                    { platform: "linkedin", url: "https://www.linkedin.com/" },
                ],
                aboutSkills: [
                    { label: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
                    { label: "Backend", items: ["Node.js", "Express", "PostgreSQL"] },
                ],
                aboutEducation: [{ title: "Education", subtitle: "Add your education items in the admin panel" }],
                aboutExperience: [{ title: "Experience", subtitle: "Add your experience items in the admin panel" }],
            },
        });
        console.log("[seed] created profile");
    }
    const serviceCount = await prisma.service.count();
    if (serviceCount === 0) {
        await prisma.service.createMany({
            data: [
                {
                    title: "Web Development",
                    description: "Custom website development with modern technologies like React and Node.js.",
                    order: 0,
                },
                {
                    title: "Mobile Development",
                    description: "Cross-platform mobile apps using React Native for iOS and Android.",
                    order: 1,
                },
                {
                    title: "UI/UX Design",
                    description: "Beautiful, intuitive interfaces designed with users in mind.",
                    order: 2,
                },
                {
                    title: "SEO Optimization",
                    description: "Improve your website visibility and ranking on search engines.",
                    order: 3,
                },
            ],
        });
        console.log("[seed] created services");
    }
    const projectCount = await prisma.project.count();
    if (projectCount === 0) {
        await prisma.project.createMany({
            data: [
                {
                    title: "System Development",
                    slug: "system-development",
                    summary: "A full-stack system with authentication, dashboards, and reporting.",
                    techStack: ["PHP", "JavaScript", "PostgreSQL"],
                },
                {
                    title: "Fitness Mobile App",
                    slug: "fitness-mobile-app",
                    summary: "A fitness tracking app with workouts and progress analytics.",
                    techStack: ["React Native", "Firebase"],
                },
                {
                    title: "Travelling Website",
                    slug: "travelling-website",
                    summary: "A responsive travel site with destinations, booking CTA, and blog.",
                    techStack: ["HTML", "CSS", "JavaScript"],
                },
            ],
        });
        console.log("[seed] created projects");
    }
    const postCount = await prisma.post.count();
    if (postCount === 0) {
        await prisma.post.createMany({
            data: [
                {
                    title: "10 Tips for Better JavaScript Code",
                    slug: "10-tips-for-better-javascript-code",
                    excerpt: "Top tips for writing cleaner, more efficient JavaScript that’s easier to maintain and debug.",
                },
                {
                    title: "The Psychology of Color in Web Design",
                    slug: "psychology-of-color-in-web-design",
                    excerpt: "How color choices affect user experience and conversion, and how to pick the right palette.",
                },
                {
                    title: "How to Build a Successful Freelance Career",
                    slug: "build-a-successful-freelance-career",
                    excerpt: "Lessons learned over years of freelancing and practical advice to build sustainable work.",
                },
            ],
        });
        console.log("[seed] created posts");
    }
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
