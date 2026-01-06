import { motion } from "framer-motion";

export default function ImageReveal({ src, alt, className }) {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        initial={{ y: 80, scale: 1.08, opacity: 0 }}
        whileInView={{ y: 0, scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1], // luxury easing
        }}
      />
    </div>
  );
}
