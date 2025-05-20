'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { fetchTeams } from '../../config/api';

// Additional styles to make it more responsive for smaller screens
const mediaStyles = `
  @media (max-width: 640px) {
    .team-card {
      width: 100% !important;
      max-width: 280px;
    }
  }
  
  @media (max-width: 480px) {
    .container {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
    
    .team-card {
      height: 320px !important;
    }
  }
`;

const TeamCard = ({ teamLogo, teamName, batchYear, _id }) => {
  const router = useRouter();
  const [imgError, setImgError] = useState(false);

  const handleClick = () => {
    router.push(`/teams/${_id}`);
  };

  const shouldShowImage = teamLogo && teamLogo.trim() !== '';

  return (
    <div
      onClick={handleClick}
      className='team-card bg-white rounded-lg overflow-hidden cursor-pointer border border-blue-300 shadow-md 
      transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-500 
      w-64 h-96 flex flex-col transform-gpu'
    >
      <div
        className='h-48 w-full relative bg-gray-50 flex items-center justify-center p-4 
      transition-all duration-300 hover:bg-blue-50'
      >
        {shouldShowImage && !imgError ? (
          <Image
            src={teamLogo}
            alt={`${teamName} logo`}
            width={160}
            height={160}
            loading="lazy"
            quality={75}
            className='max-h-40 transition-transform duration-300 hover:scale-110 object-contain'
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-400">
              {teamName.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className='p-4 flex-1 flex flex-col justify-between border-t border-blue-100'>
        <h3 className='text-xl font-bold text-gray-800 mb-2'>{teamName}</h3>
        <div className='mt-auto'>
          <p className='text-gray-600 text-sm'>Batch: {batchYear}</p>
        </div>
      </div>
    </div>
  );
};

const TeamsPage = () => {
  const [mounted, setMounted] = useState(false);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setMounted(true);
    const loadTeams = async () => {
      try {
        const response = await fetchTeams();
        if (response.success) {
          setTeams(response.data);
        } else {
          throw new Error(response.message || 'Failed to load teams');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error loading teams:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">Error loading teams</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <style jsx global>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        ${mediaStyles}
      `}</style>

      <Navbar />

      <main className='container mx-auto px-2 sm:px-4 py-6 sm:py-10'>
        <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-sky-600'>
          SUPER CUP TEAMS
        </h1>

        <div className='grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center'>
          {teams.map((team, index) => (
            <div
              key={team._id}
              style={{
                opacity: mounted ? 1 : 0,
                animation: mounted
                  ? `fadeIn 0.5s ease-out ${index * 0.1}s forwards, float 3s ease-in-out ${
                      index * 0.1 + 0.5
                    }s infinite`
                  : 'none',
              }}
            >
              <TeamCard
                _id={team._id}
                teamLogo={team.teamLogo}
                teamName={team.teamName}
                batchYear={team.batchYear}
              />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TeamsPage;
