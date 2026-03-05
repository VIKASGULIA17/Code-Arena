import React from 'react'
import { EnhancedNavbar } from '../../components/Navbar'

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedNavbar />
      <main className="relative">
        {children}
      </main>
    </div>
  )
}