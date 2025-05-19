const Footer = () => {
  return (
    <footer className='bg-gradient-to-b from-white to-blue-50 text-black py-8 '>
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

    </footer>
  );
};

export default Footer;
