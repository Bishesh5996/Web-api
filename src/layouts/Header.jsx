import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider'

export default function Header() {
  const { user, logout } = useContext(AuthContext)

  return (
    <header className="bg-purple-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <NavLink to="/" className="hover:text-yellow-300 transition-colors duration-200">MyApp</NavLink>
        </div>
        <nav className="space-x-4 text-lg">
          <NavLink 
            to="/" 
            className={({ isActive }) =>
              `hover:text-yellow-300 transition-colors duration-200 ${isActive ? 'underline' : ''}`
            }
          >
            Home
          </NavLink>
          
          {!user && (
            <>
              <NavLink 
                to="/login"
                className={({ isActive }) =>
                  `hover:text-yellow-300 transition-colors duration-200 ${isActive ? 'underline' : ''}`
                }
              >
                Login
              </NavLink>
              <NavLink 
                to="/register"
                className={({ isActive }) =>
                  `hover:text-yellow-300 transition-colors duration-200 ${isActive ? 'underline' : ''}`
                }
              >
                Register
              </NavLink>
            </>
          )}

          {user && (
            <>
              <span className="text-yellow-100">Welcome, {user.email}</span>
              <button 
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors duration-200"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
