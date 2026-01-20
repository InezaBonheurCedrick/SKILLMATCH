import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
const logo = "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768898807/Image_fx__69_-removebg-preview_jojp6n.png"

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isServicesOpen, setIsServicesOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer">
            <span className="text-2xl font-bold text-[#2a79ad] tracking-tight">
              <img src={logo} alt="SkillMatch Logo" className="h-25 w-auto" />
            </span>
          </Link>

          <div className="hidden md:flex space-x-8 items-center">
            <Link 
              to="/" 
              className={`${location.pathname === '/' ? 'text-[#2a79ad]' : 'text-gray-600'} hover:text-[#2a79ad] font-medium transition`}
            >
              Home
            </Link>
            
            <Link 
              to="/about" 
              className={`${location.pathname === '/about' ? 'text-[#2a79ad]' : 'text-gray-600'} hover:text-[#2a79ad] font-medium transition`}
            >
              About Us
            </Link>
            
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`flex items-center gap-1 font-medium transition focus:outline-none ${
                  location.pathname.includes('/services') ? 'text-[#2a79ad]' : 'text-gray-600 hover:text-[#2a79ad]'
                }`}
              >
                Services
                <svg className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isServicesOpen && (
                <div className="absolute left-0 mt-3 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link to="/business-services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#2a79ad]">
                    Businesses
                  </Link>
                  <Link to="/candidate-services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#2a79ad]">
                    Candidates
                  </Link>
                </div>
              )}
            </div>

            <Link to="/opportunities" className="text-gray-600 hover:text-[#2a79ad] font-medium transition">
              Job Opportunities
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="tel:+250788511511" className="text-gray-700 font-semibold flex items-center gap-2 hover:text-[#2a79ad] transition">
              {/* <span className="text-[#2a79ad]">+250 788 511 511</span>  */}
            </a>
            <Link to="/contact">
            <button className="bg-[#2a79ad] text-white px-6 py-2.5 font-medium hover:bg-[#2270a4] transition active:scale-95 cursor-pointer">
              Contact Us
            </button>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? <path d="M6 18L18 6M6 6l12 12" strokeWidth={2} /> : <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={2} />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-6 space-y-4">
          <Link to="/" className="block text-gray-600 font-medium">Home</Link>
          <Link to="/about" className="block text-gray-600 font-medium">About Us</Link>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase text-gray-400">Services</p>
            <Link to="/business-services" className="block pl-4 text-gray-600">Businesses</Link>
            <Link to="/candidate-services" className="block pl-4 text-gray-600">Candidates</Link>
          </div>
          <Link to="/opportunities" className="block text-gray-600 font-medium">Opportunities</Link>
          <div className="pt-4 border-t border-gray-100 space-y-4">
             {/* <a href="tel:+250788511511" className="block text-[#2a79ad] font-bold">+250 788 511 511</a> */}
             <Link to="/contact"><button className="w-full bg-[#2a79ad] text-white py-3 font-medium">Contact Us</button></Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;