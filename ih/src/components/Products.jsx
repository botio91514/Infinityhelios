import { products } from "../data/products";
import ProductCard from "./ProductCard";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

export default function Products() {
  return (
    <section className="py-20 px-8">
      <ScrollReveal>
        <h2 className="text-4xl font-bold text-center mb-12">
        Our <span className="text-solarGreen">Solar Solutions</span>
        </h2>
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.12}>
        {products.map((product, i) => (
          <StaggerItem key={i}>
          <ProductCard
            title={product.title}
            description={product.description}
            image={product.image}
          />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
