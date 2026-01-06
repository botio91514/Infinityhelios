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
  },
  {
    id: 5,
    name: "Solar Battery Storage System",
    description: "10kWh Lithium-Ion Battery | Smart Energy Management",
    fullDescription: "Advanced solar battery storage system with intelligent energy management. Store excess solar energy for use during peak hours or nighttime. Features smart monitoring and seamless integration with your solar system.",
    image: residential,
    price: 4999.99,
    originalPrice: 5999.99,
    specs: {
      capacity: "10kWh",
      type: "Lithium-Ion",
      warranty: "10 years",
      cycles: "6000+ cycles",
      efficiency: "95% round-trip",
      monitoring: "WiFi-enabled smart monitoring",
      dimensions: "600 x 400 x 200 mm",
      weight: "65 kg"
    },
    category: "Storage"
  },
  {
    id: 6,
    name: "Hybrid Solar Inverter",
    description: "5kW Hybrid Inverter | Battery Ready | Grid-Tie & Off-Grid",
    fullDescription: "Versatile hybrid solar inverter that works with or without batteries. Seamlessly switches between grid-tie and off-grid modes. Perfect for homes wanting to maximize solar energy usage and gain energy independence.",
    image: inverter,
    price: 1699.99,
    originalPrice: 1999.99,
    specs: {
      power: "5kW",
      type: "Hybrid (Grid-Tie + Off-Grid)",
      efficiency: "97.5%",
      batteryCompatible: "Yes (Lithium/Lead-Acid)",
      warranty: "10 years",
      monitoring: "Built-in WiFi + Mobile App",
      dimensions: "540 x 410 x 185 mm",
      weight: "32 kg"
    },
    category: "Inverter"
  },
  {
    id: 7,
    name: "Solar Mounting System",
    description: "Aluminum Rail Mounting | Universal Fit | Weatherproof",
    fullDescription: "Premium aluminum mounting system designed for durability and ease of installation. Suitable for all roof types including tile, metal, and flat roofs. Features corrosion-resistant materials and adjustable tilt angles.",
    image: commercial,
    price: 899.99,
    originalPrice: 1199.99,
    specs: {
      material: "Anodized Aluminum",
      roofTypes: "Tile, Metal, Flat, Concrete",
      loadCapacity: "5400N per rail",
      warranty: "25 years",
      installation: "Professional installation recommended",
      compatibility: "Universal - fits most panel sizes"
    },
    category: "Mounting"
  },
  {
    id: 8,
    name: "Solar Monitoring System",
    description: "Smart Energy Monitor | Real-Time Analytics | Mobile App",
    fullDescription: "Comprehensive solar monitoring system that tracks your system's performance in real-time. Monitor energy production, consumption, savings, and environmental impact from anywhere using the mobile app.",
    image: kit,
    price: 299.99,
    originalPrice: 399.99,
    specs: {
      monitoring: "Real-time energy tracking",
      connectivity: "WiFi & Ethernet",
      display: "7-inch touchscreen display",
      app: "iOS & Android mobile apps",
      warranty: "3 years",
      features: "Cloud storage, alerts, reporting"
    },
    category: "Monitoring"
  },
  {
    id: 9,
    name: "Commercial Solar Array 50kW",
    description: "Large-Scale Commercial System | 50kW Solar Farm Ready",
    fullDescription: "Complete commercial solar array solution for businesses and industrial facilities. Includes high-efficiency panels, commercial inverters, and professional installation. Designed for maximum ROI and energy production.",
    image: commercial,
    price: 34999.99,
    originalPrice: 44999.99,
    specs: {
      power: "50kW System",
      panels: "120 x 420W panels",
      inverter: "3 x 20kW commercial inverters",
      warranty: "25 years performance, 12 years product",
      installation: "Professional installation included",
      output: "60,000+ kWh/year"
    },
    category: "Commercial"
  },
  {
    id: 10,
    name: "Portable Solar Generator",
    description: "1000W Portable Power Station | Solar Panel Included",
    fullDescription: "Compact and powerful portable solar generator perfect for camping, RV trips, or emergency backup power. Includes foldable solar panels for on-the-go charging. Clean, quiet, and emission-free power anywhere.",
    image: residential,
    price: 1299.99,
    originalPrice: 1699.99,
    specs: {
      capacity: "1000Wh",
      output: "1000W (2000W surge)",
      solarInput: "200W solar panel included",
      outlets: "AC, DC, USB-C, USB-A",
      weight: "12 kg",
      warranty: "2 years"
    },
    category: "Portable"
  },
  {
    id: 11,
    name: "Solar Water Pump System",
    description: "Submersible Solar Pump | Off-Grid Water Solution",
    fullDescription: "Complete solar-powered water pumping system for wells, irrigation, and remote water access. No grid connection required. Features MPPT controller for maximum efficiency and automatic protection systems.",
    image: inverter,
    price: 899.99,
    originalPrice: 1199.99,
    specs: {
      flowRate: "Up to 15,000 L/day",
      headHeight: "Up to 100 meters",
      solarPower: "500W solar panel included",
      controller: "MPPT solar controller",
      warranty: "2 years",
      use: "Wells, irrigation, livestock watering"
    },
    category: "Pumps"
  },
  {
    id: 12,
    name: "Solar Street Light System",
    description: "LED Solar Street Light | Auto On/Off | Motion Sensor",
    fullDescription: "Energy-efficient solar street lighting system with integrated solar panel and battery. Features automatic dusk-to-dawn operation, motion sensing, and weatherproof design. Perfect for pathways, parking lots, and street lighting.",
    image: kit,
    price: 199.99,
    originalPrice: 299.99,
    specs: {
      brightness: "3000-6000 lumens",
      battery: "Lithium battery included",
      solarPanel: "40W integrated panel",
      runtime: "12+ hours (full night)",
      sensor: "Motion sensor & auto on/off",
      warranty: "3 years"
    },
    category: "Lighting"
  }
];

