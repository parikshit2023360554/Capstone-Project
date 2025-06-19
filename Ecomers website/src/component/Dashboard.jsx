import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getProductImage } from '../assets/images/products'
import { useTheme } from '../context/ThemeContext'

function Dashboard() {
  const navigate = useNavigate()
  const { addToCart, getCartCount } = useCart()
  const { darkMode } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [minRating, setMinRating] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogin = () => {
    navigate('/login')
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
      setSelectedCategory('') 
    } else {
      setSelectedCategory(category)
    }
    setSearchTerm('') 
  }

  const handleLogout = () => {
    navigate('/login')
  }

  const products = [
    { id: 1, name: 'Wireless Headphones', price: 99.99, category: 'Electronics', rating: 4.5, reviews: 128 },
    { id: 2, name: 'Smart Watch', price: 199.99, category: 'Electronics', rating: 4.3, reviews: 89 },
    { id: 3, name: 'Laptop Stand', price: 49.99, category: 'Electronics', rating: 4.7, reviews: 156 },
    { id: 4, name: 'USB Cable', price: 19.99, category: 'Electronics', rating: 4.2, reviews: 234 },
    { id: 5, name: 'Phone Case', price: 29.99, category: 'Electronics', rating: 4.6, reviews: 189 },
    { id: 6, name: 'Bluetooth Speaker', price: 79.99, category: 'Electronics', rating: 4.4, reviews: 95 },
    { id: 7, name: 'Power Bank', price: 39.99, category: 'Electronics', rating: 4.1, reviews: 167 },
    { id: 8, name: 'Wireless Mouse', price: 59.99, category: 'Electronics', rating: 4.8, reviews: 203 },
    { id: 9, name: 'T-Shirt', price: 24.99, category: 'Clothing', rating: 4.0, reviews: 78 },
    { id: 10, name: 'Jeans', price: 79.99, category: 'Clothing', rating: 4.2, reviews: 112 },
    { id: 11, name: 'Sneakers', price: 89.99, category: 'Clothing', rating: 4.5, reviews: 145 },
    { id: 12, name: 'Hoodie', price: 59.99, category: 'Clothing', rating: 4.3, reviews: 98 },
    { id: 13, name: 'React Programming Book', price: 34.99, category: 'Books', rating: 4.6, reviews: 89 },
    { id: 14, name: 'JavaScript Guide', price: 29.99, category: 'Books', rating: 4.4, reviews: 156 },
    { id: 15, name: 'Python Basics', price: 39.99, category: 'Books', rating: 4.7, reviews: 134 },
    { id: 16, name: 'Web Development', price: 44.99, category: 'Books', rating: 4.5, reviews: 178 },
    { id: 17, name: 'Coffee Maker', price: 129.99, category: 'Home & Kitchen', rating: 4.8, reviews: 267 },
    { id: 18, name: 'Blender', price: 89.99, category: 'Home & Kitchen', rating: 4.3, reviews: 145 },
    { id: 19, name: 'Toaster', price: 49.99, category: 'Home & Kitchen', rating: 4.1, reviews: 89 },
    { id: 20, name: 'Microwave', price: 199.99, category: 'Home & Kitchen', rating: 4.6, reviews: 198 }
  ]

  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen']


  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    const matchesPriceRange = (!priceRange.min || product.price >= parseFloat(priceRange.min)) &&
                             (!priceRange.max || product.price <= parseFloat(priceRange.max))
    const matchesRating = product.rating >= minRating
    
    return matchesSearch && matchesCategory && matchesPriceRange && matchesRating
  })


  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'reviews':
        return b.reviews - a.reviews
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setSortBy('')
    setPriceRange({ min: '', max: '' })
    setMinRating(0)
  }

  const hasActiveFilters = searchTerm || selectedCategory || sortBy || priceRange.min || priceRange.max || minRating > 0

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Navigation Bar */}
      <nav className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>ShopEase</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-64 px-4 py-2 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className={`absolute right-2 top-2 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    ✕
                  </button>
                )}
              </div>
              <button 
                onClick={handleCartClick}
                className={`relative p-2 ${darkMode ? 'text-gray-200 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'}`}
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
              {/* User Icon with Dropdown */}
              <div className="relative">
                <span
                  className={`p-2 cursor-pointer ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}
                  onClick={() => setShowUserMenu((prev) => !prev)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                {showUserMenu && (
                  <div className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}> 
                    <button
                      className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${darkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700'}`}
                      onClick={() => { setShowUserMenu(false); navigate('/profile') }}
                    >
                      Profile
                    </button>
                    <button
                      className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${darkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700'}`}
                      onClick={() => { setShowUserMenu(false); navigate('/settings') }}
                    >
                      Settings
                    </button>
                    <button
                      className={`block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 ${darkMode ? 'dark:text-red-400 dark:hover:bg-red-500' : ''}`}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Info */}
        {hasActiveFilters && (
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">
              Showing {sortedProducts.length} results
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
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div 
                key={category} 
                onClick={() => handleCategoryClick(category)}
                className={`p-4 rounded-lg shadow hover:shadow-md transition-all cursor-pointer border-2 ${
                  selectedCategory === category 
                    ? `${darkMode ? 'border-indigo-500 bg-indigo-900' : 'border-indigo-500 bg-indigo-50'}`
                    : `${darkMode ? 'bg-gray-800 border-transparent hover:border-indigo-400' : 'bg-white border-transparent hover:border-indigo-200'}`
                }`}
              >
                <h3 className={`text-lg font-medium ${selectedCategory === category ? (darkMode ? 'text-indigo-400' : 'text-indigo-600') : (darkMode ? 'text-white' : 'text-gray-900')}`}>{category}</h3>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{products.filter(p => p.category === category).length} products</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Sort Section */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 text-sm font-medium rounded-md border ${darkMode ? 'text-gray-200 bg-gray-800 border-gray-700 hover:bg-gray-700' : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'}`}
              >
                {showFilters ? 'Hide' : 'Show'} Filters
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'}`}
              >
                <option value="">Sort by</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>{sortedProducts.length} products found</p>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className={`mt-4 rounded-lg shadow p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Range */}
                <div>
                  <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Price Range</h3>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                      className={`w-full px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'}`}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                      className={`w-full px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'}`}
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Minimum Rating</h3>
                  <div className="flex items-center space-x-2">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setMinRating(rating)}
                        className={`px-3 py-1 text-sm rounded-md ${minRating === rating ? 'bg-indigo-600 text-white' : (darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')}`}
                      >
                        {rating}+
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Price Filters */}
                <div>
                  <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Quick Price Filters</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: 'Under $50', min: 0, max: 50 },
                      { label: '$50 - $100', min: 50, max: 100 },
                      { label: '$100 - $200', min: 100, max: 200 },
                      { label: 'Over $200', min: 200, max: 1000 }
                    ].map((filter) => (
                      <button
                        key={filter.label}
                        onClick={() => setPriceRange({ min: filter.min.toString(), max: filter.max.toString() })}
                        className={`px-3 py-1 text-sm rounded-md ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Section */}
        <div>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{hasActiveFilters ? 'Filtered Products' : 'Featured Products'}</h2>
          {sortedProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{searchTerm ? `No products found for "${searchTerm}"` : selectedCategory ? `No products found in ${selectedCategory}` : 'No products match your filters'}</p>
              <button
                onClick={clearFilters}
                className={`mt-2 ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'}`}
              >
                Clear filters and show all products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <div key={product.id} className={`rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
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
                      className={`text-lg font-medium cursor-pointer hover:text-indigo-600 ${darkMode ? 'text-white hover:text-indigo-400' : 'text-gray-900'}`}
                      onClick={() => handleProductClick(product.id)}
                    >
                      {product.name}
                    </h3>
                    <p className={`text-sm mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{product.category}</p>
                    <div className="flex items-center justify-between mb-2">
                      <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>${product.price}</p>
                      <div className="flex items-center">
                        <span className="text-yellow-400 text-sm">★</span>
                        <span className={`text-sm ml-1 ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>{product.rating}</span>
                        <span className={`text-xs ml-1 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>({product.reviews})</span>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddToCart(product)
                      }}
                      className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${darkMode ? 'bg-indigo-700 hover:bg-indigo-800' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
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