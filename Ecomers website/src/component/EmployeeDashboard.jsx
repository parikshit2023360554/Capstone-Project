import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { useOrders } from '../context/OrderContext'

// Mock order data
const initialOrders = [
  {
    id: 'ORD-1001',
    user: { name: 'Alice Smith', email: 'alice@example.com' },
    products: [
      { name: 'Wireless Headphones', quantity: 1 },
      { name: 'T-Shirt', quantity: 2 }
    ],
    total: 149.97,
    date: '2024-06-01',
    status: 'Delivered',
    payment: 'Paid'
  },
  {
    id: 'ORD-1002',
    user: { name: 'Bob Johnson', email: 'bob@example.com' },
    products: [
      { name: 'Smart Watch', quantity: 1 }
    ],
    total: 199.99,
    date: '2024-06-02',
    status: 'Shipped',
    payment: 'Pending'
  },
  {
    id: 'ORD-1003',
    user: { name: 'Carol Lee', email: 'carol@example.com' },
    products: [
      { name: 'Laptop Stand', quantity: 1 },
      { name: 'Jeans', quantity: 1 }
    ],
    total: 129.98,
    date: '2024-06-03',
    status: 'Pending',
    payment: 'Failed'
  }
]

function EmployeeDashboard() {
  const { darkMode } = useTheme()
  const { orders, updateOrder } = useOrders()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const navigate = useNavigate()

  // Calculate summary
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)

  // Handle status change
  const handleStatusChange = (orderId, newStatus) => {
    updateOrder(orderId, { status: newStatus })
  }

  const handleLogout = () => {
    navigate('/employee-login')
  }

  // Helper function to format date for display
  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Navigation Bar */}
      <nav className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>ShopEase Employee</h1>
            </div>
            <div className="flex items-center space-x-4">
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
      <div className={`max-w-7xl mx-auto p-8 mt-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Employee Dashboard - Orders</h2>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}>
            <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
            <p className="text-3xl font-bold">{totalOrders}</p>
          </div>
          <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}>
            <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-200' : 'text-gray-500'} uppercase tracking-wider`}>Order ID</th>
                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-200' : 'text-gray-500'} uppercase tracking-wider`}>Customer</th>
                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-200' : 'text-gray-500'} uppercase tracking-wider`}>Order Date</th>
                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-200' : 'text-gray-500'} uppercase tracking-wider`}>Delivery Date</th>
                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-200' : 'text-gray-500'} uppercase tracking-wider`}>Total</th>
                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-200' : 'text-gray-500'} uppercase tracking-wider`}>Status</th>
                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-200' : 'text-gray-500'} uppercase tracking-wider`}>Payment</th>
                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-200' : 'text-gray-500'} uppercase tracking-wider`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-gray-600' : 'divide-gray-200'}`}>
              {orders.map((order) => (
                <tr key={order.id} className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{order.id}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-200' : 'text-gray-500'}`}>
                    <div>{order.user.name}</div>
                    <div className="text-xs opacity-75">{order.user.email}</div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-200' : 'text-gray-500'}`}>
                    {formatDisplayDate(order.date)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-200' : 'text-gray-500'}`}>
                    {formatDisplayDate(order.deliveryDate)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-200' : 'text-gray-500'}`}>
                    ${order.total.toFixed(2)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm`}>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`rounded-md text-sm ${
                        darkMode 
                          ? 'bg-gray-700 text-white border-gray-600' 
                          : 'bg-white text-gray-900 border-gray-300'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm`}>
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.payment === 'Paid'
                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                        : order.payment === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                        : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                    }`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500`}>
                    <button
                      onClick={() => navigate(`/employee-order/${order.id}`)}
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard 