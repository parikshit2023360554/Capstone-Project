import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'
import Login from './component/Login'
import EmployeeLogin from './component/EmployeeLogin'
import SignUp from './component/SignUp'
import Dashboard from './component/Dashboard'
import Cart from './component/Cart'
import ProductDetails from './component/ProductDetails'
import LandingPage from './component/LandingPage'
import Profile from './component/Profile'
import Settings from './component/Settings'

function App() {
  useEffect(() => {
    // No dark mode logic needed
  }, [])

  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/employee-login" element={<EmployeeLogin />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
