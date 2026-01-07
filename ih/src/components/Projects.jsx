import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";
import { ArrowRight } from "lucide-react";

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
    <section className="section bg-slate-50 dark:bg-slate-900/50">
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
                <div className="h-56 bg-white/5 relative">
                  {/* Placeholder content if image fails */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.backgroundColor = '#1a1a1a'; }}
                  />
                </div>

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

        <div className="text-center mt-12">
          <Link to="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-solarGreen/30 text-solarGreen hover:bg-solarGreen hover:text-solarBlue transition-all font-bold uppercase tracking-widest text-xs"
            >
              View Case Studies <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
