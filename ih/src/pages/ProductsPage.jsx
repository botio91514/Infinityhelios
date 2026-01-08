import Products from "../components/Products";

export default function ProductsPage() {
  return (
    <section className="section">
      <div className="container-main">
        <h1 className="text-4xl font-bold mb-6">
          Our <span className="text-solarGreen">Products & Solutions</span>
        </h1>

        <p className="max-w-2xl opacity-80 mb-12">
          We offer a comprehensive range of solar energy products designed
          to meet diverse energy requirements with maximum efficiency and durability.
        </p>

        <Products />
      </div>
    </section>
  );
}
