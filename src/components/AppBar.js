import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/codebotlogo.png';

const AppBar = ({ scrollToFooter }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  
  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/5 backdrop-blur-lg' : 'bg-none'
      }`}
    >
      <div className="container mx-auto px-6 py-4  flex justify-between items-center">
        {/* Logo and Title */}
        <Link to={'/'} className="flex items-center space-x-3">
          <img
            src={logo}
            alt="AiPen Logo"
            className="w-8 h-8 md:w-10 md:h-10 object-contain"
          />
          <span className="text-2xl font-bold text-white">
            Code<span className="" style={{ color: "#7ed957" }}>Bot</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-white">
          <Link to="/" className="hover:text-green-500 transition">
            Home
          </Link>
          <Link to="/code-generator" className="hover:text-green-500 transition">
            Code Generator
          </Link>
          <Link to="/code-styles" className="hover:text-green-500 transition">
            Add Styles
          </Link>
          <Link to="/code-explain" className="hover:text-green-500 transition">
            Code Explainer 
          </Link>
          <Link to="/code-debug" className="hover:text-green-500 transition">
            Code Debugger 
          </Link>
          <button
            onClick={scrollToFooter}
            className="hover:text-green-500 transition"
          >
            About
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-blue-500 transition"
          onClick={toggleMobileMenu}
        >
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Mobile Menu */}
{isMobileMenuOpen && (
  <nav className="bg-gray-900 md:hidden flex flex-col items-center space-y-4 pb-4 pt-2 text-gray-700 border-t border-gray-200">
    <Link
      to="/"
      className="text-green-500 transition"
      onClick={toggleMobileMenu} // Close the menu on click
    >
      Home
    </Link>
    <Link
      to="/code-generator"
      className="text-green-500 transition"
      onClick={toggleMobileMenu} // Close the menu on click
    >
      Code Generator
    </Link>
    <Link
      to="/code-styles"
      className="text-green-500 transition"
      onClick={toggleMobileMenu} // Close the menu on click
    >
      Add Styles
    </Link>
    <Link
      to="/code-explain"
      className="text-green-500 transition"
      onClick={toggleMobileMenu} // Close the menu on click
    >
      Code Explainer
    </Link>
    <Link
      to="/code-debug"
      className="text-green-500 transition"
      onClick={toggleMobileMenu} // Close the menu on click
    >
      Code Debugger
    </Link>
    <button
      onClick={() => {
        scrollToFooter();
        toggleMobileMenu(); // Close the menu after scrolling
      }}
      className="text-green-500 transition"
    >
      About
    </button>
     </nav>
      )}
    </header>
  );
};

export default AppBar;