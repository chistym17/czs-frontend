const Loading = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-16 bg-gray-100 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
            <div className="flex items-center gap-2 text-yellow-800">
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
                Server under development: Data is being fetched. Please wait a few seconds...z
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 h-64 rounded-xl animate-pulse mb-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(16)].map((_, index) => (
            <div 
              key={index} 
              className="bg-gray-100 h-72 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      <div className="h-16 bg-gray-100 animate-pulse mt-8"></div>
    </div>
  );
};

export default Loading; 