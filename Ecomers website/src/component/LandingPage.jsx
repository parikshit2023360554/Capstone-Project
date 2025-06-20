import React from 'react'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 flex flex-col">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-6 py-4 bg-white/80 shadow-md backdrop-blur-md sticky top-0 z-10">
        <div className="text-2xl font-bold text-indigo-700 cursor-pointer" onClick={() => navigate('/')}>ShopEase</div>
        <button
          onClick={() => navigate('/employee-login')}
          className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-full shadow hover:bg-indigo-700 transition"
        >
          Employee Login
        </button>
      </nav>
      {/* Hero Section */}
      <header className="flex-1 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-700 mb-4 drop-shadow-lg">
          Welcome to ShopEase
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 mb-8 max-w-2xl">
          Discover the best deals on electronics, clothing, books, and home essentials. Shop smart, shop easy, shop with us!
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-8 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition"
        >
          Shop Now
        </button>
      </header>

      {/* Features Section */}
      <section className="py-12 bg-white shadow-inner">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="flex flex-col items-center">
            <span className="text-indigo-600 text-4xl mb-2">🚚</span>
            <h3 className="text-xl font-bold mb-1 text-gray-900">Fast Delivery</h3>
            <p className="text-gray-600 text-center">Get your products delivered to your doorstep quickly and reliably.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-indigo-600 text-4xl mb-2">💳</span>
            <h3 className="text-xl font-bold mb-1 text-gray-900">Secure Payments</h3>
            <p className="text-gray-600 text-center">Shop with confidence using our secure and trusted payment options.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-indigo-600 text-4xl mb-2">⭐</span>
            <h3 className="text-xl font-bold mb-1 text-gray-900">Top Rated Products</h3>
            <p className="text-gray-600 text-center">Browse a curated selection of highly rated and reviewed products.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm mt-auto">
        &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
      </footer>
    </div>
  )
}

export default LandingPage 