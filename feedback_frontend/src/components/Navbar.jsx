import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem("token");
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-16 bg-slate-700 flex items-center justify-between px-6 shadow-lg z-50">
      <Link to="/" className="text-white text-4xl font-bold italic">QF</Link>
      <nav className="flex space-x-6">
        <Link to="/quickFeedbacks" className="text-white hover:text-blue-500 transition">
          Quick Feedbacks
        </Link>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-white border-none font-large no-underline hover:no-underline hover:text-blue-500 transition focus:outline-none active:outline-none"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/Signup" className="text-white hover:text-blue-500 transition">
              Signup
            </Link>
            <Link to="/login" className="text-white hover:text-blue-500 transition">
              Login
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
