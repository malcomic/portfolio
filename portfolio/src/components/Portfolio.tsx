import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
}

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce platform with payment integration, product management, and user authentication.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: "2",
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team features.",
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=600&fit=crop",
      technologies: ["React", "Firebase", "Tailwind CSS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: "3",
      title: "Portfolio Website",
      description: "A modern portfolio website with smooth animations and responsive design.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      technologies: ["React", "TypeScript", "Framer Motion"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
  ]);

  // TODO: Fetch projects from Firebase
  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     // Fetch from Firebase Firestore
  //   };
  //   fetchProjects();
  // }, []);

  return (
    <section id="portfolio" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">My Portfolio</h2>
          <p className="text-lg text-muted-foreground">Recent projects I've worked on</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl overflow-hidden card-shadow hover:card-shadow-lg transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button size="sm" className="flex-1" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;