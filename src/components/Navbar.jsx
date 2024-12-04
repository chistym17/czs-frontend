import React from 'react'

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">Logo</div>
          <ul className="flex space-x-6">
            <li><a href="/" className="hover:text-blue-500">Home</a></li>
            <li><a href="/about" className="hover:text-blue-500">About</a></li>
            <li><a href="/services" className="hover:text-blue-500">Services</a></li>
            <li><a href="/contact" className="hover:text-blue-500">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 