import React, { createContext, useContext, useState } from 'react'

const OrderContext = createContext()

// Helper function to format date as YYYY-MM-DD
const formatDate = (date) => {
  return date.toISOString().split('T')[0]
}

// Get current date and some recent dates for initial orders
const today = new Date()
const yesterday = new Date(today)
yesterday.setDate(yesterday.getDate() - 1)
const twoDaysAgo = new Date(today)
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)

// Helper function to calculate delivery date (5 days from order date)
const getDeliveryDate = (orderDate) => {
  const deliveryDate = new Date(orderDate)
  deliveryDate.setDate(deliveryDate.getDate() + 5)
  return formatDate(deliveryDate)
}

const initialOrders = [
  {
    id: 'ORD-1001',
    user: { name: 'Alice Smith', email: 'alice@example.com', phone: '555-1234' },
    address: '123 Main St, Springfield, USA',
    products: [
      { name: 'Wireless Headphones', quantity: 1, price: 99.99 },
      { name: 'T-Shirt', quantity: 2, price: 24.99 }
    ],
    total: 149.97,
    date: formatDate(twoDaysAgo),
    deliveryDate: getDeliveryDate(twoDaysAgo),
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
    date: formatDate(yesterday),
    deliveryDate: getDeliveryDate(yesterday),
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
    date: formatDate(today),
    deliveryDate: getDeliveryDate(today),
    status: 'Pending',
    payment: 'Failed'
  }
]

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(initialOrders)

  const updateOrder = (orderId, updatedFields) => {
    setOrders(orders => orders.map(order =>
      order.id === orderId ? { ...order, ...updatedFields } : order
    ))
  }

  // Add function to create new order with current date
  const createOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      date: formatDate(new Date()),
      deliveryDate: getDeliveryDate(new Date())
    }
    setOrders(orders => [...orders, newOrder])
    return newOrder
  }

  return (
    <OrderContext.Provider value={{ orders, updateOrder, createOrder, formatDate, getDeliveryDate }}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrders = () => {
  const context = useContext(OrderContext)
  if (!context) throw new Error('useOrders must be used within an OrderProvider')
  return context
} 