'use client';
import { useEffect, useState } from 'react';

const Loading = () => {
  const [progress, setProgress] = useState(0);

  // Simulated progress animation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='min-h-screen bg-white'>
      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-pulse-slow {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
      `}</style>

      {/* Navbar placeholder */}
      <div className='h-16 bg-sky-600 shadow-md'></div>

      <div className='max-w-7xl mx-auto px-4 py-8 animate-[fadeIn_0.5s_ease-out]'>
        {/* Notification banner */}
        <div className='mb-8 space-y-4'>
          <div className='bg-sky-50 border border-sky-100 rounded-lg p-4'>
            <div className='flex items-center gap-2 text-sky-800'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 animate-bounce-slow'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                  clipRule='evenodd'
                />
              </svg>
              <p className='text-sm font-medium'>
                Server under development: Data is being fetched. Please wait a
                few seconds...
              </p>
            </div>
          </div>
        </div>

        {/* Loading circle */}
        <div className='flex justify-center mb-8'>
          <div className='relative'>
            <svg className='w-24 h-24' viewBox='0 0 100 100'>
              <circle
                className='text-sky-100'
                strokeWidth='8'
                stroke='currentColor'
                fill='transparent'
                r='42'
                cx='50'
                cy='50'
              />
            </svg>
            <div className='absolute inset-0 flex items-center justify-center'>
              <span className='text-sky-600 font-semibold text-xl'>
                {progress}%
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className='h-2 bg-sky-100 rounded-full mb-8 overflow-hidden'>
          <div
            className='h-full bg-sky-600 rounded-full transition-all duration-300 ease-out'
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Content placeholders */}
        <div className='bg-sky-50 h-32 rounded-xl mb-8 shadow-sm flex items-center justify-center'>
          <div className='animate-[spin_3s_linear_infinite]'>
            <svg
              className='w-12 h-12 text-sky-600'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
              />
            </svg>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className='bg-sky-50 h-72 rounded-xl shadow-sm overflow-hidden'
              style={{
                animation: `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) ${
                  index * 0.2
                }s infinite`,
              }}
            >
              <div className='h-36 bg-sky-100'></div>
              <div className='p-4 space-y-3'>
                <div className='h-4 bg-sky-100 rounded w-3/4'></div>
                <div className='h-3 bg-sky-100 rounded w-1/2'></div>
                <div className='h-3 bg-sky-100 rounded w-5/6'></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer placeholder */}
      <div className='h-16 bg-sky-600 mt-16'></div>
    </div>
  );
};

export default Loading;
