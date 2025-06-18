import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Login from './component/Login'
import EmployeeLogin from './component/EmployeeLogin'
import SignUp from './component/SignUp'
import Dashboard from './component/Dashboard'
import Cart from './component/Cart'
import ProductDetails from './component/ProductDetails'

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/employee-login" element={<EmployeeLogin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
