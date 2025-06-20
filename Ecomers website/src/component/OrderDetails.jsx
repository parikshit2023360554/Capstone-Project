import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useOrders } from '../context/OrderContext'

// Mock order data (should match EmployeeDashboard)
const ordersData = [
  {
    id: 'ORD-1001',
    user: { name: 'Alice Smith', email: 'alice@example.com', phone: '555-1234' },
    address: '123 Main St, Springfield, USA',
    products: [
      { name: 'Wireless Headphones', quantity: 1, price: 99.99 },
      { name: 'T-Shirt', quantity: 2, price: 24.99 }
    ],
    total: 149.97,
    date: '2024-06-01',
    deliveryDate: '2024-06-05',
    status: 'Delivered',
    payment: 'Paid'
  },
  {
    id: 'ORD-1002',
    user: { name: 'Bob Johnson', email: 'bob@example.com', phone: '555-5678' },
    address: '456 Oak Ave, Metropolis, USA',
    products: [
      { name: 'Smart Watch', quantity: 1, price: 199.99 }
    ],
    total: 199.99,
    date: '2024-06-02',
    deliveryDate: '2024-06-08',
    status: 'Shipped',
    payment: 'Pending'
  },
  {
    id: 'ORD-1003',
    user: { name: 'Carol Lee', email: 'carol@example.com', phone: '555-9012' },
    address: '789 Pine Rd, Gotham, USA',
    products: [
      { name: 'Laptop Stand', quantity: 1, price: 49.99 },
      { name: 'Jeans', quantity: 1, price: 79.99 }
    ],
    total: 129.98,
    date: '2024-06-03',
    deliveryDate: '2024-06-10',
    status: 'Pending',
    payment: 'Failed'
  }
]

function OrderDetails() {
  const { orderId } = useParams()
  const { darkMode } = useTheme()
  const { orders, updateOrder, formatDate, getDeliveryDate } = useOrders()
  const navigate = useNavigate()

  const order = orders.find(o => o.id === orderId)
  const [editOrder, setEditOrder] = useState(order ? { ...order, products: order.products.map(p => ({ ...p })) } : null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setEditOrder(order ? { ...order, products: order.products.map(p => ({ ...p })) } : null)
  }, [order])

  if (!order) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
          <button
            onClick={() => navigate('/employee-dashboard')}
            className="mt-2 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const handleChange = (field, value) => {
    if (field === 'deliveryDate') {
      // Ensure the delivery date is not before the order date
      const orderDate = new Date(editOrder.date)
      const newDeliveryDate = new Date(value)
      if (newDeliveryDate < orderDate) {
        alert('Delivery date cannot be before the order date')
        return
      }
    }
    setEditOrder(prev => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  const handleProductChange = (idx, field, value) => {
    setEditOrder(prev => {
      const products = prev.products.map((p, i) =>
        i === idx ? { ...p, [field]: field === 'quantity' ? Math.max(1, Number(value)) : value } : p
      )
      return { ...prev, products }
    })
    setSaved(false)
  }

  const handleRemoveProduct = (idx) => {
    setEditOrder(prev => {
      const products = prev.products.filter((_, i) => i !== idx)
      return { ...prev, products }
    })
    setSaved(false)
  }

  const handleSave = () => {
    // Recalculate total
    const total = editOrder.products.reduce((sum, p) => sum + p.price * p.quantity, 0)
    updateOrder(orderId, { ...editOrder, total })
    setSaved(true)
  }

  // Format the current date as YYYY-MM-DD for the min attribute of the delivery date input
  const today = formatDate(new Date())

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} py-10 px-4`}>
      <div className={`max-w-2xl mx-auto rounded-xl shadow-lg p-8 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <h2 className="text-3xl font-bold mb-6">Order Details</h2>
        {saved && <div className="mb-4 p-2 rounded bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200">Changes saved!</div>}
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Order ID:</span>
            <span className="font-mono">{editOrder.id}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Order Date:</span>
            <span>{editOrder.date}</span>
          </div>
          <div className="flex justify-between mb-2 items-center">
            <span className="font-semibold">Delivery Date:</span>
            <input
              type="date"
              value={editOrder.deliveryDate}
              min={editOrder.date} // Cannot be before order date
              onChange={e => handleChange('deliveryDate', e.target.value)}
              className={`w-48 rounded px-2 py-1 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
            />
          </div>
          <div className="flex justify-between mb-2 items-center">
            <span className="font-semibold">Status:</span>
            <select
              value={editOrder.status}
              onChange={e => handleChange('status', e.target.value)}
              className={`rounded px-2 py-1 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          <div className="flex justify-between mb-2 items-center">
            <span className="font-semibold">Payment Status:</span>
            <select
              value={editOrder.payment}
              onChange={e => handleChange('payment', e.target.value)}
              className={`rounded px-2 py-1 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
            >
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
          <div className="flex justify-between mb-2 items-center">
            <span className="font-semibold">Total Amount:</span>
            <span>${editOrder.products.reduce((sum, p) => sum + p.price * p.quantity, 0).toFixed(2)}</span>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Customer Info</h3>
          <div className="mb-1"><span className="font-medium">Name:</span> {editOrder.user.name}</div>
          <div className="mb-1"><span className="font-medium">Email:</span> {editOrder.user.email}</div>
          <div className="mb-1"><span className="font-medium">Phone:</span> {editOrder.user.phone}</div>
          <div className="mb-1 flex items-center"><span className="font-medium mr-2">Address:</span>
            <input
              type="text"
              value={editOrder.address}
              onChange={e => handleChange('address', e.target.value)}
              className={`flex-1 rounded px-2 py-1 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
            />
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Products</h3>
          <table className="min-w-full text-sm mb-2">
            <thead>
              <tr>
                <th className="px-2 py-1 text-left">Product</th>
                <th className="px-2 py-1 text-left">Quantity</th>
                <th className="px-2 py-1 text-left">Price</th>
                <th className="px-2 py-1 text-left">Subtotal</th>
                <th className="px-2 py-1 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {editOrder.products.map((p, idx) => (
                <tr key={idx}>
                  <td className="px-2 py-1">{p.name}</td>
                  <td className="px-2 py-1">
                    <input
                      type="number"
                      min={1}
                      value={p.quantity}
                      onChange={e => handleProductChange(idx, 'quantity', e.target.value)}
                      className={`w-16 rounded px-2 py-1 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                    />
                  </td>
                  <td className="px-2 py-1">${p.price.toFixed(2)}</td>
                  <td className="px-2 py-1">${(p.price * p.quantity).toFixed(2)}</td>
                  <td className="px-2 py-1">
                    <button
                      onClick={() => handleRemoveProduct(idx)}
                      className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Save Changes
          </button>
          <button
            onClick={() => navigate('/employee-dashboard')}
            className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails 