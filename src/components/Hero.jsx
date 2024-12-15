const Hero = () => {
  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
          <p className="text-lg text-gray-600 mb-8">
            This is a hero section. Add your compelling message here.
          </p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
