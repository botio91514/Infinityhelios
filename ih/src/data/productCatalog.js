import residential from "../assets/products/residential.jpg";
import commercial from "../assets/products/commercial.jpg";
import inverter from "../assets/products/inverter.jpg";
import kit from "../assets/products/kit.jpg";

export const productCatalog = [
  {
    id: 1,
    name: "QCELLS Q.PEAK DUO M-G11S SERIES",
    description: "400 – 420 Wp | 108 Cells, 21.5% Maximum Module Efficiency",
    fullDescription: "High-performance monocrystalline solar panels with cutting-edge Q.ANTUM DUO Technology. Perfect for residential installations with maximum efficiency and durability. Features advanced half-cell technology for improved shade tolerance and higher power output.",
    image: residential,
    price: 79.99,
    originalPrice: 120.00,
    specs: {
      power: "400-420 Wp",
      cells: "108 Cells",
      efficiency: "21.5%",
      type: "Monocrystalline",
      warranty: "25 years linear power output, 12 years product warranty",
      dimensions: "2103 x 1048 x 30 mm",
      weight: "22.5 kg"
    },
    category: "Residential"
  },
  {
    id: 2,
    name: "QCELLS Q.PEAK DUO BLK-G9",
    description: "335-350 Wp | High-Efficiency Black Solar Panel",
    fullDescription: "Premium all-black solar panels with superior aesthetics and performance. Designed for residential rooftops where visual appeal matters as much as efficiency. Features advanced Q.ANTUM Technology for maximum energy yield.",
    image: commercial,
    price: 79.99,
    originalPrice: 100.00,
    specs: {
      power: "335-350 Wp",
      cells: "72 Cells",
      efficiency: "20.1%",
      type: "Monocrystalline Black",
      warranty: "25 years linear power output, 12 years product warranty",
      dimensions: "2016 x 1004 x 30 mm",
      weight: "19.2 kg"
    },
    category: "Residential"
  },
  {
    id: 3,
    name: "Commercial Solar Inverter System",
    description: "5kW - 10kW Three-Phase Inverter | Smart Grid Ready",
    fullDescription: "Advanced commercial-grade inverter system designed for large-scale installations. Features smart monitoring, grid-tie functionality, and high conversion efficiency. Ideal for businesses and industrial applications.",
    image: inverter,
    price: 1299.99,
    originalPrice: 1599.99,
    specs: {
      power: "5kW - 10kW",
      type: "Three-Phase Grid-Tie",
      efficiency: "98.5%",
      warranty: "10 years",
      monitoring: "Built-in WiFi monitoring",
      dimensions: "570 x 420 x 190 mm",
      weight: "28 kg"
    },
    category: "Commercial"
  },
  {
    id: 4,
    name: "Complete Solar Panel Kit",
    description: "All-in-One 5kW Solar System | Ready to Install",
    fullDescription: "Complete solar panel kit including panels, inverter, mounting system, and all necessary components. Perfect for DIY enthusiasts or professional installations. Everything you need in one package.",
    image: kit,
    price: 3499.99,
    originalPrice: 4499.99,
    specs: {
      power: "5kW System",
      panels: "12 x 420W panels",
      inverter: "5kW single-phase inverter included",
      warranty: "Full system warranty 25 years",
      installation: "DIY or professional installation available",
      components: "Panels, Inverter, Mounting, Cables, MC4 Connectors"
    },
    category: "Kit"
  }
];

