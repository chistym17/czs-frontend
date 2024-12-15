const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md mt-5 p-5">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold ml-20 font-sans text-black">
            CZS SUPER CUP
          </div>
          <ul className="flex space-x-6">
            <li>
              <a
                href="/"
                className="hover:text-blue-500 font-sans font-semibold  text-black"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-blue-500 font-sans font-semibold  text-black"
              >
                About
              </a>
            </li>

            <li>
              <a
                href="/contact"
                className="hover:text-blue-500 font-sans font-semibold mr-10  text-black"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
