// Product images - you can replace these with your actual image URLs
export const productImages = {
  1: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop", // Wireless Headphones
  2: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop", // Smart Watch
  3: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop", // Laptop Stand
  4: "", // USB Cable
  5: "https://images.unsplash.com/photo-1603314585442-ee3b3c16fbcf?w=400&h=300&fit=crop", // Phone Case
  6: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop", // Bluetooth Speaker
  7: "https://images.unsplash.com/photo-1609592806596-b43bada2f4a2?w=400&h=300&fit=crop", // Power Bank
  8: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop", // Wireless Mouse
  9: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop", // T-Shirt
  10: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop", // Jeans
  11: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop", // Sneakers
  12: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop", // Hoodie
  13: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop", // React Programming Book
  14: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=300&fit=crop", // JavaScript Guide
  15: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop", // Python Basics
  16: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop", // Web Development
  17: "https://images.unsplash.com/photo-1570486916434-e5a8c5dce1a3?w=400&h=300&fit=crop", // Coffee Maker
  18: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop", // Blender
  19: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop", // Toaster
  20: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop" // Microwave
}

// Default image for products without specific images
export const defaultProductImage = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"

// Function to get product image
export const getProductImage = (productId) => {
  return productImages[productId] || defaultProductImage
} 