import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (

    <div className="absolute top-0 left-0 w-screen h-16 bg-slate-700 flex items-center justify-between px-6 shadow-lg">
      <Link to="/" className="text-white text-4xl font-bold italic  ">QF</Link>
      <nav className="flex space-x-6">
        <Link to="/quickFeedbacks" className="text-white hover:text-blue-500 transition">Quick Feedbacks</Link>
        <Link to="/Signup" className="text-white hover:text-blue-500 transition">Signup</Link>
        <Link to="/login" className="text-white hover:text-blue-500 transition">Login</Link>
      </nav>
    </div>
  )
}

export default Navbar

