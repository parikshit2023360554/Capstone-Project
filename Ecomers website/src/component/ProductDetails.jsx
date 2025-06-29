import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getProductImage } from '../assets/images/products'

function ProductDetails() {
  const navigate = useNavigate()
  const { productId } = useParams()
  const { addToCart, getCartCount } = useCart()
  const [quantity, setQuantity] = useState(1)

  // Product data - in a real app, this would come from an API
  const products = [
    { 
      id: 1, 
      name: 'Wireless Headphones', 
      price: 99.99, 
      category: 'Electronics',
      description: 'High-quality wireless headphones with noise cancellation technology. Perfect for music lovers and professionals who need clear audio without distractions.',
      features: [
        'Active Noise Cancellation',
        '40-hour battery life',
        'Bluetooth 5.0',
        'Built-in microphone',
        'Foldable design',
        'Comfortable ear cushions'
      ],
      specs: {
        'Brand': 'AudioTech',
        'Model': 'WH-2000',
        'Connectivity': 'Bluetooth 5.0',
        'Battery Life': '40 hours',
        'Weight': '250g',
        'Warranty': '2 years'
      },
      rating: 4.5,
      reviews: 128,
      inStock: true
    },
    { 
      id: 2, 
      name: 'Smart Watch', 
      price: 199.99, 
      category: 'Electronics',
      description: 'Advanced smartwatch with health monitoring, GPS tracking, and smartphone integration. Stay connected and track your fitness goals.',
      features: [
        'Heart rate monitor',
        'GPS tracking',
        'Water resistant',
        'Sleep tracking',
        'Music storage',
        'Notifications'
      ],
      specs: {
        'Brand': 'TechWear',
        'Model': 'SW-Pro',
        'Display': '1.4" AMOLED',
        'Battery Life': '7 days',
        'Water Resistance': '5ATM',
        'Warranty': '1 year'
      },
      rating: 4.3,
      reviews: 89,
      inStock: true
    },
    { 
      id: 3, 
      name: 'Laptop Stand', 
      price: 49.99, 
      category: 'Electronics',
      description: 'Adjustable laptop stand for ergonomic workspace setup. Reduces neck strain and improves posture during long work sessions.',
      features: [
        'Adjustable height',
        'Aluminum construction',
        'Non-slip base',
        'Cable management',
        'Portable design',
        'Universal compatibility'
      ],
      specs: {
        'Brand': 'ErgoTech',
        'Material': 'Aluminum',
        'Max Load': '15kg',
        'Height Range': '10-25cm',
        'Weight': '1.2kg',
        'Warranty': '1 year'
      },
      rating: 4.7,
      reviews: 156,
      inStock: true
    },
    { 
      id: 4, 
      name: 'USB Cable', 
      price: 19.99, 
      category: 'Electronics',
      description: 'High-speed USB-C cable for fast charging and data transfer. Compatible with all modern devices.',
      features: [
        'Fast charging',
        'Data transfer',
        'Durable design',
        'Universal compatibility',
        'Tangle-free',
        'Reinforced connectors'
      ],
      specs: {
        'Brand': 'CablePro',
        'Length': '1.5m',
        'Type': 'USB-C to USB-C',
        'Speed': '10Gbps',
        'Power': '100W',
        'Warranty': '6 months'
      },
      rating: 4.2,
      reviews: 234,
      inStock: true
    },
    { 
      id: 5, 
      name: 'Phone Case', 
      price: 29.99, 
      category: 'Electronics',
      description: 'Protective phone case with shock absorption and stylish design. Keeps your phone safe while looking great.',
      features: [
        'Shock absorption',
        'Raised edges',
        'Wireless charging compatible',
        'Anti-slip grip',
        'Camera protection',
        'Multiple colors'
      ],
      specs: {
        'Brand': 'CaseGuard',
        'Material': 'TPU + Polycarbonate',
        'Compatibility': 'iPhone 14 Pro',
        'Drop Protection': '6ft',
        'Weight': '45g',
        'Warranty': '1 year'
      },
      rating: 4.6,
      reviews: 189,
      inStock: true
    },
    { 
      id: 6, 
      name: 'Bluetooth Speaker', 
      price: 79.99, 
      category: 'Electronics',
      description: 'Portable Bluetooth speaker with premium sound quality and long battery life.',
      features: [
        '360° sound',
        'Waterproof design',
        '20-hour battery',
        'Bluetooth 5.0',
        'Built-in microphone',
        'Party mode'
      ],
      specs: {
        'Brand': 'SoundWave',
        'Power': '20W',
        'Battery': '20 hours',
        'Waterproof': 'IPX7',
        'Weight': '500g',
        'Warranty': '1 year'
      },
      rating: 4.4,
      reviews: 95,
      inStock: true
    },
    { 
      id: 7, 
      name: 'Power Bank', 
      price: 39.99, 
      category: 'Electronics',
      description: 'High-capacity power bank for charging multiple devices on the go.',
      features: [
        '20,000mAh capacity',
        'Fast charging',
        'Multiple ports',
        'LED indicator',
        'Compact design',
        'Universal compatibility'
      ],
      specs: {
        'Brand': 'PowerMax',
        'Capacity': '20,000mAh',
        'Output': '18W',
        'Ports': '3',
        'Weight': '350g',
        'Warranty': '1 year'
      },
      rating: 4.1,
      reviews: 167,
      inStock: true
    },
    { 
      id: 8, 
      name: 'Wireless Mouse', 
      price: 59.99, 
      category: 'Electronics',
      description: 'Ergonomic wireless mouse with precision tracking and customizable buttons.',
      features: [
        'Ergonomic design',
        'Precision sensor',
        'Programmable buttons',
        'Long battery life',
        'Silent clicks',
        'Multi-device support'
      ],
      specs: {
        'Brand': 'MouseTech',
        'DPI': '12,000',
        'Battery': '6 months',
        'Connectivity': '2.4GHz',
        'Weight': '95g',
        'Warranty': '2 years'
      },
      rating: 4.8,
      reviews: 203,
      inStock: true
    },
    { 
      id: 9, 
      name: 'T-Shirt', 
      price: 24.99, 
      category: 'Clothing',
      description: 'Comfortable cotton t-shirt with modern fit and stylish design.',
      features: [
        '100% cotton',
        'Modern fit',
        'Breathable fabric',
        'Multiple colors',
        'Machine washable',
        'Sustainable material'
      ],
      specs: {
        'Brand': 'StyleWear',
        'Material': '100% Cotton',
        'Fit': 'Modern',
        'Care': 'Machine wash',
        'Weight': '180g',
        'Warranty': '30 days'
      },
      rating: 4.0,
      reviews: 78,
      inStock: true
    },
    { 
      id: 10, 
      name: 'Jeans', 
      price: 79.99, 
      category: 'Clothing',
      description: 'Classic denim jeans with perfect fit and durable construction.',
      features: [
        'Premium denim',
        'Perfect fit',
        'Durable construction',
        'Multiple washes',
        'Stretch comfort',
        'Timeless style'
      ],
      specs: {
        'Brand': 'DenimCo',
        'Material': '98% Cotton, 2% Elastane',
        'Fit': 'Slim',
        'Care': 'Machine wash cold',
        'Weight': '400g',
        'Warranty': '30 days'
      },
      rating: 4.2,
      reviews: 112,
      inStock: true
    }
  ]

  const product = products.find(p => p.id === parseInt(productId))

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4)

  // If not enough products in same category, add some from other categories
  const additionalProducts = products
    .filter(p => p.id !== product.id && p.category !== product.category)
    .slice(0, 4 - relatedProducts.length)

  const allRelatedProducts = [...relatedProducts, ...additionalProducts].slice(0, 4)

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
    navigate('/cart')
  }

  const handleBackToDashboard = () => {
    navigate('/dashboard')
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleRelatedProductClick = (productId) => {
    navigate(`/product/${productId}`)
  }

  const handleAddRelatedToCart = (relatedProduct) => {
    addToCart(relatedProduct)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">ShopEase</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
                className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={getProductImage(product.id)}
                alt={product.name}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <span className="text-sm text-indigo-600 font-medium">{product.category}</span>
                <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-3xl font-bold text-gray-900">${product.price}</p>
                <p className="text-sm text-green-600 mt-1">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-600">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">Quantity:</label>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="px-3 py-1 text-gray-600 hover:text-indigo-600"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 border-x border-gray-300">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:text-indigo-600"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {product.inStock ? `Add ${quantity} to Cart - $${(product.price * quantity).toFixed(2)}` : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {allRelatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allRelatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                  <div 
                    className="h-48 overflow-hidden cursor-pointer"
                    onClick={() => handleRelatedProductClick(relatedProduct.id)}
                  >
                    <img
                      src={getProductImage(relatedProduct.id)}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 
                      className="text-lg font-medium text-gray-900 cursor-pointer hover:text-indigo-600"
                      onClick={() => handleRelatedProductClick(relatedProduct.id)}
                    >
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1">{relatedProduct.category}</p>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-900">${relatedProduct.price}</p>
                      <div className="flex items-center">
                        <span className="text-yellow-400 text-sm">★</span>
                        <span className="text-sm text-gray-600 ml-1">{relatedProduct.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({relatedProduct.reviews})</span>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddRelatedToCart(relatedProduct)
                      }}
                      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetails 