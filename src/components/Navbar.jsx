const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md mt-2 p-2">
      <div className="container mx-auto px-3 py-3">
        <div className="flex items-center justify-between">
          <img src="/assets/logos/scup.png" className="h-10 ml-10" />
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
                href="/team-details"
                className="hover:text-blue-500 font-sans font-semibold  text-black"
              >
                Teams
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
