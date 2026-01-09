import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api/woocommerce";
import ScrollReveal from "./ScrollReveal";
import ProductCard from "./ProductCard"; // Re-using the premium card component
import { ArrowRight } from "lucide-react";
import LogoLoop from "./LogoLoop";

export default function ProductCatalog({ limit }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(limit ? res.slice(0, limit) : res);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [limit]);

  // Helper to strip HTML tags from description
  const stripHtml = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  // Prepare products for LogoLoop
  const loopItems = products.map(product => ({
    node: (
      <div className="w-[280px] h-[420px] select-none pointer-events-auto pb-4">
        <ProductCard
          id={product.id}
          title={product.name}
          description={stripHtml(product.short_description || product.description)}
          image={product.images?.[0]?.src}
          price={product.price}
          regular_price={product.regular_price}
          sale_price={product.sale_price}
        />
      </div>
    ),
    title: product.name,
    href: `/product/${product.id}`
  }));

  return (
    <section className="relative pt-0 pb-16 bg-white dark:bg-solarBlue overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-solarGreen/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-solarOrange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-main relative z-10">
        <ScrollReveal>
          <div className="mb-0 text-center max-w-4xl mx-auto">
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-solarGreen px-5 py-2 bg-solarGreen/10 rounded-full mb-6 inline-block">
              Premium Range
            </span>
            <h2 className="text-premium-h2 mb-2">
              State of the Art <span className="text-solarGreen text-glow">Solar Solutions</span>
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
              Engineered for efficiency, built for durability.
            </p>
          </div>
        </ScrollReveal>

        {/* Infinite Loop Container */}
        <div className="relative">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-6">
              <div className="w-16 h-16 border-4 border-solarGreen border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Synchronizing Catalog...</p>
            </div>
          ) : (
            <div className="-mt-16 pb-6">
              <LogoLoop
                logos={loopItems}
                speed={60}
                direction="left"
                logoHeight={420} // Compact height
                gap={24} // Balanced spacing
                hoverSpeed={0}
                scaleOnHover={false}
                fadeOut={true}
                fadeOutColor="transparent"
              />
            </div>
          )}
        </div>

        {limit && (
          <div className="mt-12 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-4 px-8 py-4 md:px-12 md:py-6 bg-slate-950 text-white rounded-[30px] font-black text-[11px] uppercase tracking-[0.3em] shadow-3xl hover:bg-solarGreen hover:text-solarBlue transition-all duration-500 hover:scale-105 active:scale-95 group"
            >
              Explore Full Collection
              <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
