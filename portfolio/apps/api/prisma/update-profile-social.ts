import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log('[update] Updating profile with social links...\n');
  
  const profile = await prisma.profile.findFirst();
  
  if (!profile) {
    console.log('No profile found. Creating one...');
    await prisma.profile.create({
      data: {
        heroHello: "Hello, I'm",
        heroName: "Malcom Rono",
        heroTitle: "Full-Stack Developer & Cybersecurity Professional",
        heroTagline: "I create innovative digital solutions with a focus on security, scalability, and modern design.",
        bio: "A passionate developer specializing in web technologies and cybersecurity. I enjoy solving complex problems and building secure, scalable applications that make a difference.",
        contactEmail: "contact@malcomrono.com",
        socialLinks: [
          {
            platform: "github",
            label: "GitHub",
            url: "https://github.com/malcomic"
          },
          {
            platform: "linkedin",
            label: "LinkedIn",
            url: "https://linkedin.com/in/malcolm-ronoh-68522a220"
          },
          {
            platform: "instagram",
            label: "Instagram",
            url: "https://www.instagram.com/thee_malcomic"
          },
          {
            platform: "twitter",
            label: "Twitter/X",
            url: "https://www.threads.net/@thee_malcomic"
          }
        ],
        aboutSkills: [],
        aboutEducation: [],
        aboutExperience: [],
      },
    });
  } else {
    // Update existing profile
    await prisma.profile.update({
      where: { id: profile.id },
      data: {
        socialLinks: [
          {
            platform: "github",
            label: "GitHub",
            url: "https://github.com/malcomic"
          },
          {
            platform: "linkedin",
            label: "LinkedIn",
            url: "https://linkedin.com/in/malcolm-ronoh-68522a220"
          },
          {
            platform: "instagram",
            label: "Instagram",
            url: "https://www.instagram.com/thee_malcomic"
          },
          {
            platform: "twitter",
            label: "Threads",
            url: "https://www.threads.net/@thee_malcomic"
          }
        ]
      }
    });
  }
  
  console.log('✅ Profile updated with social links!');
  
  const updatedProfile = await prisma.profile.findFirst();
  console.log('\n📱 Social Links:');
  (updatedProfile?.socialLinks as any[])?.forEach((link: any) => {
    console.log(`   ${link.platform}: ${link.url}`);
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

