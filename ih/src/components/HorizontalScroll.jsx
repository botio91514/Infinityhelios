import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HorizontalScroll({ items }) {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      {/* PINNED CONTAINER */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div
          style={{ x }}
          className="flex gap-12 px-24"
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="min-w-[80vw] md:min-w-[60vw] h-[70vh] rounded-3xl overflow-hidden shadow-xl bg-white"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
