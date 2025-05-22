'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { fetchTeams } from '../../config/api';
import Link from 'next/link';

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
      className="group bg-white rounded-xl overflow-hidden cursor-pointer border border-gray-200 
      shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-300 
      w-80 h-[420px] flex flex-col transform-gpu"
    >
      {/* Logo as cover image - increased height */}
      <div className="relative h-64 w-full overflow-hidden">
        {shouldShowImage && !imgError ? (
          <Image
            src={teamLogo}
            alt={`${teamName} logo`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
            <span className="text-6xl font-bold text-blue-200">
              {teamName.charAt(0)}
            </span>
          </div>
        )}
        {/* Overlay gradient for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
      </div>

      {/* Team info section - adjusted padding */}
      <div className="p-6 flex-1 flex flex-col justify-between bg-white">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-1">
            {teamName}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full border border-blue-100">
              Batch {batchYear}
            </span>
          </div>
        </div>

        {/* View details button - increased spacing */}
        <div className="mt-6 flex justify-end">
          <span className="text-sm text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
      <svg className="w-12 h-12 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    </div>
    <h2 className="text-2xl font-bold text-gray-800 mb-2">No Teams Registered Yet</h2>
    <p className="text-gray-600 mb-6 max-w-md">
      Be the first to register your team for the 2025 season. Join the competition and showcase your talent!
    </p>

    <Link href="/team-registration">
      <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
        Register Your Team
      </button>
    </Link>
  </div>
);

const TeamsPage = () => {
  const router = useRouter();
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
    <div className="min-h-screen bg-gray-50">
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
      `}</style>

      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {teams.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Registered Teams for 2025 Season
              </h1>
              <p className="text-gray-600">
                {teams.length} {teams.length === 1 ? 'team has' : 'teams have'} registered so far
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
              {teams.map((team, index) => (
                <div
                  key={team._id}
                  style={{
                    opacity: mounted ? 1 : 0,
                    animation: mounted
                      ? `fadeIn 0.5s ease-out ${index * 0.1}s forwards`
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
          </>
        )}
      </main>

    </div>
  );
};

export default TeamsPage;
