import { productCatalog } from "../data/productCatalog";
import ProductCard from "./ProductCard";

export default function Products({ products }) {
  const displayProducts = products || productCatalog;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {displayProducts.map((product) => {
        // Handle WooCommerce image vs Local Catalog image
        const image = product.images?.[0]?.src || product.image || "";

        // Strip HTML tags if present (common in WooCommerce)
        const rawDescription = product.short_description || product.description || "";
        const description = rawDescription.replace(/<[^>]+>/g, "");

        return (
          <div key={product.id}>
            <ProductCard
              id={product.id}
              title={product.name}
              description={description}
              image={image}
              price={product.price}
              regular_price={product.regular_price}
              sale_price={product.sale_price}
            />
          </div>
        );
      })}
    </div>
  );
}
