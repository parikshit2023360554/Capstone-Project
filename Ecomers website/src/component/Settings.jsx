import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Settings() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = React.useState(true)
  const { darkMode, setDarkMode } = useTheme()

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} flex flex-col items-center justify-center py-12 px-4`}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center`}>
        <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Settings</h2>
        <div className="w-full space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <span className={`${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Enable Notifications</span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications((prev) => !prev)}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className={`${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Dark Mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode((prev) => !prev)}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
          </div>
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

export default Settings 