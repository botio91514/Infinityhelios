import { useState, useEffect } from "react";
import { getProducts } from "../api/woocommerce";
import ProductCard from "./ProductCard";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Helper to strip HTML tags from description
  const stripHtml = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <section className="py-20 px-8">
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-solarGreen border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.12}>
          {products.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard
                id={product.id}
                title={product.name}
                description={stripHtml(product.short_description || product.description)}
                image={product.images?.[0]?.src}
                price={product.price}
                regular_price={product.regular_price}
                sale_price={product.sale_price}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </section>
  );
}
