import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { products } from "../data/products";

export default function HorizontalProducts() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // slower, calmer movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh] bg-white"
    >
      {/* INTRO */}
      <div className="h-screen flex flex-col justify-center px-24">
        <h2 className="text-5xl font-bold max-w-3xl">
          Solar solutions designed for
          <span className="text-solarGreen"> every scale</span>
        </h2>
        <p className="mt-6 max-w-xl text-lg text-gray-600">
          From residential rooftops to industrial solar plants, our products
          are engineered for performance, durability, and long-term value.
        </p>
      </div>

      {/* HORIZONTAL SCROLL */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex gap-16 px-24"
        >
          {products.map((product, i) => (
            <div
              key={i}
              className="
                min-w-[70vw] md:min-w-[50vw]
                h-[65vh]
                rounded-3xl
                overflow-hidden
                bg-gray-100
                shadow-2xl
                flex
              "
            >
              {/* IMAGE */}
              <img
                src={product.image}
                alt={product.title}
                className="w-1/2 h-full object-cover"
              />

              {/* CONTENT */}
              <div className="w-1/2 p-10 flex flex-col justify-center">
                <h3 className="text-3xl font-semibold">
                  {product.title}
                </h3>
                <p className="mt-4 text-gray-600">
                  {product.description}
                </p>

                <button className="mt-8 self-start px-6 py-3 rounded-full bg-solarGreen text-white font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
