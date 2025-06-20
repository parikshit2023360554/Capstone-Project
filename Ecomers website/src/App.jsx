import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'
import { OrderProvider } from './context/OrderContext'
import { AuthProvider } from './context/AuthContext'
import Login from './component/Login'
import EmployeeLogin from './component/EmployeeLogin'
import SignUp from './component/SignUp'
import Dashboard from './component/Dashboard'
import Cart from './component/Cart'
import ProductDetails from './component/ProductDetails'
import LandingPage from './component/LandingPage'
import Profile from './component/Profile'
import Settings from './component/Settings'
import EmployeeDashboard from './component/EmployeeDashboard'
import OrderDetails from './component/OrderDetails'

function App() {
  useEffect(() => {
    // No dark mode logic needed
  }, [])

  return (
    <ThemeProvider>
      <CartProvider>
        <OrderProvider>
          <AuthProvider>
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
                <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                <Route path="/employee-order/:orderId" element={<OrderDetails />} />
              </Routes>
            </Router>
          </AuthProvider>
        </OrderProvider>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
