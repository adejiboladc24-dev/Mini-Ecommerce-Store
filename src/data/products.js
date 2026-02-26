// Comprehensive product catalog for LuxeStore - 2026 Edition
// 50+ products per category: Electronics, Fashion, Kitchen, Sports

export const products = [
  // ELECTRONICS CATEGORY (50+ products)
  ...Array.from({ length: 55 }, (_, i) => {
    const electronicsProducts = [
      { name: "Premium Wireless Headphones Pro Max", price: 299.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop", desc: "Studio-grade wireless headphones with spatial audio, 40-hour battery, and premium leather cushions" },
      { name: "Smart Watch Ultra 2026", price: 599.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop", desc: "Advanced health monitoring, ECG, blood oxygen, GPS, and cellular connectivity" },
      { name: "4K Webcam Pro Studio", price: 249.99, image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=800&fit=crop", desc: "Professional streaming webcam with AI tracking, HDR, and studio-quality microphone" },
      { name: "Mechanical Keyboard RGB Elite", price: 189.99, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=800&fit=crop", desc: "Hot-swappable switches, per-key RGB, wireless connectivity, and aluminum frame" },
      { name: "Wireless Gaming Mouse Pro", price: 129.99, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop", desc: "20,000 DPI sensor, 100-hour battery, customizable buttons, and RGB lighting" },
      { name: "Portable Bluetooth Speaker Max", price: 149.99, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop", desc: "360° sound, waterproof, 24-hour battery, and bass boost technology" },
      { name: "USB-C Hub 12-in-1 Pro", price: 89.99, image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&h=800&fit=crop", desc: "Dual 4K HDMI, USB 3.2, SD/microSD, Ethernet, and 100W power delivery" },
      { name: "Laptop Stand Aluminum Pro", price: 79.99, image: "https://images.unsplash.com/photo-1625225233840-695456021cde?w=800&h=800&fit=crop", desc: "Adjustable height, cable management, cooling design, and premium finish" },
      { name: "Noise Cancelling Earbuds Pro", price: 229.99, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop", desc: "Active noise cancellation, transparency mode, wireless charging, 30-hour battery" },
      { name: "Wireless Charger 3-in-1", price: 69.99, image: "https://images.unsplash.com/photo-1591290619762-c588f7e8e86f?w=800&h=800&fit=crop", desc: "Charge phone, watch, and earbuds simultaneously with fast charging" },
      { name: "Smart Home Hub Pro", price: 179.99, image: "https://images.unsplash.com/photo-1558089687-e1c6e5b1e8f5?w=800&h=800&fit=crop", desc: "Control all smart devices, voice assistant, touchscreen display" },
      { name: "Ring Light LED Pro", price: 99.99, image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=800&fit=crop", desc: "Adjustable brightness, color temperature, phone holder, and tripod" },
      { name: "External SSD 2TB", price: 199.99, image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&h=800&fit=crop", desc: "Ultra-fast transfer speeds, compact design, USB-C, shock resistant" },
      { name: "Monitor 4K 32-inch", price: 499.99, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop", desc: "4K UHD, HDR10, 144Hz, USB-C connectivity, height adjustable" },
      { name: "Graphics Tablet Pro", price: 349.99, image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&h=800&fit=crop", desc: "8192 pressure levels, wireless pen, customizable buttons, large surface" },
    ];
    
    const product = electronicsProducts[i % electronicsProducts.length];
    return {
      id: i + 1,
      name: `${product.name} ${i > 14 ? `V${Math.floor(i/15) + 1}` : ''}`,
      price: product.price + (i * 5),
      category: "Electronics",
      image: product.image,
      description: product.desc,
      rating: 4.5 + (Math.random() * 0.5),
      reviews: 100 + Math.floor(Math.random() * 500),
      inStock: Math.random() > 0.1,
      featured: i < 6,
      images: [product.image],
      options: {
        colors: ["Black", "White", "Silver"],
        sizes: []
      }
    };
  }),

  // FASHION CATEGORY (50+ trending 2026 items)
  ...Array.from({ length: 55 }, (_, i) => {
    const fashionProducts = [
      { name: "Oversized Blazer 2026", price: 189.99, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop", desc: "Trending oversized fit, premium fabric, structured shoulders, modern cut" },
      { name: "Cargo Pants Utility", price: 129.99, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=800&fit=crop", desc: "Multi-pocket design, tapered fit, sustainable cotton, street style" },
      { name: "Puffer Jacket Cropped", price: 249.99, image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=800&fit=crop", desc: "Cropped silhouette, water-resistant, recycled materials, trending 2026" },
      { name: "Wide Leg Jeans", price: 149.99, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop", desc: "Y2K revival, high waist, premium denim, vintage wash" },
      { name: "Knit Cardigan Oversized", price: 119.99, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=800&fit=crop", desc: "Chunky knit, oversized fit, soft wool blend, cozy aesthetic" },
      { name: "Leather Jacket Biker", price: 399.99, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop", desc: "Genuine leather, asymmetric zip, quilted details, timeless style" },
      { name: "Maxi Dress Satin", price: 179.99, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=800&fit=crop", desc: "Flowing silhouette, luxe satin, adjustable straps, elegant drape" },
      { name: "Trench Coat Classic", price: 299.99, image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&h=800&fit=crop", desc: "Double-breasted, water-resistant, belted waist, timeless design" },
      { name: "Sneakers Platform", price: 159.99, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop", desc: "Chunky platform, premium leather, cushioned sole, trending style" },
      { name: "Sunglasses Oversized", price: 199.99, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop", desc: "Oversized frames, UV protection, polarized lenses, luxury finish" },
      { name: "Crossbody Bag Mini", price: 149.99, image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop", desc: "Compact design, chain strap, premium leather, multiple colors" },
      { name: "Bucket Hat Reversible", price: 49.99, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop", desc: "Two-in-one design, cotton canvas, adjustable fit, street style" },
      { name: "Ankle Boots Chelsea", price: 229.99, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=800&fit=crop", desc: "Elastic sides, leather upper, chunky sole, versatile style" },
      { name: "Turtleneck Ribbed", price: 89.99, image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800&h=800&fit=crop", desc: "Fitted silhouette, soft ribbed knit, layering essential, multiple colors" },
      { name: "Midi Skirt Pleated", price: 119.99, image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&h=800&fit=crop", desc: "Flowing pleats, elastic waist, versatile length, elegant movement" },
    ];
    
    const product = fashionProducts[i % fashionProducts.length];
    return {
      id: 55 + i + 1,
      name: `${product.name} ${i > 14 ? `Collection ${Math.floor(i/15) + 1}` : ''}`,
      price: product.price + (i * 3),
      category: "Fashion",
      image: product.image,
      description: product.desc,
      rating: 4.6 + (Math.random() * 0.4),
      reviews: 150 + Math.floor(Math.random() * 400),
      inStock: Math.random() > 0.05,
      featured: i < 8,
      images: [product.image],
      options: {
        colors: ["Black", "White", "Beige", "Navy"],
        sizes: ["XS", "S", "M", "L", "XL"]
      }
    };
  }),

  // KITCHEN CATEGORY (50+ products)
  ...Array.from({ length: 55 }, (_, i) => {
    const kitchenProducts = [
      { name: "Chef Knife Set Professional", price: 199.99, image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&h=800&fit=crop", desc: "8-piece set, German steel, ergonomic handles, wooden block included" },
      { name: "Cast Iron Skillet 12-inch", price: 79.99, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop", desc: "Pre-seasoned, even heat distribution, oven safe, lifetime durability" },
      { name: "Stainless Steel Cookware Set", price: 349.99, image: "https://images.unsplash.com/photo-1584990347449-39b4aa02d0f8?w=800&h=800&fit=crop", desc: "10-piece set, tri-ply construction, induction compatible, dishwasher safe" },
      { name: "Stand Mixer Professional", price: 399.99, image: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=800&h=800&fit=crop", desc: "6-quart capacity, 10 speeds, multiple attachments, powerful motor" },
      { name: "Blender High-Speed", price: 149.99, image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&h=800&fit=crop", desc: "2000W motor, self-cleaning, multiple programs, BPA-free pitcher" },
      { name: "Air Fryer XXL", price: 179.99, image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&h=800&fit=crop", desc: "8-quart capacity, digital controls, 8 presets, dishwasher safe basket" },
      { name: "Espresso Machine Automatic", price: 599.99, image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&h=800&fit=crop", desc: "Built-in grinder, milk frother, programmable, barista-quality coffee" },
      { name: "Food Processor 14-Cup", price: 229.99, image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&h=800&fit=crop", desc: "Multiple blades, large capacity, powerful motor, easy to clean" },
      { name: "Cutting Board Set Bamboo", price: 49.99, image: "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=800&h=800&fit=crop", desc: "3-piece set, eco-friendly bamboo, juice grooves, non-slip feet" },
      { name: "Mixing Bowl Set Stainless", price: 59.99, image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&h=800&fit=crop", desc: "5-piece nesting set, non-slip bases, measurement marks, dishwasher safe" },
      { name: "Dutch Oven Enameled 7-Qt", price: 249.99, image: "https://images.unsplash.com/photo-1584990347449-39b4aa0d0f8?w=800&h=800&fit=crop", desc: "Cast iron core, enamel coating, oven safe, perfect for braising" },
      { name: "Measuring Cups & Spoons Set", price: 29.99, image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&h=800&fit=crop", desc: "Stainless steel, engraved measurements, nesting design, magnetic storage" },
      { name: "Kitchen Scale Digital", price: 39.99, image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&h=800&fit=crop", desc: "Precise measurements, tare function, multiple units, sleek design" },
      { name: "Utensil Set Silicone", price: 69.99, image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&h=800&fit=crop", desc: "12-piece set, heat resistant, non-stick safe, stainless steel handles" },
      { name: "Baking Sheet Set", price: 44.99, image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&h=800&fit=crop", desc: "3-piece set, non-stick coating, warp resistant, easy to clean" },
    ];
    
    const product = kitchenProducts[i % kitchenProducts.length];
    return {
      id: 110 + i + 1,
      name: `${product.name} ${i > 14 ? `Pro ${Math.floor(i/15) + 1}` : ''}`,
      price: product.price + (i * 4),
      category: "Kitchen",
      image: product.image,
      description: product.desc,
      rating: 4.7 + (Math.random() * 0.3),
      reviews: 80 + Math.floor(Math.random() * 350),
      inStock: Math.random() > 0.08,
      featured: i < 5,
      images: [product.image],
      options: {
        colors: ["Stainless", "Black", "White"],
        sizes: []
      }
    };
  }),

  // SPORTS CATEGORY (50+ products)
  ...Array.from({ length: 55 }, (_, i) => {
    const sportsProducts = [
      { name: "Running Shoes Pro Elite", price: 179.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop", desc: "Carbon fiber plate, responsive cushioning, breathable mesh, race-ready" },
      { name: "Yoga Mat Premium Cork", price: 89.99, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop", desc: "Natural cork surface, eco-friendly, superior grip, 5mm thickness" },
      { name: "Resistance Bands Set Pro", price: 49.99, image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop", desc: "5 resistance levels, door anchor, handles, ankle straps, carry bag" },
      { name: "Dumbbells Adjustable Set", price: 299.99, image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop", desc: "5-52.5 lbs per dumbbell, quick adjustment, compact design, durable" },
      { name: "Fitness Tracker Advanced", price: 129.99, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&h=800&fit=crop", desc: "Heart rate, GPS, sleep tracking, waterproof, 10-day battery" },
      { name: "Foam Roller Vibrating", price: 79.99, image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop", desc: "4 vibration levels, rechargeable, deep tissue massage, portable" },
      { name: "Jump Rope Speed", price: 29.99, image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop", desc: "Ball bearing system, adjustable length, weighted handles, smooth rotation" },
      { name: "Kettlebell Cast Iron Set", price: 149.99, image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop", desc: "3-piece set (15, 25, 35 lbs), powder coated, wide handle, durable" },
      { name: "Exercise Ball Anti-Burst", price: 39.99, image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop", desc: "65cm diameter, 2000 lbs capacity, non-slip surface, pump included" },
      { name: "Pull-Up Bar Doorway", price: 59.99, image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop", desc: "No screws needed, padded grips, multiple grip positions, 300 lbs capacity" },
      { name: "Gym Bag Duffel Large", price: 69.99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop", desc: "Shoe compartment, water bottle holder, durable fabric, multiple pockets" },
      { name: "Protein Shaker Bottle", price: 19.99, image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop", desc: "28oz capacity, leak-proof, mixing ball, BPA-free, dishwasher safe" },
      { name: "Workout Gloves Pro", price: 34.99, image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop", desc: "Padded palms, wrist support, breathable, touchscreen compatible" },
      { name: "Ankle Weights Adjustable", price: 44.99, image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop", desc: "1-5 lbs per ankle, removable weights, comfortable fit, durable" },
      { name: "Balance Board Wooden", price: 89.99, image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop", desc: "Eco-friendly wood, anti-slip surface, core training, versatile use" },
    ];
    
    const product = sportsProducts[i % sportsProducts.length];
    return {
      id: 165 + i + 1,
      name: `${product.name} ${i > 14 ? `Edition ${Math.floor(i/15) + 1}` : ''}`,
      price: product.price + (i * 2.5),
      category: "Sports",
      image: product.image,
      description: product.desc,
      rating: 4.6 + (Math.random() * 0.4),
      reviews: 120 + Math.floor(Math.random() * 380),
      inStock: Math.random() > 0.07,
      featured: i < 4,
      images: [product.image],
      options: {
        colors: ["Black", "Blue", "Red"],
        sizes: ["S", "M", "L"]
      }
    };
  })
];

// Helper functions
export const getFeaturedProducts = () => products.filter(p => p.featured);

export const getProductsByCategory = (category) => 
  products.filter(p => p.category === category);

export const getCategories = () => 
  [...new Set(products.map(p => p.category))];

export const getProductById = (id) => 
  products.find(p => p.id === parseInt(id));

export const searchProducts = (query) => 
  products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

// Pagination helper
export const paginateProducts = (products, page = 1, perPage = 12) => {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return {
    products: products.slice(start, end),
    totalPages: Math.ceil(products.length / perPage),
    currentPage: page,
    totalProducts: products.length
  };
};
