import React, { useState } from 'react';
import { Briefcase, Menu, X, User, Sun, Moon } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getNavLinkClass = ({ isActive }) => {
    return isActive 
      ? "text-indigo-600 dark:text-indigo-400 px-3 py-2 rounded-md font-medium transition-colors" 
      : "text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md font-medium transition-colors";
  };

  const getMobileNavLinkClass = ({ isActive }) => {
    return isActive
      ? "block px-3 py-2 rounded-md text-base font-medium text-indigo-700 bg-indigo-50 dark:text-indigo-300 dark:bg-indigo-900/30"
      : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700";
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 group" aria-label="CareerConnect Home">
              <div className="bg-indigo-600 text-white p-2 rounded-lg group-hover:bg-indigo-700 transition-colors">
                <Briefcase size={24} />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                Career<span className="text-indigo-600">Connect</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8" aria-label="Main Navigation">
            <NavLink to="/" className={getNavLinkClass} end>
              Find Jobs
            </NavLink>
            <NavLink to="/saved" className={getNavLinkClass}>
              Saved Jobs
            </NavLink>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 font-medium px-4 py-2 rounded-md transition-colors"
              aria-label="Log in to your account"
            >
              Log in
            </button>
            <button 
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all flex items-center gap-2 shadow-sm"
              aria-label="Create an account"
            >
              <User size={18} />
              <span>Sign up</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">{isMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
              {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700" id="mobile-menu">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3" aria-label="Mobile Navigation">
            <NavLink to="/" className={getMobileNavLinkClass} end onClick={() => setIsMenuOpen(false)}>
              Find Jobs
            </NavLink>
            <NavLink to="/saved" className={getMobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>
              Saved Jobs
            </NavLink>
          </nav>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-5 space-x-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="w-full text-center text-gray-700 dark:text-gray-300 font-medium px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                Log in
              </button>
              <button className="w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700">
                Sign up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
