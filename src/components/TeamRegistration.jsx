import Link from 'next/link';
import { FaTrophy, FaCalendarAlt, FaUsers } from 'react-icons/fa';

const TeamRegistration = () => {
  return (
    <div className='py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50'>
      <div className='container mx-auto px-4'>
        {/* Main Content */}
        <div className='max-w-5xl mx-auto text-center'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-6'>
            JOIN THE SUPERCUP NOW !
          </h2>
          <div className='w-24 h-1 bg-blue-600 mx-auto mb-8'></div>

          {/* Features Grid */}
          <div className='grid md:grid-cols-3 gap-8 mb-12'>
            <div className='p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow'>
              <div className='text-blue-600 text-4xl mb-4 flex justify-center'>
                <FaTrophy />
              </div>
              <h3 className='text-xl font-semibold mb-2'>Compete for Glory</h3>
              <p className='text-gray-600'>
                Battle against the best teams and claim your spot at the top
              </p>
            </div>

            <div className='p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow'>
              <div className='text-blue-600 text-4xl mb-4 flex justify-center'>
                <FaCalendarAlt />
              </div>
              <h3 className='text-xl font-semibold mb-2'>
                Tournament Schedule
              </h3>
              <p className='text-gray-700'>Coming Soon!</p>
            </div>

            <div className='p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow'>
              <div className='text-blue-600 text-4xl mb-4 flex justify-center'>
                <FaUsers />
              </div>
              <h3 className='text-xl font-semibold mb-2'>Team Requirements</h3>
              <p className='text-gray-600'>
                Register your squad of 15-20 players
              </p>
            </div>
          </div>

          {/* Registration Call-to-Action */}
          <div className='bg-white p-8 rounded-2xl shadow-lg border border-gray-100'>
            <h3 className='text-2xl font-bold text-gray-800 mb-4'>
              Registration Open for 2025 Season
            </h3>
            <p className='text-gray-600 mb-8 max-w-2xl mx-auto'>
              Don't miss your chance to be part of the most prestigious football
              tournament. Limited spots available for qualified teams.
            </p>
            <Link
              href='/team-registration'
              className='inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg'
            >
              Register Your Team
              <svg
                className='w-5 h-5 ml-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 7l5 5m0 0l-5 5m5-5H6'
                />
              </svg>
            </Link>
          </div>

          {/* Timeline or Deadline */}
          <div className='mt-12 text-gray-600'>
            <p className='text-sm font-semibold'>
              Registration Deadline: Not Started.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamRegistration;
