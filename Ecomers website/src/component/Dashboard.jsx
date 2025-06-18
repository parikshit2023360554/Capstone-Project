import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getProductImage } from '../assets/images/products'

function Dashboard() {
  const navigate = useNavigate()
  const { addToCart, getCartCount } = useCart()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const handleLogout = () => {
    navigate('/')
  }

  const handleCartClick = () => {
    navigate('/cart')
  }

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
  }

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory('') // Clear filter if same category is clicked
    } else {
      setSelectedCategory(category)
    }
    setSearchTerm('') // Clear search when category is selected
  }

  const products = [
    { id: 1, name: 'Wireless Headphones', price: 99.99, category: 'Electronics' },
    { id: 2, name: 'Smart Watch', price: 199.99, category: 'Electronics' },
    { id: 3, name: 'Laptop Stand', price: 49.99, category: 'Electronics' },
    { id: 4, name: 'USB Cable', price: 19.99, category: 'Electronics' },
    { id: 5, name: 'Phone Case', price: 29.99, category: 'Electronics' },
    { id: 6, name: 'Bluetooth Speaker', price: 79.99, category: 'Electronics' },
    { id: 7, name: 'Power Bank', price: 39.99, category: 'Electronics' },
    { id: 8, name: 'Wireless Mouse', price: 59.99, category: 'Electronics' },
    { id: 9, name: 'T-Shirt', price: 24.99, category: 'Clothing' },
    { id: 10, name: 'Jeans', price: 79.99, category: 'Clothing' },
    { id: 11, name: 'Sneakers', price: 89.99, category: 'Clothing' },
    { id: 12, name: 'Hoodie', price: 59.99, category: 'Clothing' },
    { id: 13, name: 'React Programming Book', price: 34.99, category: 'Books' },
    { id: 14, name: 'JavaScript Guide', price: 29.99, category: 'Books' },
    { id: 15, name: 'Python Basics', price: 39.99, category: 'Books' },
    { id: 16, name: 'Web Development', price: 44.99, category: 'Books' },
    { id: 17, name: 'Coffee Maker', price: 129.99, category: 'Home & Kitchen' },
    { id: 18, name: 'Blender', price: 89.99, category: 'Home & Kitchen' },
    { id: 19, name: 'Toaster', price: 49.99, category: 'Home & Kitchen' },
    { id: 20, name: 'Microwave', price: 199.99, category: 'Home & Kitchen' }
  ]

  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen']

  // Filter products based on search term and selected category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
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
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
              <button 
                onClick={handleCartClick}
                className="relative p-2 text-gray-600 hover:text-indigo-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Info */}
        {(searchTerm || selectedCategory) && (
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">
              Showing {filteredProducts.length} results
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory && ` in ${selectedCategory}`}
            </p>
            <button
              onClick={clearFilters}
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Categories Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div 
                key={category} 
                onClick={() => handleCategoryClick(category)}
                className={`bg-white p-4 rounded-lg shadow hover:shadow-md transition-all cursor-pointer border-2 ${
                  selectedCategory === category 
                    ? 'border-indigo-500 bg-indigo-50' 
                    : 'border-transparent hover:border-indigo-200'
                }`}
              >
                <h3 className={`text-lg font-medium ${
                  selectedCategory === category ? 'text-indigo-600' : 'text-gray-900'
                }`}>
                  {category}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {products.filter(p => p.category === category).length} products
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {searchTerm || selectedCategory ? 'Filtered Products' : 'Featured Products'}
          </h2>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">
                {searchTerm 
                  ? `No products found for "${searchTerm}"`
                  : `No products found in ${selectedCategory}`
                }
              </p>
              <button
                onClick={clearFilters}
                className="mt-2 text-indigo-600 hover:text-indigo-500"
              >
                Clear filters and show all products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                  <div 
                    className="h-48 overflow-hidden cursor-pointer"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <img
                      src={getProductImage(product.id)}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 
                      className="text-lg font-medium text-gray-900 cursor-pointer hover:text-indigo-600"
                      onClick={() => handleProductClick(product.id)}
                    >
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                    <p className="mt-1 text-sm text-gray-500">${product.price}</p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddToCart(product)
                      }}
                      className="mt-2 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard