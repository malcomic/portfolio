import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import aboutWorkspace from "@/assets/about-workspace.jpg";

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    { name: "HTML/CSS", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "UI/UX Design", level: 90 },
    { name: "Node.js", level: 75 },
    { name: "Mobile Development", level: 70 },
  ];

  const education = [
    {
      degree: "Master's in Computer Science",
      institution: "University Name",
      period: "2018 - 2020",
      description: "Specialized in Human-Computer Interaction and Web Technologies.",
    },
    {
      degree: "Bachelor's in Software Engineering",
      institution: "University Name",
      period: "2014 - 2018",
      description: "Graduated with honors. Focus on front-end development and design principles.",
    },
  ];

  const experience = [
    {
      title: "Senior Front-end Developer",
      company: "Tech Company Inc.",
      period: "2021 - Present",
      description: "Leading a team of developers to create responsive web applications.",
    },
    {
      title: "UI/UX Designer",
      company: "Creative Agency",
      period: "2019 - 2021",
      description: "Designed user interfaces for web and mobile applications.",
    },
  ];

  return (
    <section id="about" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground">Get to know me better</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={aboutWorkspace}
              alt="Developer workspace"
              className="w-full h-auto rounded-2xl card-shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">
              3+ Years Experience
            </div>
            <h3 className="text-3xl font-bold text-foreground">Who I Am</h3>
            <p className="text-muted-foreground leading-relaxed">
              I'm a passionate web developer and designer with over 3 years of experience creating
              digital products that users love. I specialize in front-end development with a strong
              focus on user experience and clean, efficient code.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs defaultValue="skills" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
            </TabsList>

            <TabsContent value="skills" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="education" className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="bg-card p-6 rounded-xl card-shadow"
                >
                  <h4 className="text-xl font-bold text-foreground mb-1">{edu.degree}</h4>
                  <p className="text-primary font-medium mb-2">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground mb-3">{edu.period}</p>
                  <p className="text-muted-foreground">{edu.description}</p>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="experience" className="space-y-6">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="bg-card p-6 rounded-xl card-shadow"
                >
                  <h4 className="text-xl font-bold text-foreground mb-1">{exp.title}</h4>
                  <p className="text-primary font-medium mb-2">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mb-3">{exp.period}</p>
                  <p className="text-muted-foreground">{exp.description}</p>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default About;