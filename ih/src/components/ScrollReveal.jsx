import { motion } from "framer-motion";

/**
 * Premium scroll reveal animation wrapper
 * Provides consistent, elegant fade-in and upward motion
 * Works when scrolling both up and down
 */
export default function ScrollReveal({ 
  children, 
  delay = 0, 
  className = "",
  yOffset = 24,
  duration = 1.2
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-120px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Apple/Stripe-style easing - calm and confident
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered container for animating children with delays
 * Works when scrolling both up and down
 */
export function StaggerContainer({ 
  children, 
  className = "",
  staggerDelay = 0.12,
  yOffset = 20
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered item for use inside StaggerContainer
 * Works when scrolling both up and down
 */
export function StaggerItem({ 
  children, 
  className = "",
  yOffset = 16,
  duration = 0.9
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            ease: [0.22, 1, 0.36, 1], // Calm, professional easing
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

