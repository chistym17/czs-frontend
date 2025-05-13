'use client';
import { useState, useEffect, Suspense } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Loading from './loading';

const TeamDetails = ({ params }) => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch(
          `https://czs-backend.onrender.com/api/teams`
        );
        const data = await response.json();
        console.log(data.data[0]);
        setTeam(data.data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching team data:', error);
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [params.teamId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-white'>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <div className='max-w-7xl mx-auto px-4 py-8'>
          <div className='bg-white rounded-2xl shadow-xl p-8 mb-8'>
            <div className='flex flex-col md:flex-row items-center justify-between'>
              <div className='text-center md:text-left mb-4 md:mb-0'>
                <h1 className='text-4xl font-bold text-blue-900'>
                  {team.name}
                </h1>
                <p className='text-xl text-gray-600'>Class of {team.year}</p>
              </div>
              <div className='flex gap-6'>
                <div className='text-center'>
                  <p className='text-sm text-gray-500'>Captain</p>
                  <p className='font-semibold text-blue-900'>
                    {team.captainName}
                  </p>
                </div>
                <div className='text-center'>
                  <p className='text-sm text-gray-500'>Vice Captain</p>
                  <p className='font-semibold text-blue-900'>
                    {team.viceCaptainName}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {team?.players?.map((player, index) => (
              <div key={index} className='relative group'>
                <div className='relative transform transition-transform duration-300 group-hover:scale-105'>
                  <div className='absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl opacity-90'></div>

                  <div className='relative p-4 h-[400px] rounded-2xl overflow-hidden'>
                    <div className='h-64 w-full overflow-hidden rounded-xl mb-4'>
                      <img
                        src={player.image}
                        alt={player.name}
                        className='w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110'
                      />
                    </div>

                    <div className='text-white'>
                      <div className='flex justify-between items-center mb-2'>
                        <h3 className='text-xl font-bold truncate'>
                          {player.name}
                        </h3>
                        <span className='text-2xl font-bold'>
                          #{player.jerseyNumber}
                        </span>
                      </div>

                      <div className='inline-block bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold'>
                        {player.position}
                      </div>
                    </div>

                    <div className='absolute top-2 right-2 w-12 h-12 bg-white/10 rounded-full'></div>
                    <div className='absolute bottom-2 left-2 w-8 h-8 bg-white/10 rounded-full'></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Suspense>

      <div className='bg-yellow-50 border-t border-yellow-100 py-3 px-4 fixed bottom-0 w-full z-50'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center justify-center gap-2 text-yellow-800'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
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
              Development Notice: This website is under development. Currently
              displaying dummy data for demonstration purposes.
            </p>
          </div>
        </div>
      </div>

      <div className='pb-16'>
        <Footer />
      </div>
    </div>
  );
};

export default TeamDetails;
