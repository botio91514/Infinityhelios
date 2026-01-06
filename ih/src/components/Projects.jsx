import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

export default function Projects() {
  const projects = [
    {
      title: "Residential Solar Installation",
      location: "Gujarat, India",
      image: "/projects/project1.jpg",
    },
    {
      title: "Industrial Solar Plant",
      location: "Maharashtra, India",
      image: "/projects/project2.jpg",
    },
    {
      title: "Commercial Rooftop System",
      location: "Rajasthan, India",
      image: "/projects/project3.jpg",
    },
  ];

  return (
    <section className="section">
      <div className="container-main">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-center mb-12">
          Our <span className="text-solarGreen">Projects</span>
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
          {projects.map((project, i) => (
            <StaggerItem key={i}>
            <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="glass rounded-2xl overflow-hidden hover:glow-green transition duration-500"
            >
              <img
                src={project.image}
                alt={project.title}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="font-semibold text-lg">
                  {project.title}
                </h3>
                <p className="text-sm opacity-80 mt-1">
                  {project.location}
                </p>
              </div>
            </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
