import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Profile() {
  const navigate = useNavigate()
  const { darkMode } = useTheme()

  // Placeholder user data
  const user = {
    username: 'john_doe',
    email: 'john@example.com',
    fullName: 'John Doe',
    joined: 'January 2024',
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} flex flex-col items-center justify-center py-12 px-4`}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center`}>
        <div className={`w-24 h-24 rounded-full ${darkMode ? 'bg-indigo-900' : 'bg-indigo-100'} flex items-center justify-center mb-4`}>
          <svg className={`w-16 h-16 ${darkMode ? 'text-indigo-300' : 'text-indigo-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.fullName}</h2>
        <p className={`${darkMode ? 'text-indigo-200' : 'text-gray-600'} mb-1`}>@{user.username}</p>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>{user.email}</p>
        <div className={`w-full border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} my-4`}></div>
        <div className="w-full text-left mb-4">
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}><span className="font-medium">Joined:</span> {user.joined}</p>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  )
}

export default Profile 