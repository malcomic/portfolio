// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Progress } from "@/components/ui/progress";
// import { Award, Users, Coffee, Heart } from "lucide-react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import aboutWorkspace from "@/assets/about-workspace.jpg";
// import profileHero from "@/assets/profile-hero.jpg";

// const AboutPage = () => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   const skills = [
//     { name: "HTML/CSS", level: 95 },
//     { name: "JavaScript", level: 90 },
//     { name: "React", level: 85 },
//     { name: "TypeScript", level: 85 },
//     { name: "UI/UX Design", level: 90 },
//     { name: "Node.js", level: 75 },
//     { name: "Firebase", level: 80 },
//     { name: "Tailwind CSS", level: 95 },
//   ];

//   const education = [
//     {
//       degree: "Master's in Computer Science",
//       institution: "University Name",
//       period: "2018 - 2020",
//       description:
//         "Specialized in Human-Computer Interaction and Web Technologies. Completed advanced coursework in software architecture, distributed systems, and user experience design.",
//     },
//     {
//       degree: "Bachelor's in Software Engineering",
//       institution: "University Name",
//       period: "2014 - 2018",
//       description:
//         "Graduated with honors. Focus on front-end development and design principles. Active member of the coding club and participated in multiple hackathons.",
//     },
//   ];

//   const experience = [
//     {
//       title: "Senior Front-end Developer",
//       company: "Tech Company Inc.",
//       period: "2021 - Present",
//       description:
//         "Leading a team of 5 developers to create responsive web applications. Implementing modern React patterns, mentoring junior developers, and driving technical decisions for large-scale projects.",
//     },
//     {
//       title: "Full-stack Developer",
//       company: "Digital Solutions Ltd.",
//       period: "2020 - 2021",
//       description:
//         "Developed full-stack applications using React, Node.js, and MongoDB. Collaborated with designers and product managers to deliver high-quality features on schedule.",
//     },
//     {
//       title: "UI/UX Designer",
//       company: "Creative Agency",
//       period: "2019 - 2020",
//       description:
//         "Designed user interfaces for web and mobile applications. Conducted user research, created wireframes and prototypes, and worked closely with developers to implement designs.",
//     },
//   ];

//   const stats = [
//     { icon: Award, value: "50+", label: "Projects Completed" },
//     { icon: Users, value: "30+", label: "Happy Clients" },
//     { icon: Coffee, value: "1000+", label: "Cups of Coffee" },
//     { icon: Heart, value: "100%", label: "Passion" },
//   ];

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />

//       <main className="flex-1 pt-24 pb-20 px-4">
//         {/* Hero Section */}
//         <div className="container mx-auto max-w-6xl mb-20">
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-12"
//           >
//             <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About Me</h1>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               Learn more about my journey, skills, and what drives me to create exceptional digital
//               experiences
//             </p>
//           </motion.div>

//           {/* Profile Section */}
//           <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="relative"
//             >
//               <div className="relative w-full max-w-md mx-auto">
//                 <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
//                 <div className="relative bg-card rounded-3xl p-2 card-shadow-lg">
//                   <img
//                     src={profileHero}
//                     alt="Malcom Rono"
//                     className="w-full h-auto rounded-2xl"
//                   />
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               className="space-y-6"
//             >
//               <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">
//                 3+ Years Experience
//               </div>
//               <h2 className="text-3xl md:text-4xl font-bold text-foreground">
//                 Crafting Digital Experiences
//               </h2>
//               <p className="text-muted-foreground leading-relaxed">
//                 I'm a passionate web developer and designer with over 3 years of experience creating
//                 digital products that users love. I specialize in front-end development with a
//                 strong focus on user experience and clean, efficient code.
//               </p>
//               <p className="text-muted-foreground leading-relaxed">
//                 My approach combines technical expertise with creative problem-solving to build
//                 solutions that not only look great but also perform exceptionally well. I believe in
//                 writing maintainable code, following best practices, and continuously learning new
//                 technologies.
//               </p>
//             </motion.div>
//           </div>

