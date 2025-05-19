"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [registrationDropdownOpen, setRegistrationDropdownOpen] =
    useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Animation phrases
  const animatedPhrases = [
    "LET'S GO!!!",
    "WE ARE!",
    "CZSIANS!!",
    "Win or Win!",
    "GLORY!!",
  ];

  // Text animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(
        (prevIndex) => (prevIndex + 1) % animatedPhrases.length
      );
    }, 3000); // Change text every n seconds

    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setRegistrationDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        event.target.id !== "mobile-menu-button"
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigation links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Teams", path: "/teams" },
    {
      name: "Registration",
      path: "#",
      dropdown: true,
      dropdownItems: [
        { name: "Team Registration", path: "/team-registration" },
        { name: "Player Registration", path: "/player-registration" },
        { name: "Team Customization", path: "/team-customization" }
      ],
    },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="w-full bg-gradient-to-br from-blue-50 to-white mt-2 p-2">
      <div className="container mx-auto px-3 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and animated text */}
          <div className="flex items-center space-x-3">
            <img src="/assets/logos/scup.png" alt="Logo" className="h-10" />
            <div className="animated-text-container overflow-hidden h-8">
              <div
                className="text-sky-600 font-bold text-lg transition-all duration-500 animate-typing py-1"
                style={{ opacity: 1 }}
              >
                {animatedPhrases[currentTextIndex]}
              </div>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center">
            <ul className="flex items-center space-x-6">
              {navLinks.map((link, index) => (
                <li key={index} className="relative">
                  {link.dropdown ? (
                    <div ref={dropdownRef}>
                      <button
                        onClick={() =>
                          setRegistrationDropdownOpen(!registrationDropdownOpen)
                        }
                        className="hover:text-blue-500 font-sans font-semibold text-black flex items-center"
                      >
                        {link.name}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {/* Dropdown menu */}
                      {registrationDropdownOpen && (
                        <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md py-2 mt-1 z-20">
                          {link.dropdownItems.map((item, idx) => (
                            <Link href={item.path} key={idx}>
                              <div
                                className="px-4 py-2 hover:bg-gray-100 font-sans text-black cursor-pointer"
                                onClick={() =>
                                  setRegistrationDropdownOpen(false)
                                }
                              >
                                {item.name}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link href={link.path}>
                      <div className="hover:text-blue-500 font-sans font-semibold text-black">
                        {link.name}
                      </div>
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Admin Login Button */}
            <Link href="http://localhost:3000/admin/login">
              <button className="ml-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Admin Login
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            id="mobile-menu-button"
            className="md:hidden text-gray-600 hover:text-blue-500 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile sidebar menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-30 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <div className="flex items-center space-x-2">
            <img src="/assets/logos/scup.png" alt="Logo" className="h-8" />
            <div className="text-blue-600 font-bold text-sm">
              {animatedPhrases[currentTextIndex]}
            </div>
          </div>
          <button
            className="text-gray-600 hover:text-blue-500"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="py-4">
          {navLinks.map((link, index) => (
            <div key={index}>
              {link.dropdown ? (
                <div>
                  <button
                    onClick={() =>
                      setRegistrationDropdownOpen(!registrationDropdownOpen)
                    }
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 font-sans font-semibold text-black flex items-center justify-between"
                  >
                    {link.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 transform transition-transform ${registrationDropdownOpen ? "rotate-180" : ""
                        }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {registrationDropdownOpen && (
                    <div className="bg-gray-50 py-2">
                      {link.dropdownItems.map((item, idx) => (
                        <Link href={item.path} key={idx}>
                          <div
                            className="pl-8 py-2 font-sans text-black hover:bg-gray-100 cursor-pointer"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link href={link.path}>
                  <div
                    className="block px-4 py-3 hover:bg-gray-100 font-sans font-semibold text-black"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </div>
                </Link>
              )}
            </div>
          ))}

          {/* Admin Login in mobile menu */}
          <div className="border-t mt-2 pt-2">
            <Link href="http://localhost:3000/admin/login">
              <div
                className="flex items-center px-4 py-3 bg-blue-50 hover:bg-blue-100 font-sans font-semibold text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Admin Login
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Add a small bit of CSS for the animation */}
      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }

        .animated-text-container {
          overflow: hidden;
        }

        .animate-pulse {
          animation: fadeInOut 2s ease-in-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
