export const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    category: "Electronics",
    brand: "TechPro",
    rating: 4.8,
    reviews: 1247,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop"
    ],
    description: "Experience premium sound quality with our latest wireless headphones featuring noise cancellation and 30-hour battery life.",
    features: ["Noise Cancellation", "30h Battery", "Wireless", "Premium Sound"],
    inStock: true,
    stockCount: 45,
    colors: ["Black", "White", "Silver"],
    sizes: ["One Size"]
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    originalPrice: 249.99,
    category: "Wearables",
    brand: "FitTech",
    rating: 4.6,
    reviews: 892,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop"
    ],
    description: "Track your fitness goals with advanced health monitoring, GPS, and smart notifications.",
    features: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant", "Smart Notifications"],
    inStock: true,
    stockCount: 23,
    colors: ["Black", "Rose Gold", "Silver"],
    sizes: ["38mm", "42mm"]
  },
  {
    id: 3,
    name: "Designer Leather Jacket",
    price: 449.99,
    originalPrice: 599.99,
    category: "Fashion",
    brand: "StyleCraft",
    rating: 4.9,
    reviews: 567,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=500&h=500&fit=crop"
    ],
    description: "Handcrafted genuine leather jacket with premium finishing and modern design.",
    features: ["Genuine Leather", "Handcrafted", "Premium Quality", "Modern Design"],
    inStock: true,
    stockCount: 12,
    colors: ["Black", "Brown", "Tan"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 4,
    name: "Professional Camera Lens",
    price: 899.99,
    originalPrice: 1199.99,
    category: "Photography",
    brand: "LensMaster",
    rating: 4.7,
    reviews: 334,
    images: [
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=500&fit=crop"
    ],
    description: "Professional grade camera lens with superior optics and weather sealing.",
    features: ["Weather Sealed", "Superior Optics", "Professional Grade", "Image Stabilization"],
    inStock: true,
    stockCount: 8,
    colors: ["Black"],
    sizes: ["85mm f/1.4"]
  },
  {
    id: 5,
    name: "Luxury Skincare Set",
    price: 159.99,
    originalPrice: 199.99,
    category: "Beauty",
    brand: "GlowLux",
    rating: 4.5,
    reviews: 1123,
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=500&fit=crop"
    ],
    description: "Complete luxury skincare routine with premium ingredients and anti-aging properties.",
    features: ["Anti-Aging", "Premium Ingredients", "Complete Set", "Dermatologist Tested"],
    inStock: true,
    stockCount: 67,
    colors: ["Natural"],
    sizes: ["Full Size Set"]
  },
  {
    id: 6,
    name: "Gaming Mechanical Keyboard",
    price: 179.99,
    originalPrice: 229.99,
    category: "Gaming",
    brand: "GamePro",
    rating: 4.8,
    reviews: 2156,
    images: [
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=500&h=500&fit=crop"
    ],
    description: "Professional gaming keyboard with RGB lighting and mechanical switches.",
    features: ["RGB Lighting", "Mechanical Switches", "Gaming Optimized", "Programmable Keys"],
    inStock: true,
    stockCount: 34,
    colors: ["Black", "White"],
    sizes: ["Full Size", "Compact"]
  }
];

export const categories = [
  { id: 1, name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop" },
  { id: 2, name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop" },
  { id: 3, name: "Beauty", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop" },
  { id: 4, name: "Gaming", image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=200&fit=crop" },
  { id: 5, name: "Photography", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=200&fit=crop" },
  { id: 6, name: "Wearables", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop" }
];