//           {/* Stats Section */}
//           <motion.div
//             ref={ref}
//             initial={{ opacity: 0, y: 50 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6 }}
//             className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
//           >
//             {stats.map((stat, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={inView ? { opacity: 1, scale: 1 } : {}}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="bg-card p-6 rounded-xl card-shadow text-center"
//               >
//                 <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <stat.icon className="w-8 h-8 text-primary" />
//                 </div>
//                 <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
//                 <div className="text-sm text-muted-foreground">{stat.label}</div>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Skills, Education, Experience Tabs */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6, delay: 0.4 }}
//           >
//             <Tabs defaultValue="skills" className="w-full">
//               <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
//                 <TabsTrigger value="skills">Skills</TabsTrigger>
//                 <TabsTrigger value="education">Education</TabsTrigger>
//                 <TabsTrigger value="experience">Experience</TabsTrigger>
//               </TabsList>

//               <TabsContent value="skills" className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   {skills.map((skill, index) => (
//                     <motion.div
//                       key={skill.name}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={inView ? { opacity: 1, x: 0 } : {}}
//                       transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
//                       className="space-y-2"
//                     >
//                       <div className="flex justify-between items-center">
//                         <span className="font-medium text-foreground">{skill.name}</span>
//                         <span className="text-sm text-muted-foreground">{skill.level}%</span>
//                       </div>
//                       <Progress value={skill.level} className="h-2" />
//                     </motion.div>
//                   ))}
//                 </div>
//               </TabsContent>

//               <TabsContent value="education" className="space-y-6">
//                 {education.map((edu, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={inView ? { opacity: 1, y: 0 } : {}}
//                     transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
//                     className="bg-card p-6 rounded-xl card-shadow"
//                   >
//                     <h4 className="text-xl font-bold text-foreground mb-1">{edu.degree}</h4>
//                     <p className="text-primary font-medium mb-2">{edu.institution}</p>
//                     <p className="text-sm text-muted-foreground mb-3">{edu.period}</p>
//                     <p className="text-muted-foreground">{edu.description}</p>
//                   </motion.div>
//                 ))}
//               </TabsContent>

//               <TabsContent value="experience" className="space-y-6">
//                 {experience.map((exp, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={inView ? { opacity: 1, y: 0 } : {}}
//                     transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
//                     className="bg-card p-6 rounded-xl card-shadow"
//                   >
//                     <h4 className="text-xl font-bold text-foreground mb-1">{exp.title}</h4>
//                     <p className="text-primary font-medium mb-2">{exp.company}</p>
//                     <p className="text-sm text-muted-foreground mb-3">{exp.period}</p>
//                     <p className="text-muted-foreground">{exp.description}</p>
//                   </motion.div>
//                 ))}
//               </TabsContent>
//             </Tabs>
//           </motion.div>

//           {/* Why Work With Me Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6, delay: 0.6 }}
//             className="mt-20"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
//               Why Work With Me?
//             </h2>
//             <div className="grid md:grid-cols-3 gap-8">
//               <div className="bg-card p-6 rounded-xl card-shadow">
//                 <h3 className="text-xl font-bold text-foreground mb-3">Quality First</h3>
//                 <p className="text-muted-foreground">
//                   I'm committed to delivering high-quality work that exceeds expectations. Every
//                   line of code is written with care and attention to detail.
//                 </p>
//               </div>
//               <div className="bg-card p-6 rounded-xl card-shadow">
//                 <h3 className="text-xl font-bold text-foreground mb-3">Clear Communication</h3>
//                 <p className="text-muted-foreground">
//                   I believe in transparent communication throughout the project. You'll always know
//                   the status and be involved in important decisions.
//                 </p>
//               </div>
//               <div className="bg-card p-6 rounded-xl card-shadow">
//                 <h3 className="text-xl font-bold text-foreground mb-3">Continuous Support</h3>
//                 <p className="text-muted-foreground">
//                   My commitment doesn't end at delivery. I provide ongoing support and maintenance
//                   to ensure your project continues to succeed.
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default AboutPage;