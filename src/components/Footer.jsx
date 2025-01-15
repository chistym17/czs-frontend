const Footer = () => {
  return (
    <footer className='bg-white text-black py-8 '>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <h3 className='text-xl font-bold mb-4'>About Us</h3>
            <p className='text-black-300'>15 Years of non-stop tourneys</p>
          </div>
          <div>
            <h3 className='text-xl font-bold mb-4'>Quick Links</h3>
            <ul className='space-y-2 text-black-300'>
              <li>
                <a href='/' className=' hover:text-white'>
                  Home
                </a>
              </li>
              <li>
                <a href='/about' className=' hover:text-white'>
                  About
                </a>
              </li>
              <li>
                <a href='/services' className=' hover:text-white'>
                  Services
                </a>
              </li>
              <li>
                <a href='/contact' className=' hover:text-white'>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-xl font-bold mb-4'>Contact Info</h3>
            <p className=''>Email: info@example.com</p>
            <p className=''>Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className='text-center mt-8 pt-8 border-t border-gray-700'>
          <p className=''>© 2025 CFT Inc. All rights reserved.</p>
        </div>
      </div>

     
      <div className="bg-yellow-50 border-t border-yellow-100 py-3 px-4 fixed bottom-0 w-full z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-yellow-800">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                clipRule="evenodd" 
              />
            </svg>
            <p className="text-sm font-medium">
              Development Notice: This website is under development. Currently displaying dummy data for demonstration purposes.
            </p>
          </div>
        </div>
      </div>







    </footer>
  );
};

export default Footer;
